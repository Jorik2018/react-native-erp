/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';

import Color from './Color';

import { isSameDay, isSameUser, warnDeprecated } from './utils';
import { DATE_FORMAT } from './Constant';

const calendarFormat = {
  lastDay : '[Yesterday]',
  sameDay : '[Today]',
  nextDay : '[Tomorrow]',
  lastWeek : 'dddd',
  sameElse : 'L'
}

export default function Day(
  { dateFormat, currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle },
  context,
) {
  if (!isSameDay(currentMessage, previousMessage)) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[wrapperStyle, {flexDirection: 'row', alignItems: 'center' }]}>
          <View style={styles.lineDivider} />
          <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt)
            .calendar(null,calendarFormat)
            .toUpperCase()}
          </Text>
          <View style={styles.lineDivider} />
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: '#35475b',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.5,
    fontFamily: 'Rubik-Medium',
    paddingHorizontal: 25
  },
  lineDivider: {
    height: 1,
    borderWidth: 0.5,
    flex: 1, 
    borderColor: '#e9eef1'
  }
});

Day.contextTypes = {
  getLocale: PropTypes.func,
};

Day.defaultProps = {
  currentMessage: {
    // TODO: test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  // TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
  dateFormat: DATE_FORMAT,
};

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  textStyle: PropTypes.object,
  // TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func,
  dateFormat: PropTypes.string,
};
