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
import { useLogin } from '../auth/hooks/useLogin';
import { Pressable } from 'react-native';
import Loader from './Components/Loader';
import Banner from '../assets/image/logo2018.png';
import { toImageSource } from '../utils/imageSource';

//import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ navigation, route }: any) => {
  const destiny = route.params?.destiny as any;

  useEffect(() => {

  }, [destiny]);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext] = useState('');
  const backgrounds = [
    'https://web.regionancash.gob.pe/fs/images/background/SECHIN.jpg',
    'https://web.regionancash.gob.pe/fs/images/background/chavinDeHuantar.jpg',
    'https://web.regionancash.gob.pe/fs/images/background/rio-santa.jpg',
    'https://web.regionancash.gob.pe/fs/images/background/PLAZA_MAYOR_DE_NUEVO_CHIMBOTE_Y_CATEDRAL.JPG'
  ];

  const [backgroundUrl] = useState(
    () => backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );

  const loginMutation = useLogin();

  const passwordInputRef = createRef<any>();


  const handleSubmitPress = async () => {
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    let valid = true;

    /*if (!userEmail.trim()) {
      setEmailError('Ingrese su correo electrónico.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailError('Ingrese un correo electrónico válido.');
      valid = false;
    }*/
    if (!userEmail.trim()) {
      setEmailError('Ingrese su usuario o correo electrónico.');
      valid = false;
    }

    if (!userPassword) {
      setPasswordError('Ingrese su contraseña.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      //const result =
       await loginMutation.mutateAsync({
        username: userEmail.trim(),
        password: userPassword,
        destiny,
      });

      const target = destiny
        ? `/${destiny}`
        : '/admin';

      /*const params = new URLSearchParams({
        token: result.token,
      });*/

      window.location.assign(
        `${target}}`
      );
    } catch (error) {
      console.error('Login error:', error);

      setLoginError(
        'El correo electrónico o la contraseña son incorrectos.',
      );
    }
  };

  return (
    <ImageBackground
      source={{ uri: backgroundUrl }}
      resizeMode="cover"
      style={styles.background}
    >
      <Loader loading={loginMutation.isPending} />

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
              <Text style={styles.title}>Inicio de Sesión</Text>

              <Text style={styles.label}>Usuario:</Text>

              <TextInput
                style={[
                  styles.inputStyle,
                  emailError ? styles.inputError : null,
                ]}
                value={userEmail}
                onChangeText={(value) => {
                  setUserEmail(value);

                  if (emailError) {
                    setEmailError('');
                  }

                  if (loginError) {
                    setLoginError('');
                  }
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                blurOnSubmit={false}
              />

              {emailError !== '' && (
                <Text style={styles.fieldError}>
                  {emailError}
                </Text>
              )}

              <Text style={styles.label}>Contraseña:</Text>

              <TextInput
                ref={passwordInputRef}
                style={[
                  styles.inputStyle,
                  passwordError ? styles.inputError : null,
                ]}
                value={userPassword}
                onChangeText={(value) => {
                  setUserPassword(value);

                  if (passwordError) {
                    setPasswordError('');
                  }

                  if (loginError) {
                    setLoginError('');
                  }
                }}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmitPress}
              />

              {passwordError !== '' && (
                <Text style={styles.fieldError}>
                  {passwordError}
                </Text>
              )}
              {errortext !== '' && (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              )}

              {loginError !== '' && (
                <View style={styles.loginErrorBox}>
                  <Text style={styles.loginErrorText}>
                    {loginError}
                  </Text>
                </View>
              )}

              <Pressable
                disabled={loginMutation.isPending}
                style={({ pressed }) => [
                  styles.buttonStyle,

                  pressed &&
                  !loginMutation.isPending &&
                  styles.buttonPressed,

                  loginMutation.isPending &&
                  styles.buttonDisabled,
                ]}
                onPress={handleSubmitPress}
              >
                <Text style={styles.buttonTextStyle}>
                  {loginMutation.isPending
                    ? 'Validando...'
                    : 'Iniciar Sesión'}
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
                onPress={() =>
                  navigation.navigate('password', {
                    destiny: destiny,
                  })
                }
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
  fieldError: {
    color: '#d51d1d',
    fontSize: 13,
    marginTop: -7,
    marginBottom: 10,
  },

  inputError: {
    borderColor: '#d51d1d',
    backgroundColor: '#fff5f5',
  },

  loginErrorBox: {
    width: '100%',
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f1aeb5',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },

  loginErrorText: {
    color: '#842029',
    fontSize: 14,
    textAlign: 'center',
  },

  buttonPressed: {
    backgroundColor: '#a70f0f',
  },

  buttonDisabled: {
    opacity: 0.65,
  },
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
    textAlign: 'center',
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