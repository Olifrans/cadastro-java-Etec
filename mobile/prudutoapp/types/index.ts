export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: number;
  categoriaNome: string;
}

export interface Category {
  id: number;
  nome: string;
  produtos?: Product[];
}

export interface ProductDTO {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: number;
  categoriaNome?: string;
}

export interface ModalState {
  visible: boolean;
  type: 'create' | 'edit' | 'view' | 'delete';
  title: string;
  data: Product | Category | null;
}

export interface DashboardStats {
  totalProdutos: number;
  totalCategorias: number;
  valorMedio: number;
  produtosSemCategoria: number;
  produtoMaisCaro: number;
  produtoMaisBarato: number;
  valorTotalEstoque: number;
}