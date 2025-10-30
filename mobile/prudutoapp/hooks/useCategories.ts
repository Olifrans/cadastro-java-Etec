import { useState, useEffect, useCallback } from 'react';
import { Category } from '../types';
import { apiService } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      setError(null);
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error(err);
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    setRefreshing(true);
    await loadCategories();
    setRefreshing(false);
  }, [loadCategories]);

  const createCategory = useCallback(async (name: string) => {
    try {
      setLoading(true);
      const newCategory = await apiService.createCategory({ nome: name });
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError('Erro ao criar categoria');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await apiService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError('Erro ao excluir categoria');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    refreshing,
    loadCategories,
    refreshCategories,
    createCategory,
    deleteCategory,
  };
};