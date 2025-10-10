import React from 'react';
import { View, ScrollView, Switch, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../stores/useUserStore';

export const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUserStore();
  
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');
  
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };
  
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };
  
  const handleLogout = () => {
    Alert.alert(
      t('settings.logoutConfirmTitle'),
      t('settings.logoutConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('settings.logout'), onPress: logout }
      ]
    );
  };
  
  return (
    <MainLayout 
      title={t('settings.title')}
      showBackButton={false}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          {/* Profile Section */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>
              {t('settings.profile.title')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ flex: 1, color: theme.colors.textSecondary }}>
                {t('settings.profile.name')}
              </Text>
              <Text style={{ color: theme.colors.textPrimary }}>
                {user?.name || t('settings.profile.notSet')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, color: theme.colors.textSecondary }}>
                {t('settings.profile.email')}
              </Text>
              <Text style={{ color: theme.colors.textPrimary }}>
                {user?.email || t('settings.profile.notSet')}
              </Text>
            </View>
            <Button
              title={t('settings.profile.edit')}
              variant="outlined"
              style={{ marginTop: 16 }}
              onPress={() => {}/* navigation.navigate('Profile') */}
            />
          </View>
          
          {/* Preferences Section */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>
              {t('settings.preferences.title')}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ color: theme.colors.textSecondary }}>
                {t('settings.preferences.darkMode')}
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                accessibilityLabel={t('settings.preferences.darkMode')}
              />
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.textSecondary }}>
                {t('settings.preferences.language')}
              </Text>
              <Button
                title={t(`languages.${i18n.language}`)}
                variant="outlined"
                size="small"
                onPress={() => {}/* Show language picker */}
              />
            </View>
          </View>
          
          {/* Account Section */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 24 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>
              {t('settings.account.title')}
            </Text>
            <Button
              title={t('settings.account.changePassword')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={() => {}/* navigation.navigate('ChangePassword') */}
            />
            <Button
              title={t('settings.account.privacy')}
              variant="outlined"
              style={{ marginBottom: 12 }}
              onPress={() => {}/* navigation.navigate('Privacy') */}
            />
          </View>
          
          {/* Danger Zone */}
          <View style={{ 
            backgroundColor: theme.colors.surface, 
            borderRadius: 8, 
            padding: 16 
          }}>
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>
              {t('settings.dangerZone.title')}
            </Text>
            <Button
              title={t('settings.dangerZone.deleteAccount')}
              variant="danger"
              onPress={() => {}/* Show delete account confirmation */}
            />
          </View>
          
          {/* Logout Button */}
          <View style={{ marginTop: 24 }}>
            <Button
              title={t('settings.logout')}
              variant="outlined"
              onPress={handleLogout}
              accessibilityLabel={t('settings.logout')}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};