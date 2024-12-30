import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Footer from './components/Footer';
import { Icon } from 'react-native-paper';
import ConfigurationSVG from '../assets/svg/home/configuration.svg?react';

const ConfigurationScreen = ({ navigation }: any) => {

    const [contact, setContact] = useState({ firstName: 'HUGO', lastName: 'SALAZAR' });

    const [legalName, setLegalName] = useState('PRUEBAS AMDOCS SET4');

    const [rolName, setRolName] = useState('Decisor');

    const [listSidebar, setListSidebar] = useState([
        {
          icon: 'support_regular_24',
          text: 'Cambiar de empresa',
          view: true,
          url: '/home/select-company',
        },
        {
          icon: 'support_regular_24',
          text: 'Cambiar contraseña',
          view: true,
          url: '/home',
        },
        {
          icon: 'authentication_error_regular_20',
          text: 'Darme de baja',
          view: true,
          url: '/home',
        },
        {
          icon: 'code',
          text: 'Licencias de codigo abierto',
          view: true,
          url: 'code-licenses',
        },
        {
          icon: 'support_regular_24',
          text: 'Mis compras',
          view: true,
          url: '/home',
        },
        {
          icon: 'support_regular_24',
          text: 'Configuraciones',
          view: false,
          url: '/home',
        },
        {
          icon: 'support_regular_24',
          text: 'Con mi número',
          view: false,
          url: '/home',
        },
        {
          icon: 'support_regular_24',
          text: 'Soporte',
          view: true,
          url: '/home',
        },
      ]);

    const handleSelectOption = useCallback(async (value: any) => {
        navigation.navigate(value.url)
    }, []);

    const backOnPress = useCallback(async () => {
        navigation.goBack();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.topSection}>
                <View style={styles.profileInfo}>
                    <View style={styles.profilePic}>
                        <Text style={styles.initials}>
                            {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                        </Text>
                    </View>
                    <Text style={styles.name}>{contact.firstName} {contact.lastName} - {rolName}</Text>
                    <Text style={styles.legalName}>
                        {legalName.length > 30 ? legalName.slice(0, 30) + '...' : legalName}
                    </Text>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={backOnPress}>
                    <Icon source="chevron-left" size={32} color="white" />
                </TouchableOpacity>
                <ConfigurationSVG style={{ position: 'absolute',width:'100%' }} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {listSidebar.map((item, index) => (
                    item.view && (
                        <TouchableOpacity key={index} style={styles.sidebarItem} onPress={() => handleSelectOption(item)}>
                            <View style={styles.sidebarContent}>
                                <Icon source={item.icon} size={24} color="#5e6067" />
                                <Text style={styles.sidebarText}>{item.text}</Text>
                                <Icon source="chevron-right" size={26} color="#5e6067" />
                            </View>
                        </TouchableOpacity>
                    )
                ))}
            </ScrollView>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
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

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topSection: {
        height: '30%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        alignItems: 'center',
        zIndex: 10,
    },
    profilePic: {
        height: 48,
        width: 48,
        borderRadius: 24,
        marginBottom:20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        color: '#663399', // Regal purple color
        fontSize: 18,
    },
    name: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom:18
    },
    legalName: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    backButton: {
        position: 'absolute',
        left: 6,
        top: 50,
        zIndex: 50,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    sidebarSection: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sidebarItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    sidebarContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sidebarText: {
        marginLeft:12,
        fontSize: 16,
        flex:1,
        color: '#5e6067',
    },
});

export default ConfigurationScreen;