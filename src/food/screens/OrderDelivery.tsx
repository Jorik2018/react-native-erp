import { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    StyleSheet,
} from 'react-native';
//Cannot find module '../../components/maps' or its corresponding type declarations.
import {
    MapView,
    type LatLng,
    type MapMarker,
    type MapPolyline,
    type MapRegion,
} from '../../components/maps';
//import MapViewDirections from 'react-native-maps-directions';
import { COLORS, FONTS, icons, SIZES } from "../constants"

type Courier = {
    avatar?: string;
};

type Restaurant = {
    name?: string;
    location: LatLng;
    courier:Courier
};

type OrderDeliveryProps = {
    route: {
        params: {
            restaurant: Restaurant;
            currentLocation: {
                gps: LatLng;
                streetName: string;
            };
        };
    };
    navigation: any;
};

const OrderDelivery = ({ route, navigation }: OrderDeliveryProps) => {

    const [restaurant, setRestaurant] =
        useState<Restaurant | null>(null);

    const [streetName, setStreetName] =
        useState('');

    const [fromLocation, setFromLocation] =
        useState<LatLng | null>(null);

    const [toLocation, setToLocation] =
        useState<LatLng | null>(null);

    const [region, setRegion] =
        useState<MapRegion | null>(null);

    const [routeCoordinates, setRouteCoordinates] =
        useState<LatLng[]>([]);

    const [duration] =
        useState(7);

    const [zoom, setZoom] =
        useState(14);

    const [angle, setAngle] =
        useState(0);

    useEffect(() => {
        const {
            restaurant: selectedRestaurant,
            currentLocation,
        } = route.params;

        const fromLoc = currentLocation.gps;
        const toLoc = selectedRestaurant.location;

        const mapRegion: MapRegion = {
            latitude:
                (fromLoc.latitude + toLoc.latitude) / 2,

            longitude:
                (fromLoc.longitude + toLoc.longitude) / 2,

            latitudeDelta:
                Math.abs(
                    fromLoc.latitude - toLoc.latitude,
                ) * 2,

            longitudeDelta:
                Math.abs(
                    fromLoc.longitude - toLoc.longitude,
                ) * 2,
        };

        setRestaurant(selectedRestaurant);
        setStreetName(currentLocation.streetName);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion);

        /*
         * Temporalmente dibuja una línea recta.
         * Luego puedes reemplazar esto con una llamada
         * a Google Routes, OSRM o Valhalla.
         */
        setRouteCoordinates([
            fromLoc,
            toLoc,
        ]);

        setAngle(
            calculateAngle([
                fromLoc,
                toLoc,
            ]),
        );
    }, [route.params]);

    function calculateAngle(
        coordinates: LatLng[],
    ): number {
        if (coordinates.length < 2) {
            return 0;
        }

        const start = coordinates[0];
        const end = coordinates[1];

        const dx =
            end.latitude - start.latitude;

        const dy =
            end.longitude - start.longitude;

        return (
            Math.atan2(dy, dx) *
            (180 / Math.PI)
        );
    }

    async function makePhoneCall() {
        const url = 'tel:+254719177308';

        const supported =
            await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        }
    }



    function zoomIn() {
        setZoom(currentZoom =>
            Math.min(currentZoom + 1, 20),
        );
    }

    function zoomOut() {
        setZoom(currentZoom =>
            Math.max(currentZoom - 1, 1),
        );
    }

    const markers = useMemo<MapMarker[]>(() => {
        if (!fromLocation || !toLocation) {
            return [];
        }

        return [
            {
                id: 'destination',
                type: 'destination',
                coordinate: toLocation,
                color: COLORS.primary,
                title: restaurant?.name,
            },
            {
                id: 'delivery-car',
                type: 'car',
                coordinate: fromLocation,
                rotation: angle,
            },
        ];
    }, [
        fromLocation,
        toLocation,
        restaurant,
        angle,
    ]);

    const polylines =
        useMemo<MapPolyline[]>(() => {
            if (routeCoordinates.length < 2) {
                return [];
            }

            return [
                {
                    id: 'delivery-route',
                    coordinates: routeCoordinates,
                    color: COLORS.primary,
                    width: 5,
                },
            ];
        }, [routeCoordinates]);


    function renderMap() {
        if (
            !region ||
            !fromLocation ||
            !toLocation
        ) {
            return (
                <View style={styles.loadingContainer}>
                    <Text>Cargando mapa...</Text>
                </View>
            );
        }

        return (
            <View style={styles.mapContainer}>
                <MapView
                    initialRegion={region}
                    region={region}
                    zoom={zoom}
                    markers={markers}
                    polylines={polylines}
                    style={styles.map}
                    onMarkerPress={marker => {
                        console.log(
                            'Marker presionado:',
                            marker.id,
                        );
                    }}
                />

                <View style={styles.zoomControls}>
                    <TouchableOpacity
                        style={[
                            styles.zoomButton,
                            styles.zoomButtonTop,
                        ]}
                        onPress={zoomIn}
                    >
                        <Text style={styles.zoomText}>
                            +
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.zoomButton,
                            styles.zoomButtonBottom,
                        ]}
                        onPress={zoomOut}
                    >
                        <Text style={styles.zoomText}>
                            −
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.deliveryInfo}>
                    <View>
                        <Text style={styles.streetLabel}>
                            Dirección
                        </Text>

                        <Text style={styles.streetName}>
                            {streetName}
                        </Text>
                    </View>

                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>
                            {Math.ceil(duration)} min
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    function renderDestinationHeader() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Entrega del pedido
                </Text>

                <TouchableOpacity
                    onPress={makePhoneCall}
                >
                    <Image
                        source={icons.red_pin}
                        resizeMode="contain"
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
                </View>

                <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>
            </View>
        );
    }


    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={restaurant?.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.padding }}>
                            {/* Name & Rating */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.star}
                                        style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                                    />
                                    <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                                </View>
                            </View>

                            {/* Restaurant */}
                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.padding * 2,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                marginRight: 10,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => makePhoneCall()}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                backgroundColor: COLORS.secondary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    function renderButtons() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: SIZES.height * 0.35,
                    right: SIZES.padding * 2,
                    width: 60,
                    height: 130,
                    justifyContent: 'space-between'
                }}
            >
                {/* Zoom In */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => zoomIn()}
                >
                    <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>

                {/* Zoom Out */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => zoomOut()}
                >
                    <Text style={{ ...FONTS.body1 }}>-</Text>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
            {renderButtons()}
        </View>
    )
}

export default OrderDelivery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    mapContainer: {
        flex: 1,
    },

    map: {
        flex: 1,
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    zoomControls: {
        position: 'absolute',
        right: SIZES.padding,
        bottom: SIZES.height * 0.35,
    },

    zoomButton: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    zoomButtonTop: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },

    zoomButtonBottom: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    zoomText: {
        fontSize: 24,
        color: COLORS.black,
    },

    deliveryInfo: {
        position: 'absolute',
        left: SIZES.padding,
        right: SIZES.padding,
        bottom: SIZES.padding,
        padding: SIZES.padding,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    streetLabel: {
        ...FONTS.body4,
    },

    streetName: {
        color: COLORS.black,
        ...FONTS.h4,
    },

    durationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    duration: {
        color: COLORS.primary,
        ...FONTS.h4,
    },

    header: {
        position: 'absolute',
        top: SIZES.padding * 2,
        left: SIZES.padding,
        right: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerIcon: {
        width: 25,
        height: 25,
        tintColor: COLORS.black,
    },

    headerTitle: {
        color: COLORS.black,
        ...FONTS.h3,
    },
});
