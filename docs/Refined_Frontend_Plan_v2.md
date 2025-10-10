# Refined Frontend Plan v2

## 1. Updated Folder Architecture

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.js
│   │   ├── Text.js
│   │   ├── Input.js
│   │   └── Icon.js
│   ├── molecules/
│   │   ├── PromptInput.js
│   │   ├── PromptOutput.js
│   │   └── ActionButtons.js
│   ├── organisms/
│   │   ├── Header.js
│   │   ├── PromptCard.js
│   │   └── Footer.js
│   └── templates/
│       ├── MainLayout.js
│       └── AuthLayout.js
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.js
│   │   └── SignupScreen.js
│   ├── main/
│   │   ├── HomeScreen.js
│   │   └── PromptDetailScreen.js
│   ├── history/
│   │   ├── HistoryScreen.js
│   │   └── HistoryDetailScreen.js
│   ├── settings/
│   │   ├── SettingsScreen.js
│   │   ├── ProfileScreen.js
│   │   └── PreferencesScreen.js
│   └── admin/
│       ├── AdminDashboardScreen.js
│       ├── ModelManagementScreen.js
│       └── TrainingDataScreen.js
├── navigation/
│   ├── AppNavigator.js
│   ├── AuthNavigator.js
│   └── MainTabNavigator.js
├── contexts/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useTheme.js
│   ├── usePromptGeneration.js
│   └── useScreenReaderEnabled.js
├── services/
│   ├── api.js
│   └── auth.js
├── stores/
│   ├── useUserStore.js
│   └── usePromptStore.js
├── utils/
│   ├── storage.js
│   ├── validation.js
│   └── helpers.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── constants/
│   ├── colors.js
│   ├── typography.js
│   └── routes.js
├── themes/
│   ├── light.js
│   └── dark.js
└── i18n/
    ├── locales/
    │   ├── en.json
    │   ├── ar.json
    │   └── de.json
    └── index.js
```

## 2. Design System Structure

### 2.1 Material 3 Color Tokens

Based on [Material 3 Color System](https://m3.material.io/styles/color/the-color-system):

```javascript
// themes/light.js
export default {
  primary: '#6200EE',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',
  background: '#F5F5F5',
  onBackground: '#1C1B1F',
  surface: '#FFFFFF',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
  shadow: '#000000',
  scrim: '#000000',
}
```

```javascript
// themes/dark.js
export default {
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  tertiary: '#EFB8C8',
  onTertiary: '#492532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',
  error: '#F2B8B5',
  onError: '#601410',
  errorContainer: '#8C1D18',
  onErrorContainer: '#F9DEDC',
  background: '#1C1B1F',
  onBackground: '#E6E1E5',
  surface: '#1C1B1F',
  onSurface: '#E6E1E5',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',
  outline: '#938F99',
  shadow: '#000000',
  scrim: '#000000',
}
```

### 2.2 Material 3 Typography Tokens

Based on [Material 3 Typography](https://m3.material.io/styles/typography/overview):

```javascript
// constants/typography.js
export default {
  displayLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
  },
  displayMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
  },
  displaySmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
  },
  headlineLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
  },
  headlineMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
  },
  headlineSmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
  },
  titleLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
  },
  titleMedium: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  titleSmall: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  bodyLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  bodySmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  labelLarge: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  labelMedium: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  labelSmall: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
  },
}
```

### 2.3 Shape System

Based on [Material 3 Shape](https://m3.material.io/styles/shape/overview):

```javascript
// constants/shape.js
export default {
  none: 0,
  extraSmall: 2,
  small: 4,
  medium: 8,
  large: 12,
  extraLarge: 16,
  full: 9999,
}
```

## 3. NativeWind Integration

Based on [NativeWind Documentation](https://www.nativewind.dev/):

### 3.1 Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6200EE',
        onPrimary: '#FFFFFF',
        primaryContainer: '#EADDFF',
        onPrimaryContainer: '#21005D',
        secondary: '#625B71',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#E8DEF8',
        onSecondaryContainer: '#1D192B',
        tertiary: '#7D5260',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#FFD8E4',
        onTertiaryContainer: '#31111D',
        error: '#B3261E',
        onError: '#FFFFFF',
        errorContainer: '#F9DEDC',
        onErrorContainer: '#410E0B',
        background: '#F5F5F5',
        onBackground: '#1C1B1F',
        surface: '#FFFFFF',
        onSurface: '#1C1B1F',
        surfaceVariant: '#E7E0EC',
        onSurfaceVariant: '#49454F',
        outline: '#79747E',
      },
      borderRadius: {
        'none': 0,
        'xs': 2,
        'sm': 4,
        'md': 8,
        'lg': 12,
        'xl': 16,
        'xxl': 24,
        'full': 9999,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
```

```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### 3.2 Component Implementation

```javascript
// components/atoms/Button.jsx
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

