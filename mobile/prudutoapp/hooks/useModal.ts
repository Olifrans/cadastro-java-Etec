import { useState, useCallback } from 'react';
import { Product, ModalState } from './types';

const initialState: ModalState = {
  isOpen: false,
  type: 'view',
  title: '',
  data: null,
};

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>(initialState);

  const openCreateModal = useCallback(() => {
    setModalState({
      isOpen: true,
      type: 'create',
      title: 'Criar Novo Produto',
      data: null,
    });
  }, []);

  const openEditModal = useCallback((product: Product) => {
    setModalState({
      isOpen: true,
      type: 'edit',
      title: 'Editar Produto',
      data: product,
    });
  }, []);

  const openViewModal = useCallback((product: Product) => {
    setModalState({
      isOpen: true,
      type: 'view',
      title: 'Detalhes do Produto',
      data: product,
    });
  }, []);

  const openDeleteModal = useCallback((product: Product) => {
    setModalState({
      isOpen: true,
      type: 'delete',
      title: 'Excluir Produto',
      data: product,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prevState => ({
      ...prevState,
      isOpen: false,
    }));
  }, []);

  const resetModal = useCallback(() => {
    setModalState(initialState);
  }, []);

  return {
    ...modalState,
    openCreateModal,
    openEditModal,
    openViewModal,
    openDeleteModal,
    closeModal,
    resetModal,
  };
};