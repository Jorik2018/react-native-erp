import React from "react";

/**
 * https://github.com/APSL/react-native-keyboard-aware-scroll-view
 */
export const KeyboardAvoidingView = (props) => {
  //const lib = require("react-native-keyboard-aware-scroll-view");

  const defaultProps = {
    style: { flex: 1 },
    contentContainerStyle: { flexGrow: 1 },
    bounces: false,
    bouncesZoom: false,
    alwaysBounceVertical: false,
    alwaysBounceHorizontal: false,
  };

  return <Text>hola</Text>
  /*React.createElement(lib.KeyboardAwareScrollView, {
    enableOnAndroid: true,
    ...defaultProps,
    ...props,
  });*/
};