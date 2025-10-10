/**
 * colors.js
 * 
 * Color constants and contrast requirements following WCAG 2.2 guidelines.
 * This file defines color contrast requirements and accessibility standards.
 */

// All color combinations meet WCAG 2.2 AA contrast requirements
export const COLORS = {
  // Text on background
  textOnBackground: {
    normal: { minContrast: 4.5 },
    large: { minContrast: 3.0 }
  },
  
  // Text on colored backgrounds
  textOnPrimary: { minContrast: 4.5 },
  textOnSecondary: { minContrast: 4.5 },
  textOnError: { minContrast: 4.5 },
  
  // UI component borders
  border: { minContrast: 3.0 }
}