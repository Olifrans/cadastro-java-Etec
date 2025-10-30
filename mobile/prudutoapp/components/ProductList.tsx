import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Product } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  onDelete: (id: number) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onView,
  onDelete,
  refreshing = false,
  onRefresh,
}) => {
  const handleDelete = (product: Product) => {
    Alert.alert(
      'Excluir Produto',
      `Tem certeza que deseja excluir "${product.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => onDelete(product.id)
        },
      ]
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nome}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.descricao || 'Sem descrição'}
        </Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>
            R$ {item.preco?.toFixed(2) || '0,00'}
          </Text>
          <Text style={styles.productCategory}>
            {item.categoriaNome || 'Sem categoria'}
          </Text>
        </View>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => onView(item)}
        >
          <Ionicons name="eye" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(item)}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  productCard: {
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
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  productCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#3498db',
  },
  editButton: {
    backgroundColor: '#f39c12',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
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