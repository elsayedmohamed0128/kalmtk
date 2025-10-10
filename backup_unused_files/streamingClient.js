// streamingClient.js
// Lightweight helper to stream server responses (supports JSONL or SSE-like 'data:' lines)
export async function streamResponse(url, init, { onDelta, onDone, onError, signal } = {}) {
  try {
    const res = await fetch(url, { ...init, signal });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    if (!res.body) {
      // No streaming support, fallback to full JSON
      const json = await res.json();
      if (onDelta && json?.message) onDelta(json.message);
      if (onDone) onDone(json?.message || '');
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Split into lines
      const lines = buffer.split(/\r?\n/);
      // Keep last partial line
      buffer = lines.pop();

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // SSE style: 'data: {...}'
        if (line.startsWith('data:')) {
          line = line.replace(/^data:\s*/i, '');
        }

        // Try parse JSON
        let parsed = null;
        try {
          parsed = JSON.parse(line);
        } catch (e) {
          // not JSON, treat as raw delta
        }

        if (parsed) {
          // Expect { delta: 'text' } or { message: '...' }
          if (parsed.delta) {
            onDelta && onDelta(parsed.delta);
          } else if (parsed.message) {
            onDelta && onDelta(parsed.message);
          } else {
            // unknown JSON, pass entire object
            onDelta && onDelta(JSON.stringify(parsed));
          }
        } else {
          onDelta && onDelta(line);
        }
      }
    }

    // flush remainder
    if (buffer && buffer.trim()) {
      let last = buffer.trim();
      try {
        const parsed = JSON.parse(last);
        if (parsed.message) onDelta && onDelta(parsed.message);
        else if (parsed.delta) onDelta && onDelta(parsed.delta);
        else onDelta && onDelta(JSON.stringify(parsed));
      } catch (e) {
        onDelta && onDelta(last);
      }
    }

    if (onDone) onDone();
  } catch (err) {
    if (err.name === 'AbortError') {
      onError && onError(new Error('Request aborted'));
      return;
    }
    onError && onError(err);
  }
}
