/**
 * useUserStore.js
 * 
 * Zustand store for managing user authentication state, user data, and user role.
 * This store persists user data to AsyncStorage so that the user remains logged in
 * even after the app is closed and reopened.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      role: 'user',
      
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true,
        role: userData.role || 'user'
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        role: 'user'
      }),
      
      updateProfile: (profileData) => set((state) => ({
        user: { ...state.user, ...profileData }
      })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        role: state.role
      }),
    }
  )
);