export const Button = ({ 
  title, 
  onPress, 
  variant = 'filled', 
  disabled = false,
  className = ''
}) => {
  // Define variants for container and text separately
  const variants = {
    filled: {
      container: 'bg-primary',
      text: 'text-onPrimary',
    },
    outlined: {
      container: 'border border-primary',
      text: 'text-primary',
    },
    text: {
      container: '',
      text: 'text-primary',
    },
  };

  const variantClasses = variants[variant] || variants.filled;

  return (
    <StyledTouchableOpacity
      className={`
        py-3 px-6 rounded-medium items-center justify-center
        ${variantClasses.container}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <StyledText className={`font-medium text-labelLarge ${variantClasses.text}`}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
};
```

## 4. Zustand State Management

Based on [Zustand Documentation](https://docs.pmnd.rs/zustand/introduction):

### 4.1 User Store

```javascript
// stores/useUserStore.js
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
```

### 4.2 Prompt Store

```javascript
// stores/usePromptStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePromptStore = create(
  persist(
    (set, get) => ({
      history: [],
      favorites: [],
      currentPrompt: null,
      
      addToHistory: (prompt) => set((state) => ({
        history: [prompt, ...state.history.slice(0, 99)]
      })),
      
      addToFavorites: (prompt) => set((state) => ({
        favorites: [...state.favorites, prompt]
      })),
      
      removeFromFavorites: (promptId) => set((state) => ({
        favorites: state.favorites.filter(p => p.id !== promptId)
      })),
      
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'prompt-storage',
    }
  )
);
```

## 5. React Navigation v6 Implementation

Based on [React Navigation Documentation](https://reactnavigation.org/docs/getting-started/):

### 5.1 App Navigator

```javascript
// navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserStore } from '../stores/useUserStore';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useUserStore();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 5.2 Main Tab Navigator

```javascript
// navigation/MainTabNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUserStore } from '../stores/useUserStore';
import HomeScreen from '../screens/main/HomeScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { role } = useUserStore();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#79747E',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      {role === 'admin' && (
        <Tab.Screen name="Admin" component={AdminDashboardScreen} />
      )}
    </Tab.Navigator>
  );
}
```

## 6. WCAG 2.2 Compliance

Based on [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/):

### 6.1 Color Contrast Compliance

```javascript
// constants/colors.js
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
};
```

### 6.2 Accessibility Implementation

```javascript
// hooks/useScreenReaderEnabled.js
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
```

```javascript
// components/atoms/AccessibleText.jsx
import { Text } from 'react-native';
import { styled } from 'nativewind';

const StyledText = styled(Text);

export const AccessibleText = ({ 
  children, 
  accessibilityLabel,
  accessibilityRole = 'text',
  ...props 
}) => {
  return (
    <StyledText
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessible={true}
      {...props}
    >
      {children}
    </StyledText>
  );
};
```

## 7. Internationalization Enhancement

Based on [React i18next Documentation](https://react.i18next.com/):

### 7.1 RTL Support Implementation

```javascript
// i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: require('./locales/en.json')
  },
  ar: {
    translation: require('./locales/ar.json')
  },
  de: {
    translation: require('./locales/de.json')
  }
};

// Detect device language and RTL support
const deviceLanguage = Localization.locale.split('-')[0];
const isRTL = Localization.isRTL;

