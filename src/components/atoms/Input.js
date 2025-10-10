/**
 * Input.js
 * 
 * Atomic Input component following Material 3 design principles.
 * This component provides a styled text input that integrates with the theme system.
 */

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const Input = ({ 
  style, 
  placeholder,
  ...props 
}) => {
  const { theme } = useTheme();
  
  return (
    <TextInput
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
          color: theme.colors.text,
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    minHeight: 48,
  },
});