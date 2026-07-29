import { Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import LinearGradient from '../../components/LinearGradient'

const DriverOrPassenger = (props: any) => {

    const onPressPassenger = () => props.handleChange('isPassenger', true)

    const onPressDriver = () => props.handleChange('isDriver', true)

    return (
        <LinearGradient
            colors={['#5C55BB', '#9D54DF']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <TouchableOpacity
                style={styles.choiceContainer}
                onPress={onPressPassenger}
            >
                <Text style={styles.choiceText}>I'm a passenger</Text>
                <Image
                    source={require('../images/passenger.png')}
                    style={styles.selectionImage}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.choiceContainer}
                onPress={onPressDriver}
            >
                <Text style={styles.choiceText}>I'm a Driver</Text>
                <Image
                    source={require('../images/driver.png')}
                    style={styles.selectionImage}
                />
            </TouchableOpacity>

        </ LinearGradient >

    )
}

export default DriverOrPassenger;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    choiceContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    choiceText: {
        marginBottom: 16,
        fontSize: 32,
        fontWeight: '200',
        textAlign: 'center',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
    },
    selectionImage: {
        alignSelf: 'center',
        width: 180,
        height: 180,
    }
})
