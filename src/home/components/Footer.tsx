import { StyleSheet, View } from 'react-native';

import IconFooterSVG from '../../assets/svg/icons/icon-footer.svg';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <IconFooterSVG />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#0b2739',
    }
});

export default Footer;