import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { useUserStore } from '../../stores/useUserStore';
import { ApiService } from '../../services/api'; // Import ApiService instead of { api }
import { useTheme } from '../../hooks/useTheme'; // Import useTheme

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Get theme
  const { user, updateUser } = useUserStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Since updateProfile doesn't exist in ApiService, we'll use a mock implementation for now
      // In a real implementation, you would need to add this method to ApiService
      const updatedUser = {
        ...user,
        ...formData
      };
      updateUser(updatedUser);
      setIsEditing(false);
      Alert.alert(t('success'), t('settings.profile.updateSuccess'));
    } catch (error) {
      Alert.alert(t('error'), error.message || t('settings.profile.updateFailed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };
  
  return (
    <MainLayout title={t('settings.profile.title')}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <View style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text variant="titleLarge">
                {t('settings.profile.personalInfo')}
              </Text>
              {!isEditing ? (
                <Button
                  title={t('settings.profile.edit')}
                  variant="outlined"
                  size="small"
                  onPress={() => setIsEditing(true)}
                />
              ) : null}
            </View>
            
            <Input
              label={t('settings.profile.name')}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              editable={isEditing}
              style={{ marginBottom: 16 }}
            />
            
            <Input
              label={t('settings.profile.email')}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: 24 }}
            />
            
            {isEditing && (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                  title={t('cancel')}
                  variant="text"
                  onPress={handleCancel}
                  style={{ marginRight: 8 }}
                />
                <Button
                  title={isLoading ? t('saving') : t('save')}
                  onPress={handleSave}
                  disabled={isLoading}
                />
              </View>
            )}
          </View>
          
          <View style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: 8, 
            padding: 16 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>
              {t('settings.profile.accountInfo')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ flex: 1, color: theme.colors.textSecondary }}>
                {t('settings.profile.memberSince')}
              </Text>
              <Text style={{ color: theme.colors.textPrimary }}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : t('settings.profile.notAvailable')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, color: theme.colors.textSecondary }}>
                {t('settings.profile.lastLogin')}
              </Text>
              <Text style={{ color: theme.colors.textPrimary }}>
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : t('settings.profile.notAvailable')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};