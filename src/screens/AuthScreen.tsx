import React from 'react';
import { Text } from 'react-native';
import { Button } from '../components';

const AuthScreen = ({onLogin}:{onLogin:any}) => (
        <Text><Button text='Login' onPress={onLogin}></Button></Text>
);

export default AuthScreen;