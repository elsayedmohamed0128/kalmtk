/**
 * storage.js
 * 
 * Utility functions for data storage and retrieval.
 * This file provides helper functions for working with AsyncStorage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Get item from storage
  async getItem(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  },
  
  // Set item in storage
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting item in storage:', error);
      return false;
    }
  },
  
  // Remove item from storage
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing item from storage:', error);
      return false;
    }
  },
  
  // Clear all items from storage
  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },
};