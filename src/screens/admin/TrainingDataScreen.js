import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { ApiService } from '../../services/api'; // Import ApiService instead of { api }
import { useTheme } from '../../hooks/useTheme'; // Import useTheme

export const TrainingDataScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme(); // Get theme
  
  const [trainingData, setTrainingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newData, setNewData] = useState({
    prompt: '',
    response: '',
    category: '',
  });
  
  useEffect(() => {
    loadTrainingData();
  }, []);
  
  const loadTrainingData = async () => {
    setIsLoading(true);
    try {
      // Since getTrainingData doesn't exist, we'll use a mock implementation for now
      // In a real implementation, you would need to add this method to ApiService
      const data = [
        { id: 1, prompt: 'Hello', response: 'Hi there!', category: 'greetings' },
        { id: 2, prompt: 'How are you?', response: 'I am doing well, thank you!', category: 'conversation' },
      ];
      setTrainingData(data);
    } catch (error) {
      Alert.alert(t('error'), t('admin.trainingData.loadFailed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddData = async () => {
    if (!newData.prompt || !newData.response) {
      Alert.alert(t('error'), t('admin.trainingData.promptAndResponseRequired'));
      return;
    }
    
    try {
      // Since addTrainingData doesn't exist, we'll use a mock implementation for now
      const addedData = {
        id: trainingData.length + 1,
        ...newData
      };
      setTrainingData(prev => [...prev, addedData]);
      setNewData({ prompt: '', response: '', category: '' });
      setShowAddForm(false);
      Alert.alert(t('success'), t('admin.trainingData.addSuccess'));
    } catch (error) {
      Alert.alert(t('error'), error.message || t('admin.trainingData.addFailed'));
    }
  };
  
  const handleDeleteData = async (dataId) => {
    Alert.alert(
      t('admin.trainingData.deleteConfirmTitle'),
      t('admin.trainingData.deleteConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              // Since deleteTrainingData doesn't exist, we'll use a mock implementation for now
              setTrainingData(prev => prev.filter(data => data.id !== dataId));
              Alert.alert(t('success'), t('admin.trainingData.deleteSuccess'));
            } catch (error) {
              Alert.alert(t('error'), error.message || t('admin.trainingData.deleteFailed'));
            }
          }
        }
      ]
    );
  };
  
  const renderTrainingData = ({ item }) => (
    <View style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: 8, 
      padding: 16, 
      marginBottom: 12 
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <Text variant="titleMedium" numberOfLines={1}>
          {item.category || t('admin.trainingData.uncategorized')}
        </Text>
        <Button
          title={t('delete')}
          variant="text"
          size="small"
          onPress={() => handleDeleteData(item.id)}
        />
      </View>
      
      <Text style={{ color: theme.colors.textSecondary, marginBottom: 4 }}>
        {t('admin.trainingData.prompt')}:
      </Text>
      <Text style={{ color: theme.colors.textPrimary, marginBottom: 8 }}>
        {item.prompt}
      </Text>
      
      <Text style={{ color: theme.colors.textSecondary, marginBottom: 4 }}>
        {t('admin.trainingData.response')}:
      </Text>
      <Text style={{ color: theme.colors.textPrimary }}>
        {item.response}
      </Text>
    </View>
  );
  
  return (
    <MainLayout title={t('admin.trainingData.title')}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Button
            title={showAddForm ? t('admin.trainingData.cancelAdd') : t('admin.trainingData.addData')}
            variant="outlined"
            onPress={() => setShowAddForm(!showAddForm)}
            style={{ marginBottom: 16 }}
          />
          
          {showAddForm && (
            <View style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: 8, 
              padding: 16, 
              marginBottom: 24 
            }}>
              <Text variant="titleLarge" style={{ marginBottom: 12 }}>
                {t('admin.trainingData.addNewData')}
              </Text>
              
              <Input
                label={t('admin.trainingData.prompt')}
                value={newData.prompt}
                onChangeText={(value) => setNewData(prev => ({ ...prev, prompt: value }))}
                placeholder={t('admin.trainingData.promptPlaceholder')}
                multiline
                style={{ marginBottom: 12 }}
              />
              
              <Input
                label={t('admin.trainingData.response')}
                value={newData.response}
                onChangeText={(value) => setNewData(prev => ({ ...prev, response: value }))}
                placeholder={t('admin.trainingData.responsePlaceholder')}
                multiline
                style={{ marginBottom: 12 }}
              />
              
              <Input
                label={t('admin.trainingData.category')}
                value={newData.category}
                onChangeText={(value) => setNewData(prev => ({ ...prev, category: value }))}
                placeholder={t('admin.trainingData.categoryPlaceholder')}
                style={{ marginBottom: 16 }}
              />
              
              <Button
                title={t('admin.trainingData.addData')}
                onPress={handleAddData}
              />
            </View>
          )}
          
          <FlatList
            data={trainingData}
            renderItem={renderTrainingData}
            keyExtractor={(item) => item.id.toString()}
            refreshing={isLoading}
            onRefresh={loadTrainingData}
            ListEmptyComponent={
              <View style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: 8, 
                padding: 16 
              }}>
                <Text style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
                  {t('admin.trainingData.noData')}
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};