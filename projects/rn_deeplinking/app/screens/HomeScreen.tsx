import React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import IconFooterSVG from '../../assets/svg/icons/icon-footer.svg';

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Button title="Select Company" onPress={() => {/* open modal */}} />
          <IconFooterSVG />
          <Button title="Options" onPress={() => {/* open popup menu */}} />
        </View>
        {/* Product Selector */}
        <View style={styles.productSelector}>
          {/* Combo to select product */}
        </View>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <Text>Mi Recibo</Text>
          </View>
          <View style={styles.section}>
            <Text>Saldos</Text>
          </View>
          <View style={styles.section}>
            <Text>Mis Solicitudes</Text>
          </View>
        </ScrollView>
        {/* Footer */}
        <View style={styles.footer}>
          <IconFooterSVG />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    logo: {
      width: 50,
      height: 50,
    },
    productSelector: {
      // Style for product selector
    },
    content: {
      padding: 10,
    },
    section: {
      marginVertical: 10,
    },
    footer: {
      alignItems: 'center',
      padding: 10,
    },
    footerImage: {
      width: 100,
      height: 50,
    },
  });
  
  export default HomeScreen;