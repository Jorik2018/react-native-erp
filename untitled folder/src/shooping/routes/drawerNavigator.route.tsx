import { createDrawerNavigator } from "@react-navigation/drawer";
import { Divider, Drawer, DrawerItem } from "@ui-kitten/components";
import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";

import {
  BellIcon,
  ForwardIcon,
  HomeIcon,
  LogoutIcon,
} from "../components/icons";

import LoginScreen from "../screens/login.screen";
import NotificationScreen from "../screens/notification.screen";
import SignupScreen from "../screens/signup.screen";
import ForgetPasswordScreen from "../screens/password_reset.screen";

import BottomNavigation from "./bottomNavigator.route";

const { Navigator, Screen } = createDrawerNavigator();

const Header = (props: any) => (
  <React.Fragment>
    <ImageBackground
      style={[props.style, styles.header]}
      source={require("../assets/icon.png")}
    />
    <Divider />
  </React.Fragment>
);

const DrawerContent = ({ navigation, state }:any) => {
  const [selectedIndex, setSelectedIndex] = useState(null as any);

  const navigate = (index:any) => {
    setSelectedIndex(index);
    console.log("routeNames", state.routeNames);
    console.log("routeNames", index);
    navigation.navigate(state.routeNames[index.row]);
  };
  return (
    <Drawer
      header={Header}
      selectedIndex={selectedIndex}
      onSelect={(index) => navigate(index)}>
      <DrawerItem
        title='Home'
        accessoryLeft={HomeIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title='Notifications'
        accessoryLeft={BellIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem title='Logout' accessoryLeft={LogoutIcon} />
    </Drawer>
  );
};

const DrawerNavigator = () => {
  return (
    <Navigator
      initialRouteName='Login'
      drawerContent={(props:any) => <DrawerContent {...props} />}>
      <Screen name='Home' component={BottomNavigation} />
      <Screen name='Notifications' component={NotificationScreen} />
      <Screen
        name='Login'
        component={LoginScreen}
        options={{ gestureEnabled: false }}
      />
      <Screen name='SignUp' component={SignupScreen} />
      <Screen name='ForgotPassword' component={ForgetPasswordScreen} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 250,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DrawerNavigator;
