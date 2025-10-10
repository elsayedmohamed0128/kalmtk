import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { PromptCard } from '../../components/organisms/PromptCard';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { usePromptStore } from '../../stores/usePromptStore';
import { api } from '../../services/api';

export const HistoryScreen = () => {
  const { t } = useTranslation();
  const { history, setHistory, addHistoryItem } = usePromptStore();
  const [isLoading, setIsLoading] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );
  
  const loadHistory = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const historyData = await api.getHistory();
      console.log('historyData', historyData);
      if (Array.isArray(historyData)) {
        setHistory(historyData);
      } else {
        console.warn('api.getHistory did not return an array, falling back to empty');
        setHistory([]);
      }
    } catch (error) {
      console.error('loadHistory error', error);
      Alert.alert(t('error'), t('history.loadFailed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefresh = () => {
    loadHistory();
  };
  
  const handleSelectPrompt = (prompt) => {
    // Navigate to detail screen or show in modal
    // navigation.navigate('HistoryDetail', { promptId: prompt.id });
  };
  
  const renderPrompt = ({ item }) => (
    <PromptCard 
      prompt={item} 
      onPress={() => handleSelectPrompt(item)}
    />
  );
  
  const renderEmptyState = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <Text style={{ textAlign: 'center', marginBottom: 16, color: theme.colors.textSecondary }}>
        {t('history.emptyMessage')}
      </Text>
      <Button
        title={t('history.refresh')}
        onPress={handleRefresh}
        variant="outlined"
      />
    </View>
  );
  
  return (
    <MainLayout 
      title={t('history.title')}
      showBackButton={false}
    >
      <FlatList
        data={history}
        renderItem={renderPrompt}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={handleRefresh}
        refreshing={isLoading}
        ListEmptyComponent={renderEmptyState}
        style={{ flex: 1 }}
        contentContainerStyle={history.length === 0 ? { flex: 1 } : null}
      />
    </MainLayout>
  );
};