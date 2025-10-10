import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates/MainLayout';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { api } from '../../services/api';

export const ModelManagementScreen = () => {
  const { t } = useTranslation();
  
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newModel, setNewModel] = useState({
    name: '',
    provider: '',
    version: '',
    isActive: true,
  });
  
  useEffect(() => {
    loadModels();
  }, []);
  
  const loadModels = async () => {
    setIsLoading(true);
    try {
      const modelsData = await api.getModels();
      setModels(modelsData);
    } catch (error) {
      Alert.alert(t('error'), t('admin.models.loadFailed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddModel = async () => {
    if (!newModel.name || !newModel.provider) {
      Alert.alert(t('error'), t('admin.models.nameAndProviderRequired'));
      return;
    }
    
    try {
      const addedModel = await api.addModel(newModel);
      setModels(prev => [...prev, addedModel]);
      setNewModel({ name: '', provider: '', version: '', isActive: true });
      setShowAddForm(false);
      Alert.alert(t('success'), t('admin.models.addSuccess'));
    } catch (error) {
      Alert.alert(t('error'), error.message || t('admin.models.addFailed'));
    }
  };
  
  const handleToggleActive = async (modelId, currentStatus) => {
    try {
      const updatedModel = await api.updateModel(modelId, { isActive: !currentStatus });
      setModels(prev => 
        prev.map(model => 
          model.id === modelId ? updatedModel : model
        )
      );
    } catch (error) {
      Alert.alert(t('error'), error.message || t('admin.models.updateFailed'));
    }
  };
  
  const handleDeleteModel = async (modelId) => {
    Alert.alert(
      t('admin.models.deleteConfirmTitle'),
      t('admin.models.deleteConfirmMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteModel(modelId);
              setModels(prev => prev.filter(model => model.id !== modelId));
              Alert.alert(t('success'), t('admin.models.deleteSuccess'));
            } catch (error) {
              Alert.alert(t('error'), error.message || t('admin.models.deleteFailed'));
            }
          }
        }
      ]
    );
  };
  
  const renderModel = ({ item }) => (
    <View style={{ 
      backgroundColor: '#FFFFFF', 
      borderRadius: 8, 
      padding: 16, 
      marginBottom: 12 
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <Text variant="titleMedium">
          {item.name}
        </Text>
        <Button
          title={item.isActive ? t('admin.models.deactivate') : t('admin.models.activate')}
          variant={item.isActive ? 'outlined' : 'primary'}
          size="small"
          onPress={() => handleToggleActive(item.id, item.isActive)}
        />
      </View>
      
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <Text style={{ flex: 1, color: theme.colors.textSecondary }}>
          {t('admin.models.provider')}:
        </Text>
        <Text style={{ color: theme.colors.textPrimary }}>
          {item.provider}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Text style={{ flex: 1, color: theme.colors.textSecondary }}>
          {t('admin.models.version')}:
        </Text>
        <Text style={{ color: theme.colors.textPrimary }}>
          {item.version || t('admin.models.noVersion')}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          title={t('delete')}
          variant="text"
          size="small"
          onPress={() => handleDeleteModel(item.id)}
          style={{ marginLeft: 8 }}
        />
      </View>
    </View>
  );
  
  return (
    <MainLayout title={t('admin.models.title')}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Button
            title={showAddForm ? t('admin.models.cancelAdd') : t('admin.models.addModel')}
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
                {t('admin.models.addNewModel')}
              </Text>
              
              <Input
                label={t('admin.models.name')}
                value={newModel.name}
                onChangeText={(value) => setNewModel(prev => ({ ...prev, name: value }))}
                placeholder={t('admin.models.namePlaceholder')}
                style={{ marginBottom: 12 }}
              />
              
              <Input
                label={t('admin.models.provider')}
                value={newModel.provider}
                onChangeText={(value) => setNewModel(prev => ({ ...prev, provider: value }))}
                placeholder={t('admin.models.providerPlaceholder')}
                style={{ marginBottom: 12 }}
              />
              
              <Input
                label={t('admin.models.version')}
                value={newModel.version}
                onChangeText={(value) => setNewModel(prev => ({ ...prev, version: value }))}
                placeholder={t('admin.models.versionPlaceholder')}
                style={{ marginBottom: 16 }}
              />
              
              <Button
                title={t('admin.models.addModel')}
                onPress={handleAddModel}
              />
            </View>
          )}
          
          <FlatList
            data={models}
            renderItem={renderModel}
            keyExtractor={(item) => item.id.toString()}
            refreshing={isLoading}
            onRefresh={loadModels}
            ListEmptyComponent={
              <View style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: 8, 
                padding: 16 
              }}>
                <Text style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
                  {t('admin.models.noModels')}
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};