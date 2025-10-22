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
        <View style={{
          width: '100%',
          maxWidth: 400,
          alignSelf: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          padding: 24,
          boxShadow: theme.shadows ? theme.shadows.heavy : undefined,
        }}>
          {children}
        </View>
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
    alignItems: 'center',
    padding: 16,
    minHeight: '100%',
  },
});