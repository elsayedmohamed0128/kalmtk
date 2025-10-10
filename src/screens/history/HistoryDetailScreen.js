import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { PromptOutput } from '../../components/molecules/PromptOutput';
import { ActionButtons } from '../../components/molecules/ActionButtons';
import { usePromptStore } from '../../stores/usePromptStore';

export const HistoryDetailScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const { promptId } = route.params;
  
  const { history } = usePromptStore();
  const prompt = history.find(item => item.id === promptId);
  
  if (!prompt) {
    return (
      <MainLayout title={t('history.detail.title')}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
          <Text style={{ color: theme.colors.textPrimary, marginBottom: 16 }}>{t('history.detail.notFound')}</Text>
          <Button
            title={t('history.detail.backToHistory')}
            onPress={() => navigation.goBack()}
          />
        </View>
      </MainLayout>
    );
  }
  
  const handleRegenerate = () => {
    // Implement regenerate functionality
  };
  
  const handleShare = () => {
    // Implement share functionality
  };
  
  const handleDelete = () => {
    // Implement delete functionality
  };
  
  return (
    <MainLayout title={t('history.detail.title')}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text variant="titleLarge" style={{ marginBottom: 8, color: theme.colors.textPrimary }}>
            {prompt.title || t('history.detail.untitled')}
          </Text>
          <Text style={{ marginBottom: 16, color: theme.colors.textSecondary }}>
            {new Date(prompt.timestamp).toLocaleString()}
          </Text>
          
          <PromptOutput 
            prompt={prompt.content}
            response={prompt.response}
          />
          
          <ActionButtons
            onRegenerate={handleRegenerate}
            onShare={handleShare}
            onDelete={handleDelete}
            style={{ marginTop: 24 }}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};