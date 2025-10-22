// GoogleSignInButton.js
// زر Google الرسمي لتسجيل الدخول حسب إرشادات Google Identity
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function GoogleSignInButton({ onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      accessibilityLabel="تسجيل الدخول باستخدام Google"
    >
      <View style={styles.inner}>
        <Image
          source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text}>تسجيل الدخول باستخدام Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dadce0',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
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
  },
  text: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});
