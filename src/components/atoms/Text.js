/**
 * Text.js
 * 
 * Atomic Text component following Material 3 typography specifications.
 * This component integrates with the theme system and typography constants.
 */

import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import typography from '../../constants/typography';

export const Text = ({ 
  children, 
  variant = 'bodyMedium', 
  style, 
  ...props 
}) => {
  const { theme } = useTheme();
  
  const typographyStyle = typography[variant] || typography.bodyMedium;
  
  return (
    <RNText
      style={[
        styles.base,
        {
          color: theme.colors.text,
          fontFamily: typographyStyle.fontFamily,
          fontSize: typographyStyle.fontSize,
          lineHeight: typographyStyle.lineHeight,
          fontWeight: typographyStyle.fontWeight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    textAlign: 'left',
  },
});