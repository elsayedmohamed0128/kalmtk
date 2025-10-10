/**
 * App.js
 * 
 * Main application entry point.
 * This file bootstraps the application and sets up the navigation system.
 */

import React from 'react';
import { StyleSheet, Text, View, I18nManager, Platform } from 'react-native';
import { ThemeProvider } from './src/contexts/ThemeContext';
// initialize i18n early
import './i18n';
import { AppNavigator } from './src/navigation/AppNavigator';

// Ensure RTL is enabled for Arabic layouts. This will attempt to set the global direction
try {
  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    // On native this requires reload. On web it takes effect immediately.
    if (Platform.OS !== 'web') {
      // eslint-disable-next-line no-console
      console.log('RTL enabled; please reload the app to apply direction changes');
    }
  }
} catch (e) {
  // ignore
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
