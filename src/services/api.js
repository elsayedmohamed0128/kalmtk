/**
 * api.js
 * 
 * API service layer for backend communication.
 * This service provides methods for interacting with the backend API.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { streamResponse } from './streamingClient';

const API_BASE_URL = 'http://localhost:8001/api';

export class ApiService {
  static async request(endpoint, options = {}) {
    const token = await AsyncStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      // If developer set REACT_APP_USE_MOCKS, return a friendly mock instead of throwing so UI can render locally.
      if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_USE_MOCKS === 'true') {
        console.warn('ApiService.request failed, returning mock due to REACT_APP_USE_MOCKS=true', endpoint, err.message);
        // Provide a minimal mock response shape based on endpoint
        if (endpoint.includes('/generate')) {
          return { id: 'mock', text: 'هذا استجابة تجريبية (mock) لأن الخادم غير متاح.' };
        }
        if (endpoint.includes('/history')) {
          return [];
        }
        return {};
      }

      // Re-throw network errors so callers can handle them (UI should show friendly error state)
      throw err;
    }
  }
  
  // Prompt Generation
  static async generatePrompt(data) {
    // If backend is unreachable and mocks are enabled, ApiService.request will return a mock
    return this.request('/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Streaming prompt generation (calls onDelta for partial text and onDone when finished)
  static async generatePromptStream(data, { onDelta, onDone, onError, signal } = {}) {
    const token = await AsyncStorage.getItem('authToken');
    const url = `${API_BASE_URL}/generate`;
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };

    try {
      return streamResponse(url, { method: 'POST', headers, body: JSON.stringify(data) }, { onDelta, onDone, onError, signal });
    } catch (err) {
      if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_USE_MOCKS === 'true') {
        console.warn('generatePromptStream failed, invoking onDelta/onDone with mock due to REACT_APP_USE_MOCKS=true', err.message);
        // simulate a small stream
        setTimeout(() => onDelta && onDelta('هذا استجابة تجريبية (mock) ...'), 100);
        setTimeout(() => onDone && onDone({ id: 'mock' }), 300);
        return;
      }

      if (onError) onError(err);
      throw err;
    }
  }
  
  // History Management
  static async getHistory(userId) {
    return this.request(`/history/${userId}`);
  }
  
  // Feedback Submission
  static async submitFeedback(data) {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  // Admin Endpoints
  static async curateTrainingData() {
    return this.request('/admin/curate-training-data', {
      method: 'POST',
    });
  }
}