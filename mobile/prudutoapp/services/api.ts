import axios from 'axios';
import { Category, Product, ProductDTO } from '../types';

// Ajuste para seu IP local - IMPORTANTE: use o IP da sua máquina, não localhost
const API_BASE_URL = 'http://localhost:8080/';
// const API_BASE_URL = 'http://192.168.1.100:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const apiService = {
  // Produtos
  async getProducts(): Promise<Product[]> {
    const response = await api.get('/produtos');
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },

  async createProduct(product: ProductDTO): Promise<Product> {
    const response = await api.post('/produtos', product);
    return response.data;
  },

  async updateProduct(id: number, product: ProductDTO): Promise<Product> {
    const response = await api.put(`/produtos/${id}`, product);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/produtos/${id}`);
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await api.get(`/produtos/categoria/${categoryId}`);
    return response.data;
  },

  // Categorias
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/categorias');
    return response.data;
  },

  async getCategory(id: number): Promise<Category> {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  async createCategory(category: { nome: string }): Promise<Category> {
    const response = await api.post('/categorias', category);
    return response.data;
  },

  async deleteCategory(id: number): Promise<void> {
    await api.delete(`/categorias/${id}`);
  },
};