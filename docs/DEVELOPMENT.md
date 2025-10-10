Development quickstart (Windows / PowerShell)

This project has a frontend (React Native / Expo web) and a small FastAPI backend (in `backend/`). When the backend is not running the frontend will attempt to reach `http://localhost:8001/api` and may show network errors (ERR_CONNECTION_REFUSED). Use one of these workflows:

1) Run backend + frontend locally (recommended)

- Open a PowerShell terminal and start the backend:

```powershell
cd .\backend
# Create and activate your Python virtualenv (example using venv)
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Start the backend (uvicorn)
uvicorn app:app --host 0.0.0.0 --port 8001 --reload
```

- In a second PowerShell terminal start the frontend:

```powershell
cd D:\kalmtk
npm install
npm run web
```

- Open your browser to the URL printed by Expo (usually http://localhost:8081 or the Metro web URL).

2) Use frontend-only mode (mocks)

If you don't want to run the backend locally, you can enable simple mock responses in the frontend. This prevents the app from showing blank pages when the backend is unreachable.

- In PowerShell for the current session:

```powershell
$env:REACT_APP_USE_MOCKS = 'true'
npm run web
```

- The frontend `ApiService` will return small mocked responses for `/generate` and `/history` when mocks are enabled.

Troubleshooting

- If you still see network errors in the browser console for `http://localhost:8001`, confirm the backend uvicorn process is running and the port is free.
- Use your browser DevTools Network tab to inspect the failing requests and server responses.
- If you need to quickly re-run the backend, stop the uvicorn process (Ctrl+C) and start again.

Notes

- The frontend now uses platform-aware `boxShadow` on web and native shadow props on mobile to avoid deprecation warnings from react-native-web.
- `pointerEvents` props were replaced with `style.pointerEvents` usages where necessary to silence the web deprecation message.
