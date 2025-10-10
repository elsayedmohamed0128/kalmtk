/**
 * MainLayout.js
 * 
 * Template component for the main application layout.
 * This component provides a consistent layout structure for main screens.
 */

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Pressable, Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../organisms/Header';
import { Sidebar } from '../organisms/Sidebar';
import { useWindowSize } from '../../hooks/useWindowSize';

export const MainLayout = ({ 
  children, 
  title, 
  onMenuPress,
  onSettingsPress,
  style,
}) => {
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const window = useWindowSize();
  const isDesktop = window.width >= 768;

  const handleToggleSidebar = () => setSidebarCollapsed((s) => !s);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header 
        title={title}
        onMenuPress={handleToggleSidebar}
        onSettingsPress={onSettingsPress}
      />

      <View style={styles.innerRow}>
        {isDesktop && <Sidebar collapsed={sidebarCollapsed} />}

        <View style={[styles.content, style]}>
          {children}
        </View>
      </View>

  {/* top-center floating badge */}
  <View style={[styles.topBadgeWrap, { pointerEvents: 'box-none' }]}>
        <Pressable
          onPress={() => { /* future: open subscription */ }}
          onHoverIn={() => { }}
          onHoverOut={() => { }}
          accessibilityRole="button"
        >
          {({ hovered }) => (
            <View style={[
              styles.badge,
              { backgroundColor: theme.colors.badgeBg },
              Platform.OS === 'web' ? { boxShadow: `0 8px 24px ${theme.shadows.heavy}` } : { shadowColor: theme.shadows.heavy, shadowOpacity: 0.6, shadowRadius: 12, elevation: 6 },
              hovered && Platform.OS === 'web' ? styles.badgeHover : null,
            ]}>
              <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>اشتراك Plus</Text>
            </View>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  innerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  topBadgeWrap: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    elevation: 6,
  },
  badgeHover: {
    transform: [{ translateY: -3 }],
    elevation: 12,
  },
});