import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { AdminDashboardScreen } from '../../screens/admin/AdminDashboardScreen';
import { ModelManagementScreen } from '../../screens/admin/ModelManagementScreen';
import { TrainingDataScreen } from '../../screens/admin/TrainingDataScreen';

const Stack = createStackNavigator();

export const AdminStackNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ title: t('admin.dashboard.title') }}
      />
      <Stack.Screen
        name="ModelManagement"
        component={ModelManagementScreen}
        options={{ title: t('admin.models.title') }}
      />
      <Stack.Screen
        name="TrainingData"
        component={TrainingDataScreen}
        options={{ title: t('admin.trainingData.title') }}
      />
    </Stack.Navigator>
  );
};