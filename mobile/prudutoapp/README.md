
## Instalar dependencias do Projeto Expo - App de Produtos com CRUD

npm i expo
npm i expo-router
npm i react
npm i expo-status-bar
npm i react-native
npm i @expo/vector-icons
npm i @babel/core
npm i @types/react
npm i typescript"




# Documentação Geral do Projeto - App de Produtos
📋 Estrutura do Projeto
prudutoapp/
├── 📱 app/
│   ├── (tabs)/
│   │   ├── index.tsx              # Tela inicial
│   │   ├── explore.tsx            # Tela de explorar produtos
│   │   ├── favorites.tsx          # Tela de favoritos
│   │   └── _layout.tsx            # Layout das abas
│   ├── modal.tsx                  # Modal de detalhes do produto
│   └── _layout.tsx                # Layout principal
├── 🧩 components/
│   ├── ProductCard.tsx            # Card de produto
│   └── ProductForm.tsx            # Formulário de produto
├── 🪝 hooks/
│   ├── useProducts.ts             # Hook para gerenciar produtos
│   ├── useCategories.ts           # Hook para categorias
│   └── useModal.ts                # Hook para modais
├── 🔌 services/
│   ├── apiService.ts              # Serviço para API REST
│   └── productService.ts          # Serviço local (backup)
├── 📊 types/
│   └── index.ts                   # Tipos TypeScript
└── 📄 package.json

## 🚀 Tecnologias Utilizadas
Expo SDK 50 - Framework React Native

React Native - Desenvolvimento mobile

TypeScript - Tipagem estática

Expo Router - Navegação

Ionicons - Ícones

Fetch API - Comunicação HTTP

## 🎯 Funcionalidades Principais
✅ CRUD Completo
Create: Adicionar novos produtos

Read: Listar, buscar e filtrar produtos

Update: Editar produtos existentes

Delete: Remover produtos

🏠 Tela Inicial (index.tsx)
Header com boas-vindas

Barra de busca

Grid de categorias

Produtos em destaque (favoritos)

Banner promocional

🔍 Tela Explorar (explore.tsx)
Busca em tempo real

Filtros por categoria

Lista de produtos

Ações de editar/excluir

❤️ Tela Favoritos (favorites.tsx)
Lista de produtos favoritados

Empty state quando não há favoritos

📱 Modal de Produto (modal.tsx)
Detalhes completos do produto

Ações: favoritar, editar, excluir

Características e descrição

🔧 Configuração Técnica
Estrutura de Dados (types/index.ts)
typescript
export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  isFavorite: boolean;
  description?: string;
  image?: string;
  stock: number;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}
API Service (services/apiService.ts)
typescript
const API_BASE_URL = 'http://localhost:8080';

export const apiService = {
  async getProducts(): Promise<Product[]>,
  async getProductById(id: number): Promise<Product>,
  async createProduct(data: CreateProductData): Promise<Product>,
  async updateProduct(id: number, data: UpdateProductData): Promise<Product>,
  async deleteProduct(id: number): Promise<void>,
  async toggleFavorite(id: number): Promise<Product>,
};
Hooks Principais
useProducts
typescript
const {
  products,           // Lista de produtos
  loading,            // Estado de carregamento
  error,              // Erros da API
  addProduct,         // Criar produto
  updateProduct,      // Atualizar produto
  deleteProduct,      // Deletar produto
  toggleFavorite,     // Alternar favorito
  searchProducts,     // Buscar produtos
  getFavoriteProducts // Produtos favoritos
} = useProducts();
useCategories
typescript
const {
  categories,         // Lista de categorias
  selectedCategory,   // Categoria selecionada
  setSelectedCategory // Alterar categoria
} = useCategories();
useModal
typescript
const {
  openProductModal,   // Abrir modal de produto
  openFormModal,      // Abrir formulário
  closeProductModal,  // Fechar modal
  closeFormModal      // Fechar formulário
} = useModal();
🎨 Design System
Cores
Primária: #007AFF (Azul)

Sucesso: #34C759 (Verde)

Aviso: #FF9500 (Laranja)

Erro: #FF3B30 (Vermelho)

Neutro: #8E8E93 (Cinza)

Fundo: #F2F2F7 (Cinza claro)

Componentes
ProductCard
typescript
interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}
ProductForm
typescript
interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductData) => Promise<boolean>;
  onCancel: () => void;
  loading?: boolean;
}
📱 Telas e Navegação
Layout Principal
Tab Navigation com 3 abas

Stack Navigation para modais

Header personalizado

Fluxo de Navegação
text
Home → [Produto] → Modal de Detalhes
Explore → [Filtros] → [Produto] → Modal
Favoritos → [Produto] → Modal
🔄 Integração com API
Endpoints Esperados
text
GET    /products                    # Listar produtos
GET    /products/:id                # Buscar produto por ID
POST   /products                    # Criar produto
PUT    /products/:id                # Atualizar produto
DELETE /products/:id                # Deletar produto
PATCH  /products/:id/favorite       # Alternar favorito
GET    /products?category=:cat      # Filtrar por categoria
GET    /products?search=:term       # Buscar produtos
GET    /products?favorite=true      # Produtos favoritos
Modelo de Dados da API
json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "price": "R$ 7.999,99",
  "originalPrice": "R$ 8.499,99",
  "category": "Smartphones",
  "rating": 4.9,
  "isFavorite": true,
  "description": "Descrição do produto",
  "stock": 15,
  "features": ["Característica 1", "Característica 2"],
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
🛠️ Configuração de Desenvolvimento
Instalação
bash
npm install
npx expo start
Variáveis de Ambiente
typescript
const API_BASE_URL = 'http://localhost:8080'; // Desenvolvimento
// ou
const API_BASE_URL = 'http://192.168.1.100:8080'; // Rede local
Scripts Disponíveis
json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
}
📊 Estado da Aplicação
Gestão de Estado
useState para estado local

useEffect para side effects

Custom Hooks para lógica reutilizável

Fluxo de Dados
text
API → Services → Hooks → Components → UI
🎯 Próximos Passos
Melhorias Futuras
Autenticação - Sistema de login

Upload de Imagens - Fotos dos produtos

Carrinho de Compras - Funcionalidade de e-commerce

Paginação - Para muitos produtos

Offline Support - Dados locais

Push Notifications - Alertas de promoções

Otimizações
Lazy Loading para imagens

Virtualized Lists para performance

Cache de requisições

Error Boundaries para tratamento de erros

📝 Notas de Desenvolvimento
Padrões Adotados
Componentes Funcionais com Hooks

TypeScript para type safety

Separation of Concerns (Serviços, Hooks, Components)

Mobile-First Design

Boas Práticas
Nomenclatura consistente

Código modular e reutilizável

Tratamento de erros

Loading states

Empty states

