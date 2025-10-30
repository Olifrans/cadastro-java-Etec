import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../types';

export default function CategoriesScreen() {
  const {
    categories,
    loading,
    refreshing,
    createCategory,
    deleteCategory,
    refreshCategories,
  } = useCategories();

  const [categoryName, setCategoryName] = useState('');

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert('Erro', 'Por favor, digite um nome para a categoria');
      return;
    }

    try {
      await createCategory(categoryName.trim());
      setCategoryName('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a categoria');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    Alert.alert(
      'Excluir Categoria',
      'Tem certeza que deseja excluir esta categoria?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCategory(id);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a categoria');
            }
          }
        },
      ]
    );
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.nome}</Text>
        <Text style={styles.categoryCount}>
          {item.produtos?.length || 0} produtos
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCategory(item.id)}
      >
        <Ionicons name="trash" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Nova Categoria</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Digite o nome da categoria"
          />
          <TouchableOpacity
            style={[styles.addButton, loading && styles.buttonDisabled]}
            onPress={handleCreateCategory}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? 'Adicionando...' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshCategories} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pricetags-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma categoria encontrada</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  listContainer: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 16,
    textAlign: 'center',
  },
});