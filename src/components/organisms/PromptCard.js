/**
 * PromptCard.js
 * 
 * Organism PromptCard component that displays a prompt in a card format.
 * This component is used in history and listing screens.
 * 
 * Follows Material Design 3 Card specifications:
 * - Elevation: 0-4dp
 * - Rounded corners: 12dp
 * - Consistent padding: 16dp
 * - Proper touch targets: 48dp minimum
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

export const PromptCard = ({ 
  prompt, 
  onPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.outline,
      }, style]}
      onPress={() => onPress(prompt)}
      accessibilityRole="button"
      accessibilityLabel={`Prompt card: ${prompt.inputText}`}
    >
      <Text variant="titleMedium" style={[styles.inputText, { color: theme.colors.onSurface }]}>
        {prompt.inputText}
      </Text>
      
      <Text 
        variant="bodyMedium" 
        style={[styles.structuredPrompt, { color: theme.colors.onSurfaceVariant }]} 
        numberOfLines={2}
        accessibilityLabel="Generated prompt"
      >
        {prompt.structuredPrompt}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12, // Material Design 3 rounded corners
    padding: 16, // Consistent padding
    marginBottom: 12,
    minHeight: 48, // Minimum touch target size
  },
  inputText: {
    marginBottom: 8,
    lineHeight: 24, // Proper line height for readability
  },
  structuredPrompt: {
    lineHeight: 20, // Proper line height for readability
  },
});