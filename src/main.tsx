import React from "react";
import { AppRegistry } from "react-native";
import App from "./App.tsx";
import { PaperProvider } from "react-native-paper";

import materialCommunityIconsFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
import materialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

const style = document.createElement("style");
style.appendChild(document.createTextNode(`@font-face {src: url(${materialIconsFont});font-family: MaterialIcons;}`));
style.appendChild(document.createTextNode(`@font-face { src: url(${materialCommunityIconsFont}); font-family: MaterialCommunityIcons; }`));
document.head.appendChild(style);

const Root = () => (
  <React.StrictMode>
    <PaperProvider>
      <App />
    </PaperProvider>
  </React.StrictMode>
);

const rootTag = document.getElementById("root");
AppRegistry.registerComponent("App", () => Root);
AppRegistry.runApplication("App", { rootTag });
