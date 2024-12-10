import { View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { TextInput, Button, Checkbox, Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';
//import { useRouter } from 'expo-router';
import globalStyles from '../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const ContraseniaPanel = () => {

    const navigation:any = useNavigation();
    
    const dispatch = useDispatch();

    const documentOptions = [
        { label: 'DNI', value: 'DNI' },
        { label: 'Carné de extranjería', value: 'Carné de extranjería' },
        { label: 'Pasaporte', value: 'Pasaporte' },
        { label: 'Otros', value: 'Otros' },
    ];

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            document: '',
            password: ''
        },
    });

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [hidePassword, setHidePassword] = useState(true);

    const [remember, setRemember] = useState(false);

    //const router = useRouter();

    const [showModal, setShowModal] = useState(false);  // State to show/hide modal

    const selectDocumentOnPress = (item: any) => {
        setSelectedDocument(item.value);
        setShowModal(false);
    };

    const onSubmit = (data: any) => {
        console.log('Login data:', data);
        dispatch(login());
        navigation.navigate('Home')
        //router.push('/');
    };

    return <ScrollView style={styles.scene}>
        <Portal>
            <Modal visible={showModal} contentContainerStyle={{ alignItems: 'center' }} onDismiss={() => { setShowModal(false) }} >
                <View style={styles.modalContent}>
                    <FlatList
                        data={documentOptions}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => selectDocumentOnPress(item)} style={{
                                ...styles.modalItem,
                                backgroundColor: item.label == selectedDocument ? '#f1f1f1' : 'white'
                            }}>
                                <Text style={{color:(item.label == selectedDocument ?'#000':'#939393')}}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </Portal>
        <View style={{ padding: 28, height: 0 }}>
            <Text style={globalStyles.infoText}>
                Ingresa con tu contraseña para gestionar los productos de tu empresa { }
            </Text>
            <Text style={styles.label}>Doc. Identidad</Text>
            <TouchableOpacity style={styles.select} onPress={() => {
                setShowModal(true)
            }}>
                <Text>{selectedDocument || 'Seleccionar documento'}</Text>
                <Icon name="expand-more" 
                size={24} color="#999" 
                style={{padding:0,margin:0}} />
            </TouchableOpacity>
            <Controller
                control={control}
                rules={{ required: 'El documento es requerido' }}
                name="document"
                render={({ field: { onChange, onBlur, value } }:any) => (
                    <TextInput
                        label="Nro. de documento"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        keyboardType="numeric"
                        error={!!errors.document}
                        style={styles.input}
                    />
                )}
            />
            {errors.document && <Text style={styles.errorText}>{(errors as any).document.message}</Text>}

            <Controller
                control={control}
                rules={{ required: 'La contraseña es requerida', minLength: 6 }}
                name="password"
                render={({ field: { onChange, onBlur, value } }:any) => (
                    <TextInput
                        label="Contraseña"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={hidePassword}
                        right={<TextInput.Icon icon={hidePassword ? "eye-off" : "eye"}
                            onPress={() => setHidePassword(!hidePassword)} />}
                        error={!!errors.password}
                        style={styles.input}
                    />
                )}
            />
            {errors.password && <Text style={styles.errorText}>La contraseña debe tener al menos 6 caracteres</Text>}
            <View style={styles.rememberSection}>
                <Checkbox
                    status={remember ? 'checked' : 'unchecked'}
                    onPress={() => setRemember(!remember)}
                />
                <Text style={styles.rememberText}>Recordar Datos</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('recovery-password')
                }}>
                    <Text style={styles.recoveryText}>Recupera Contraseña</Text>
                </TouchableOpacity>
            </View>
            <View style={{ maxWidth: 276, width: 276, minWidth: 0, alignSelf: 'center' }}>
                <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!watch('document') || !watch('password')}

                >
                    INGRESAR
                </Button>

                <Button
                    mode="outlined"
                    icon="fingerprint"
                    onPress={() => { /* handle biometric login */ }}
                    style={styles.biometricButton}
                >
                    Ingresar con biometría
                </Button>
            </View>
            <Text style={[styles.registerText, { paddingBottom: 28 }]}>
                ¿Todavía no tienes cuenta?{' '}
                <Text style={styles.registerLink} onPress={() => {
                    navigation.navigate('register')
                }}>
                    Regístrate
                </Text>
            </Text>
        </View>
    </ScrollView>
};

export default ContraseniaPanel;

/*
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
*/

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: {
        backgroundColor: 'white',
        width: 320
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    modalItem: { paddingVertical: 20, paddingHorizontal: 16 },
    headerImage: {
        width: '100%',
        height: 176,
        resizeMode: 'stretch',
    },
    scene: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    infoText: {
        color: 'gray',
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        marginTop: 10,
    },
    select: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginTop: 10,



        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    input: {
        marginTop: 20,
        backgroundColor: 'white'
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    rememberSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: -8
    },
    rememberText: {
        color: 'gray',
        flex: 1
    },
    recoveryText: {
        color: '#007BFF',
    },
    loginButton: {
        marginTop: 20,
    },
    biometricButton: {
        marginTop: 10,
    },
    registerText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'gray',
    },
    registerLink: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});