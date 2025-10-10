/**
 * useTheme.js
 * 
 * Custom hook for accessing the theme context.
 * This hook provides easy access to the current theme and theme switching functionality.
 */

import { useTheme as useThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const { theme, isDarkMode, toggleTheme } = useThemeContext();
  
  return {
    colors: theme.colors,
    isDark: isDarkMode,
    toggleTheme,
    theme,
  };
};