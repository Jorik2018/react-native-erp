import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CLIENT_ID, REDIRECT_URL, MSAL_TENANT } from './config';
import { Alert, View } from 'react-native';

import {
  authorize,
  refresh,
  revoke,
  logout,
  prefetchConfiguration,
} from 'react-native-app-auth';
import {
  Button,
  TextInput,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
  Heading,
} from './components';
// import { useLinkBuilder } from '@react-navigation/native';

const configs: {
  [key: string]: any
} = {
  auth0: {
    issuer: `https://${MSAL_TENANT}.b2clogin.com/${MSAL_TENANT}.onmicrosoft.com/B2C_1_signupsignin1/v2.0`,
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URL,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
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

export const AppAuthView = () => {

  const [authState, setAuthState] = useState(defaultAuthState);

  useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      connectionTimeoutSeconds: 5,
      ...configs.auth0,
    });
  }, []);

  const handleAuthorize = useCallback(async (provider: string) => {
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

  const handleRefresh = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken,
      }));
    } catch (error: any) {
      Alert.alert('Failed to refresh token', error.message);
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      const config = configs[authState.provider];
      if (authState.accessToken) {
        await revoke({
          ...config, additionalParameters: {
            prompt: 'login'
          }
        }, {
          tokenToRevoke: authState.accessToken,
          sendClientId: true,
        });
      } else {
        await logout({
          ...config, additionalParameters: {
            prompt: 'login'
          }
        }, {
          idToken: authState.idToken,
          postLogoutRedirectUrl: REDIRECT_URL
        });
      }
      setAuthState({
        provider: '',
        idToken: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
        hasLoggedInOnce: false,
        scopes: []
      });
    } catch (error: any) {
      Alert.alert('Failed to revoke token', error.message);
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken || authState.idToken) {
      const config = configs[authState.provider];
      if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
        return true;
      }
    }
    return false;
  }, [authState]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{     flex:1,padding:20}}>
      {authState.accessToken || authState.idToken ? (
        <Form>
          <FormLabel>accessToken</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>idToken</FormLabel>
          <FormValue>{authState.idToken}</FormValue>
          <FormLabel>accessTokenExpirationDate</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>refreshToken</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>scopes</FormLabel>
          <FormValue>{authState.scopes.join(', ')}</FormValue>
        </Form>
      ) : (
        <Heading>
          {authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}
        </Heading>
      )}

      <ButtonContainer>
        {!(authState.accessToken || authState.idToken) ? (
          <>
            <Button
              onPress={() => handleAuthorize('auth0')}
              text="Authorize"
              color="#DA2536"
            />
          </>
        ) : null}
        {authState.refreshToken ? (
          <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
        ) : null}
        {showRevoke ? (
          <Button onPress={handleRevoke} text="Revoke/Logout" color="#EF525B" />
        ) : null}

      </ButtonContainer>

      
      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
      />
      <Button
       text="Iniciar Sesión"
        mode="contained"
        textColor="white"
      />
      <Button text="Iniciar Sesión 99"
      >
      </Button>
      <Button text="Iniciar Sesión 67"
      >
      </Button>
      <Button text="Iniciar Sesión 30"
      >
      </Button>
      <Button text="Iniciar Sesión 31"
      >
      </Button>
      <Button text="Iniciar Sesión 32"
      >
        
      </Button>
    </View>
  );

  
};