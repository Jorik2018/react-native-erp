/* eslint-disable no-sparse-arrays */
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Linking,
  Platform,
} from 'react-native'
import MapView, { Polyline, Marker } from 'react-native-maps';
import BottomButton from '../../components/BottomButton';
import { io } from 'socket.io-client'
import { SOCKET_IO_URL } from '../../config';
//import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const Driver = (props: any) => {

  let socket:any = null;

  const [state, setState] = useState({
    lookingForPassengers: false,
    buttonText: 'FIND PASSENGER'
  } as any);

  const [map, setMap] = useState([] as any);

  useEffect(()=>{
    /*
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings()
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel'
                },
                ,
              ]
            ),
          1000
        );
      }
    });*/
  },[]);

  const lookForPassengers = async () => {
    if (state.lookingForPassengers) {
      setState({
        ...state,
        lookingForPassengers: false
      });
      return;
    }

    setState({
      ...state,
      lookingForPassengers: true,
      buttonText: 'FINDING PASSENGERS'
    });

    socket = io(SOCKET_IO_URL);

    socket.on('connect', () => {
      socket.emit('lookingForPassengers');
    });

    socket.on('taxiRequest', async (routeResponse: any) => {
      await props.getRouteDirections(
        routeResponse.geocoded_waypoints[0].place_id
      );
      map.fitToCoordinates(props.pointCoords, {
        edgePadding: { top: 20, bottom: 20, left: 80, right: 80 }
      });
      setState({
        ...state,
        buttonText: 'PASSENGER FOUND! PRESS TO ACCEPT',
        lookingForPassengers: false,
        passengerFound: true,
      });
    });
  }

  const acceptPassengerRequest = () => {
    const passengerLocation = props.pointCoords[
      props.pointCoords.length - 1
    ];
    // this.setState({
    //   lookingForPassengers: false,
    // });
    /*BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning
      )
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled
      )
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        console.log('start', status.isRunning);
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
    BackgroundGeolocation.on('location', (location) => {
      //Send driver location to paseenger socket io backend
      this.socket.emit('driverLocation', {
        latitude: location.latitude,
        longitude: location.longitude
      });
    });*/

    if (Platform.OS === 'ios') {
      Linking.openURL(
        `http://maps.apple.com/?daddr=${passengerLocation.latitude},${passengerLocation.longitude}`
      );
    } else {
      Linking.openURL(
        `geo:0,0?q=${passengerLocation.latitude},${passengerLocation.longitude}(Passenger)`
      );
    }
  }

  let endMarker = null;
  let startMarker = null;
  let findingPassengerActIndicator:any = null;
  let bottomButtonFunction:any = lookForPassengers;

  if (props.latitude === null) {
    return null;
  }

  if (state.lookingForPassengers) {
    findingPassengerActIndicator = (
      <ActivityIndicator
        size="large"
        animating={state.lookingForPassengers}
        color="white"
      />
    );
  }

  if (state.passengerFound) {
    //passengerSearchText = 'FOUND PASSENGER! PRESS TO ACCEPT RIDE?';
    bottomButtonFunction = acceptPassengerRequest;
  }

  if (props.pointCoords.length > 1) {
    endMarker = (
      <Marker
        coordinate={
          props.pointCoords[props.pointCoords.length - 1]
        }>
        <Image
          style={{ width: 40, height: 40 }}
          source={require('../images/person-marker.png')}
        />
      </Marker>
    );
  }

  return (
    <View style={styles.mapStyle}>
      <MapView
        ref={(map) => {
          setMap(map);
        }}
        style={styles.mapStyle}
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
        showsUserLocation={true}>
        <Polyline
          coordinates={props.pointCoords}
          strokeWidth={2}
          strokeColor="red"
        />
        {endMarker}
        {startMarker}
      </MapView>
      <BottomButton
        onPressFunction={bottomButtonFunction}
        buttonText={state.buttonText}>
        {findingPassengerActIndicator}
      </BottomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: 'black',
    padding: 20,
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 'auto',
    margin: 20,
    alignSelf: 'center'
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 20
  },
  suggestions: {
    backgroundColor: 'white',
    fontSize: 14,
    padding: 5,
    borderWidth: 0.5,
    marginRight: 20,
    marginLeft: 20
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    padding: 5,
    backgroundColor: 'white'
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Driver;
