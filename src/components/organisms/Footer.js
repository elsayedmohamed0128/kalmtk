/**
 * Footer.js
 * 
 * Organism Footer component that provides a consistent application footer.
 * This component includes copyright information and optional actions.
 * 
 * Follows Material Design 3 Bottom App Bar specifications:
 * - Height: 48dp minimum
 * - Color scheme: Surface with OnSurfaceVariant text
 * - Icon buttons: OnSurfaceVariant color
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';

export const Footer = ({ 
  copyrightText = "© 2025 Kalimtak. All rights reserved.",
  onHelpPress,
  onInfoPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.outline,
    }, style]}>
      <Text variant="bodySmall" style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}>
        {copyrightText}
      </Text>
      
      <View style={styles.actions}>
        {onHelpPress && (
          <Icon 
            name="help-outline" 
            size={20} 
            color={theme.colors.onSurfaceVariant} 
            onPress={onHelpPress}
            accessibilityLabel="Get help"
            accessibilityRole="button"
            style={styles.actionIcon}
          />
        )}
        
        {onInfoPress && (
          <Icon 
            name="info-outline" 
            size={20} 
            color={theme.colors.onSurfaceVariant} 
            onPress={onInfoPress}
            accessibilityLabel="Information"
            accessibilityRole="button"
            style={styles.actionIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48, // Material Design 3 minimum height for bottom app bar
  },
  copyright: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 16,
  },
});