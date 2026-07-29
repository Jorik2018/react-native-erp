import { useCallback, useState } from 'react';
import {
  Platform,
  type TextStyle,
} from 'react-native';
import {
  GiftedChat,
  type IMessage,
  type MessageProps,
} from 'react-native-gifted-chat';

import { SlackMessage } from './SlackMessage';

export function SlackApp() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const renderMessage = useCallback(
    (props: MessageProps<any>) => {
      const currentText = props.currentMessage?.text;

      const messageTextStyle: TextStyle | undefined =
        currentText
          ? {
              fontSize: 28,
              lineHeight:
                Platform.OS === 'android'
                  ? 34
                  : 30,
            }
          : undefined;

      return (
        <SlackMessage
          {...props}
          messageTextStyle={messageTextStyle}
        />
      );
    },
    [],
  );

  const handleSend = useCallback(
    <T,>(newMessages: T[]) => {
      const giftedMessages = newMessages as IMessage[];

      setMessages(currentMessages => [
        ...giftedMessages,
        ...currentMessages,
      ]);
    },
    [],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      renderMessage={renderMessage}
      user={{
        _id: 1,
      }}
    />
  );
}

export default SlackApp;