// utils/secureTokenStorage.js
// تخزين واسترجاع التوكنات بشكل آمن عبر SecureStore (للموبايل) وبديل للويب
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';

export async function saveToken(token) {
  if (Platform.OS === 'web') {
    // على الويب: استخدم كوكيز HttpOnly عبر السيرفر فقط (لا تحفظ التوكن في localStorage)
    // هنا placeholder فقط، يجب أن يتم الحفظ عبر السيرفر
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  if (Platform.OS === 'web') {
    // على الويب: يجب جلب التوكن من الكوكيز عبر السيرفر
    return null;
  }
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken() {
  if (Platform.OS === 'web') {
    // على الويب: حذف الكوكيز عبر السيرفر
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
