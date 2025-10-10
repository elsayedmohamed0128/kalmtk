/**
 * AuthLayout.js
 * 
 * Template component for authentication screens.
 * This component provides a consistent layout structure for login and signup screens.
 */

import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export const AuthLayout = ({ 
  children, 
  style,
}) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        contentContainerStyle={[styles.content, style]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
});