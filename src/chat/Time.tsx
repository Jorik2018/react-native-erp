/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import Color from './Color';
import { TIME_FORMAT } from './Constant';

export default function Time({ position, containerStyle, currentMessage, timeFormat }:any, context:any) {
  return (
    <View style={[styles[position].container, containerStyle[position]]}>
      <Text style={[styles[position].text, textStyle[position]]}>
        {moment(currentMessage.createdAt)
          .locale(context.getLocale())
          .format(timeFormat)}
      </Text>
    </View>
  );
}

const containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const textStyle:any = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles:any = {
  left: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Color.timeTextColor,
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    text: {
      color: Color.white,
      ...textStyle,
    },
  }),
};

Time.contextTypes = {
  getLocale: PropTypes.func,
};

Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null,
  },
  containerStyle: {},
  textStyle: {},
  timeFormat: TIME_FORMAT,
};

Time.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: PropTypes.object,
    right: PropTypes.object,
  }),
  textStyle: PropTypes.shape({
    left: PropTypes.object,
    right: PropTypes.object,
  }),
  timeFormat: PropTypes.string,
};
