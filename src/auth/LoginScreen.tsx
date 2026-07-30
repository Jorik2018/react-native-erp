// src/screens/LoginScreen.tsx
import { View, StyleSheet, Image } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import ContraseniaPanel from './ContraseniaPanel';
import LoginProductScreen from '../screens/LoginProductScreen';
import bannerMaia from '../assets/bg-auth.png';
import { toImageSource } from '../utils/imageSource';

export default function LoginScreen() {

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
        return <ContraseniaPanel />;
      default:
        return null;
    }
  };

  return (
      <View style={{ flex: 1 }}>

        <Image
          source={toImageSource(bannerMaia)}
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
              style={styles.tabBar}
              tabStyle={[styles.tabStyle]}
            />
          )}
        />
      </View>
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
    backgroundColor: '#a13ea1',
    color:'#1f1f1f',
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
