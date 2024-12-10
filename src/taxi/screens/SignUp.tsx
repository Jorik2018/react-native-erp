import React, { useState } from 'react'
import { Text, StyleSheet, Alert, Image } from 'react-native'
import SignUpForm from '../../components/SignUpForm'
import axios from 'axios'
import LinearGradient from '../../components/LinearGradient'

const SignUp = (props: any) => {

    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        errorMessage: ''
    } as any);

    const handleChange = (name: any, value: any) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSignUp = async () => {
        try {
            const { firstName, lastName, email, password } = state
            const result = await axios.post('/auth/signup', { firstName, lastName, email, password })
            props.handleChange('createAccount', false)
        } catch (error: any) {
            const errorMessage = error.response.data.message
            Alert.alert('', errorMessage)
        }
    }

    return (
        <LinearGradient
            colors={['#1C55BB', '#9999DF']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.headerText}>WeTaxi </Text>
            <SignUpForm
                firstName={state.firstName}
                lastName={state.lastName}
                email={state.email}
                password={state.password}
                handleChange={handleChange}
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

export default SignUp;

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
