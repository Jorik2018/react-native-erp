import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'

const LoginForm = (props: any) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='your@email.com'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                placeholderTextColor='#D1D1D1'
                value={props.email}
                onChangeText={(email) => props.handleChange('email', email)}
            />
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                placeholder='password'
                placeholderTextColor='#D7D7D7'
                value={props.password}
                onChangeText={(password) => props.handleChange('password', password)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={props.handleSignIn}
            >
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.handleSignUp}
            >
                <Text style={styles.create}>Create account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        padding: 5,
        marginBottom: 10,
        marginRight: 30,
        marginLeft: 30,
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        borderRadius: 20
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#562EAC',
        paddingVertical: 10,
        marginVertical: 10,
        marginRight: 30,
        marginLeft: 30,

    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        //fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontWeight: '200',
    },
    create: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        //fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontWeight: '200',
    }
})

export default LoginForm;
