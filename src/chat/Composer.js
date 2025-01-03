/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';

import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from './Constant';
import Color from './Color';

export default class Composer extends React.Component {

  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
    }
  }

  onChangeText(text) {
    this.props.onTextChanged(text);
  }

  render() {
    return (
      <View style={{ flex: 1, minHeight: 54, paddingHorizontal: 15, paddingVertical: 10,
        backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: '#E9EEF1' }}>
        <Image
          source={require('./assets/Attachment-grey.png')}
          style={{ height: 30, width: 30 }}
        />
        <View style={{
          flex: 1,
          minHeight: 34,
          shadowOffset: {
            height: 2,
            width: -1
          },
          shadowOpacity: 0.1,
          backgroundColor: 'white',
          borderRadius: 5,
          marginHorizontal: 15
        }}>
          <TextInput
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            multiline={this.props.multiline}
            onChange={(e) => this.onContentSizeChange(e)}
            onContentSizeChange={(e) => this.onContentSizeChange(e)}
            onChangeText={(text) => this.onChangeText(text)}
            style={[styles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }]}
            autoFocus={this.props.textInputAutoFocus}
            value={this.props.text}
            accessibilityLabel={this.props.text || this.props.placeholder}
            enablesReturnKeyAutomatically
            underlineColorAndroid="transparent"
            minHeight={this.props.composerHeight}
            keyboardAppearance={this.props.keyboardAppearance}
            {...this.props.textInputProps}
          />
        </View>
        <TouchableOpacity
          onPress = {() => {
            this.props.onSend({ text: this.props.text.trim() }, true);
          }}
          >
          <Image
            source={require('./assets/Emoji-default.png')}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>  
    );
  }

}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
});

Composer.defaultProps = {
  composerHeight: MIN_COMPOSER_HEIGHT,
  text: '',
  placeholderTextColor: Color.defaultProps,
  placeholder: DEFAULT_PLACEHOLDER,
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: 'default',
  onTextChanged: () => {},
  onInputSizeChanged: () => {},
};

Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  textInputStyle: PropTypes.object,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};