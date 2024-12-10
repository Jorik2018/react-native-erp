import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
//import { WebView } from 'react-native-webview';
import { Icon } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { returnData } from '../utils/data-terms-condition';

const CodeLicensesScreen = ({ navigation }: any) => {

    const innerHTML = '<div style="padding: 20px;">'+returnData('licencias')+'</div>';

    const backOnPress = useCallback(async () => {
        navigation.goBack();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Licencias de código abierto</Text>
                <TouchableOpacity style={styles.backButton} onPress={backOnPress}>
                    <Icon source="chevron-left" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.scrollView} style={{ marginTop: -40, borderRadius: 8,height:0 }}>
                    <RenderHTML source={{ html: innerHTML }}/>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1, // Ensure content stays in the center
        justifyContent: 'center', // Center content vertically
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        textAlign: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 11
    },
    body: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        justifyContent: 'center',
        padding: 16
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
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b2739',
        paddingTop: 12,
        paddingBottom: 10,
        paddingHorizontal: 15,

        height: 112,
        position: 'relative',
    },
    initials: {
        color: '#663399', // Regal purple color
        fontSize: 18,
    },
    name: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 18
    },
    legalName: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    backButton: {
        position: 'absolute',
        left: 6,
        top: 26,
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sidebarText: {
        fontSize: 16,
        color: '#5e6067',
    },
});

export default CodeLicensesScreen;