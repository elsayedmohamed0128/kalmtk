import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../../screens/main/HomeScreen';
// Additional screens can be imported here as needed

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('navigation.home') }}
      />
      {/* Additional screens can be added here */}
    </Stack.Navigator>
  );
};