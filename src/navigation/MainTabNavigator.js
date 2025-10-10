import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { useWindowSize } from '../hooks/useWindowSize';
import { Icon } from '../components/atoms/Icon';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import { HistoryScreen } from '../screens/history/HistoryScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

// Import stack navigators
import { HomeStackNavigator } from './navigators/HomeStackNavigator';
import { HistoryStackNavigator } from './navigators/HistoryStackNavigator';
import { SettingsStackNavigator } from './navigators/SettingsStackNavigator';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const window = useWindowSize();
  const isDesktop = window.width >= 768;
  
  const iconMap = {
    home: 'home',
    history: 'history',
    settings: 'settings',
  };

  const tabBarIcon = (key) => ({ color, size }) => (
    <Icon name={iconMap[key] || 'help'} color={color} size={size} />
  );
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          display: isDesktop ? 'none' : 'flex',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: t('navigation.home'),
          tabBarIcon: tabBarIcon('home'),
        }}
      />
      <Tab.Screen
        name="HistoryStack"
        component={HistoryStackNavigator}
        options={{
          title: t('navigation.history'),
          tabBarIcon: tabBarIcon('history'),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{
          title: t('navigation.settings'),
          tabBarIcon: tabBarIcon('settings'),
        }}
      />
    </Tab.Navigator>
  );
};