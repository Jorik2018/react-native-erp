import React, { useRef, useState ,useEffect} from 'react'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'

import { useReduxDevToolsExtension } from '@react-navigation/devtools'
import { HomeRoutes, HomeTabs, MainRoutes, MainStack } from './routes'
import { useReduxSelector } from '../redux'
import { selectIsRunning } from '../redux/ducks/appState'
import { View, Text, Button ,StatusBar,ScrollView,FlatList,
    TextInput,Alert ,Image,
    TouchableOpacity,StyleSheet
  } from 'react-native';

import SplashScreen from '../screens/InitStack/SplashScreen'
import AppCheckScreen from '../screens/InitStack/AppCheckScreen'
import SignInScreen from '../screens/AuthStack/SignInScreen'
import SignUpScreen from '../screens/AuthStack/SignUpScreen'
import AppLoadingScreen from '../screens/AppStack/AppLoadingScreen'
import HomeScreen from '../screens/AppStack/HomeScreen'
import HomeScreenB from '../screens/AppStack/HomeScreenB'
import ActaPresidenteScreen from '../screens/AppStack/ActaPresidenteScreen'
import HomeScreenC from '../screens/AppStack/HomeScreenC'
import SettingsScreen from '../screens/AppStack/SettingsScreen'
import { useReduxDispatch } from '../redux'
import { setLogout } from '../redux/ducks/user'

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

const Home = () => (
    <HomeTabs.Navigator>
        <HomeTabs.Screen name={HomeRoutes.HomeA} component={HomeScreen} />
        <HomeTabs.Screen name={HomeRoutes.HomeB} component={HomeScreenB} />
        <HomeTabs.Screen name={HomeRoutes.HomeC} component={HomeScreenC} />
    </HomeTabs.Navigator>
)

function Feed({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
        <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
        <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      </View>
    );
  }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Screen</Text>
      </View>
    );
  }

  function AppList(){
    const [state,setState] = useState({
      parties: [],
      focusedIndex: null,
      table:null
    });
    const set = (name:any,v:any) => {
      setState(o => ({
        ...o,[name]: v&&v.target?v.target.value:v
      }));
    };
    const getMoviesFromApi = () => {
      return fetch('http://web.regionancash.gob.pe:1128/0/0')
        .then((response)=>response.json())
        .then((json)=>json)
        .catch((error) => {
          console.error(error);
        });
    };
    useEffect(() => {
      getMoviesFromApi().then((data)=>{
        data.push({id:-1,name:'BLANCOS'});
        data.push({id:-2,name:'ANULADOS'});
        data.forEach(e => {
          e.quantity='';
        });
        set('parties',data);
      });
    }, []);
    const onChangeText=(text, index) => {
      setState(prevState => {
        prevState.parties[index].quantity = text.replace(/[^0-9]/g, '');
        return {
            ...prevState,
            parties: prevState.parties
          }
      });
    }
    // handle the border color
    //handleBorderColor = (index) => {
      //return index === this.state.focusedIndex ? 'red' : 'grey'
    //}
    return (
      <>
        <ScrollView style={{padding:10}}>
          <Text>Mesa</Text>
          <TextInput value={state.table} style={[styles.input,{textAlign:'right',marginBottom:10}]} keyboardType="numeric"/>
          <FlatList
            data={state.parties} 
            renderItem={({item,index}) =>{
              return <View style={{flexDirection: "row",marginBottom:10,alignItems: 'center'}} >
              <Image style={{width:40,height:40}} source={'https://aplicaciones007.jne.gob.pe/srop_publico/Consulta/Simbolo/GetSimbolo/'+item.id} key={'image-'+index} />
              <Text key={'label-'+index} style={[styles.label,{width:'calc(100% - 120px)',paddingRight:5,paddingLeft:5}]}>{item.name}</Text>
              <TextInput key={'input-'+index} style={[styles.input,{textAlign:'right',width:80}]}
              onChangeText={text => onChangeText(text, index)} 
              value={state.parties[index].quantity}
              keyboardType="numeric"
              onFocus={() => set('focusedIndex', index)}
              onBlur={() => set('focusedIndex', null)}
              /></View>
            }}
          />
          
        </ScrollView>
        <Button title="Grabar" onPress={()=>console.log(state.textArray)}/>
      </>
    );
  }
  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10
    },
    label: {
        
      },
  });
  function CustomDrawerContent(props) {
    const dispatch = useReduxDispatch()
    const logoutHandler = () => dispatch(setLogout())
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Togglesss drawer"
          onPress={() => props.navigation.toggleDrawer()}
        />
        <DrawerItem
          label="Logout"
          onPress={() => logoutHandler()}
        />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  function MyDrawer() {
    return (
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="Acta Presidencial" component={ActaPresidenteScreen} />
        <Drawer.Screen name={MainRoutes.Home} component={Home} />
        <Drawer.Screen name={MainRoutes.Settings} component={SettingsScreen} />
      </Drawer.Navigator>
    );
  }

const MainNavigation = (): React.ReactElement => {
    const isAppRunning = useReduxSelector(selectIsRunning)

    const navigationRef: React.RefObject<NavigationContainerRef> = useRef(null)

    useReduxDevToolsExtension(navigationRef)

    return (
        <NavigationContainer ref={navigationRef}>
            
                {isAppRunning ? (
                  
                    <MyDrawer />
                  
                   
                ) : (
                    <MainStack.Navigator headerMode="none">
                        <MainStack.Screen name={MainRoutes.Splash} component={SplashScreen} />
                        <MainStack.Screen name={MainRoutes.AppCheck} component={AppCheckScreen} />
                        <MainStack.Screen name={MainRoutes.SignIn} component={SignInScreen} />
                        <MainStack.Screen name={MainRoutes.SignUp} component={SignUpScreen} />
                        <MainStack.Screen
                            name={MainRoutes.AppLoading}
                            component={AppLoadingScreen}
                        />
                    </MainStack.Navigator>
                )}
            
        </NavigationContainer>
    )
}
export default MainNavigation
