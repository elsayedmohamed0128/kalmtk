// AppleSignInButton.js
// زر Apple الرسمي لتسجيل الدخول حسب HIG

import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';


const appleLogoWeb = 'https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/images/Apple-logo-black.png';

export default function AppleSignInButton({ onPress, disabled }) {
  const { colors } = useTheme();
  // Use only the web image source since there's no local image
  const logoSource = { uri: appleLogoWeb };
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.textPrimary }, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      accessibilityLabel="تسجيل الدخول باستخدام Apple"
    >
      <View style={styles.inner}>
        <Image
          source={logoSource}
          style={styles.icon}
          resizeMode="contain"
          accessibilityLabel="Apple logo"
        />
        <Text style={[styles.text, { color: colors.background }]}>تسجيل الدخول باستخدام Apple</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: Platform.OS === 'ios' ? '#fff' : undefined,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'San Francisco' : 'Roboto',
  },
});
