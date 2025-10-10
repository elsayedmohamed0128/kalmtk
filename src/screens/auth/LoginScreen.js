/**
 * LoginScreen.js
 * 
 * Authentication screen for user login.
 * This screen allows users to enter their credentials and authenticate with the system.
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserStore } from '../../stores/useUserStore';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real app, this would call the backend API
    if (email && password) {
      // Simulate successful login
      const userData = {
        id: 'user123',
        email: email,
        name: 'Test User',
        role: 'user'
      };
      login(userData);
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.formContainer, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>
        
        <TextInput
          style={[styles.input, { 
            borderColor: theme.colors.text, 
            color: theme.colors.text,
            backgroundColor: theme.colors.background
          }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={[styles.input, { 
            borderColor: theme.colors.text, 
            color: theme.colors.text,
            backgroundColor: theme.colors.background
          }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.linkButton, { marginTop: 20 }]} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={[styles.linkButtonText, { color: theme.colors.primary }]}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    alignItems: 'center',
  },
  linkButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});