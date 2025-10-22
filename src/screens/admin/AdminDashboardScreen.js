import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { ApiService } from '../../services/api'; // Import ApiService instead of { api }
import { useTheme } from '../../hooks/useTheme'; // Import useTheme

export const AdminDashboardScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Get theme
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrompts: 0,
    activeModels: 0,
    systemHealth: 'good',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    loadDashboardStats();
  }, []);
  
  const loadDashboardStats = async () => {
    setIsLoading(true);
    try {
      // Since getAdminStats doesn't exist, we'll use a mock implementation for now
      // In a real implementation, you would need to add this method to ApiService
      const statsData = {
        totalUsers: 42,
        totalPrompts: 128,
        activeModels: 3,
        systemHealth: 'good',
      };
      setStats(statsData);
    } catch (error) {
      Alert.alert(t('error'), t('admin.dashboard.loadFailed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleManageUsers = () => {
    // navigation.navigate('UserManagement');
  };
  
  const handleManageModels = () => {
    // navigation.navigate('ModelManagement');
  };
  
  const handleManageTrainingData = () => {
    // navigation.navigate('TrainingData');
  };
  
  const handleViewLogs = () => {
    // navigation.navigate('SystemLogs');
  };
  
  const getHealthColor = (health) => {
    switch (health) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-onSurfaceVariant';
    }
  };
  
  return (
    <MainLayout 
      title={t('admin.dashboard.title')}
      showBackButton={false}
    >
      <ScrollView>
        <View style={{ padding: 16 }}>
          {/* Stats Overview */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
              {t('admin.dashboard.overview')}
            </Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <View style={{ 
                backgroundColor: theme.colors.elevated, 
                borderRadius: 8, 
                padding: 12,
                flex: 1,
                marginRight: 8
              }}>
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 24, 
                  fontWeight: 'bold',
                  color: theme.colors.textPrimary
                }}>
                  {stats.totalUsers}
                </Text>
                <Text style={{ 
                  textAlign: 'center', 
                  marginTop: 4,
                  color: theme.colors.textPrimary
                }}>
                  {t('admin.dashboard.users')}
                </Text>
              </View>
              
              <View style={{ 
                backgroundColor: theme.colors.elevated, 
                borderRadius: 8, 
                padding: 12,
                flex: 1,
                marginLeft: 8
              }}>
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 24, 
                  fontWeight: 'bold',
                  color: theme.colors.textPrimary
                }}>
                  {stats.totalPrompts}
                </Text>
                <Text style={{ 
                  textAlign: 'center', 
                  marginTop: 4,
                  color: theme.colors.textPrimary
                }}>
                  {t('admin.dashboard.prompts')}
                </Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ 
                backgroundColor: theme.colors.elevated, 
                borderRadius: 8, 
                padding: 12,
                flex: 1,
                marginRight: 8
              }}>
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 24, 
                  fontWeight: 'bold',
                  color: theme.colors.textPrimary
                }}>
                  {stats.activeModels}
                </Text>
                <Text style={{ 
                  textAlign: 'center', 
                  marginTop: 4,
                  color: theme.colors.textPrimary
                }}>
                  {t('admin.dashboard.models')}
                </Text>
              </View>
              
              <View style={{ 
                backgroundColor: theme.colors.elevated, 
                borderRadius: 8, 
                padding: 12,
                flex: 1,
                marginLeft: 8
              }}>
                <Text style={{ 
                  textAlign: 'center', 
                  fontSize: 24, 
                  fontWeight: 'bold',
                  color: theme.colors.textPrimary
                }}>
                  {t(`admin.dashboard.health.${stats.systemHealth}`)}
                </Text>
                <Text style={{ 
                  textAlign: 'center', 
                  marginTop: 4,
                  color: theme.colors.textPrimary
                }}>
                  {t('admin.dashboard.health.title')}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Management Sections */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
              {t('admin.dashboard.management')}
            </Text>
            
            <Button
              title={t('admin.dashboard.manageUsers')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={handleManageUsers}
            />
            
            <Button
              title={t('admin.dashboard.manageModels')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={handleManageModels}
            />
            
            <Button
              title={t('admin.dashboard.manageTrainingData')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={handleManageTrainingData}
            />
            
            <Button
              title={t('admin.dashboard.viewLogs')}
              variant="outlined"
              onPress={handleViewLogs}
            />
          </View>
          
          {/* System Actions */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
              {t('admin.dashboard.actions')}
            </Text>
            
            <Button
              title={t('admin.dashboard.backup')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={() => {}}
            />
            
            <Button
              title={t('admin.dashboard.maintenance')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={() => {}}
            />
            
            <Button
              title={t('admin.dashboard.restartServices')}
              variant="danger"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};