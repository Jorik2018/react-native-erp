import { TouchableOpacity,StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const RoundedIconButton = ({ onPress, iconName, iconSize, iconColor }:
    any) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#a13ea1', // Button background color
        padding: 5,
        borderRadius: 50, // Make it rounded
        alignItems: 'center',
        justifyContent: 'center',
        width: 32, // Width and height for the button
        height: 32,
    }
});
export default RoundedIconButton;