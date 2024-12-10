import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GiftedChat, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat';
import { CustomActions } from './CustomActions';
import { CustomView } from './CustomView';
import { alert } from '../utils';

export const Example = () => {

  const [state, setState] = useState({
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
  });

  let _isMounted = false;

  let _isAlright:any = null;

  useEffect(() => {
    _isMounted = true;
    setState((previousState) => ({
      ...previousState,
      messages: require('./data/messages.js'),
    }));
    return () => {
      _isMounted = false;
    };
  }, []);

  const onLoadEarlier = () => {
    setState((previousState) => {
      return {
        ...previousState,
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (_isMounted === true) {
        setState((previousState) => {
          return {
            ...previousState,
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  const onSend = (messages:any = []) => {
    setState((previousState) => {
      return {
        ...previousState,
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    answerDemo(messages);
  }

  const answerDemo = (messages:any) => {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !_isAlright) {
        setState((previousState:any) => {
          return {
            ...previousState,
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (_isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            onReceive('Nice picture!');
          } else if (messages[0].location) {
            onReceive('My favorite place');
          } else {
            if (!_isAlright) {
              _isAlright = true;
              onReceive('Alright');
            }
          }
        }
      }

      setState((previousState) => {
        return {
          ...previousState,
          typingText: null,
        };
      });
    }, 1000);
  }

  const onReceive = (text: string) => {
    setState((previousState) => {
      return {
        ...previousState,
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        } as any),
      };
    });
  }

  const renderCustomActions:any = (props:any) => {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': () => {
        alert('option 1');
      },
      'Action 2': () => {
        alert('option 2');
      },
      'Cancel': () => { },
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  const renderSystemMessage:any = (props: any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  const renderCustomView = (props: any) => {
    return (
      <CustomView
        {...props}
      />
    );
  }

  const renderFooter = () => {
    if (state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  return (
    <GiftedChat
      messages={state.messages}
      onSend={onSend}
      loadEarlier={state.loadEarlier}
      onLoadEarlier={onLoadEarlier}
      isLoadingEarlier={state.isLoadingEarlier}

      user={{
        _id: 1, // sent messages should have same user._id
      }}

      renderActions={renderCustomActions}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}

    />
  );

  console.log(renderCustomView, renderFooter)
/*
      
      
      
      renderCustomView={renderCustomView}
      renderFooter={renderFooter}
* */
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
