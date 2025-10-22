// شاشة إدخال رمز التحقق الثنائي (TOTP)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function TwoFactorScreen({ route, navigation }) {
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { onVerify } = route.params || {};

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    // استبدل هذا بالتحقق الفعلي من الكود عبر API
    if (code.length === 6 && /^[0-9]{6}$/.test(code)) {
      const success = await (onVerify ? onVerify(code) : true);
      if (success) {
        navigation.replace('Home');
      } else {
        setError('رمز التحقق غير صحيح');
      }
    } else {
      setError('أدخل رمز مكون من 6 أرقام');
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.title, { color: theme.colors.text }]}>التحقق بخطوتين</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>أدخل رمز التحقق المكون من 6 أرقام</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.text }]}
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
        placeholder="------"
        placeholderTextColor={theme.colors.textSecondary}
        textAlign="center"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleVerify} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'جارٍ التحقق...' : 'تحقق'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 28,
    padding: 12,
    width: 180,
    letterSpacing: 16,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
