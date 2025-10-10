/**
 * ActionButtons.js
 * 
 * Molecular ActionButtons component that provides common action buttons.
 * This component can be reused across different parts of the application.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '../atoms/Icon';

export const ActionButtons = ({
  onCopy,
  onSave,
  onShare,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {onCopy && (
        <Icon
          name="content-copy"
          size={24}
          onPress={onCopy}
          accessibilityLabel="Copy"
          accessibilityRole="button"
          style={styles.button}
        />
      )}
      
      {onSave && (
        <Icon
          name="save"
          size={24}
          onPress={onSave}
          accessibilityLabel="Save"
          accessibilityRole="button"
          style={styles.button}
        />
      )}
      
      {onShare && (
        <Icon
          name="share"
          size={24}
          onPress={onShare}
          accessibilityLabel="Share"
          accessibilityRole="button"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    textAlign: 'center',
    padding: 8,
  },
});