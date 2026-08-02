import { useEffect, useMemo, useState } from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	ActivityIndicator,
} from 'react-native';
import {
	MapView,
	type LatLng,
	type MapMarker,
	type MapPolyline,
	type MapRegion,
} from '../../components/maps';
import { io } from 'socket.io-client';
import BottomButton from '../../components/BottomButton';
import { SOCKET_IO_URL } from '../../config';

type Prediction = {
	place_id: string;
	structured_formatting: {
		main_text: string;
	};
};

type PassengerState = {
	lookingForDriver: boolean;
	buttonText: string;
	driverIsOnTheWay: boolean;
	predictions: Prediction[];
	destination?: string;
	driverLocation?: LatLng;
};

type PassengerProps = {
	latitude: number | null;
	longitude: number | null;
	destination?: string;
	pointCoords: LatLng[];
	routeResponse: unknown;

	getRouteDirections: (
		placeId: string,
		destinationName: string,
	) => Promise<string>;
};

const Passenger = ({
	latitude,
	longitude = 0,
	pointCoords,
	routeResponse,
	getRouteDirections,
}: PassengerProps) => {

	const [state, setState] = useState<PassengerState>({
		lookingForDriver: false,
		buttonText: 'REQUEST 🚗',
		driverIsOnTheWay: false,
		predictions: [],
	});

	const [fitCoordinates, setFitCoordinates] =
		useState<LatLng[]>([]);

	const onChangeDestination = async (
		destination: string,
	) => {
		updateState({
			destination,
		});

		if (
			destination.trim().length < 2 ||
			latitude === null ||
			longitude === null
		) {
			updateState({
				predictions: [],
			});

			return;
		}

		const query =
			new URLSearchParams({
				input: destination,
				key: 'apiKey',
				location: `${latitude},${longitude}`,
				radius: '2000',
			});

		const apiUrl =
			`https://maps.googleapis.com/maps/api/place/autocomplete/json?${query.toString()}`;

		try {
			const result = await fetch(apiUrl);

			if (!result.ok) {
				throw new Error(
					`Google Places respondió ${result.status}`,
				);
			}

			const json = await result.json();

			updateState({
				predictions:
					json.predictions ?? [],
			});
		} catch (error) {
			console.error(
				'Error obteniendo destinos:',
				error,
			);

			updateState({
				predictions: [],
			});
		}
	};


	const requestDriver = () => {
		updateState({
			lookingForDriver: true,
		});

		const socket = io(SOCKET_IO_URL);

		socket.on('connect', () => {
			socket.emit(
				'taxiRequest',
				routeResponse,
			);
		});

		socket.on(
			'driverLocation',
			(driverLocation: LatLng) => {
				const coordinates = [
					...pointCoords,
					driverLocation,
				];

				setFitCoordinates(coordinates);

				updateState({
					buttonText:
						'TAXI IS ON THE WAY!',
					lookingForDriver: false,
					driverIsOnTheWay: true,
					driverLocation,
				});
			},
		);

		socket.on('connect_error', error => {
			console.error(
				'Error de Socket.IO:',
				error,
			);

			updateState({
				lookingForDriver: false,
			});
		});
	};

	const markers = useMemo<MapMarker[]>(() => {
		const result: MapMarker[] = [];

		if (pointCoords.length > 1) {
			result.push({
				id: 'destination',
				type: 'destination',
				coordinate:
					pointCoords[
					pointCoords.length - 1
					],
			});
		}

		if (
			state.driverIsOnTheWay &&
			state.driverLocation
		) {
			result.push({
				id: 'driver',
				type: 'driver',
				coordinate:
					state.driverLocation,
			});
		}

		return result;
	}, [
		pointCoords,
		state.driverIsOnTheWay,
		state.driverLocation,
	]);

	const polylines =
		useMemo<MapPolyline[]>(() => {
			if (pointCoords.length < 2) {
				return [];
			}
			return [
				{
					id: 'passenger-route',
					coordinates: pointCoords,
					color: 'red',
					width: 2,
				},
			];
		}, [pointCoords]);

	let getDriver = null;
	let findingDriverActIndicator = null;

	if (latitude === null) {
		return null;
	}

	if (state.driverIsOnTheWay) {
		/*driverMarker = (
			<Marker coordinate={state.driverLocation}>
				<Image
					source={require('../images/carIcon.png')}
					style={{ width: 40, height: 40 }}
				/>
			</Marker>
		);*/
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


	useEffect(() => {
		return () => {
			/*
			 * Si prefieres mantener un socket permanente,
			 * muévelo fuera de requestDriver.
			 */
		};
	}, []);

	const updateState = (
		updates: Partial<PassengerState>,
	) => {
		setState(currentState => ({
			...currentState,
			...updates,
		}));
	};


	const initialRegion: MapRegion = {
		latitude,
		longitude:0,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	};

	if (pointCoords.length > 1) {
		/*marker = (
			<Marker
				coordinate={pointCoords[pointCoords.length - 1]}
			/>
		);*/
		getDriver = (
			<BottomButton
				onPressFunction={() => requestDriver()}
				buttonText={state.buttonText}>
				{findingDriverActIndicator}
			</BottomButton>
		);
	}

	if (
		latitude === null ||
		longitude === null
	) {
		return null;
	}

	const predictions = state.predictions.map(prediction => (
		<TouchableHighlight
			key={prediction.place_id}
			onPress={async () => {
				const destinationName =
					await getRouteDirections(
						prediction.place_id,
						prediction
							.structured_formatting
							.main_text,
					);

				updateState({
					predictions: [],
					destination:
						destinationName,
				});

				setFitCoordinates(pointCoords);
			}}
		>
			<View>
				<Text style={styles.suggestions}>
					{
						prediction
							.structured_formatting
							.main_text
					}
				</Text>
			</View>
		</TouchableHighlight>
	));

	//markers - marker - driverMarker

	return (
		<View style={styles.container}>
			<MapView
				initialRegion={initialRegion}
				markers={markers}
				polylines={polylines}
				fitCoordinates={fitCoordinates}
				fitPadding={{
					top: 40,
					bottom: 20,
					left: 20,
					right: 20,
				}}
				showsUserLocation
				userLocation={{
					latitude,
					longitude,
				}}
				style={styles.map}
			/>

			<TextInput
				placeholder="Enter destination..."
				style={styles.destinationInput}
				value={state.destination ?? ''}
				clearButtonMode="always"
				onChangeText={
					onChangeDestination
				}
			/>

			<View style={styles.predictions}>
				{predictions}
			</View>

			{pointCoords.length > 1 && (
				<BottomButton
					onPressFunction={requestDriver}
					buttonText={state.buttonText}
				>
					{state.lookingForDriver && (
						<ActivityIndicator
							size="large"
							color="white"
						/>
					)}
				</BottomButton>
			)}

			<TextInput
				placeholder="Enter destination..."
				style={styles.destinationInput}
				value={state.destination}
				clearButtonMode="always"
				onChangeText={(destination) => {
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
		//...StyleSheet.absoluteFillObject,
	},
	container: {
		flex: 1,
	},

	map: {
		flex: 1,
	},

	predictions: {
		position: 'absolute',
		top: 75,
		left: 20,
		right: 20,
		backgroundColor: 'white',
	},
});
