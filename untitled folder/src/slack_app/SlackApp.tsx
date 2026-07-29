import React, { Component } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
//import emojiUtils from 'emoji-utils';

import { SlackMessage } from './SlackMessage';

export const SlackApp = () => {

  const renderMessage = (props:any) => {
    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText /*&& emojiUtils.isPureEmojiString(currText)*/) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

    return (
      <GiftedChat
        messages={[]}
        renderMessage={renderMessage}
      />
    );

}

export default SlackApp;
