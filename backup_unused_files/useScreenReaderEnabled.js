/**
 * useScreenReaderEnabled.js
 * 
 * Custom hook for detecting screen reader status.
 * This hook provides information about whether a screen reader is enabled.
 */

import { useState, useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

export const useScreenReaderEnabled = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  
  useEffect(() => {
    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setIsScreenReaderEnabled(isEnabled);
    };
    
    checkScreenReader();
    
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled
    );
    
    return () => subscription.remove();
  }, []);
  
  return isScreenReaderEnabled;
};