/**
 * ThemeContext.js
 * 
 * React Context for managing the application theme (light/dark mode).
 * This context provides the current theme, a function to toggle between themes,
 * and automatically detects the system theme preference.
 * 
 * Theme preferences are persisted to AsyncStorage so that the user's choice
 * is remembered between app sessions.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import designTokens from '../themes/designTokens';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    loadThemePreference();
  }, []);
  
  const loadThemePreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem('themePreference');
      if (savedPreference) {
        setIsDarkMode(savedPreference === 'dark');
      } else {
        setIsDarkMode(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };
  
  const toggleTheme = async (mode) => {
    const newMode = mode || (isDarkMode ? 'light' : 'dark');
    setIsDarkMode(newMode === 'dark');
    
    try {
      await AsyncStorage.setItem('themePreference', newMode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  
  // Use the design tokens as the base theme so typography and other tokens are available
  const theme = {
    ...designTokens,
    // Allow components to read the isDark flag
    isDark: isDarkMode,
    // Provide a colors override if needed based on system preference
    colors: {
      ...designTokens.colors,
      // keep existing color decisions or override dynamically if desired
      background: isDarkMode ? designTokens.colors.background : designTokens.colors.background,
    },
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};