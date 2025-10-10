import React, { useState } from 'react';
import { View, ScrollView, Switch, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { useTheme } from '../../hooks/useTheme';

export const PreferencesScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  const [preferences, setPreferences] = useState({
    darkMode: theme === 'dark',
    notifications: true,
    autoSave: true,
    language: i18n.language,
  });
  
  const handleToggle = (pref) => {
    const newValue = !preferences[pref];
    setPreferences(prev => ({ ...prev, [pref]: newValue }));
    
    // Apply theme change immediately
    if (pref === 'darkMode') {
      toggleTheme(newValue ? 'dark' : 'light');
    }
  };
  
  const handleLanguageChange = (language) => {
    setPreferences(prev => ({ ...prev, language }));
    i18n.changeLanguage(language);
  };
  
  const handleSave = () => {
    // In a real app, you would save these preferences to a backend or local storage
    Alert.alert(t('success'), t('settings.preferences.saveSuccess'));
  };
  
  return (
    <MainLayout title={t('settings.preferences.title')}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
              {t('settings.preferences.display')}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ color: theme.colors.textSecondary }}>
                {t('settings.preferences.darkMode')}
              </Text>
              <Switch
                value={preferences.darkMode}
                onValueChange={() => handleToggle('darkMode')}
                accessibilityLabel={t('settings.preferences.darkMode')}
              />
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.textSecondary }}>
                {t('settings.preferences.autoSave')}
              </Text>
              <Switch
                value={preferences.autoSave}
                onValueChange={() => handleToggle('autoSave')}
                accessibilityLabel={t('settings.preferences.autoSave')}
              />
            </View>
          </View>
          
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
              {t('settings.preferences.notifications')}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.textSecondary }}>
                {t('settings.preferences.enableNotifications')}
              </Text>
              <Switch
                value={preferences.notifications}
                onValueChange={() => handleToggle('notifications')}
                accessibilityLabel={t('settings.preferences.enableNotifications')}
              />
            </View>
          </View>
          
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
              {t('settings.preferences.language')}
            </Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {['en', 'ar', 'de'].map((lang) => (
                <Button
                  key={lang}
                  title={t(`languages.${lang}`)}
                  variant={preferences.language === lang ? 'primary' : 'outlined'}
                  size="small"
                  onPress={() => handleLanguageChange(lang)}
                  style={{ marginRight: 8, marginBottom: 8 }}
                />
              ))}
            </View>
          </View>
          
          <View style={{ marginTop: 24 }}>
            <Button
              title={t('save')}
              onPress={handleSave}
              accessibilityLabel={t('save')}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};