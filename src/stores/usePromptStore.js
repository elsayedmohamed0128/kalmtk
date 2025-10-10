/**
 * usePromptStore.js
 * 
 * Zustand store for managing prompt history and favorites.
 * This store persists prompt data to AsyncStorage so that the history remains
 * available even after the app is closed and reopened.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid/non-secure';

export const usePromptStore = create(
  persist(
    (set, get) => ({
      conversations: [],
      selectedConversationId: null,

      // Create a new conversation and select it
      createConversation: (title = 'New conversation') => {
        const id = nanoid();
        const conv = { id, title, createdAt: Date.now(), updatedAt: Date.now(), messages: [] };
        set((state) => ({ conversations: [conv, ...state.conversations], selectedConversationId: id }));
        return id;
      },

      // Select existing conversation
      selectConversation: (id) => set({ selectedConversationId: id }),

      // Add message to conversation
      addMessage: (conversationId, message) => {
        const msg = { id: message.id || nanoid(), ...message };
        set((state) => ({
          conversations: state.conversations.map(c => c.id === conversationId ? ({ ...c, messages: [...c.messages, msg], updatedAt: Date.now() }) : c)
        }));
        return msg.id;
      },

      // Update a message partially (used for streaming)
      updateMessage: (conversationId, messageId, patch) => set((state) => ({
        conversations: state.conversations.map(c => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            messages: c.messages.map(m => m.id === messageId ? ({ ...m, ...patch }) : m),
            updatedAt: Date.now(),
          };
        })
      })),

      // Append text to an existing message (used for streaming deltas)
      appendToMessage: (conversationId, messageId, delta) => set((state) => ({
        conversations: state.conversations.map(c => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            messages: c.messages.map(m => m.id === messageId ? ({ ...m, content: (m.content || '') + delta, status: 'streaming' }) : m),
            updatedAt: Date.now(),
          };
        })
      })),

      // Finish message (set status done)
      finishMessage: (conversationId, messageId, finalContent) => set((state) => ({
        conversations: state.conversations.map(c => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            messages: c.messages.map(m => m.id === messageId ? ({ ...m, content: finalContent ?? m.content, status: 'done' }) : m),
            updatedAt: Date.now(),
          };
        })
      })),

      // Delete conversation
      deleteConversation: (id) => set((state) => ({ conversations: state.conversations.filter(c => c.id !== id), selectedConversationId: state.selectedConversationId === id ? (state.conversations[0]?.id || null) : state.selectedConversationId })),

      renameConversation: (id, title) => set((state) => ({ conversations: state.conversations.map(c => c.id === id ? ({ ...c, title }) : c) })),

      clearAll: () => set({ conversations: [], selectedConversationId: null }),
    }),
    {
      name: 'prompt-conversations',
    }
  )
);
