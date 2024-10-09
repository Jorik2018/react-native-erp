import * as React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import ContraseniaPanel from '../home/ContraseniaPanel';
import LoginProductScreen from './LoginProductScreen';
import { PaperProvider } from 'react-native-paper';
import globalStyles from '@/src/assets/styles/globalStyles';

export default function LoginScreen({ navigation }: any) {

  const [index, setIndex] = useState(1);

  const [routes] = useState([
    { key: 'numero', title: 'Con mi número' },
    { key: 'contrasena', title: 'Con mi contraseña' },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'numero':
        return <LoginProductScreen />;
      case 'contrasena':
        return <ContraseniaPanel navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <Image
          source={require('../../src/assets/img/baner_maia.png')}
          style={styles.headerImage}
        />

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              renderLabel={({ route }) => (
                <Text style={globalStyles.fontFamily}>
                  {route.title}
                </Text>
              )}
              style={styles.tabBar}
              labelStyle={[styles.labelStyle]}
              tabStyle={[styles.tabStyle]}
            />
          )}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 176,
    resizeMode: 'stretch',
  },
  scene: {
    flex: 1,
    padding: 28,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  indicator: {
    backgroundColor: '#a13ea1',
  },
  labelStyle: {
    flex: 1,
    color: 'black',
  },


  tabStyle: {
    padding: 13,
    minHeight: 0,
    flex: 1,                 // Use flex to fill space evenly
  },

});