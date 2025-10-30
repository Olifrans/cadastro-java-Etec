import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';

export default function ReportsScreen() {
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

  // Estatísticas
  const totalProdutos = products.length;
  const totalCategorias = categories.length;
  const valorMedio = totalProdutos > 0 
    ? products.reduce((sum, p) => sum + (p.preco || 0), 0) / totalProdutos 
    : 0;
  const produtosSemCategoria = products.filter(p => !p.categoriaId).length;
  const produtoMaisCaro = totalProdutos > 0 
    ? Math.max(...products.map(p => p.preco || 0)) 
    : 0;
  const produtoMaisBarato = totalProdutos > 0 
    ? Math.min(...products.map(p => p.preco || 0)) 
    : 0;
  const valorTotalEstoque = products.reduce((sum, p) => sum + (p.preco || 0), 0);

  // Produtos por categoria
  const produtosPorCategoria = categories.map(categoria => {
    const quantidade = products.filter(p => p.categoriaId === categoria.id).length;
    return {
      categoria: categoria.nome,
      quantidade,
      percentual: totalProdutos > 0 ? (quantidade / totalProdutos) * 100 : 0,
    };
  });

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
      <Text style={styles.sectionTitle}>Relatórios e Estatísticas</Text>

      <View style={styles.statsGrid}>
        <StatCard
          title="Produtos por Categoria"
          value={produtosPorCategoria.length.toString()}
          subtitle="Categorias ativas"
          icon="pie-chart"
          color="#3498db"
        />
        <StatCard
          title="Produto Mais Caro"
          value={`R$ ${produtoMaisCaro.toFixed(2)}`}
          subtitle="Maior preço"
          icon="arrow-up"
          color="#2ecc71"
        />
        <StatCard
          title="Produto Mais Barato"
          value={`R$ ${produtoMaisBarato.toFixed(2)}`}
          subtitle="Menor preço"
          icon="arrow-down"
          color="#f39c12"
        />
        <StatCard
          title="Valor Total"
          value={`R$ ${valorTotalEstoque.toFixed(2)}`}
          subtitle="Soma total"
          icon="cash"
          color="#9b59b6"
        />
      </View>

      <View style={styles.detailedStats}>
        <Text style={styles.sectionTitle}>Estatísticas Detalhadas</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total de Produtos</Text>
          <Text style={styles.statValue}>{totalProdutos}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total de Categorias</Text>
          <Text style={styles.statValue}>{totalCategorias}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Produtos sem Categoria</Text>
          <Text style={styles.statValue}>{produtosSemCategoria}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Valor Médio dos Produtos</Text>
          <Text style={styles.statValue}>R$ {valorMedio.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.categoryDistribution}>
        <Text style={styles.sectionTitle}>Distribuição por Categoria</Text>
        
        {produtosPorCategoria.length === 0 ? (
          <View style={styles.emptyDistribution}>
            <Ionicons name="stats-chart-outline" size={48} color="#ccc" />
            <Text style={styles.emptyDistributionText}>
              Nenhuma distribuição disponível
            </Text>
          </View>
        ) : (
          produtosPorCategoria.map((item, index) => (
            <View key={index} style={styles.distributionItem}>
              <View style={styles.distributionInfo}>
                <Text style={styles.distributionCategory}>{item.categoria}</Text>
                <Text style={styles.distributionCount}>
                  {item.quantidade} produtos ({item.percentual.toFixed(1)}%)
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${item.percentual}%`, backgroundColor: getColorByIndex(index) }
                  ]} 
                />
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

// Função auxiliar para cores das barras de progresso
const getColorByIndex = (index: number): string => {
  const colors = ['#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e74c3c', '#1abc9c'];
  return colors[index % colors.length];
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
    marginBottom: 24,
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
  detailedStats: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  categoryDistribution: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyDistribution: {
    alignItems: 'center',
    padding: 32,
  },
  emptyDistributionText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
    textAlign: 'center',
  },
  distributionItem: {
    marginBottom: 16,
  },
  distributionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  distributionCount: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});