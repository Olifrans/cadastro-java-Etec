import { useState, useEffect, useCallback } from 'react';
import { Product } from './types';
import { apiService } from './api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      const newProduct = await apiService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: number, productData: Partial<Product>) => {
    setLoading(true);
    try {
      const updatedProduct = await apiService.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await apiService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProduct = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const product = await apiService.getProduct(id);
      setSelectedProduct(product);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produto');
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
    selectedProduct,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    setSelectedProduct,
  };
};