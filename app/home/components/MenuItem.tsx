import React from 'react';
import { Icon, Menu } from 'react-native-paper';

const MenuItem = (props:any) => {
    return (
        <Menu.Item leadingIcon={(iconProps:any) => (
            <Icon
              {...iconProps}
              source={props.icon}
              color="#a13ea1" // Set the color here
            />
          )} onPress={props.onPress} title={props.title} />
    );
};

export default MenuItem;