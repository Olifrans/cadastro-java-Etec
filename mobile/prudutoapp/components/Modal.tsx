import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal as RNModal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  onClose,
}) => {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#7f8c8d" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    maxHeight: '100%',
  },
});