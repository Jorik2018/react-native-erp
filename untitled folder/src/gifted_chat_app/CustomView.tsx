import PropTypes from 'prop-types';
import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';

export const CustomView = (props:any) => {
    if (props.currentMessage.location) {
      return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${props.currentMessage.location.latitude},${props.currentMessage.location.longitude}`,
            android: `http://maps.google.com/?q=${props.currentMessage.location.latitude},${props.currentMessage.location.longitude}`
          })!;
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              return Linking.openURL(url);
            }
          }).catch(err => {
            console.error('An error occurred', err);
          });
        }}>
          <MapView
            style={[styles.mapView, props.mapViewStyle]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </TouchableOpacity>
      );
    }
    return null;
}

const styles = StyleSheet.create({
  container: {
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  mapViewStyle: {},
};

CustomView.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.object,
  mapViewStyle: PropTypes.object
};