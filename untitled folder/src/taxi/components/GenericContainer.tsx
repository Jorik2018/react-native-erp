import React, { useEffect, useState } from 'react';
import { Keyboard, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import PolyLine from '@mapbox/polyline';
import apiKey from '../google_api_key';

const genericContainer = (WrappedComponent: any) => {

  return () => {

    const [state, setState] = useState({
      latitude: null,
      longitude: null,
      pointCoords: [],
      destination: '',
      routeResponse: {},
    });

    let watchId: any;

    const getRouteDirections = async (placeId: any, destinationName: any) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${state.latitude},${state.longitude}&destination=place_id:${placeId}&key=${apiKey}`,
        );
        const json = await response.json();
        console.log('json getroutedirection', state.latitude);
        const points = PolyLine.decode(json.routes[0].overview_polyline.points);
        const pointCoords:any = points.map((point: any) => {
          return { latitude: point[0], longitude: point[1] };
        });
        setState({
          ...state,
          pointCoords,
          routeResponse: json,
        });
        Keyboard.dismiss();
        return destinationName;
      } catch (err) {
        console.log('Lol', err);
      }
    }

    const checkAndroidPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Taxi App',
            message:
              'Taxi App needs to see you location to show routes and get taxis',
          } as any,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn('error permission', err);
      }
    }

    useEffect(() => {
      const initialize = async () => {
        let granted: any = false;
        if (Platform.OS === 'ios') {
          granted = true;
        } else {
          granted = await checkAndroidPermissions();
        }
        if (granted) {
          watchId = Geolocation.watchPosition(
            (position) => {
              setState({
                ...state,
                latitude: position.coords.latitude as any,
                longitude: position.coords.longitude as any,
              });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 },
          );
        }
      };

      initialize();

      // Cleanup function
      return () => {
        if (watchId !== null) {
          Geolocation.clearWatch(watchId);
        }
      };
    }, []);

    return (
      <WrappedComponent
        getRouteDirections={getRouteDirections}
        latitude={state.latitude}
        longitude={state.longitude}
        pointCoords={state.pointCoords}
        destination={state.destination}
        routeResponse={state.routeResponse}
      />
    );
  };
}

export default genericContainer;
