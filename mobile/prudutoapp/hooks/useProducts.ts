import { useState, useEffect, useCallback } from 'react';
import { Product, ProductDTO } from '../types';
import { apiService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, [loadProducts]);

  const createProduct = useCallback(async (productData: ProductDTO) => {
    try {
      setLoading(true);
      const newProduct = await apiService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Erro ao criar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: number, productData: ProductDTO) => {
    try {
      setLoading(true);
      const updatedProduct = await apiService.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError('Erro ao atualizar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await apiService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Erro ao excluir produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    refreshing,
    loadProducts,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};