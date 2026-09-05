import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({ text, color, onPress }: { text: string, color: string, onPress: any }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.buttonBox, { backgroundColor: color }]}
    >
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    buttonBox: {
        height: 50,
        flex: 1,
        marginBottom:20,
        padding:20,
        backgroundColor:'blue',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Button;