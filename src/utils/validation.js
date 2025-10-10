/**
 * validation.js
 * 
 * Utility functions for data validation.
 * This file provides helper functions for validating user input and data.
 */

export const validation = {
  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  // Validate password strength
  isStrongPassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },
  
  // Validate required field
  isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },
  
  // Validate minimum length
  minLength(value, length) {
    return value && value.toString().length >= length;
  },
};