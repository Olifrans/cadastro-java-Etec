import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { Product, ProductDTO, Category } from '../types';

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onSubmit: (data: ProductDTO) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoriaId: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    preco: '',
    categoriaId: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome,
        descricao: product.descricao || '',
        preco: product.preco?.toString() || '',
        categoriaId: product.categoriaId?.toString() || '',
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors = {
      nome: '',
      preco: '',
      categoriaId: '',
    };

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero';
    }

    if (!formData.categoriaId) {
      newErrors.categoriaId = 'Categoria é obrigatória';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const productData: ProductDTO = {
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim(),
      preco: parseFloat(formData.preco),
      categoriaId: parseInt(formData.categoriaId),
    };

    if (product?.id) {
      productData.id = product.id;
    }

    onSubmit(productData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Produto *</Text>
        <TextInput
          style={[styles.input, errors.nome && styles.inputError]}
          value={formData.nome}
          onChangeText={(text) => setFormData(prev => ({ ...prev, nome: text }))}
          placeholder="Digite o nome do produto"
        />
        {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.descricao}
          onChangeText={(text) => setFormData(prev => ({ ...prev, descricao: text }))}
          placeholder="Digite a descrição do produto"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Preço (R$) *</Text>
        <TextInput
          style={[styles.input, errors.preco && styles.inputError]}
          value={formData.preco}
          onChangeText={(text) => setFormData(prev => ({ ...prev, preco: text.replace(/[^0-9.,]/g, '') }))}
          placeholder="0,00"
          keyboardType="decimal-pad"
        />
        {errors.preco ? <Text style={styles.errorText}>{errors.preco}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoria *</Text>
        <View style={[styles.select, errors.categoriaId && styles.inputError]}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.option,
                formData.categoriaId === category.id.toString() && styles.optionSelected,
              ]}
              onPress={() => setFormData(prev => ({ ...prev, categoriaId: category.id.toString() }))}
            >
              <Text
                style={[
                  styles.optionText,
                  formData.categoriaId === category.id.toString() && styles.optionTextSelected,
                ]}
              >
                {category.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.categoriaId ? <Text style={styles.errorText}>{errors.categoriaId}</Text> : null}
      </View>

      <View style={styles.formActions}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Salvando...' : product ? 'Atualizar' : 'Criar'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  select: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionSelected: {
    backgroundColor: '#3498db',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#ecf0f1',
  },
  submitButton: {
    backgroundColor: '#3498db',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});