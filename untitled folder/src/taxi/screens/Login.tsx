import React, { useState } from 'react'
import { Text, StyleSheet, Alert, Image } from 'react-native';
import LoginForm from '../../components/LoginForm'
import axios from 'axios'
import LinearGradient from '../../components/LinearGradient';

const Login = (props:any) => {

    const [state, setState] = useState({
        email: '',
        password: '',
        errorMessage: ''
    });

    const handleChange = (name:any, value:any) => {
        setState({
            [name]: value
        } as any)
    }

    const handleSignUp = async () => {
        console.log('SignUpForm')
        props.handleChange('createAccount', true)
    }

    const handleSignIn = async () => {
        try {
            const { email, password } = state
            const result = await axios.post('/auth/login', { email, password })
            if (result.data.token) {
                props.handleChange('token', result.data.token)
            } else {
                Alert.alert('', result.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LinearGradient
            colors={['#4D54DF', '#9C55BB']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.headerText}>WeTaxi </Text>
            <LoginForm
                email={state.email}
                password={state.password}
                handleChange={handleChange}
                handleSignIn={handleSignIn}
                handleSignUp={handleSignUp}
            />
            <Text>{state.errorMessage}</Text>
            <Image
                source={require('../images/wetaxi.png')}
                style={styles.logo}
            />

        </LinearGradient>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 64,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 180,
        marginBottom: 40
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 18,
        color: '#fff'
    },
    logo: {
        //flex: 1,
        marginTop: 100,
        height: 100,
        width: 100,
        alignSelf: 'center',
    }
});
