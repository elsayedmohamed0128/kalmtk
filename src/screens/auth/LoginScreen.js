/**
 * LoginScreen.js
 * 
 * Authentication screen for user login.
 * This screen allows users to enter their credentials and authenticate with the system.
 */


import React, { useState, useEffect } from 'react';
import { View, Alert, Animated, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { AuthLayout } from '../../components/templates/AuthLayout';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { Icon } from '../../components/atoms/Icon';
import GoogleSignInButton from '../../components/atoms/GoogleSignInButton';
import AppleSignInButton from '../../components/atoms/AppleSignInButton';
import { getAttempts, incrementAttempts, resetAttempts, setLockout, getLockout, clearLockout } from '../../utils/authRateLimiter';
import { logAuthEvent } from '../../utils/authTelemetry';
import { useUserStore } from '../../stores/useUserStore';
import { validation } from '../../utils/validation';


export default function LoginScreen() {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (email) {
      getAttempts(email).then(setAttempts);
      getLockout(email).then(until => {
        setLockoutUntil(until);
        if (until) {
          updateTimer(until);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);


  useEffect(() => {
    let interval;
    if (lockoutUntil) {
      interval = setInterval(() => {
        updateTimer(lockoutUntil);
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [lockoutUntil]);

  // Animate fade-in on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);


  const updateTimer = (until) => {
    const now = Date.now();
    if (until && now < until) {
      setTimer(Math.ceil((until - now) / 1000));
    } else {
      setLockoutUntil(null);
      setTimer(0);
      if (email) clearLockout(email);
    }
  };


  // Real-time validation
  const validate = () => {
    const errs = {};
    if (!validation.isRequired(email)) {
      errs.email = 'البريد الإلكتروني مطلوب';
    } else if (!validation.isValidEmail(email)) {
      errs.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!validation.isRequired(password)) {
      errs.password = 'كلمة المرور مطلوبة';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validate()) {
      logAuthEvent('sign_in_failure', { email, reason: 'validation_error' });
      return;
    }
    if (lockoutUntil) {
      logAuthEvent('lockout_triggered', { email });
      Alert.alert('حسابك مقفل', `يرجى الانتظار ${timer} ثانية قبل المحاولة مرة أخرى.`);
      return;
    }
    setLoading(true);
    // Simulate login failure for demonstration (replace with real API call)
    const isSuccess = password === 'password123';
    if (isSuccess) {
      logAuthEvent('sign_in_start', { email });
      navigation.replace('TwoFactor', {
        onVerify: async (code) => {
          logAuthEvent('2fa_challenge', { email });
          if (code === '123456') {
            logAuthEvent('2fa_success', { email });
            const userData = {
              id: 'user123',
              email: email,
              name: 'Test User',
              role: 'user',
              token: 'demo-token',
            };
            await resetAttempts(email);
            await clearLockout(email);
            login(userData);
            logAuthEvent('sign_in_success', { email });
            return true;
          } else {
            logAuthEvent('2fa_failure', { email });
          }
          return false;
        }
      });
    } else {
      const newAttempts = await incrementAttempts(email);
      setAttempts(newAttempts);
      logAuthEvent('sign_in_failure', { email, attempts: newAttempts });
      if (newAttempts >= 5) {
        await setLockout(email);
        setLockoutUntil(await getLockout(email));
        logAuthEvent('lockout_triggered', { email });
        Alert.alert('حسابك مقفل', 'عدد المحاولات تجاوز الحد المسموح. حاول بعد 15 دقيقة.');
      } else {
        Alert.alert('خطأ', `بيانات الدخول غير صحيحة. المحاولات المتبقية: ${5 - newAttempts}`);
      }
    }
    setLoading(false);
  };


  return (
    <AuthLayout>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Image
            source={require('../../assets/icon.png')}
            style={{ width: 56, height: 56, marginBottom: 8 }}
            resizeMode="contain"
            accessibilityLabel="شعار المنصة"
          />
          <Text variant="headlineLarge" style={{ marginBottom: 4, textAlign: 'center' }}>
            تسجيل الدخول
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
            أدخل بياناتك للمتابعة
          </Text>
        </View>

        {lockoutUntil && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            حسابك مقفل مؤقتاً. الرجاء الانتظار {timer} ثانية قبل المحاولة مرة أخرى.
          </Text>
        )}

        <Input
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!lockoutUntil && !loading}
          style={{ marginBottom: errors.email ? 4 : 16 }}
          accessibilityLabel="البريد الإلكتروني"
          returnKeyType="next"
          onSubmitEditing={() => Keyboard.dismiss()}
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
            editable={!lockoutUntil && !loading}
            accessibilityLabel="كلمة المرور"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
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

        <Button
          title={loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
          onPress={handleLogin}
          disabled={!!lockoutUntil || loading}
          style={{ marginBottom: 16 }}
          accessibilityLabel="تسجيل الدخول"
        />

        <Text variant="bodySmall" style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 8 }}>
          أو يمكنك الدخول عبر
        </Text>
        <GoogleSignInButton onPress={() => Alert.alert('Google Sign-In', 'قريباً: تسجيل الدخول عبر Google')} disabled={!!lockoutUntil || loading} />
        <AppleSignInButton onPress={() => Alert.alert('Apple Sign-In', 'قريباً: تسجيل الدخول عبر Apple')} disabled={!!lockoutUntil || loading} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
          <Text variant="bodySmall" style={{ color: theme.colors.textSecondary }}>
            ليس لديك حساب؟
          </Text>
          <Button
            title="إنشاء حساب"
            variant="text"
            onPress={() => navigation.navigate('Signup')}
            style={{ marginLeft: 4 }}
            accessibilityLabel="إنشاء حساب جديد"
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
}


// Styles are now handled by atomic components and inline for layout spacing