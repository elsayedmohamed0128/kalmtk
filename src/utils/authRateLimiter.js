// utils/authRateLimiter.js
// أداة الحد من محاولات تسجيل الدخول مع تخزين محلي
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ATTEMPT_KEY_PREFIX = 'login_attempts_';
const LOCKOUT_KEY_PREFIX = 'login_lockout_';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function getAttempts(email) {
  const key = ATTEMPT_KEY_PREFIX + email;
  const value = await AsyncStorage.getItem(key);
  return value ? parseInt(value, 10) : 0;
}

export async function incrementAttempts(email) {
  const key = ATTEMPT_KEY_PREFIX + email;
  let attempts = await getAttempts(email);
  attempts += 1;
  await AsyncStorage.setItem(key, attempts.toString());
  return attempts;
}

export async function resetAttempts(email) {
  const key = ATTEMPT_KEY_PREFIX + email;
  await AsyncStorage.removeItem(key);
}

export async function setLockout(email) {
  const key = LOCKOUT_KEY_PREFIX + email;
  const until = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
  await AsyncStorage.setItem(key, until.toString());
}

export async function getLockout(email) {
  const key = LOCKOUT_KEY_PREFIX + email;
  const value = await AsyncStorage.getItem(key);
  if (!value) return null;
  const until = parseInt(value, 10);
  if (Date.now() > until) {
    await AsyncStorage.removeItem(key);
    return null;
  }
  return until;
}

export async function clearLockout(email) {
  const key = LOCKOUT_KEY_PREFIX + email;
  await AsyncStorage.removeItem(key);
}
