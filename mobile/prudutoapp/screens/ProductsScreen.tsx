import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from '../components/Modal';
import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';
import { useCategories } from '../hooks/useCategories';
import { useModal } from '../hooks/useModal';
import { useProducts } from '../hooks/useProducts';
import { Product, ProductDTO } from '../types';

export const ProductsScreen: React.FC = () => {
  const {
    products,
    loading,
    refreshing,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
  } = useProducts();

  const { categories } = useCategories();
  const modal = useModal();

  const handleCreateProduct = async (productData: ProductDTO) => {
    try {
      await createProduct(productData);
      modal.closeModal();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o produto');
    }
  };

  const handleUpdateProduct = async (productData: ProductDTO) => {
    if (!productData.id) return;

    try {
      await updateProduct(productData.id, productData);
      modal.closeModal();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o produto');
    }
  };

  const handleEditProduct = (product: Product) => {
    modal.openEditModal('Editar Produto', product);
  };

  const handleViewProduct = (product: Product) => {
    modal.openViewModal('Detalhes do Produto', product);
  };

  const handleNewProduct = () => {
    modal.openCreateModal('Novo Produto');
  };

  // FUNÇÃO CORRIGIDA - Removido os >> e corrigido categorialkome para categoriaNome
  const renderProductDetails = (product: Product) => (
    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Nome:</Text>
        <Text style={styles.detailValue}>{product.nome}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Descrição:</Text>
        <Text style={styles.detailValue}>{product.descricao || 'Sem descrição'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Preço:</Text>
        <Text style={styles.detailValue}>R$ {product.preco?.toFixed(2) || '0,00'}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Categoria:</Text>
        <Text style={styles.detailValue}>{product.categoriaNome || 'Sem categoria'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onView={handleViewProduct}
        onDelete={handleDeleteProduct}
        refreshing={refreshing}
        onRefresh={refreshProducts}
      />

      <TouchableOpacity style={styles.fab} onPress={handleNewProduct}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modal.visible}
        title={modal.title}
        onClose={modal.closeModal}
      >
        {modal.type === 'view' && modal.data && (
          renderProductDetails(modal.data as Product)
        )}

        {(modal.type === 'create' || modal.type === 'edit') && (
          <ProductForm
            product={modal.type === 'edit' ? (modal.data as Product) : null}
            categories={categories}
            onSubmit={modal.type === 'create' ? handleCreateProduct : handleUpdateProduct}
            onCancel={modal.closeModal}
            loading={loading}
          />
        )}

        {modal.type === 'delete' && modal.data && (
          <View style={styles.deleteContainer}>
            <Ionicons name="warning" size={48} color="#e74c3c" />
            <Text style={styles.deleteTitle}>Excluir Produto</Text>
            <Text style={styles.deleteMessage}>
              Tem certeza que deseja excluir o produto "{((modal.data as Product).nome)}"?
            </Text>
            <View style={styles.deleteActions}>
              <TouchableOpacity
                style={[styles.deleteButton, styles.cancelDeleteButton]}
                onPress={modal.closeModal}
              >
                <Text style={styles.cancelDeleteText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButton, styles.confirmDeleteButton]}
                onPress={() => handleDeleteProduct((modal.data as Product).id)}
                disabled={loading}
              >
                <Text style={styles.confirmDeleteText}>
                  {loading ? 'Excluindo...' : 'Excluir'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 2,
    textAlign: 'right',
  },
  deleteContainer: {
    alignItems: 'center',
    padding: 24,
  },
  deleteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  deleteMessage: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  deleteActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  deleteButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelDeleteButton: {
    backgroundColor: '#ecf0f1',
  },
  confirmDeleteButton: {
    backgroundColor: '#e74c3c',
  },
  cancelDeleteText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmDeleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});