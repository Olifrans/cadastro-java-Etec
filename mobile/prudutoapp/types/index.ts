export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  export interface ModalState {
    isOpen: boolean;
    type: 'create' | 'edit' | 'view' | 'delete';
    title: string;
    data: Product | null;
  }