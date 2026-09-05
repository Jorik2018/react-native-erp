import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useAppDispatch } from '../store';
import { login } from '../services/AuthSlice';
import { CLIENT_ID, MSAL_TENANT, REDIRECT_URL } from '../../config';
import { authorize, prefetchConfiguration } from 'react-native-app-auth';


const configs: {
  [key: string]: any
} = {
  auth0: {
    issuer: `https://${MSAL_TENANT}.b2clogin.com/${MSAL_TENANT}.onmicrosoft.com/B2C_1_signupsignin1/v2.0`,
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URL,
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://samples.auth0.com/authorize',
    //   tokenEndpoint: 'https://samples.auth0.com/oauth/token',
    //   revocationEndpoint: 'https://samples.auth0.com/oauth/revoke'
    // }
  },
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  idToken: '',
  accessTokenExpirationDate: '',
  refreshToken: '',
  scopes: []
};

const LoginScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [authState, setAuthState] = useState(defaultAuthState);

  useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      connectionTimeoutSeconds: 5,
      ...configs.auth0,
    });
  }, []);

  const handleAuthorize = useCallback(async () => {
    const provider = "auth0";
    try {
      const config = configs[provider];
      const newAuthState = await authorize({
        ...config,
        connectionTimeoutSeconds: 5,
        iosPrefersEphemeralSession: true,
      });
      setAuthState({
        hasLoggedInOnce: true,
        provider: provider,
        ...newAuthState,
      } as any);
    } catch (error: any) {
      Alert.alert('Failed to log in', error.message);
    }
  }, []);

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login(username));
    navigation.navigate('Home');
  };

  const handleMSALLogin = () => {

  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Login with App Auth" onPress={handleAuthorize} />
      <Button title="Login with Api MSAL" onPress={handleMSALLogin} />
    </View>
  );
};

export default LoginScreen;
