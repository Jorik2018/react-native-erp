import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Image,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import apiKey from '../google_api_key';
import { io } from 'socket.io-client';
import BottomButton from '../../components/BottomButton';
import { SOCKET_IO_URL } from '../../config';

const Passenger = (props: any) => {

  const [state, setState] = useState({
    lookingForDriver: false,
    buttonText: 'REQUEST 🚗',
    driverIsOnTheWar: false,
    predictions: [],
  } as any);

  const [map, setMap] = useState([] as any);

  const onChangeDestination = async (destination: any) => {
    //call places API
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}&key=${apiKey}&location=${props.latitude}, ${props.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      setState({
        predictions: json.predictions,
      });
    } catch (err) {
      console.log('L', err);
    }
  }

  const resquestDriver = async () => {

    setState({ lookingForDriver: true });

    const socket = io(SOCKET_IO_URL);

    socket.on('connect', () => {
      //Request a Taxi!
      socket.emit('taxiRequest', props.routeResponse);
    });

    socket.on('driverLocation', (driverLocation) => {
      const pointCoords = [...props.pointCoords, driverLocation];
      console.log('socketon driverlocation', pointCoords);
      console.log('driverLoc', driverLocation);
      map.fitToCoordinates(pointCoords, {
        edgePadding: { top: 40, bottom: 20, left: 20, right: 20 },
      });
      //getRouteDirections(routeResponse.geocoded_waypoints[0].place_id);
      setState({
        buttonText: 'TAXI IS ON THE WAY!',
        lookingForDriver: false,
        driverIsOnTheWar: true,
        driverLocation,
      });
    });
  }


  let marker = null;
  let getDriver = null;
  let findingDriverActIndicator = null;
  let driverMarker = null;

  if (props.latitude === null) {
    return null;
  }

  if (state.driverIsOnTheWar) {
    driverMarker = (
      <Marker coordinate={state.driverLocation}>
        <Image
          source={require('../images/carIcon.png')}
          style={{ width: 40, height: 40 }}
        />
      </Marker>
    );
  }

  if (state.lookingForDriver) {
    findingDriverActIndicator = (
      <ActivityIndicator
        size="large"
        animating={state.lookingForDriver}
        color="white"
      />
    );
  }

  if (props.pointCoords.length > 1) {
    marker = (
      <Marker
        coordinate={props.pointCoords[props.pointCoords.length - 1]}
      />
    );
    getDriver = (
      <BottomButton
        onPressFunction={() => resquestDriver()}
        buttonText={state.buttonText}>
        {findingDriverActIndicator}
      </BottomButton>
    );
  }
  const predictions = state.predictions.map((prediction:any) => (
    <TouchableHighlight
      onPress={async () => {
        const destinationName = await props.getRouteDirections(
          prediction.place_id,
          prediction.structured_formatting.main_text,
        );
        setState({ predictions: [], destination: destinationName });
        map.fitToCoordinates(props.pointCoords, {
          edgePadding: { top: 20, bottom: 20, left: 80, right: 80 },
        });
      }}
      key={prediction.place_id}>
      <View>
        <Text style={styles.suggestions}>
          {prediction.structured_formatting.main_text}
        </Text>
      </View>
    </TouchableHighlight>
  ));

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
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}>
        <Polyline
          coordinates={props.pointCoords}
          strokeWidth={2}
          strokeColor="red"
        />
        {marker}
        {driverMarker}
      </MapView>

      <TextInput
        placeholder="Enter destination..."
        style={styles.destinationInput}
        value={state.destination}
        clearButtonMode="always"
        onChangeText={(destination) => {
          props.destination = destination;
          //setState({destination});
          onChangeDestination(destination);
        }}
      />
      {predictions}
      {getDriver}
    </View>
  );

}

export default Passenger;

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: 'black',
    padding: 20,
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 'auto',
    margin: 20,
    alignSelf: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 20,
  },
  suggestions: {
    backgroundColor: 'white',
    fontSize: 14,
    padding: 5,
    borderWidth: 0.5,
    marginRight: 20,
    marginLeft: 20,
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    padding: 5,
    backgroundColor: 'white',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
