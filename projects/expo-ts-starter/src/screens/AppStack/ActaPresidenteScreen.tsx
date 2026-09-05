import React, { useRef, useState, useEffect } from 'react';
import { MainNavigationProp } from '../../routing/types'
import { MainRoutes } from '../../routing/routes'
import DefaultPage from '../../components/shells/DefaultPage'
import {
  View, Text, Button, StatusBar, ScrollView, FlatList,
  TextInput, Alert, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';

type ActaPresidenteScreenProps = {
  navigation: MainNavigationProp<MainRoutes.Home>
}

const ActaPresidenteScreen = ({ navigation }: ActaPresidenteScreenProps): React.ReactElement => {
  const [state, setState] = useState({
    parties: [],
    focusedIndex: null,
    table: null
  });
  const set = (name: any, v: any) => {
    setState(o => ({
      ...o, [name]: v && v.target ? v.target.value : v
    }));
  };
  const getMoviesFromApi = () => {
    return fetch('http://web.regionancash.gob.pe:1128/0/0')
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getMoviesFromApi().then((data) => {
      data.push({ id: -1, name: 'BLANCOS' });
      data.push({ id: -2, name: 'ANULADOS' });
      data.forEach(e => {
        e.quantity = '';
      });
      set('parties', data);
    });
  }, []);

  const onChangeText = (text, index) => {
    setState(prevState => {
      prevState.parties[index].quantity = text.replace(/[^0-9]/g, '');
      return {
        ...prevState,
        parties: prevState.parties
      }
    });
  }

  const styles={
    input:{}
  }

  return <DefaultPage>
    <ScrollView style={{ padding: 10 }}>
      <Text>Mesa</Text>
      <TextInput value={state.table} style={[styles.input, { textAlign: 'right', marginBottom: 10 }]} keyboardType="numeric" />
      <FlatList
        data={state.parties}
        renderItem={({ item, index }) => {
          return <View style={{ flexDirection: "row", marginBottom: 10, alignItems: 'center' }} >
            <Image style={{ width: 40, height: 40 }} source={'https://aplicaciones007.jne.gob.pe/srop_publico/Consulta/Simbolo/GetSimbolo/' + item.id} key={'image-' + index} />
            <Text key={'label-' + index} style={[styles.label, { width: 'calc(100% - 120px)', paddingRight: 5, paddingLeft: 5 }]}>{item.name}</Text>
            <TextInput key={'input-' + index} style={[styles.input, { textAlign: 'right', width: 80 }]}
              onChangeText={text => onChangeText(text, index)}
              value={state.parties[index].quantity}
              keyboardType="numeric"
              onFocus={() => set('focusedIndex', index)}
              onBlur={() => set('focusedIndex', null)}
            /></View>
        }}
      />

    </ScrollView>
    <Button title="Grabar" onPress={() => console.log(state.textArray)} />
  </DefaultPage>
}

export default ActaPresidenteScreen
