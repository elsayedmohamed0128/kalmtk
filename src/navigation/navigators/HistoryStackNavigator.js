import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { HistoryScreen } from '../../screens/history/HistoryScreen';
import { HistoryDetailScreen } from '../../screens/history/HistoryDetailScreen';

const Stack = createStackNavigator();

export const HistoryStackNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: t('navigation.history') }}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
        options={{ title: t('history.detail.title') }}
      />
    </Stack.Navigator>
  );
};