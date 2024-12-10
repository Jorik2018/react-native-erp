import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import IconMovistarSVG from '../assets/svg/icons/icon-movistar.svg';
//import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { Icon, Menu, Provider } from 'react-native-paper';
import CustomSelect from '../home/components/CustomSelect';
import Footer from '../home/components/Footer';
import MenuItem from '../home/components/MenuItem';
import { logout } from '../authSlice';
import { useDispatch } from 'react-redux';
import RoundedIconButton from '../components/RoundedIconButton';

const HomeScreen = ({ navigation }: any) => {

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const configurationOnPress = useCallback(async () => {
    navigation.navigate('configuration')
  }, []);

  const selectCompanyOnPress = useCallback(async () => {
    navigation.navigate('select-company')
  }, []);

  const logoutOnPress = useCallback(async () => {
    dispatch(logout());
    //router.push('/');
    navigation.navigate('login')
  }, []);

  return (
    <Provider>
      <View style={styles.container}>

        <View style={styles.header}>
          <RoundedIconButton
            onPress={selectCompanyOnPress}
            iconName="building-o"
            iconSize={16}
            iconColor="#fff"
          />
          <IconMovistarSVG height={30} />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{ backgroundColor: '#f9f9f9' }}
            anchor={
              <RoundedIconButton
                onPress={openMenu}
                iconName="user-o"
                iconSize={16}
                iconColor="#fff"
              />
            }
            style={styles.menu}
          >
            <MenuItem icon="cog" onPress={configurationOnPress} title="Configuración" />
            <MenuItem icon="logout" onPress={logoutOnPress} title="Cerrar Sesión" />
          </Menu>
        </View>
        <View style={styles.productSelector}>
          <CustomSelect legalName={'jjjj'} productSelect={{}} />
        </View>
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
        <Footer />
      </View>
    </Provider>
  );
};

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    width: 120,
    borderRadius: 8,
  },
  optionWrapper: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0b2739',
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 15
  },
  logo: {
    width: 50,
    height: 50,
  },
  productSelector: {
    backgroundColor: '#0b2739',
    paddingBottom: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 8
  },
  content: {
    padding: 10,
  },
  section: {
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row', // Asegura que los elementos estén alineados horizontalmente
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center',
    height: 80,
    backgroundColor: '#0b2739',
  },
  footerImage: {
    width: 100,
    height: 50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  containerPopup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  anchorView: {
    paddingTop: 0,
    marginBottom: 10,
  },
  menu: {
    marginTop: 42, // Adjust the position manually if necessary
    alignSelf: 'flex-end',
  },

});

export default HomeScreen;