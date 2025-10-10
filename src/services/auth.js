/**
 * auth.js
 * 
 * Authentication service for user management.
 * This service handles user authentication and token management.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../stores/useUserStore';

export class AuthService {
  static async login(credentials) {
    // In a real implementation, this would call an auth endpoint
    // For now, we'll simulate authentication
    const user = {
      id: 'user-123',
      email: credentials.email,
      name: 'Test User',
      role: credentials.email.includes('admin') ? 'admin' : 'user',
    };
    
    // Store token and user data
    await AsyncStorage.setItem('authToken', 'mock-jwt-token');
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    
    // Update global state
    useUserStore.getState().login(user);
    
    return user;
  }
  
  static async logout() {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
    useUserStore.getState().logout();
  }
  
  static async getCurrentUser() {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}