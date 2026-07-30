import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ProductStatus = 'Activo' | 'Suspendido';

type ProductOption = {
  id: number;
  type: string;
  numero: string;
  status: ProductStatus;
};

type CustomSelectProps = {
  legalName: string;
  productSelect: ProductOption;
  onSelect?: (option: ProductOption) => void;
};

const OPTIONS: ProductOption[] = [
  {
    id: 1,
    type: 'Option 1',
    numero: '12345',
    status: 'Activo',
  },
  {
    id: 2,
    type: 'Option 2',
    numero: '67890',
    status: 'Suspendido',
  },
  {
    id: 3,
    type: 'Option 3',
    numero: '11223',
    status: 'Activo',
  },
];

export default function CustomSelect({
  legalName,
  productSelect,
  onSelect,
}: CustomSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const statusStyle = useMemo(
    () =>
      productSelect.status === 'Activo'
        ? styles.activeStatus
        : styles.suspendedStatus,
    [productSelect.status],
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelectOption = (option: ProductOption) => {
    onSelect?.(option);
    closeModal();
  };

  const renderOption: ListRenderItem<ProductOption> = ({
    item,
  }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Seleccionar ${item.type} ${item.numero}`}
      onPress={() => handleSelectOption(item)}
      style={({ pressed }) => [
        styles.optionItem,
        pressed && styles.optionPressed,
      ]}
    >
      <View>
        <Text style={styles.optionType}>
          {item.type}
        </Text>

        <Text style={styles.optionNumber}>
          {item.numero}
        </Text>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={24}
        color="#777"
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Seleccionar producto"
        accessibilityState={{ expanded: modalVisible }}
        onPress={openModal}
        style={({ pressed }) => [
          styles.selectBox,
          pressed && styles.selectBoxPressed,
        ]}
      >
        <View style={styles.productInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.legalNameText}>
              {legalName}
            </Text>

            <Text
              style={[
                styles.statusText,
                statusStyle,
              ]}
            >
              {productSelect.status}
            </Text>
          </View>

          <Text style={styles.productText}>
            <Text style={styles.boldText}>
              {productSelect.type}
            </Text>{' '}
            {productSelect.numero}
          </Text>
        </View>

        <MaterialIcons
          name="expand-more"
          size={32}
          color="#999"
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeModal}
            accessibilityRole="button"
            accessibilityLabel="Cerrar selector"
          />

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Selecciona un producto
            </Text>

            <FlatList
              data={OPTIONS}
              keyExtractor={item =>
                item.id.toString()
              }
              renderItem={renderOption}
              keyboardShouldPersistTaps="handled"
            />

            <Pressable
              accessibilityRole="button"
              onPress={closeModal}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Text style={styles.closeButtonText}>
                Cerrar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  selectBoxPressed: {
    opacity: 0.85,
  },

  productInfo: {
    flex: 1,
    marginRight: 12,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  legalNameText: {
    fontWeight: '700',
    color: '#333',
  },

  statusText: {
    marginLeft: 6,
    fontWeight: '600',
  },

  activeStatus: {
    color: 'green',
  },

  suspendedStatus: {
    color: 'red',
  },

  productText: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },

  boldText: {
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '70%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  modalTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  optionItem: {
    minHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionPressed: {
    backgroundColor: '#f3f3f3',
  },

  optionType: {
    fontWeight: '600',
    color: '#333',
  },

  optionNumber: {
    marginTop: 2,
    color: '#666',
  },

  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#007BFF',
    borderRadius: 6,
    alignItems: 'center',
  },

  closeButtonPressed: {
    opacity: 0.8,
  },

  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});