/**
 * Button.js
 * 
 * Atomic Button component following Material 3 design principles.
 * This component provides different button variants and integrates with the theme system.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'filled', 
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  
  // Define variants for container and text separately
  const variants = {
    filled: {
      container: {
        backgroundColor: theme.colors.primary,
      },
      text: {
        color: theme.colors.onPrimary,
      },
    },
    outlined: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      text: {
        color: theme.colors.primary,
      },
    },
    text: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: theme.colors.primary,
      },
    },
  };

  const variantStyles = variants[variant] || variants.filled;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyles.container,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...props}
    >
      <Text style={[styles.text, variantStyles.text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 36,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.38,
  },
});