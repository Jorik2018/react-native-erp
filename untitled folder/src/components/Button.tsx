import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({ text, color, onPress,mode, textColor,children }: 
    { text: string, color?: string, onPress?: any,mode?:string, 
        textColor?:string,children?:any }) => {
        console.log(mode);
        console.log(textColor);
        return (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.buttonBox, { backgroundColor: color }]}
    >
        <Text style={styles.text}>{text}</Text>
        {children}
    </TouchableOpacity>
)};

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