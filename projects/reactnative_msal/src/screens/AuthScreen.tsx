import React from 'react';
import { Button, Text } from 'react-native';

const AuthScreen = ({onLogin}:{onLogin:any}) => (
        <Text><Button  onPress={onLogin}></Button></Text>
);

export default AuthScreen;