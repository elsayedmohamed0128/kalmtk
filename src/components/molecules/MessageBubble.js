import React from 'react';
import { View, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * MessageBubble
 * Props:
 * - message: { id, role ('user'|'assistant'|'system'), content, timestamp, status }
 * - style: optional style override
 */
export const MessageBubble = ({ message, style }) => {
  const { theme } = useTheme();
  const isUser = message?.role === 'user';

  const containerStyle = [
    styles.container,
    {
      backgroundColor: isUser ? theme.colors.userBubble : theme.colors.accent,
      borderColor: theme.colors.outline,
      alignSelf: isUser ? 'flex-end' : 'flex-start',
    },
    style,
  ];

  return (
    <View style={containerStyle} accessibilityRole="text" accessibilityLabel={`Message from ${message.role}`}>
      <Markdown
        style={{
          body: { color: theme.colors.textPrimary, fontSize: 16, lineHeight: 22, fontFamily: theme.typography.fontFamily },
          code_block: { backgroundColor: theme.colors.codeBlockBg, padding: 8, borderRadius: 6, fontFamily: 'monospace' },
        }}
      >
        {message.content}
      </Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    maxWidth: '78%',
  },
});
