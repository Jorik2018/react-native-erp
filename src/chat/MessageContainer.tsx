import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type ReactElement,
} from 'react';

import {
  FlatList,
  StyleSheet,
  View,
  type FlatListProps,
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import LoadEarlier from './LoadEarlier';
import Message from './Message';

type MessageId = string | number;
type MessagePosition = 'left' | 'right';

export type ChatUser = {
  _id?: MessageId;
  name?: string;
  avatar?: string | null;
};

export type ChatMessage = {
  _id?: MessageId;
  text?: string | null;
  image?: string | null;
  createdAt?: Date | string | number | null;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  user?: ChatUser;
};

type PreparedMessage = ChatMessage & {
  previousMessage: ChatMessage;
  nextMessage: ChatMessage;
};

export type MessageRenderProps = Omit<
  MessageContainerProps,
  | 'messages'
  | 'renderMessage'
  | 'renderFooter'
  | 'renderLoadEarlier'
  | 'listViewProps'
> & {
  currentMessage: PreparedMessage;
  previousMessage: ChatMessage;
  nextMessage: ChatMessage;
  position: MessagePosition;
};

export type MessageContainerProps = {
  messages?: ChatMessage[];
  user?: ChatUser;

  renderFooter?: (
    props: MessageContainerProps,
  ) => ReactElement | null;

  renderMessage?: (
    props: MessageRenderProps,
  ) => ReactElement | null;

  renderLoadEarlier?: (
    props: MessageContainerProps,
  ) => ReactElement | null;

  onLoadEarlier?: () => void;

  inverted?: boolean;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  loadEarlierLabel?: string;

  composerHeight?: number;
  initialComposerHeight?: number;

  containerStyle?: StyleProp<ViewStyle>;

  listViewProps?: Omit<
    FlatListProps<PreparedMessage>,
    | 'data'
    | 'renderItem'
    | 'keyExtractor'
    | 'ListHeaderComponent'
    | 'ListFooterComponent'
    | 'inverted'
  >;
};

export type MessageContainerHandle = {
  scrollToOffset: (
    offset: number,
    animated?: boolean,
  ) => void;

  scrollToEnd: (
    animated?: boolean,
  ) => void;

  scrollToIndex: (
    index: number,
    animated?: boolean,
  ) => void;
};

const emptyUser: ChatUser = {};

const MessageContainer = forwardRef<
  MessageContainerHandle,
  MessageContainerProps
>(
  (
    {
      messages = [],
      user = emptyUser,
      renderFooter,
      renderMessage,
      renderLoadEarlier,
      onLoadEarlier = () => { },
      inverted = true,
      loadEarlier = false,
      isLoadingEarlier = false,
      loadEarlierLabel = 'Load earlier messages',
      composerHeight = 0,
      initialComposerHeight = 0,
      containerStyle,
      listViewProps = {},
    },
    ref,
  ) => {
    const listRef =
      useRef<FlatList<PreparedMessage>>(null);

    const preparedMessages =
      useMemo<PreparedMessage[]>(
        () =>
          messages.map((message, index) => {
            const previousMessage =
              messages[index + 1] ?? {};

            const nextMessage =
              messages[index - 1] ?? {};

            return {
              ...message,
              user: message.user ?? {},
              previousMessage,
              nextMessage,
            };
          }),
        [messages],
      );

    useImperativeHandle(
      ref,
      () => ({
        scrollToOffset(
          offset: number,
          animated = true,
        ) {
          listRef.current?.scrollToOffset({
            offset,
            animated,
          });
        },

        scrollToEnd(animated = true) {
          listRef.current?.scrollToEnd({
            animated,
          });
        },

        scrollToIndex(
          index: number,
          animated = true,
        ) {
          listRef.current?.scrollToIndex({
            index,
            animated,
          });
        },
      }),
      [],
    );

    const renderLoadEarlierComponent =
      useCallback(() => {
        if (!loadEarlier) {
          return null;
        }

        const props: MessageContainerProps = {
          messages,
          user,
          renderFooter,
          renderMessage,
          renderLoadEarlier,
          onLoadEarlier,
          inverted,
          loadEarlier,
          isLoadingEarlier,
          loadEarlierLabel,
          composerHeight,
          initialComposerHeight,
          containerStyle,
          listViewProps,
        };

        if (renderLoadEarlier) {
          return renderLoadEarlier(props);
        }

        return (
          <LoadEarlier
            onLoadEarlier={onLoadEarlier}
            isLoadingEarlier={
              isLoadingEarlier
            }
            label={loadEarlierLabel}
          />
        );
      }, [
        composerHeight,
        containerStyle,
        initialComposerHeight,
        inverted,
        isLoadingEarlier,
        listViewProps,
        loadEarlier,
        loadEarlierLabel,
        messages,
        onLoadEarlier,
        renderFooter,
        renderLoadEarlier,
        renderMessage,
        user,
      ]);

    const renderFooterComponent =
      useCallback(() => {
        if (!renderFooter) {
          return null;
        }

        return renderFooter({
          messages,
          user,
          renderFooter,
          renderMessage,
          renderLoadEarlier,
          onLoadEarlier,
          inverted,
          loadEarlier,
          isLoadingEarlier,
          loadEarlierLabel,
          composerHeight,
          initialComposerHeight,
          containerStyle,
          listViewProps,
        });
      }, [
        composerHeight,
        containerStyle,
        initialComposerHeight,
        inverted,
        isLoadingEarlier,
        listViewProps,
        loadEarlier,
        loadEarlierLabel,
        messages,
        onLoadEarlier,
        renderFooter,
        renderLoadEarlier,
        renderMessage,
        user,
      ]);

    const renderItem = useCallback(
      ({
        item: message,
      }: ListRenderItemInfo<PreparedMessage>): ReactElement | null => {
        if (
          message._id === undefined ||
          message._id === null
        ) {
          console.warn(
            'GiftedChat: `_id` is missing for message',
            JSON.stringify(message),
          );
        }

        const messageUser = message.user ?? {};

        if (!message.user && !message.system) {
          console.warn(
            'GiftedChat: `user` is missing for message',
            JSON.stringify(message),
          );
        }

        const position: MessagePosition =
          messageUser._id === user._id
            ? 'right'
            : 'left';

        const messageProps: MessageRenderProps = {
          user,
          inverted,
          loadEarlier,
          onLoadEarlier,
          isLoadingEarlier,
          loadEarlierLabel,
          composerHeight,
          initialComposerHeight,
          containerStyle,
          currentMessage: {
            ...message,
            user: messageUser,
          },
          previousMessage:
            message.previousMessage,
          nextMessage:
            message.nextMessage,
          position,
        };

        if (renderMessage) {
          return renderMessage(messageProps);
        }

        return (
          <Message
            user={user}
            inverted={inverted}
            position={position}
            currentMessage={{
              ...message,
              user: messageUser,
            }}
            previousMessage={
              message.previousMessage
            }
            nextMessage={
              message.nextMessage
            }
          />
        );
      },
      [
        composerHeight,
        containerStyle,
        initialComposerHeight,
        inverted,
        isLoadingEarlier,
        loadEarlier,
        loadEarlierLabel,
        onLoadEarlier,
        renderMessage,
        user,
      ],
    );

    const keyExtractor = useCallback(
      (
        message: PreparedMessage,
        index: number,
      ): string => {
        if (
          message._id !== undefined &&
          message._id !== null
        ) {
          return String(message._id);
        }

        return `message-${index}`;
      },
      [],
    );

    const marginBottom = Math.max(
      composerHeight -
      initialComposerHeight,
      0,
    );

    const headerComponent = inverted
      ? renderFooterComponent
      : renderLoadEarlierComponent;

    const footerComponent = inverted
      ? renderLoadEarlierComponent
      : renderFooterComponent;

    return (
      <View
        style={[
          styles.container,
          { marginBottom },
          containerStyle,
        ]}
      >
        <FlatList
          ref={listRef}
          data={preparedMessages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          inverted={inverted}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            !inverted &&
            styles.notInvertedContentContainer,
            listViewProps.contentContainerStyle,
          ]}
          ListHeaderComponent={
            headerComponent
          }
          ListFooterComponent={
            footerComponent
          }
          {...listViewProps}
        />
      </View>
    );
  },
);

MessageContainer.displayName =
  'MessageContainer';

export default memo(MessageContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  notInvertedContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});