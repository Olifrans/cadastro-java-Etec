import { Product } from './types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // URL exemplo

class ApiService {
  private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products CRUD
  async getProducts(): Promise<Product[]> {
    // Simulando dados já que a API exemplo não tem produtos
    return this.mockProducts();
  }

  async getProduct(id: number): Promise<Product> {
    const products = await this.mockProducts();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    // Simulando criação
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    // Simulando atualização
    const existing = await this.getProduct(id);
    const updatedProduct: Product = {
      ...existing,
      ...product,
      id,
      updatedAt: new Date().toISOString(),
    };
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    // Simulando exclusão
    console.log(`Product ${id} deleted`);
  }

  private mockProducts(): Product[] {
    return [
      {
        id: 1,
        name: "Laptop Gamer",
        description: "Laptop para jogos de alta performance",
        price: 2500.00,
        category: "Eletrônicos",
        image: "https://via.placeholder.com/150",
        inStock: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        name: "Smartphone",
        description: "Smartphone Android com 128GB",
        price: 899.99,
        category: "Eletrônicos",
        image: "https://via.placeholder.com/150",
        inStock: true,
        createdAt: "2024-01-10T14:30:00Z",
        updatedAt: "2024-01-12T09:15:00Z"
      },
      {
        id: 3,
        name: "Headphone Bluetooth",
        description: "Fones de ouvido sem fio com cancelamento de ruído",
        price: 199.99,
        category: "Áudio",
        image: "https://via.placeholder.com/150",
        inStock: false,
        createdAt: "2024-01-05T08:45:00Z",
        updatedAt: "2024-01-08T16:20:00Z"
      }
    ];
  }
}

export const apiService = new ApiService();