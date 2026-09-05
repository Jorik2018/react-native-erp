import { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { Pressable } from 'react-native';
import Loader from './Components/Loader';
import Banner from '../assets/image/logo2018.png';
import { toImageSource } from '../utils/imageSource';

//import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [backgroundUrl] = useState(
    'https://web.regionancash.gob.pe/fs/images/background/SECHIN.jpg'
  );
  const passwordInputRef = createRef<any>();
  const [_destiny, setDestiny] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setDestiny(params.get('destiny'));
    }
  }, []);
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = { user_email: userEmail, user_password: userPassword } as any;
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    //formBody = formBody.join('&');


  };

  return (
    <ImageBackground
      source={{ uri: backgroundUrl }}
      resizeMode="cover"
      style={styles.background}
    >
      <Loader loading={loading} />

      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>

            {/* CABECERA AZUL */}
            <View style={styles.header}>
              <Image
                source={toImageSource(Banner)}
                style={styles.logo}
              />
            </View>

            {/* CUERPO */}
            <View style={styles.formBody}>
              <Text style={styles.title}>Solicitar nueva contraseña</Text>

              <Text style={styles.label}>Nombre de usuario o dirección de correo:</Text>

              <TextInput
                style={styles.inputStyle}
                value={userEmail}
                onChangeText={setUserEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current?.focus()
                }
                blurOnSubmit={false}
              />


              {errortext !== '' && (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              )}

              <Pressable
                style={({ pressed }) => [
                  styles.buttonStyle,
                  {
                    backgroundColor: pressed ? '#9f1010' : '#d51d1d',
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
                onPress={handleSubmitPress}
              >
                <Text style={styles.buttonTextStyle}>
                  Nueva contraseña por correo electrónico
                </Text>
              </Pressable>

              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                <Text style={styles.linkText}>
                  Crear Nueva Cuenta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('PasswordScreen')}
              >
                <Text style={styles.linkText}>
                  Olvido su contraseña?
                </Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <Text style={styles.footerText}>
                Unidad de Tecnologías de Información - UTI
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },

  screen: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  card: {
    width: '100%',
    maxWidth: 580,

    borderRadius: 14,
    overflow: 'hidden',

    borderWidth: 2,
    borderColor: '#cfcfcf',

    backgroundColor: 'rgba(255,255,255,0.88)',
  },

  header: {
    backgroundColor: '#1769aa',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 110,
    resizeMode: 'contain',
  },

  formBody: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 34,
    color: '#777',
    marginBottom: 20,
  },

  label: {
    fontSize: 17,
    color: '#111',
    marginBottom: 7,
  },

  inputStyle: {
    width: '100%',
    height: 36,

    backgroundColor: '#fff7ed',

    borderWidth: 2,
    borderColor: '#d4d4d4',
    borderRadius: 4,

    paddingHorizontal: 10,

    marginBottom: 12,

    fontSize: 16,
    color: '#222',
  },

  buttonStyle: {
    width: '100%',
    height: 43,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#d51d1d',
    borderRadius: 4,

    marginTop: 2,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#b41212',
  },

  buttonTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  linkText: {
    color: '#0000ff',
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 4,
  },

  separator: {
    height: 1,
    backgroundColor: '#d6d6d6',
    marginTop: 8,
    marginBottom: 12,
  },

  footerText: {
    color: '#ef3340',
    textAlign: 'center',
    fontSize: 15,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 5,
  },
});