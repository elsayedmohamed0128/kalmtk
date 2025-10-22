
import React, { useState } from 'react';
import { View, Alert, Animated, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { AuthLayout } from '../../components/templates/AuthLayout';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { Icon } from '../../components/atoms/Icon';
import GoogleSignInButton from '../../components/atoms/GoogleSignInButton';
import AppleSignInButton from '../../components/atoms/AppleSignInButton';
import { useUserStore } from '../../stores/useUserStore';
import { validation } from '../../utils/validation';


export const SignupScreen = () => {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();
  const { login } = useUserStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Animate fade-in on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Real-time validation
  const validate = () => {
    const errs = {};
    if (!validation.isRequired(name)) {
      errs.name = 'الاسم مطلوب';
    }
    if (!validation.isRequired(email)) {
      errs.email = 'البريد الإلكتروني مطلوب';
    } else if (!validation.isValidEmail(email)) {
      errs.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!validation.isRequired(password)) {
      errs.password = 'كلمة المرور مطلوبة';
    } else if (!validation.isStrongPassword(password)) {
      errs.password = 'كلمة المرور ضعيفة (8 أحرف على الأقل، حرف كبير وصغير ورقم)';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = async () => {
    Keyboard.dismiss();
    if (!validate()) return;
    setLoading(true);
    try {
      // Simulate signup (replace with real API call)
      const userData = {
        id: 'user123',
        email,
        name,
        role: 'user',
        token: 'demo-token',
      };
      login(userData);
      Alert.alert('تم التسجيل بنجاح', 'تم إنشاء الحساب بنجاح!');
      // Navigation will be handled by AuthNavigator based on authentication state
    } catch (error) {
      Alert.alert('خطأ', error.message || 'فشل التسجيل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Image
            source={require('../../assets/images/favicon_io/apple-touch-icon.png')}
            style={{ width: 56, height: 56, marginBottom: 8 }}
            resizeMode="contain"
            accessibilityLabel="شعار المنصة"
          />
          <Text variant="headlineLarge" style={{ marginBottom: 4, textAlign: 'center' }}>
            إنشاء حساب جديد
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
            أدخل بياناتك لإنشاء حساب
          </Text>
        </View>

        <Input
          placeholder="الاسم الكامل"
          value={name}
          onChangeText={setName}
          editable={!loading}
          style={{ marginBottom: errors.name ? 4 : 16 }}
          accessibilityLabel="الاسم الكامل"
          returnKeyType="next"
        />
        {errors.name && (
          <Text variant="bodySmall" style={{ color: 'red', marginBottom: 12 }}>{errors.name}</Text>
        )}

        <Input
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          style={{ marginBottom: errors.email ? 4 : 16 }}
          accessibilityLabel="البريد الإلكتروني"
          returnKeyType="next"
        />
        {errors.email && (
          <Text variant="bodySmall" style={{ color: 'red', marginBottom: 12 }}>{errors.email}</Text>
        )}

        <View style={{ position: 'relative', marginBottom: errors.password ? 4 : 16 }}>
          <Input
            placeholder="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
            accessibilityLabel="كلمة المرور"
            returnKeyType="next"
            style={{ paddingRight: 44 }}
          />
          <View style={{ position: 'absolute', right: 8, top: 12 }}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color={theme.colors.textSecondary}
              onPress={() => setShowPassword((v) => !v)}
              accessibilityLabel={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              accessibilityRole="button"
            />
          </View>
        </View>
        {errors.password && (
          <Text variant="bodySmall" style={{ color: 'red', marginBottom: 12 }}>{errors.password}</Text>
        )}

        <View style={{ position: 'relative', marginBottom: errors.confirmPassword ? 4 : 16 }}>
          <Input
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            editable={!loading}
            accessibilityLabel="تأكيد كلمة المرور"
            returnKeyType="done"
            style={{ paddingRight: 44 }}
          />
          <View style={{ position: 'absolute', right: 8, top: 12 }}>
            <Icon
              name={showConfirmPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color={theme.colors.textSecondary}
              onPress={() => setShowConfirmPassword((v) => !v)}
              accessibilityLabel={showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              accessibilityRole="button"
            />
          </View>
        </View>
        {errors.confirmPassword && (
          <Text variant="bodySmall" style={{ color: 'red', marginBottom: 12 }}>{errors.confirmPassword}</Text>
        )}

        <Button
          title={loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
          onPress={handleSignup}
          disabled={loading}
          style={{ marginBottom: 16 }}
          accessibilityLabel="إنشاء حساب"
        />

        <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 8 }}>
          أو يمكنك التسجيل عبر
        </Text>
        <GoogleSignInButton onPress={() => Alert.alert('Google Sign-Up', 'قريباً: التسجيل عبر Google')} disabled={loading} />
        <AppleSignInButton onPress={() => Alert.alert('Apple Sign-Up', 'قريباً: التسجيل عبر Apple')} disabled={loading} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
          <Text variant="bodySmall" style={{ color: theme.colors.textSecondary }}>
            لديك حساب بالفعل؟
          </Text>
          <Button
            title="تسجيل الدخول"
            variant="text"
            onPress={() => navigation.navigate('Login')}
            style={{ marginLeft: 4 }}
            accessibilityLabel="تسجيل الدخول"
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Text variant="labelMedium" style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
            بالمتابعة أنت توافق على
            <Text style={{ color: theme.colors.composerAccent }}> شروط الاستخدام </Text>
            و
            <Text style={{ color: theme.colors.composerAccent }}> سياسة الخصوصية</Text>
          </Text>
        </View>
      </Animated.View>
    </AuthLayout>
  );
};