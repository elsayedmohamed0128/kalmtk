import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '../../components/templates/AuthLayout';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { useUserStore } from '../../stores/useUserStore';
import { validateEmail, validatePassword } from '../../utils/validation';
import { auth } from '../../services/auth';

export const SignupScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { login } = useUserStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('signup.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('signup.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('signup.invalidEmail');
    }
    
    if (!formData.password) {
      newErrors.password = t('signup.passwordRequired');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = t('signup.weakPassword');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('signup.passwordsDoNotMatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const userData = await auth.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      login(userData);
      Alert.alert(t('success'), t('signup.success'));
      // Navigation will be handled by AuthNavigator based on authentication state
    } catch (error) {
      Alert.alert(t('error'), error.message || t('signup.failed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };
  
  return (
    <AuthLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 16 }}>
          <Input
            label={t('signup.nameLabel')}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder={t('signup.namePlaceholder')}
            error={errors.name}
            accessibilityLabel={t('signup.nameLabel')}
          />
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Input
            label={t('signup.emailLabel')}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder={t('signup.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            accessibilityLabel={t('signup.emailLabel')}
          />
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Input
            label={t('signup.passwordLabel')}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            placeholder={t('signup.passwordPlaceholder')}
            secureTextEntry
            error={errors.password}
            accessibilityLabel={t('signup.passwordLabel')}
            accessibilityHint={t('signup.passwordHint')}
          />
        </View>
        
        <View style={{ marginBottom: 24 }}>
          <Input
            label={t('signup.confirmPasswordLabel')}
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            placeholder={t('signup.confirmPasswordPlaceholder')}
            secureTextEntry
            error={errors.confirmPassword}
            accessibilityLabel={t('signup.confirmPasswordLabel')}
          />
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Button
            title={isLoading ? t('signup.signingUp') : t('signup.signupButton')}
            onPress={handleSignup}
            disabled={isLoading}
            accessibilityLabel={t('signup.signupButton')}
          />
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
          <Text style={{ color: theme.colors.textSecondary }}>{t('signup.alreadyHaveAccount')}</Text>
          <Button
            title={t('signup.loginLink')}
            variant="text"
            onPress={handleLoginRedirect}
            accessibilityLabel={t('signup.loginLink')}
          />
        </View>
      </ScrollView>
    </AuthLayout>
  );
};