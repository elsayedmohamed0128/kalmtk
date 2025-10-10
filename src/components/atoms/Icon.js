/**
 * Icon.js
 * 
 * Atomic Icon component for displaying icons in the application.
 * This component provides a consistent way to display icons that integrate with the theme system.
 * 
 * Uses react-native-vector-icons for actual icon rendering.
 */

import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const Icon = ({ 
  name, 
  size = 24, 
  color, 
  style,
  ...props 
}) => {
  const { theme } = useTheme();
  
  // Default color to onSurface if not specified
  const iconColor = color || theme.colors.textPrimary || theme.colors.textPrimary;
  
  // Prefer MaterialIcons then Ionicons, else fallback to a small square placeholder
  // Use Expo vector icons (web-friendly). MaterialIcons or Ionicons mapping
  const IconComponent = MaterialIcons || Ionicons;
  return <IconComponent name={name} size={size} color={iconColor} style={[styles.container, style]} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
  placeholder: {
    borderRadius: 4,
  },
});