import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { Card, Icon, List } from 'react-native-paper';
import IconEmpresasSVG from '../../src/assets/svg/home/ico_empresas.svg';

const SelectCompanyScreen = ({ navigation }: any) => {

    const [listCompanies, setListCompanies] = useState([
        {
            company: {
                legalName: 'Company One',
                typeDocument: { name: 'ID' },
                numberDocument: '12345678',
            },
        },
        {
            company: {
                legalName: 'Company One',
                typeDocument: { name: 'ID' },
                numberDocument: '12345678',
            },
        },
        {
            company: {
                legalName: 'Company One',
                typeDocument: { name: 'ID' },
                numberDocument: '12345678',
            },
        },
        {
            company: {
                legalName: 'Company Two',
                typeDocument: { name: 'ID' },
                numberDocument: '87654321',
            },
        },
        {
            company: {
                legalName: 'Company One',
                typeDocument: { name: 'ID' },
                numberDocument: '12345678',
            },
        },
        {
            company: {
                legalName: 'Company Two',
                typeDocument: { name: 'ID' },
                numberDocument: '87654321',
            },
        },
    ]);

    const backOnPress = useCallback(async () => {
        navigation.goBack();
    }, []);

    const handleSelect = useCallback(async (item: any) => {

    }, []);

    const renderItem = ({ item, index }: any) => (
        <Card
            key={index} 
            style={{ marginBottom: 10,marginRight:10,
                marginLeft:10,
                
             
                    // Shadow for iOS
                    shadowColor: '#CCC',
                    shadowOffset: {
                      width: 5, // Right shadow
                      height: 5, // Bottom shadow
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                    elevation: 5,
                  
             }}
            onPress={() => handleSelect(item)}
        >
            <Card.Content style={{ borderLeftWidth: 8,paddingVertical:10, borderLeftColor: '#a13ea1',
              borderRadius:5,
                backgroundColor:'#ffffff' }}>
                <List.Item style={{paddingRight:0}} descriptionStyle={{paddingLeft:0}}
                    title={
                        <Text style={{ fontWeight: 'bold', color: '#1f2937' }}>
                            {item.company.legalName}
                        </Text>
                    }
                    description={
                        <Text style={{ color: '#1f2937' }}>
                            {item.company.typeDocument.name}: {item.company.numberDocument}
                        </Text>
                    }
                    left={() => (
                        <IconEmpresasSVG width={56}style={{paddingHorizontal:16}} />
                    )}
                />
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container} >

            <View style={styles.header}>
                <Text style={styles.headerText}>Selección de empresa</Text>
                <TouchableOpacity style={styles.backButton} onPress={backOnPress}>
                    <Icon source="chevron-left" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={{ marginTop: -40, borderRadius: 8, padding: 0,paddingBottom:20, backgroundColor: '#ffffff', flex: 1 }}>
                    <View style={styles.info}>
                        <Text style={{textAlign:'center',color:'#94a3b8',fontSize:12}}>Para continuar, elige la empresa en la que harás las operaciones.</Text>
                    </View>
                    <ScrollView style={{height:0}} contentContainerStyle={styles.scrollView} >
                        <FlatList
                            data={listCompanies}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
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
        //justifyContent: 'center',
        padding: 16
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
    info: {
        color: '#0000DD',
        fontSize: 10,
        justifyContent: 'center',
        paddingBottom:30,
        paddingRight:8,
        textAlign: 'center',
        height: 80
    },
    backButton: {
        position: 'absolute',
        left: 6,
        top: 26,
        zIndex: 50,
    }
});

export default SelectCompanyScreen;