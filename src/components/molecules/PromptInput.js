/**
 * PromptInput.js
 * 
 * Molecular PromptInput component that combines Input and Button atoms.
 * This component provides the main prompt input interface with voice input functionality.
 */

import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, I18nManager, Pressable, Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { Ionicons } from '@expo/vector-icons';

// Unified PromptInput (Composer) interface
export const PromptInput = ({
  value,
  onChangeText,
  onSend,
  loading = false,
  placeholder = 'اسأل عن أي شيء',
  onVoiceToggle, // optional
  isListening = false, // optional
  onCancel, // optional cancel callback for streaming
}) => {
  const { theme } = useTheme();
  const rtl = I18nManager.isRTL;

  const handleVoice = () => {
    if (onVoiceToggle) onVoiceToggle(!isListening);
  };

  return (
    <View style={styles.outer}>
      <Pressable
        style={({ hovered, pressed }) => [
          styles.pillWrap,
          { backgroundColor: theme.colors.elevated, maxWidth: theme.sizes.composerMaxWidth, height: theme.sizes.composerHeight, borderRadius: theme.radius.pill },
          Platform.OS === 'web' ? { boxShadow: `0 10px 30px ${theme.shadows.heavy}` } : { shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 14, elevation: 6 },
          hovered && Platform.OS === 'web' ? styles.pillHover : null,
          pressed ? { opacity: 0.95 } : null,
        ]}
      >
        {/* Left/Right icons adapt to RTL */}
        {!rtl && (
          <TouchableOpacity style={styles.iconLeft} accessibilityLabel="add">
            <Ionicons name="add" size={18} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        )}

        <TextInput
          style={[styles.input, { color: theme.colors.textPrimary, textAlign: rtl ? 'right' : 'left', fontFamily: theme.typography.fontFamily, outlineWidth: 0, borderWidth: 0 }]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          editable={!loading}
          returnKeyType="send"
          onSubmitEditing={onSend}
        />

        <View style={styles.rightControls}>
          {loading && onCancel ? (
            <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}><Text style={{ color: theme.colors.textPrimary }}>إلغاء</Text></TouchableOpacity>
          ) : (
            onVoiceToggle && (
              <TouchableOpacity onPress={handleVoice} style={styles.voiceBtn} accessibilityLabel="voice">
                <View style={[styles.voiceDot, { backgroundColor: isListening ? theme.colors.composerAccent : 'transparent' }]}>
                  <Ionicons name="mic" size={12} color={isListening ? theme.colors.textPrimary : theme.colors.textPrimary} />
                </View>
              </TouchableOpacity>
            )
          )}

          {rtl && (
            <TouchableOpacity style={styles.iconLeft} accessibilityLabel="add">
              <Ionicons name="add" size={18} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    // Keep native shadow props; web prefers boxShadow. We'll supplement at render time.
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 6,
  },
  pillHover: {
    transform: [{ translateY: -2 }],
    shadowOpacity: 0.8,
    shadowRadius: 18,
    elevation: 10,
  },
  iconLeft: {
    marginRight: 10,
    marginLeft: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  voiceDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
});