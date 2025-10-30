import { useCallback, useState } from 'react';
import { Category, ModalState, Product } from '../types';

const initialState: ModalState = {
  visible: false,
  type: 'view',
  title: '',
  data: null,
};

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>(initialState);

  const openCreateModal = useCallback((title: string) => {
    setModalState({
      visible: true,
      type: 'create',
      title,
      data: null,
    });
  }, []);

  const openEditModal = useCallback((title: string, data: Product | Category) => {
    setModalState({
      visible: true,
      type: 'edit',
      title,
      data,
    });
  }, []);

  const openViewModal = useCallback((title: string, data: Product | Category) => {
    setModalState({
      visible: true,
      type: 'view',
      title,
      data,
    });
  }, []);

  const openDeleteModal = useCallback((title: string, data: Product | Category) => {
    setModalState({
      visible: true,
      type: 'delete',
      title,
      data,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prevState => ({
      ...prevState,
      visible: false,
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