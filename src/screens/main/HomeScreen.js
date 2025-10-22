import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme'; // Use the new hook instead of contexts
import { MainLayout } from '../../components/templates/MainLayout';
import { PromptInput } from '../../components/molecules/PromptInput';
import { PromptOutput } from '../../components/molecules/PromptOutput';
import { usePromptStore } from '../../stores/usePromptStore';
import { ApiService } from '../../services/api';
import { MessageList } from '../../components/organisms/MessageList';
import { MessageBubble } from '../../components/molecules/MessageBubble';

export default function HomeScreen() {
  const { theme } = useTheme(); // Use the new hook
  const [inputText, setInputText] = useState('');
  const { addToHistory, history } = usePromptStore();
  const [loading, setLoading] = useState(false);
  const controllerRef = React.useRef(null);
  const { appendToMessage } = usePromptStore();
  const {
    conversations,
    selectedConversationId,
    createConversation,
    selectConversation,
    addMessage,
    finishMessage,
  } = usePromptStore();

  // Ensure there's a selected conversation on first load
  React.useEffect(() => {
    if (!selectedConversationId) {
      const id = createConversation('New conversation');
      selectConversation(id);
    }
  }, []);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    // Add user message first
    const userMsgId = addMessage(selectedConversationId, { role: 'user', content: inputText, timestamp: Date.now(), status: 'done' });

    // Add placeholder assistant message with streaming status
    const assistantMsgId = addMessage(selectedConversationId, { role: 'assistant', content: '', timestamp: Date.now(), status: 'streaming' });

    try {
      controllerRef.current = new AbortController();

      await ApiService.generatePromptStream({ prompt: inputText }, {
        signal: controllerRef.current.signal,
        onDelta: (delta) => {
          // append delta to assistant message content
          appendToMessage(selectedConversationId, assistantMsgId, delta);
        },
        onDone: () => {
          finishMessage(selectedConversationId, assistantMsgId);
          setInputText('');
        },
        onError: (err) => {
          finishMessage(selectedConversationId, assistantMsgId, err.message || 'Failed to generate');
          Alert.alert('Error', err.message || 'Failed to generate prompt');
        }
      });
    } catch (error) {
      finishMessage(selectedConversationId, assistantMsgId, error.message || 'Failed to generate');
      Alert.alert('Error', error.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return (
    <MainLayout title="Prompt Generator">
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {(!conversations || conversations.length === 0) ? (
          // Empty hero state: centered title + composer
          <View style={styles.emptyWrap}>
            <Text style={[styles.heroTitle, { color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily }]}>ماذا يوجد على جدول الأعمال اليوم؟</Text>

            <View style={styles.centerComposerWrap}>
              <View style={[styles.composerPill, { backgroundColor: theme.colors.elevated, maxWidth: theme.sizes.composerMaxWidth, height: theme.sizes.composerHeight }]}> 
                <Text style={{ color: theme.colors.textSecondary, paddingHorizontal: 12, flex: 1 }}>اسأل عن أي شيء</Text>
                <View style={styles.composerIcons}>
                  <Text style={{ color: theme.colors.textPrimary, marginRight: 12 }}>◌</Text>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.composerAccent, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: theme.colors.textPrimary }}>●</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <MessageList
              messages={history}
              renderItem={({ item }) => (
                <MessageBubble
                  message={{ id: item.id, role: 'assistant', content: item.response, timestamp: item.timestamp }}
                  style={{ marginBottom: 8 }}
                />
              )}
              inverted={false}
            />

            <PromptInput
              value={inputText}
              onChangeText={setInputText}
              onSend={handleGenerate}
              loading={loading}
              onCancel={handleCancel}
              placeholder="Write your idea..."
            />
          </>
        )}
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
