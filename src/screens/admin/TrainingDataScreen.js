import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { api } from '../../services/api';

export const TrainingDataScreen = () => {
  const { t } = useTranslation();
  
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
      const data = await api.getTrainingData();
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
      const addedData = await api.addTrainingData(newData);
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
              await api.deleteTrainingData(dataId);
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