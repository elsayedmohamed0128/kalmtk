import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { SettingsScreen } from '../../screens/settings/SettingsScreen';
import { ProfileScreen } from '../../screens/settings/ProfileScreen';
import { PreferencesScreen } from '../../screens/settings/PreferencesScreen';

const Stack = createStackNavigator();

export const SettingsStackNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('navigation.settings') }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('settings.profile.title') }}
      />
      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ title: t('settings.preferences.title') }}
      />
    </Stack.Navigator>
  );
};