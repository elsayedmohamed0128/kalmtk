/**
 * PromptOutput.js
 * 
 * Molecular PromptOutput component that displays generated prompts.
 * This component shows the output of the prompt generation with action buttons.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { MessageBubble } from './MessageBubble';

export const PromptOutput = ({
  outputText,
  onCopy,
  onSave,
  onShare,
  style,
}) => {
  const { theme } = useTheme();

  const message = {
    id: undefined,
    role: 'assistant',
    content: outputText,
    timestamp: Date.now(),
    status: 'done',
  };

  return (
    <View style={[{ paddingHorizontal: 0 }, style]}>
      <MessageBubble message={message} />

      <View style={styles.actionButtons}>
        {onCopy && (
          <Icon
            name="content-copy"
            size={24}
            color={theme.colors.onSurface}
            onPress={onCopy}
            accessibilityLabel="Copy"
            accessibilityRole="button"
            style={styles.actionButton}
          />
        )}

        {onSave && (
          <Icon
            name="save"
            size={24}
            color={theme.colors.onSurface}
            onPress={onSave}
            accessibilityLabel="Save"
            accessibilityRole="button"
            style={styles.actionButton}
          />
        )}

        {onShare && (
          <Icon
            name="share"
            size={24}
            color={theme.colors.onSurface}
            onPress={onShare}
            accessibilityLabel="Share"
            accessibilityRole="button"
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  outputText: {
    lineHeight: 24,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    textAlign: 'center',
    padding: 8,
  },
});