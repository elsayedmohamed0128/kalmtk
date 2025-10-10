import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserStore } from '../stores/useUserStore';
import { useTheme } from '../hooks/useTheme';

// Import navigators
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { AdminStackNavigator } from './navigators/AdminStackNavigator';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { isAuthenticated, role } = useUserStore();
  const { theme, isDark } = useTheme();

  // Create a navigation theme based on our app theme
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      ...theme.colors,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '800',
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          role === 'admin' ? (
            <Stack.Screen name="Admin" component={AdminStackNavigator} />
          ) : (
            <Stack.Screen name="Main" component={MainTabNavigator} />
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};