/**
 * Header.js
 * * Organism Header component that provides a consistent application header.
 * This component includes title and optional actions (Settings, Upgrade).
 * * Follows Material Design 3 App Bar specifications.
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'; // استيراد TouchableOpacity
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';

export const Header = ({ 
  title, 
  onMenuPress,
  onSettingsPress,
  onUpgradePress, // خاصية جديدة لزر الترقية
  isUpgraded = false, // خاصية اختيارية لإظهار حالة المستخدم
  style,
}) => {
  const { theme } = useTheme();

  // -----------------------------------------------------------------------
  // زر الترقية/الاشتراك (الزر المميز)
  // -----------------------------------------------------------------------
  const UpgradeButton = (
    <TouchableOpacity 
      style={[styles.upgradeButton, { backgroundColor: theme.colors.primary }]} // لون أساسي مميز
      onPress={onUpgradePress}
      accessibilityLabel="Upgrade to Pro Plus"
      accessibilityRole="button"
    >
      {/* يمكن هنا استخدام أيقونة صغيرة مع النص */}
      <Text style={[styles.upgradeText, { color: theme.colors.onPrimary }]}>
        {isUpgraded ? 'Pro Plus' : 'اشترك Plus'}
      </Text>
    </TouchableOpacity>
  );

  // -----------------------------------------------------------------------
  // منطقة الإجراءات اليمنى (Right Actions)
  // -----------------------------------------------------------------------
  const RightActions = (
    <View style={styles.rightActions}>
      {/* 1. زر الترقية يظهر أولاً وبشكل مميز */}
      {onUpgradePress && !isUpgraded && UpgradeButton} 

      {/* 2. أيقونة الإعدادات تظهر كأيقونة قياسية */}
      {onSettingsPress && (
        <Icon 
          name="settings" 
          size={24} 
          color={theme.colors.textPrimary} 
          onPress={onSettingsPress}
          accessibilityLabel="Open settings"
          accessibilityRole="button"
          style={onUpgradePress && !isUpgraded ? { marginLeft: 16 } : {}} // تباعد إذا كان هناك زر ترقية
        />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.colors.surface,
      borderBottomColor: theme.colors.outline,
    }, style]}>
      {/* LEFT: Menu Icon */}
      <View style={styles.left}>
        {onMenuPress && (
          <Icon 
            name="menu" 
            size={24} 
            color={theme.colors.textPrimary} 
            onPress={onMenuPress}
            accessibilityLabel="Open navigation menu"
            accessibilityRole="button"
          />
        )}
      </View>
      
      {/* CENTER: Title */}
      <Text variant="titleLarge" style={[styles.title, { color: theme.colors.textPrimary }]}> 
        {title}
      </Text>
      
      {/* RIGHT: Actions (Upgrade Button + Settings Icon) */}
      {RightActions}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8, // تقليل الـ padding لضمان minHeight 64
    minHeight: 64, 
  },
  left: {
    // ترك المساحة فارغة عندما لا يوجد زر Menu
    minWidth: 40,
  },
  title: {
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  rightActions: { // استبدال styles.right بـ rightActions
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 40,
    justifyContent: 'flex-end',
  },
  upgradeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8, 
  },
  upgradeText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});