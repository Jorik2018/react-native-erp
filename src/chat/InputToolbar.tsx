import { useEffect, useState, type ReactElement } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
  type KeyboardEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import Color from './Color';

type ToolbarPosition = 'absolute' | 'relative';

export type InputToolbarProps = {
  renderAccessory?: (
    props: InputToolbarProps,
  ) => ReactElement | null;

  renderActions?: (
    props: InputToolbarProps,
  ) => ReactElement | null;

  renderSend?: (
    props: InputToolbarProps,
  ) => ReactElement | null;

  renderComposer?: (
    props: InputToolbarProps,
  ) => ReactElement | null;

  onPressActionButton?: () => void;

  containerStyle?: StyleProp<ViewStyle>;
  primaryStyle?: StyleProp<ViewStyle>;
  accessoryStyle?: StyleProp<ViewStyle>;

  [key: string]: unknown;
};

export default function InputToolbar({
  renderAccessory,
  renderActions,
  renderSend,
  renderComposer,
  onPressActionButton,
  containerStyle,
  primaryStyle,
  accessoryStyle,
  ...restProps
}: InputToolbarProps) {
  const { width } = useWindowDimensions();

  const [position, setPosition] =
    useState<ToolbarPosition>('absolute');

  useEffect(() => {
    const keyboardWillShow = (
      _event: KeyboardEvent,
    ) => {
      setPosition('relative');
    };

    const keyboardWillHide = (
      _event: KeyboardEvent,
    ) => {
      setPosition('absolute');
    };

    /*
     * iOS emite keyboardWillShow/keyboardWillHide.
     * Android normalmente usa keyboardDidShow/keyboardDidHide.
     * En web estos listeners no afectan el render.
     */
    const showEvent =
      Platform.OS === 'ios'
        ? 'keyboardWillShow'
        : 'keyboardDidShow';

    const hideEvent =
      Platform.OS === 'ios'
        ? 'keyboardWillHide'
        : 'keyboardDidHide';
    const showSubscription =
      Keyboard.addListener(
        showEvent,
        keyboardWillShow,
      );

    const hideSubscription =
      Keyboard.addListener(
        hideEvent,
        keyboardWillHide,
      );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const toolbarProps: InputToolbarProps = {
    renderAccessory,
    renderActions,
    renderSend,
    renderComposer,
    onPressActionButton,
    containerStyle,
    primaryStyle,
    accessoryStyle,
    ...restProps,
  };

  const renderActionsComponent = () => {
    if (renderActions) {
      return renderActions(toolbarProps);
    }

    if (onPressActionButton) {
      return (
        <Actions
          {...toolbarProps}
          onPressActionButton={
            onPressActionButton
          }
        />
      );
    }

    return null;
  };

  const renderComposerComponent = () => {
    if (renderComposer) {
      return renderComposer(toolbarProps);
    }

    return <Composer {...toolbarProps} />;
  };

  const renderSendComponent = () => {
    if (renderSend) {
      return renderSend(toolbarProps);
    }

    return <Send {...toolbarProps} />;
  };

  const renderAccessoryComponent = () => {
    if (!renderAccessory) {
      return null;
    }

    return (
      <View
        style={[
          styles.accessory,
          accessoryStyle,
        ]}
      >
        {renderAccessory(toolbarProps)}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          width,
          position,
        },
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.primary,
          primaryStyle,
        ]}
      >
        {renderActionsComponent()}
        {renderComposerComponent()}
        {renderSendComponent()}
      </View>

      {renderAccessoryComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    bottom: 0,
  },

  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  accessory: {
    height: 44,
  },
});