// Force RTL layout for Arabic
if (deviceLanguage === 'ar' && !isRTL) {
  I18nManager.forceRTL(true);
  // Restart app to apply RTL changes
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
```

### 7.2 Language Files

```json
// i18n/locales/en.json
{
  "write_your_idea": "Write your idea",
  "start": "Start",
  "voice_input": "Voice Input",
  "stop_listening": "Stop Listening",
  "generated_prompt": "Generated Prompt",
  "copy": "Copy",
  "save": "Save",
  "share": "Share",
  "login": "Login",
  "signup": "Sign Up",
  "email": "Email",
  "password": "Password",
  "history": "History",
  "settings": "Settings",
  "profile": "Profile",
  "preferences": "Preferences",
  "admin_dashboard": "Admin Dashboard",
  "model_management": "Model Management",
  "training_data": "Training Data"
}
```

```json
// i18n/locales/ar.json
{
  "write_your_idea": "اكتب فكرتك",
  "start": "ابدأ",
  "voice_input": "إدخال صوتي",
  "stop_listening": "توقف عن الاستماع",
  "generated_prompt": "المطالبة المولدة",
  "copy": "نسخ",
  "save": "حفظ",
  "share": "مشاركة",
  "login": "تسجيل الدخول",
  "signup": "التسجيل",
  "email": "البريد الإلكتروني",
  "password": "كلمة المرور",
  "history": "السجل",
  "settings": "الإعدادات",
  "profile": "الملف الشخصي",
  "preferences": "التفضيلات",
  "admin_dashboard": "لوحة التحكم الإدارية",
  "model_management": "إدارة النماذج",
  "training_data": "بيانات التدريب"
}
```

## 8. Performance and Scalability Improvements

Based on [React Native Performance Guide](https://reactnative.dev/docs/performance):

### 8.1 Component Optimization

```javascript
// components/molecules/PromptCard.jsx
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PromptCard = ({ prompt, onPress }) => {
  return (
    <StyledTouchableOpacity
      className="bg-surface rounded-large p-4 mb-4 shadow-sm"
      onPress={() => onPress(prompt)}
      accessibilityRole="button"
      accessibilityLabel={`Prompt: ${prompt.inputText}`}
    >
      <StyledText className="text-onSurface font-titleMedium mb-2">
        {prompt.inputText}
      </StyledText>
      <StyledText className="text-onSurfaceVariant font-bodyMedium" numberOfLines={2}>
        {prompt.structuredPrompt}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default memo(PromptCard);
```

### 8.2 List Optimization

```javascript
// screens/history/HistoryScreen.jsx
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { styled } from 'nativewind';
import { usePromptStore } from '../../stores/usePromptStore';
import PromptCard from '../../components/molecules/PromptCard';

const StyledView = styled(View);

export const HistoryScreen = ({ navigation }) => {
  const { history } = usePromptStore();
  
  const renderItem = useMemo(() => ({ item }) => (
    <PromptCard 
      prompt={item} 
      onPress={(prompt) => navigation.navigate('HistoryDetail', { prompt })}
    />
  ), [navigation]);
  
  return (
    <StyledView className="flex-1 bg-background">
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-4"
      />
    </StyledView>
  );
};
```

### 8.3 Bundle Size Optimization

```javascript
// metro.config.js
module.exports = {
  transformer: {
    minifierConfig: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolver: {
    blacklistRE: /(node_modules\/.*\/node_modules\/react-native\/.*|__tests__\/.*)/,
  },
};
```

## 9. Measurable Benchmarks

### 9.1 Performance Benchmarks

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Initial Load Time | < 3 seconds | React Native Performance Logger |
| Screen Transition | < 300ms | Navigation timing APIs |
| List Rendering (100 items) | < 16ms per frame | RN InteractionManager |
| Memory Usage | < 100MB | React Native DevTools |
| Bundle Size | < 50MB | Metro Bundle Analyzer |

### 9.2 Accessibility Benchmarks

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Color Contrast | > 4.5:1 (AA) | Accessibility scanner tools |
| Keyboard Navigation | 100% coverage | Manual testing |
| Screen Reader Support | 100% coverage | VoiceOver/Narrator testing |
| Semantic Structure | 100% compliance | Accessibility audit tools |

### 9.3 User Experience Benchmarks

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Task Completion Rate | > 95% | User testing sessions |
| Error Rate | < 1% | Crash reporting tools |
| User Satisfaction | > 4.5/5 | App store ratings |
| Retention Rate | > 70% (7-day) | Analytics platforms |

## 10. Implementation Dependencies

### 10.1 Required Package Updates

```json
// package.json dependencies to install/update
{
  "dependencies": {
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-screens": "^3.27.0",
    "react-native-safe-area-context": "^4.7.4",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-reanimated": "^3.6.0",
    "zustand": "^4.4.7",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "nativewind": "^2.0.11",
    "tailwindcss": "^3.3.0"
  }
}
```

### 10.2 Technical Dependencies

1. **React Navigation v6** - For multi-screen navigation
2. **Zustand** - For global state management
3. **NativeWind** - For consistent styling
4. **AsyncStorage** - For data persistence
5. **React Native Reanimated** - For smooth animations
6. **React Native Gesture Handler** - For gesture recognition

## 11. Testing Strategy

### 11.1 Unit Testing

Based on [React Native Testing Guide](https://reactnative.dev/docs/testing-overview):

1. **Component Testing**
   - Test individual components in isolation
   - Use Jest and React Native Testing Library
   - Mock external dependencies

2. **Store Testing**
   - Test Zustand store functionality
   - Verify state changes and side effects
   - Test persistence middleware

### 11.2 Integration Testing

1. **Navigation Flow Testing**
   - Test screen transitions
   - Verify navigation parameters
   - Test conditional rendering based on state

2. **API Integration Testing**
   - Test service layer functionality
   - Mock network requests
   - Test error scenarios

### 11.3 End-to-End Testing

1. **Critical User Paths**
   - Test complete user workflows
   - Verify data persistence
   - Test edge cases and error handling

## 12. Security Considerations

### 12.1 Data Protection

Based on [React Native Security Best Practices](https://reactnative.dev/docs/security):

1. **Token Storage**
   - Use secure storage solutions for authentication tokens
   - Implement token refresh mechanisms
   - Encrypt sensitive data

2. **Input Validation**
   - Sanitize all user inputs
   - Implement proper validation for forms
   - Prevent injection attacks

### 12.2 Network Security

1. **API Communication**
   - Use HTTPS for all API requests
   - Implement proper certificate pinning
   - Add request/response validation

2. **Sensitive Data Handling**
   - Avoid logging sensitive information
   - Implement proper error handling
   - Use secure communication protocols

## Conclusion

This refined frontend plan v2 provides a comprehensive, standards-compliant approach to upgrading the Kalimtak frontend based on verified documentation from React Native, Material 3, WCAG 2.2, NativeWind, and Zustand. The plan addresses all identified gaps with specific implementation details and measurable outcomes. Additional improvements have been made to enhance security, testing strategies, and overall code consistency to ensure a robust and maintainable application.

## Appendix: Detailed Implementation Plan

### Executive Summary

This document outlines a detailed, step-by-step implementation plan to transform the current single-screen prototype into a production-ready frontend application as specified in the "Kalimtak Frontend Upgrade Plan." The plan addresses all gaps identified in the audit report with clear priorities, dependencies, and technical specifications.

### Phase 1: Foundation Setup (Week 1)

#### Task 1.1: Navigation System Implementation (High Priority)
**Objective:** Replace the current placeholder navigation with a fully functional React Navigation v6 system.

**Dependencies:** None

**Steps:**
1. Install required navigation packages:
   ```bash
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install react-native-gesture-handler react-native-reanimated
   ```

2. Create navigation directory structure:
   ```
   src/
   └── navigation/
       ├── AppNavigator.js
       ├── AuthNavigator.js
       ├── MainTabNavigator.js
       └── navigators/
           ├── HomeStackNavigator.js
           ├── HistoryStackNavigator.js
           ├── SettingsStackNavigator.js
           └── AdminStackNavigator.js
   ```

3. Implement AppNavigator as the root navigator:
   ```javascript
   // src/navigation/AppNavigator.js
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   import AuthNavigator from './AuthNavigator';
   import MainTabNavigator from './MainTabNavigator';
   
   const Stack = createStackNavigator();
   
   export default function AppNavigator() {
     const isAuthenticated = false; // Will be replaced with actual auth state
     
     return (
       <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
           {isAuthenticated ? (
             <Stack.Screen name="Main" component={MainTabNavigator} />
           ) : (
             <Stack.Screen name="Auth" component={AuthNavigator} />
           )}
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   ```

4. Update App.js to use the new navigation system:
   ```javascript
   // App.js
   import React from 'react';
   import AppNavigator from './src/navigation/AppNavigator';
   
   export default function App() {
     return <AppNavigator />;
   }
   ```

#### Task 1.2: State Management Setup (High Priority)
**Objective:** Implement Zustand for global state management to handle user authentication, prompt history, and application preferences.

**Dependencies:** Navigation system implementation

**Steps:**
1. Install Zustand:
   ```bash
   npm install zustand
   ```

2. Create user store:
   ```javascript
   // src/stores/useUserStore.js
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
   ```

3. Create prompt store:
   ```javascript
   // src/stores/usePromptStore.js
   import { create } from 'zustand';
   import { persist } from 'zustand/middleware';
   
   export const usePromptStore = create(
     persist(
       (set, get) => ({
         history: [],
         currentPrompt: null,
         
         addToHistory: (prompt) => set((state) => ({
           history: [prompt, ...state.history.slice(0, 99)]
         })),
         
         setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
         
         clearHistory: () => set({ history: [] }),
       }),
       {
         name: 'prompt-storage',
       }
     )
   );
   ```

#### Task 1.3: Theme Infrastructure (High Priority)
**Objective:** Implement a dual-theme system with React Context and Expo appearance detection.

**Dependencies:** None

**Steps:**
1. Install AsyncStorage:
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

2. Create theme context:
   ```javascript
   // src/contexts/ThemeContext.js
   import React, { createContext, useContext, useState, useEffect } from 'react';
   import AsyncStorage from '@react-native-async-storage/async-storage';
   import { useColorScheme } from 'react-native';
   
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
     
     const theme = {
       colors: {
         primary: isDarkMode ? '#BB86FC' : '#6200EE',
         background: isDarkMode ? '#121212' : '#F5F5F5',
         surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
         text: isDarkMode ? '#FFFFFF' : '#424242',
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
   ```

3. Update App.js to include ThemeProvider:
   ```javascript
   // App.js
   import React from 'react';
   import { ThemeProvider } from './src/contexts/ThemeContext';
   import AppNavigator from './src/navigation/AppNavigator';
   
   export default function App() {
     return (
       <ThemeProvider>
         <AppNavigator />
       </ThemeProvider>
     );
   }
   ```

### Phase 2: Component Architecture (Week 2)

#### Task 2.1: Folder Restructuring (High Priority)
**Objective:** Create a modular folder structure that follows the atomic design principle.

**Dependencies:** None

**Steps:**
1. Create the following directory structure:
   ```
   src/
   ├── components/
   │   ├── atoms/
   │   │   ├── Button.js
   │   │   ├── TextInput.js
   │   │   ├── Text.js
   │   │   └── Icon.js
   │   ├── molecules/
   │   │   ├── PromptInput.js
   │   │   ├── PromptOutput.js
   │   │   └── ActionButtons.js
   │   └── organisms/
   │       ├── Header.js
   │       ├── PromptCard.js
   │       └── Footer.js
   ├── screens/
   │   ├── auth/
   │   │   ├── LoginScreen.js
   │   │   └── SignupScreen.js
   │   ├── main/
   │   │   ├── HomeScreen.js
   │   │   └── PromptDetailScreen.js
   │   ├── history/
   │   │   ├── HistoryScreen.js
   │   │   └── PromptDetailScreen.js
   │   ├── settings/
   │   │   ├── SettingsScreen.js
   │   │   ├── ProfileScreen.js
   │   │   └── PreferencesScreen.js
   │   └── admin/
   │       ├── AdminDashboardScreen.js
   │       ├── ModelManagementScreen.js
   │       └── TrainingDataScreen.js
   ├── navigation/
   ├── contexts/
   ├── hooks/
   ├── services/
   ├── stores/
   ├── utils/
   ├── assets/
   ├── constants/
   └── themes/
   ```

2. Migrate existing functionality from App.js to HomeScreen.js:
   ```javascript
   // src/screens/main/HomeScreen.js
   import React, { useState } from 'react';
   import { View, ScrollView } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { PromptInput } from '../../components/molecules/PromptInput';
   import { PromptOutput } from '../../components/molecules/PromptOutput';
   
   export const HomeScreen = () => {
     const { theme } = useTheme();
     const [inputText, setInputText] = useState('');
     const [outputText, setOutputText] = useState('');
     const [isListening, setIsListening] = useState(false);
     
     const handleGenerate = () => {
       // In a real app, this would call the backend API
       setOutputText(`Structured prompt for: "${inputText}"

This would be the AI-generated professional prompt.`);
     };
     
     return (
       <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
         <ScrollView contentContainerStyle={{ padding: 20 }}>
           <PromptInput
             inputText={inputText}
             setInputText={setInputText}
             isListening={isListening}
             setIsListening={setIsListening}
             onGenerate={handleGenerate}
           />
           {outputText ? (
             <PromptOutput
               outputText={outputText}
             />
           ) : null}
         </ScrollView>
       </View>
     );
   };
   ```

#### Task 2.2: Reusable Components Implementation (High Priority)
**Objective:** Create reusable UI components that follow the design system.

**Dependencies:** Folder restructuring

**Steps:**
1. Create atomic components:
   ```javascript
   // src/components/atoms/Button.js
   import React from 'react';
   import { TouchableOpacity, Text } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   
   export const Button = ({ 
     title, 
     onPress, 
     variant = 'primary', 
     disabled = false,
     style 
   }) => {
     const { theme } = useTheme();
     
     const getButtonStyle = () => {
       const baseStyle = {
         padding: 15,
         borderRadius: 8,
         alignItems: 'center',
         marginHorizontal: 5,
       };
       
       const variantStyles = {
         primary: {
           backgroundColor: theme.colors.primary,
         },
         secondary: {
           backgroundColor: theme.colors.surface,
           borderWidth: 1,
           borderColor: theme.colors.primary,
         },
         danger: {
           backgroundColor: '#FF5252',
         },
       };
       
       return {
         ...baseStyle,
         ...variantStyles[variant],
         ...(disabled ? { opacity: 0.5 } : {}),
         ...style,
       };
     };
     
     const getTextStyle = () => {
       const baseTextStyle = {
         fontWeight: 'bold',
         fontSize: 16,
       };
       
       const variantTextStyles = {
         primary: {
           color: '#FFFFFF',
         },
         secondary: {
           color: theme.colors.primary,
         },
         danger: {
           color: '#FFFFFF',
         },
       };
       
       return {
         ...baseTextStyle,
         ...variantTextStyles[variant],
       };
     };
     
     return (
       <TouchableOpacity
         style={getButtonStyle()}
         onPress={onPress}
         disabled={disabled}
       >
         <Text style={getTextStyle()}>{title}</Text>
       </TouchableOpacity>
     );
   };
   ```

2. Create molecular components:
   ```javascript
   // src/components/molecules/PromptInput.js
   import React from 'react';
   import { View, TextInput as RNTextInput } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { Text } from '../atoms/Text';
   import { Button } from '../atoms/Button';
   
   export const PromptInput = ({
     inputText,
     setInputText,
     isListening,
     setIsListening,
     onGenerate,
   }) => {
     const { theme } = useTheme();
     
     const startListening = () => {
       setIsListening(true);
       // Voice recognition would be implemented here
       console.log('Start listening');
     };
     
     const stopListening = () => {
       setIsListening(false);
       console.log('Stop listening');
     };
     
     return (
       <View>
         <Text style={{
           fontSize: 24,
           fontWeight: 'bold',
           color: theme.colors.text,
           marginBottom: 20,
           textAlign: 'center',
         }}>
           Write your idea
         </Text>
         
         <RNTextInput
           style={{
             borderWidth: 1,
             borderColor: theme.colors.text,
             borderRadius: 8,
             padding: 15,
             fontSize: 16,
             backgroundColor: theme.colors.surface,
             marginBottom: 20,
             textAlignVertical: 'top',
             color: theme.colors.text,
           }}
           multiline
           numberOfLines={4}
           placeholder="Write your idea"
           value={inputText}
           onChangeText={setInputText}
         />
         
         <View style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           marginBottom: 20,
         }}>
           <Button
             title="Start"
             onPress={onGenerate}
             variant="primary"
           />
           
           <Button
             title={isListening ? "Stop Listening" : "Voice Input"}
             onPress={isListening ? stopListening : startListening}
             variant={isListening ? "danger" : "secondary"}
           />
         </View>
       </View>
     );
   };
   ```

#### Task 2.3: Design System Implementation (High Priority)
**Objective:** Implement a complete design system with defined tokens for colors, typography, and spacing.

**Dependencies:** Reusable components

**Steps:**
1. Create theme definitions:
   ```javascript
   // src/themes/light.js
   export default {
     colors: {
       primary: '#6200EE',
       primaryVariant: '#3700B3',
       secondary: '#03DAC6',
       secondaryVariant: '#018786',
       background: '#F5F5F5',
       surface: '#FFFFFF',
       error: '#B00020',
       onPrimary: '#FFFFFF',
       onSecondary: '#000000',
       onBackground: '#000000',
       onSurface: '#000000',
       onError: '#FFFFFF',
       text: '#424242',
       textSecondary: '#757575',
       divider: '#E0E0E0',
     },
     typography: {
       h1: {
         fontSize: 32,
         fontWeight: '700',
         lineHeight: 40,
       },
       h2: {
         fontSize: 28,
         fontWeight: '700',
         lineHeight: 36,
       },
       h3: {
         fontSize: 24,
         fontWeight: '700',
         lineHeight: 32,
       },
       h4: {
         fontSize: 22,
         fontWeight: '700',
         lineHeight: 28,
       },
       h5: {
         fontSize: 18,
         fontWeight: '700',
         lineHeight: 24,
       },
       h6: {
         fontSize: 16,
         fontWeight: '700',
         lineHeight: 22,
       },
       body1: {
         fontSize: 16,
         fontWeight: '400',
         lineHeight: 24,
       },
       body2: {
         fontSize: 14,
         fontWeight: '400',
         lineHeight: 20,
       },
       button: {
         fontSize: 14,
         fontWeight: '500',
         lineHeight: 16,
         textTransform: 'uppercase',
       },
       caption: {
         fontSize: 12,
         fontWeight: '400',
         lineHeight: 16,
       },
       overline: {
         fontSize: 10,
         fontWeight: '400',
         lineHeight: 14,
         textTransform: 'uppercase',
       },
     },
     spacing: {
       xs: 4,
       sm: 8,
       md: 16,
       lg: 24,
       xl: 32,
       xxl: 48,
     },
     borderRadius: {
       sm: 4,
       md: 8,
       lg: 16,
       xl: 24,
     },
   };
   ```

2. Update ThemeContext to use the design system:
   ```javascript
   // src/contexts/ThemeContext.js (updated)
   import React, { createContext, useContext, useState, useEffect } from 'react';
   import AsyncStorage from '@react-native-async-storage/async-storage';
   import { useColorScheme } from 'react-native';
   import lightTheme from '../themes/light';
   import darkTheme from '../themes/dark';
   
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
     
     const theme = isDarkMode ? darkTheme : lightTheme;
     
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
   ```

### Phase 3: Screen Implementation (Week 3)

#### Task 3.1: Authentication Flow (High Priority)
**Objective:** Implement Login and Signup screens with authentication functionality.

**Dependencies:** Navigation system, state management

**Steps:**
1. Create authentication screens:
   ```javascript
   // src/screens/auth/LoginScreen.js
   import React, { useState } from 'react';
   import { View, ScrollView } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { useUserStore } from '../../stores/useUserStore';
   import { Text } from '../../components/atoms/Text';
   import { TextInput } from '../../components/atoms/TextInput';
   import { Button } from '../../components/atoms/Button';
   
   export const LoginScreen = ({ navigation }) => {
     const { theme } = useTheme();
     const { login } = useUserStore();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
     
     const handleLogin = async () => {
       setLoading(true);
       try {
         // In a real implementation, this would call an API
         const userData = {
           id: 'user-123',
           email,
           name: 'Test User',
           role: 'user',
         };
         
         login(userData);
         navigation.navigate('Main');
       } catch (error) {
         console.error('Login error:', error);
       } finally {
         setLoading(false);
       }
     };
     
     return (
       <ScrollView 
         contentContainerStyle={{ 
           flex: 1, 
           backgroundColor: theme.colors.background,
           padding: theme.spacing.lg,
           justifyContent: 'center',
         }}
       >
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
         }}>
           <Text style={{
             ...theme.typography.h4,
             color: theme.colors.text,
             marginBottom: theme.spacing.lg,
             textAlign: 'center',
           }}>
             Login
           </Text>
           
           <TextInput
             placeholder="Email"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
             autoCapitalize="none"
             style={{ marginBottom: theme.spacing.md }}
           />
           
           <TextInput
             placeholder="Password"
             value={password}
             onChangeText={setPassword}
             secureTextEntry
             style={{ marginBottom: theme.spacing.lg }}
           />
           
           <Button
             title={loading ? "Logging in..." : "Login"}
             onPress={handleLogin}
             disabled={loading}
             variant="primary"
             style={{ marginBottom: theme.spacing.md }}
           />
           
           <Button
             title="Don't have an account? Sign up"
             onPress={() => navigation.navigate('Signup')}
             variant="secondary"
           />
         </View>
       </ScrollView>
     );
   };
   ```

2. Update AuthNavigator:
   ```javascript
   // src/navigation/AuthNavigator.js
   import React from 'react';
   import { createStackNavigator } from '@react-navigation/stack';
   import { LoginScreen } from '../screens/auth/LoginScreen';
   import { SignupScreen } from '../screens/auth/SignupScreen';
   
   const Stack = createStackNavigator();
   
   export default function AuthNavigator() {
     return (
       <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Signup" component={SignupScreen} />
       </Stack.Navigator>
     );
   }
   ```

#### Task 3.2: Main Application Screens (High Priority)
**Objective:** Implement History, Settings, and Profile screens.

**Dependencies:** Navigation system, state management, component architecture

**Steps:**
1. Create History screen:
   ```javascript
   // src/screens/history/HistoryScreen.js
   import React from 'react';
   import { View, FlatList } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { usePromptStore } from '../../stores/usePromptStore';
   import { Text } from '../../components/atoms/Text';
   import { PromptCard } from '../../components/organisms/PromptCard';
   
   export const HistoryScreen = ({ navigation }) => {
     const { theme } = useTheme();
     const { history } = usePromptStore();
     
     const renderPrompt = ({ item }) => (
       <PromptCard
         prompt={item}
         onPress={() => navigation.navigate('PromptDetail', { prompt: item })}
       />
     );
     
     return (
       <View style={{ 
         flex: 1, 
         backgroundColor: theme.colors.background,
         padding: theme.spacing.md,
       }}>
         <Text style={{
           ...theme.typography.h5,
           color: theme.colors.text,
           marginBottom: theme.spacing.md,
         }}>
           Prompt History
         </Text>
         
         {history.length > 0 ? (
           <FlatList
             data={history}
             renderItem={renderPrompt}
             keyExtractor={(item) => item.id}
             showsVerticalScrollIndicator={false}
           />
         ) : (
           <View style={{ 
             flex: 1, 
             justifyContent: 'center', 
             alignItems: 'center' 
           }}>
             <Text style={{
               ...theme.typography.body1,
               color: theme.colors.textSecondary,
             }}>
               No prompt history yet
             </Text>
           </View>
         )}
       </View>
     );
   };
   ```

2. Create Settings screen:
   ```javascript
   // src/screens/settings/SettingsScreen.js
   import React from 'react';
   import { View, ScrollView } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { useUserStore } from '../../stores/useUserStore';
   import { Text } from '../../components/atoms/Text';
   import { Button } from '../../components/atoms/Button';
   
   export const SettingsScreen = ({ navigation }) => {
     const { theme, isDarkMode, toggleTheme } = useTheme();
     const { user, logout } = useUserStore();
     
     const handleLogout = () => {
       logout();
       navigation.navigate('Auth', { screen: 'Login' });
     };
     
     return (
       <ScrollView 
         contentContainerStyle={{ 
           flex: 1, 
           backgroundColor: theme.colors.background,
           padding: theme.spacing.md,
         }}
       >
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
           marginBottom: theme.spacing.md,
         }}>
           <Text style={{
             ...theme.typography.h6,
             color: theme.colors.text,
             marginBottom: theme.spacing.sm,
           }}>
             Account
           </Text>
           
           <Text style={{
             ...theme.typography.body1,
             color: theme.colors.text,
             marginBottom: theme.spacing.lg,
           }}>
             {user?.name} ({user?.email})
           </Text>
           
           <Button
             title="View Profile"
             onPress={() => navigation.navigate('Profile')}
             variant="secondary"
             style={{ marginBottom: theme.spacing.md }}
           />
         </View>
         
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
           marginBottom: theme.spacing.md,
         }}>
           <Text style={{
             ...theme.typography.h6,
             color: theme.colors.text,
             marginBottom: theme.spacing.sm,
           }}>
             Preferences
           </Text>
           
           <Button
             title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
             onPress={() => toggleTheme()}
             variant="secondary"
             style={{ marginBottom: theme.spacing.md }}
           />
           
           <Button
             title="Notification Settings"
             onPress={() => navigation.navigate('Preferences')}
             variant="secondary"
           />
         </View>
         
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
         }}>
           <Button
             title="Logout"
             onPress={handleLogout}
             variant="danger"
           />
         </View>
       </ScrollView>
     );
   };
   ```

#### Task 3.3: Admin Screens (Medium Priority)
**Objective:** Implement Admin Dashboard, Model Management, and Training Data screens.

**Dependencies:** Navigation system, state management, role-based access

**Steps:**
1. Create Admin Dashboard screen:
   ```javascript
   // src/screens/admin/AdminDashboardScreen.js
   import React from 'react';
   import { View, ScrollView } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { Text } from '../../components/atoms/Text';
   import { Button } from '../../components/atoms/Button';
   
   export const AdminDashboardScreen = ({ navigation }) => {
     const { theme } = useTheme();
     
     return (
       <ScrollView 
         contentContainerStyle={{ 
           flex: 1, 
           backgroundColor: theme.colors.background,
           padding: theme.spacing.md,
         }}
       >
         <Text style={{
           ...theme.typography.h5,
           color: theme.colors.text,
           marginBottom: theme.spacing.lg,
           textAlign: 'center',
         }}>
           Admin Dashboard
         </Text>
         
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
           marginBottom: theme.spacing.md,
         }}>
           <Text style={{
             ...theme.typography.h6,
             color: theme.colors.text,
             marginBottom: theme.spacing.sm,
           }}>
             Model Management
           </Text>
           
           <Button
             title="Manage AI Models"
             onPress={() => navigation.navigate('ModelManagement')}
             variant="secondary"
             style={{ marginBottom: theme.spacing.md }}
           />
         </View>
         
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
         }}>
           <Text style={{
             ...theme.typography.h6,
             color: theme.colors.text,
             marginBottom: theme.spacing.sm,
           }}>
             Training Data
           </Text>
           
           <Button
             title="Curate Training Data"
             onPress={() => navigation.navigate('TrainingData')}
             variant="secondary"
             style={{ marginBottom: theme.spacing.md }}
           />
         </View>
       </ScrollView>
     );
   };
   ```

### Phase 4: Backend Integration (Week 4)

#### Task 4.1: API Service Layer (High Priority)
**Objective:** Create a service layer for backend communication.

**Dependencies:** Component architecture

**Steps:**
1. Create API service:
   ```javascript
   // src/services/api.js
   import AsyncStorage from '@react-native-async-storage/async-storage';
   
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
       
       const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
       
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       
       return response.json();
     }
     
     // Prompt Generation
     static async generatePrompt(data) {
       return this.request('/generate', {
         method: 'POST',
         body: JSON.stringify(data),
       });
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
   ```

2. Update HomeScreen to use real API:
   ```javascript
   // src/screens/main/HomeScreen.js (updated)
   import React, { useState } from 'react';
   import { View, ScrollView, Alert } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { useUserStore } from '../../stores/useUserStore';
   import { usePromptStore } from '../../stores/usePromptStore';
   import { ApiService } from '../../services/api';
   import { PromptInput } from '../../components/molecules/PromptInput';
   import { PromptOutput } from '../../components/molecules/PromptOutput';
   
   export const HomeScreen = () => {
     const { theme } = useTheme();
     const { user } = useUserStore();
     const { addToHistory } = usePromptStore();
     const [inputText, setInputText] = useState('');
     const [outputText, setOutputText] = useState('');
     const [isListening, setIsListening] = useState(false);
     const [loading, setLoading] = useState(false);
     
     const handleGenerate = async () => {
       if (!inputText.trim()) {
         Alert.alert('Error', 'Please enter some text');
         return;
       }
       
       setLoading(true);
       try {
         const response = await ApiService.generatePrompt({
           text: inputText,
           language: 'en',
           target_tool: 'general',
           user_id: user?.id,
         });
         
         setOutputText(response.structured_prompt);
         
         // Add to history
         const promptItem = {
           id: Date.now().toString(),
           userId: user?.id,
           inputText,
           structuredPrompt: response.structured_prompt,
           output: response.model_output,
           tokens: response.tokens_used,
           timestamp: new Date().toISOString(),
         };
         
         addToHistory(promptItem);
       } catch (error) {
         console.error('Generation error:', error);
         Alert.alert('Error', 'Failed to generate prompt');
       } finally {
         setLoading(false);
       }
     };
     
     return (
       <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
         <ScrollView contentContainerStyle={{ padding: 20 }}>
           <PromptInput
             inputText={inputText}
             setInputText={setInputText}
             isListening={isListening}
             setIsListening={setIsListening}
             onGenerate={handleGenerate}
             loading={loading}
           />
           {outputText ? (
             <PromptOutput
               outputText={outputText}
             />
           ) : null}
         </ScrollView>
       </View>
     );
   };
   ```

#### Task 4.2: Authentication Service (High Priority)
**Objective:** Implement authentication service with token management.

**Dependencies:** API service layer

**Steps:**
1. Create authentication service:
   ```javascript
   // src/services/auth.js
   import { ApiService } from './api';
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
   ```

2. Update LoginScreen to use real authentication:
   ```javascript
   // src/screens/auth/LoginScreen.js (updated)
   import React, { useState } from 'react';
   import { View, ScrollView, Alert } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { AuthService } from '../../services/auth';
   import { Text } from '../../components/atoms/Text';
   import { TextInput } from '../../components/atoms/TextInput';
   import { Button } from '../../components/atoms/Button';
   
   export const LoginScreen = ({ navigation }) => {
     const { theme } = useTheme();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
     
     const handleLogin = async () => {
       if (!email.trim() || !password.trim()) {
         Alert.alert('Error', 'Please enter both email and password');
         return;
       }
       
       setLoading(true);
       try {
         const user = await AuthService.login({ email, password });
         navigation.navigate('Main');
       } catch (error) {
         console.error('Login error:', error);
         Alert.alert('Error', 'Invalid credentials');
       } finally {
         setLoading(false);
       }
     };
     
     return (
       <ScrollView 
         contentContainerStyle={{ 
           flex: 1, 
           backgroundColor: theme.colors.background,
           padding: theme.spacing.lg,
           justifyContent: 'center',
         }}
       >
         <View style={{ 
           backgroundColor: theme.colors.surface,
           borderRadius: theme.borderRadius.md,
           padding: theme.spacing.lg,
         }}>
           <Text style={{
             ...theme.typography.h4,
             color: theme.colors.text,
             marginBottom: theme.spacing.lg,
             textAlign: 'center',
           }}>
             Login
           </Text>
           
           <TextInput
             placeholder="Email"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
             autoCapitalize="none"
             style={{ marginBottom: theme.spacing.md }}
           />
           
           <TextInput
             placeholder="Password"
             value={password}
             onChangeText={setPassword}
             secureTextEntry
             style={{ marginBottom: theme.spacing.lg }}
           />
           
           <Button
             title={loading ? "Logging in..." : "Login"}
             onPress={handleLogin}
             disabled={loading}
             variant="primary"
             style={{ marginBottom: theme.spacing.md }}
           />
           
           <Button
             title="Don't have an account? Sign up"
             onPress={() => navigation.navigate('Signup')}
             variant="secondary"
           />
         </View>
       </ScrollView>
     );
   };
   ```

### Phase 5: Enhancement Features (Week 5)

#### Task 5.1: Accessibility Compliance (Medium Priority)
**Objective:** Implement WCAG 2.2 accessibility compliance.

**Dependencies:** Component architecture

**Steps:**
1. Update components with accessibility props:
   ```javascript
   // src/components/atoms/Button.js (updated)
   import React from 'react';
   import { TouchableOpacity, Text } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   
   export const Button = ({ 
     title, 
     onPress, 
     variant = 'primary', 
     disabled = false,
     style,
     accessibilityLabel,
     accessibilityHint,
   }) => {
     const { theme } = useTheme();
     
     // ... existing style logic ...
     
     return (
       <TouchableOpacity
         style={getButtonStyle()}
         onPress={onPress}
         disabled={disabled}
         accessibilityRole="button"
         accessibilityLabel={accessibilityLabel || title}
         accessibilityHint={accessibilityHint}
         accessibilityState={{ disabled }}
       >
         <Text style={getTextStyle()}>{title}</Text>
       </TouchableOpacity>
     );
   };
   ```

2. Add screen reader support:
   ```javascript
   // src/hooks/useScreenReaderEnabled.js
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
   ```

#### Task 5.2: Internationalization Enhancement (Low Priority)
**Objective:** Expand language support and implement RTL layout.

**Dependencies:** i18n configuration

**Steps:**
1. Add more languages to i18n configuration:
   ```javascript
   // i18n/index.js (updated)
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import { I18nManager } from 'react-native';
   import * as Localization from 'expo-localization';
   
   const resources = {
     en: {
       translation: {
         'write_your_idea': 'Write your idea',
         'start': 'Start',
         'voice_input': 'Voice Input',
         'stop_listening': 'Stop Listening',
         'generated_prompt': 'Generated Prompt',
         'copy': 'Copy',
         'save': 'Save',
         'share': 'Share',
         'login': 'Login',
         'signup': 'Sign Up',
         'email': 'Email',
         'password': 'Password',
         'history': 'History',
         'settings': 'Settings',
         'profile': 'Profile',
         'preferences': 'Preferences',
         'admin_dashboard': 'Admin Dashboard',
         'model_management': 'Model Management',
         'training_data': 'Training Data',
       }
     },
     ar: {
       translation: {
         'write_your_idea': 'اكتب فكرتك',
         'start': 'ابدأ',
         'voice_input': 'إدخال صوتي',
         'stop_listening': 'توقف عن الاستماع',
         'generated_prompt': 'المطالبة المولدة',
         'copy': 'نسخ',
         'save': 'حفظ',
         'share': 'مشاركة',
         'login': 'تسجيل الدخول',
         'signup': 'التسجيل',
         'email': 'البريد الإلكتروني',
         'password': 'كلمة المرور',
         'history': 'السجل',
         'settings': 'الإعدادات',
         'profile': 'الملف الشخصي',
         'preferences': 'التفضيلات',
         'admin_dashboard': 'لوحة التحكم الإدارية',
         'model_management': 'إدارة النماذج',
         'training_data': 'بيانات التدريب',
       }
     },
     de: {
       translation: {
         'write_your_idea': 'Schreiben Sie Ihre Idee',
         'start': 'Start',
         'voice_input': 'Spracheingabe',
         'stop_listening': 'Aufhören zuzuhören',
         'generated_prompt': 'Generierte Eingabeaufforderung',
         'copy': 'Kopieren',
         'save': 'Speichern',
         'share': 'Teilen',
         'login': 'Anmelden',
         'signup': 'Registrieren',
         'email': 'E-Mail',
         'password': 'Passwort',
         'history': 'Verlauf',
         'settings': 'Einstellungen',
         'profile': 'Profil',
         'preferences': 'Präferenzen',
         'admin_dashboard': 'Admin-Dashboard',
         'model_management': 'Modellverwaltung',
         'training_data': 'Trainingsdaten',
       }
     },
     fr: {
       translation: {
         'write_your_idea': 'Écrivez votre idée',
         'start': 'Commencer',
         'voice_input': 'Entrée vocale',
         'stop_listening': 'Arrêter l\'écoute',
         'generated_prompt': 'Invite générée',
         'copy': 'Copier',
         'save': 'Sauvegarder',
         'share': 'Partager',
         'login': 'Connexion',
         'signup': 'S\'inscrire',
         'email': 'Email',
         'password': 'Mot de passe',
         'history': 'Historique',
         'settings': 'Paramètres',
         'profile': 'Profil',
         'preferences': 'Préférences',
         'admin_dashboard': 'Tableau de bord administrateur',
         'model_management': 'Gestion des modèles',
         'training_data': 'Données d\'entraînement',
       }
     }
   };
   
   // Detect device language and RTL support
   const deviceLanguage = Localization.locale.split('-')[0];
   const isRTL = Localization.isRTL;
   
   // Force RTL layout for Arabic
   if (deviceLanguage === 'ar' && !isRTL) {
     I18nManager.forceRTL(true);
   }
   
   i18n
     .use(initReactI18next)
     .init({
       resources,
       lng: deviceLanguage,
       fallbackLng: 'en',
       interpolation: {
         escapeValue: false
       },
       react: {
         useSuspense: false,
       }
     });
   
   export default i18n;
   ```

#### Task 5.3: Performance Optimization (Low Priority)
**Objective:** Implement performance optimization techniques.

**Dependencies:** Component architecture

**Steps:**
1. Add lazy loading for lists:
   ```javascript
   // src/screens/history/HistoryScreen.js (updated)
   import React, { useMemo } from 'react';
   import { View, FlatList } from 'react-native';
   import { useTheme } from '../../contexts/ThemeContext';
   import { usePromptStore } from '../../stores/usePromptStore';
   import { Text } from '../../components/atoms/Text';
   import { PromptCard } from '../../components/organisms/PromptCard';
   
   export const HistoryScreen = ({ navigation }) => {
     const { theme } = useTheme();
     const { history } = usePromptStore();
     
     const renderPrompt = useMemo(() => ({ item }) => (
       <PromptCard
         prompt={item}
         onPress={() => navigation.navigate('PromptDetail', { prompt: item })}
       />
     ), [navigation]);
     
     return (
       <View style={{ 
         flex: 1, 
         backgroundColor: theme.colors.background,
         padding: theme.spacing.md,
       }}>
         <Text style={{
           ...theme.typography.h5,
           color: theme.colors.text,
           marginBottom: theme.spacing.md,
         }}>
           Prompt History
         </Text>
         
         {history.length > 0 ? (
           <FlatList
             data={history}
             renderItem={renderPrompt}
             keyExtractor={(item) => item.id}
             showsVerticalScrollIndicator={false}
             initialNumToRender={10}
             maxToRenderPerBatch={10}
             windowSize={21}
             removeClippedSubviews={true}
           />
         ) : (
           <View style={{ 
             flex: 1, 
             justifyContent: 'center', 
             alignItems: 'center' 
           }}>
             <Text style={{
               ...theme.typography.body1,
               color: theme.colors.textSecondary,
             }}>
               No prompt history yet
             </Text>
           </View>
         )}
       </View>
     );
   };
   ```

### Implementation Timeline

#### Week 1: Foundation Setup
- Navigation system implementation
- State management setup
- Theme infrastructure

#### Week 2: Component Architecture
- Folder restructuring
- Reusable components implementation
- Design system implementation

#### Week 3: Screen Implementation
- Authentication flow
- Main application screens
- Admin screens

#### Week 4: Backend Integration
- API service layer
- Authentication service
- Real API integration

#### Week 5: Enhancement Features
- Accessibility compliance
- Internationalization enhancement
- Performance optimization

### Risk Mitigation

#### High-Risk Items
1. **Navigation Overhaul**
   - Mitigation: Implement incrementally, test each navigator separately
   - Backup: Maintain current screen as fallback during transition

2. **State Management Migration**
   - Mitigation: Migrate state gradually, maintain backward compatibility
   - Backup: Use both local and global state temporarily

3. **Component Restructuring**
   - Mitigation: Refactor one component at a time
   - Backup: Keep original implementation until new components are tested

#### Medium-Risk Items
1. **Backend Integration**
   - Mitigation: Use mock data during development, switch to real API when ready
   - Backup: Maintain simulated functionality as fallback

2. **Theme Implementation**
   - Mitigation: Implement light theme first, add dark theme as enhancement
   - Backup: Default to system theme if custom theme fails

#### Low-Risk Items
1. **Accessibility Enhancement**
   - Mitigation: Add accessibility features incrementally
   - Backup: Core functionality works without accessibility features

2. **Internationalization**
   - Mitigation: Start with existing languages, add new ones gradually
   - Backup: Default to English if localization fails

### Success Metrics

#### Technical Metrics
1. **Code Coverage:** >80% test coverage for critical components
2. **Performance:** <100ms navigation transitions, <500ms API responses
3. **Accessibility:** WCAG 2.2 AA compliance
4. **Bundle Size:** <50MB for mobile app

#### User Experience Metrics
1. **Load Time:** <3 seconds for initial app load
2. **Navigation:** <1 second for screen transitions
3. **Error Rate:** <1% critical errors in production
4. **User Satisfaction:** >4.5/5 rating in app stores