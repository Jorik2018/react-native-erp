import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomSelect = ({ legalName, productSelect }:any) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Lista de opciones para el Select
  const options = [
    { id: 1, type: 'Option 1', numero: '12345' },
    { id: 2, type: 'Option 2', numero: '67890' },
    { id: 3, type: 'Option 3', numero: '11223' },
  ];

  const handleSelectOption = (option:any) => {
    // Aquí puedes manejar la opción seleccionada
    setModalVisible(false);
    console.log("Opción seleccionada:", option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectBox} onPress={() => setModalVisible(true)}>
        <View style={styles.flexCol}>
          <Text style={styles.legalNameText}>
            {legalName} <Text style={[styles.statusText, productSelect.status === 'Activo' ? styles.activeStatus : styles.suspendedStatus]}>
              {productSelect.status}
            </Text>
          </Text>
          <Text style={styles.productText}>
            <Text style={styles.boldText}>{productSelect.type}</Text> {productSelect.numero}
          </Text>
        </View>
        <Icon name="expand-more" size={32} color="#999" />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => handleSelectOption(item)}>
                  <Text>{item.type} - {item.numero}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    elevation: 1, // Sombras en Android
  },
  flexCol: {
    flexDirection: 'column',
  },
  legalNameText: {
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    marginLeft: 4,
  },
  activeStatus: {
    color: 'green',
  },
  suspendedStatus: {
    color: 'red',
  },
  productText: {
    color: '#555',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomSelect;
