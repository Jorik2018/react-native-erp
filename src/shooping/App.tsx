import eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import { DrawerNavigator } from "./routes";
import store from "./store/store";
import theme from "./theme.json";

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar barStyle={"dark-content"} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Provider store={store}>
            <DrawerNavigator />
        </Provider>
      </ApplicationProvider>
    </>
  );
};

export default App;
