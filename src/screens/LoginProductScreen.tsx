import globalStyles from '../../src/assets/styles/globalStyles';
import { useRef, useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, Checkbox, Portal, Modal } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { returnData } from '../utils/data-terms-condition';


const ModalTermsConditionComponent = ({ visible, aceptOnPress, hideModal }: any) => {

  const scrollViewRef = useRef(null);

  const [termAccepted, setTermAccepted] = useState(false);

  //const containerStyle = { backgroundColor: 'white', right: 20, top: 42, bottom: 42, left: 20, position: 'absolute' };

  const innerHTML = '<div style="padding: 20px;">' + returnData('auth-number') + '</div>';

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isBottom) {
      setTermAccepted(true);
    }
  };

  const tagsStyles = {
    body: globalStyles.infoText
  };

  return <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={
    { backgroundColor: 'white', right: 20, top: 42, bottom: 42, left: 20, position: 'absolute' }
    //containerStyle
    }>
    <View>
      <Text style={{ textAlign: 'center', padding: 20 }}>Términos y condiciones</Text>
    </View>
    <ScrollView ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      <RenderHTML source={{ html: innerHTML }} tagsStyles={tagsStyles} />
    </ScrollView>
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        style={[styles.confirmButton, !termAccepted && { opacity: 0.5 }, { borderRadius: 100, backgroundColor: '#a13ea1' }]}
        disabled={!termAccepted}
        onPress={aceptOnPress}
      >
        <Text style={styles.confirmButtonText}>ACEPTAR</Text>
      </TouchableOpacity>
    </View>
  </Modal>
}

const LoginProductScreen = () => {

  const [indexTabLogin, setIndexTabLogin] = useState('Línea móvil');

  const [phone, setPhone] = useState('');

  const [termAccepted, setTermAccepted] = useState(false);

  const [phoneNoValid, setPhoneNoValid] = useState(false);

  console.log(phoneNoValid);

  const u = [
    { marginLeft: 0, marginRight: 3 },
    { marginLeft: 1, marginRight: 1 },
    { marginLeft: 3, marginRight: 0 }
  ];

  const handleSelectBtn = (type: any) => {
    setIndexTabLogin(type);
  };

  const aceptOnPress = () => {
    hideModal();
    setTermAccepted(true)
  };

  const handleValidateLabel = (value: any) => {
    setPhone(value);
    // Add validation logic here
    setPhoneNoValid(false); // Set to true if invalid
  };

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return <>
    <Portal><ModalTermsConditionComponent hideModal={hideModal} visible={visible} aceptOnPress={aceptOnPress} /></Portal>
    <ScrollView style={{ ...globalStyles.scrollable, paddingHorizontal: 16 }}>
      <Text style={{ ...globalStyles.infoText, marginBottom: 0 }}>
        ¡Hola!{"\n"}Desde aquí podrás consultar tu línea móvil, internet móvil y fija de manera individual
      </Text>
      <View style={styles.buttonGroup}>
        {['Línea móvil', 'Internet móvil', 'Fija'].map((item, i) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              , {
                flex: 1,
                borderColor: '#cbd5e1',
                borderWidth: 2,
                marginHorizontal: 4,
                padding: 5,
                paddingVertical: 8,



                shadowColor: '#aaa',
                shadowOffset: {
                  width: 1, // Right shadow
                  height: 5, // Bottom shadow
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 5,
              }, {
                borderColor: '#a13ea1',
              },
              (indexTabLogin === item ? styles.buttonActive : styles.buttonInactive),
              u[i]
            ]}
            onPress={() => handleSelectBtn(item)}
          >
            <Text style={[styles.buttonText, { textAlign: 'center' }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.formContainer}>
        {indexTabLogin === 'Fija' && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Fija: Dúos, Tríos o monoproductos</Text>
          </View>
        )}
        <View>
          <TextInput
            mode='flat'
            style={styles.input}
            value={phone}
            onChangeText={handleValidateLabel}
            keyboardType="phone-pad"
            maxLength={10}
            label={indexTabLogin === 'Línea móvil' ? "Número de teléfono" : "Código de producto o servicio"}
          />
        </View>
        <TouchableOpacity
          style={[styles.checkboxContainer, !termAccepted && { opacity: 1 }]}
          onPress={showModal}
        >
          <Checkbox status={termAccepted ? 'checked' : 'unchecked'} />
          <Text style={styles.checkboxText}>
            Acepto <Text style={styles.termsLink}>Términos legales y condiciones</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.confirmButton, !termAccepted && { opacity: 0.5 }, { borderRadius: 100, backgroundColor: '#a13ea1' }]}
          disabled={!termAccepted}
          onPress={showModal}
        >
          <Text style={styles.confirmButtonText}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </>
};

export default LoginProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  presentationContainer: {
    flexDirection: 'column',
  },
  infoText: {
    color: '#4a4a4a',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonActive: {
    borderColor: '#a13ea1',
  },
  buttonInactive: {
    borderColor: '#e5e5e5', // gray
  },
  buttonText: {
    color: '#4a4a4a',
  },
  formContainer: {
    marginTop: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    color: '#4a4a4a',
  },
  input: {
    height: 40,
    color: '#000',
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: -8
  },
  checkboxText: {
    color: '#4a4a4a',
    fontSize: 12,
  },
  termsLink: {
    color: '#019df4', // regal blue
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: '#7B61FF', // highlight-2
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
  },
});
