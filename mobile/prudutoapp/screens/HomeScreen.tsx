import React from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { DashboardStats } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    products, 
    refreshing: productsRefreshing, 
    refreshProducts 
  } = useProducts();
  
  const { 
    categories, 
    refreshing: categoriesRefreshing, 
    refreshCategories 
  } = useCategories();

  const handleRefresh = () => {
    refreshProducts();
    refreshCategories();
  };

  const stats: DashboardStats = {
    totalProdutos: products.length,
    totalCategorias: categories.length,
    valorMedio: products.length > 0 
      ? products.reduce((sum, p) => sum + (p.preco || 0), 0) / products.length 
      : 0,
    produtosSemCategoria: products.filter(p => !p.categoriaId).length,
    produtoMaisCaro: products.length > 0 
      ? Math.max(...products.map(p => p.preco || 0)) 
      : 0,
    produtoMaisBarato: products.length > 0 
      ? Math.min(...products.map(p => p.preco || 0)) 
      : 0,
    valorTotalEstoque: products.reduce((sum, p) => sum + (p.preco || 0), 0),
  };

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    color 
  }: { 
    title: string; 
    value: string; 
    subtitle: string; 
    icon: string; 
    color: string; 
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View>
          <Text style={styles.statTitle}>{title}</Text>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statSubtitle}>{subtitle}</Text>
        </View>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
      </View>
    </View>
  );

  const recentProducts = products.slice(-5).reverse();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={productsRefreshing || categoriesRefreshing} 
          onRefresh={handleRefresh} 
        />
      }
    >
      <Text style={styles.sectionTitle}>Visão Geral</Text>
      
      <View style={styles.statsGrid}>
        <StatCard
          title="Total de Produtos"
          value={stats.totalProdutos.toString()}
          subtitle="Produtos cadastrados"
          icon="cube"
          color="#3498db"
        />
        <StatCard
          title="Total de Categorias"
          value={stats.totalCategorias.toString()}
          subtitle="Categorias cadastradas"
          icon="pricetags"
          color="#2ecc71"
        />
        <StatCard
          title="Valor Médio"
          value={`R$ ${stats.valorMedio.toFixed(2)}`}
          subtitle="Preço médio"
          icon="trending-up"
          color="#f39c12"
        />
        <StatCard
          title="Sem Categoria"
          value={stats.produtosSemCategoria.toString()}
          subtitle="Produtos sem categoria"
          icon="warning"
          color="#e74c3c"
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Produto Mais Caro"
          value={`R$ ${stats.produtoMaisCaro.toFixed(2)}`}
          subtitle="Maior preço"
          icon="arrow-up"
          color="#27ae60"
        />
        <StatCard
          title="Produto Mais Barato"
          value={`R$ ${stats.produtoMaisBarato.toFixed(2)}`}
          subtitle="Menor preço"
          icon="arrow-down"
          color="#e67e22"
        />
        <StatCard
          title="Valor Total"
          value={`R$ ${stats.valorTotalEstoque.toFixed(2)}`}
          subtitle="Soma total"
          icon="cash"
          color="#9b59b6"
        />
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Produtos Recentes</Text>
        {recentProducts.length === 0 ? (
          <View style={styles.emptyRecent}>
            <Ionicons name="time-outline" size={48} color="#ccc" />
            <Text style={styles.emptyRecentText}>Nenhum produto recente</Text>
          </View>
        ) : (
          recentProducts.map((product) => (
            <View key={product.id} style={styles.recentProduct}>
              <View style={styles.recentProductInfo}>
                <Text style={styles.recentProductName}>{product.nome}</Text>
                <Text style={styles.recentProductCategory}>
                  {product.categoriaNome || 'Sem categoria'}
                </Text>
              </View>
              <Text style={styles.recentProductPrice}>
                R$ {product.preco?.toFixed(2) || '0,00'}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statTitle: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#95a5a6',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyRecent: {
    alignItems: 'center',
    padding: 32,
  },
  emptyRecentText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
  },
  recentProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  recentProductInfo: {
    flex: 1,
  },
  recentProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  recentProductCategory: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  recentProductPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});