import React, { useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

/**
 * MessageList
 * Props:
 * - messages: array of message objects {id, role, content, timestamp}
 * - renderItem: optional render function
 * - inverted: boolean
 * - onEndReached: optional
 */
export const MessageList = ({ messages = [], renderItem, inverted = false, onEndReached }) => {
  const listRef = useRef(null);

  useEffect(() => {
    // Auto scroll to bottom when messages change and not inverted
    if (!inverted && listRef.current && messages.length > 0) {
      try {
        listRef.current.scrollToEnd({ animated: true });
      } catch (e) {
        // ignore
      }
    }
  }, [messages, inverted]);

  const internalRender = renderItem || (({ item }) => null);

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      renderItem={internalRender}
      inverted={inverted}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      windowSize={21}
      initialNumToRender={20}
    />
  );
};
