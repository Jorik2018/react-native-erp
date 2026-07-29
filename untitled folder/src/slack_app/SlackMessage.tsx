import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Avatar, Day, utils } from 'react-native-gifted-chat';
import { SlackBubble } from './SlackBubble';

const { isSameUser, isSameDay } = utils;

export const SlackMessage = (props: any) => {

  const getInnerComponentProps = () => {
    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay,
    };
  }

  const renderDay = () => {
    if (props.currentMessage.createdAt) {
      const dayProps = getInnerComponentProps();
      if (props.renderDay) {
        return props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  const renderBubble = () => {
    const bubbleProps = getInnerComponentProps();
    if (props.renderBubble) {
      return props.renderBubble(bubbleProps);
    }
    return <SlackBubble {...bubbleProps} />;
  }

  const renderAvatar = () => {
    let extraStyle;
    if (
      isSameUser(props.currentMessage, props.previousMessage)
      && isSameDay(props.currentMessage, props.previousMessage)
    ) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 };
    }

    const avatarProps = getInnerComponentProps();
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{ left: [styles.slackAvatar, avatarProps.imageStyle, extraStyle] }}
      />
    );
  }

  const marginBottom = isSameUser(props.currentMessage, props.nextMessage) ? 2 : 10;

  return (
    <View>
      {renderDay()}
      <View
        style={[
          styles.container,
          { marginBottom },
          props.containerStyle,
        ]}
      >
        {renderAvatar()}
        {renderBubble()}
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0,
  },
  slackAvatar: {
    // The bottom should roughly line up with the first line of message text.
    height: 40,
    width: 40,
    borderRadius: 3,
  },
});

SlackMessage.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
};

SlackMessage.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: PropTypes.object,
    right: PropTypes.object,
  }),
};
