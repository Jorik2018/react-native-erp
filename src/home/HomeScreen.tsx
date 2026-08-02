import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Menu,
} from 'react-native-paper';
import {
  useNavigation,
  type NavigationProp,
} from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import IconMovistarSVG from '../assets/svg/icons/icon-header.svg?react';

import CustomSelect from './components/CustomSelect';
import Footer from './components/Footer';
import MenuItem from './components/MenuItem';
import RoundedIconButton from '../components/RoundedIconButton';

import { logoutAndClear } from '../authSlice';
import type { AppDispatch } from '../store';

type HomeStackParamList = {
  configuration: undefined;
  'select-company': undefined;
};

const selectedProduct = {
  id: 1,
  type: 'Línea móvil',
  numero: '999 999 999',
  status: 'Activo' as const,
};

export default function HomeScreen() {
  const navigation =
    useNavigation<NavigationProp<HomeStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const [menuVisible, setMenuVisible] =
    useState(false);

  const openMenu = useCallback(() => {
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const configurationOnPress = useCallback(() => {
    closeMenu();
    navigation.navigate('configuration');
  }, [closeMenu, navigation]);

  const selectCompanyOnPress = useCallback(() => {
    navigation.navigate('select-company');
  }, [navigation]);

  const logoutOnPress = useCallback(async () => {
    try {
      closeMenu();

      await dispatch(logoutAndClear() as any);

      // No uses navigation.navigate('auth')
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }, [closeMenu, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RoundedIconButton
          onPress={selectCompanyOnPress}
          iconName="business"
          iconSize={18}
          iconColor="#fff"
          accessibilityLabel="Seleccionar empresa"
        />

        <IconMovistarSVG
          width={100}
          height={30}
          aria-label="Movistar"
        />

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          contentStyle={styles.menuContent}
          style={styles.menu}
          anchor={
            <RoundedIconButton
              onPress={openMenu}
              iconName="account-circle"
              iconSize={18}
              iconColor="#fff"
              accessibilityLabel="Abrir menú de usuario"
            />
          }
        >
          <MenuItem
            icon="settings"
            title="Configuración"
            onPress={configurationOnPress}
          />

          <MenuItem
            icon="logout"
            title="Cerrar sesión"
            onPress={logoutOnPress}
          />
        </Menu>
      </View>

      <View style={styles.productSelector}>
        <CustomSelect
          legalName="Mi empresa"
          productSelect={selectedProduct}
          onSelect={product => {
            console.log(
              'Producto seleccionado:',
              product,
            );
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            UPDATED ON: 2026-08-02
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Mi recibo
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Saldos
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Mis solicitudes
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={configurationOnPress}
        >
          Abrir configuración
        </Button>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#0b2739',
  },

  productSelector: {
    paddingBottom: 15,
    backgroundColor: '#0b2739',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
  },

  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  menu: {
    marginTop: 42,
    alignSelf: 'flex-end',
  },

  menuContent: {
    backgroundColor: '#f9f9f9',
  },
});