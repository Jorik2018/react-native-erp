import { useEffect, useMemo, useRef } from 'react';
import {
    Pressable,
    StyleSheet,
    View,
} from 'react-native';

import {
    Camera,
    GeoJSONSource,
    Layer,
    Map,
    Marker,
    type CameraRef,
} from '@maplibre/maplibre-react-native';

import type {
    AppMapProps,
    MapMarker,
    MapPolyline,
} from './types';

const MAP_STYLE =
    'https://demotiles.maplibre.org/style.json';

type LineProperties = {
    id: string;
    color: string;
    width: number;
};

function createLineFeature(
    polyline: MapPolyline,
): GeoJSON.Feature<
    GeoJSON.LineString,
    LineProperties
> {
    return {
        type: 'Feature',
        properties: {
            id: polyline.id,
            color: polyline.color ?? '#1976D2',
            width: polyline.width ?? 5,
        },
        geometry: {
            type: 'LineString',
            coordinates: polyline.coordinates.map(
                coordinate => [
                    coordinate.longitude,
                    coordinate.latitude,
                ],
            ),
        },
    };
}

export default function AppMap({
    initialRegion,
    region,
    markers = [],
    polylines = [],
    fitCoordinates = [],
    fitPadding = {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
    },
    showsUserLocation = false,
    userLocation,
    zoom = 14,
    style,
    onMarkerPress,
}: AppMapProps) {

    const cameraRef = useRef<CameraRef>(null);

    useEffect(() => {
        if (
            !cameraRef.current ||
            fitCoordinates.length === 0
        ) {
            return;
        }

        if (fitCoordinates.length === 1) {
            const coordinate = fitCoordinates[0];

            cameraRef.current.easeTo({
                center: [
                    coordinate.longitude,
                    coordinate.latitude,
                ],
                zoom,
                duration: 300,
            });

            return;
        }

        const longitudes = fitCoordinates.map(
            coordinate => coordinate.longitude,
        );

        const latitudes = fitCoordinates.map(
            coordinate => coordinate.latitude,
        );

        const west = Math.min(...longitudes);
        const south = Math.min(...latitudes);
        const east = Math.max(...longitudes);
        const north = Math.max(...latitudes);

        cameraRef.current.fitBounds(
            [west, south, east, north],
            {
                padding: {
                    top: fitPadding.top,
                    right: fitPadding.right,
                    bottom: fitPadding.bottom,
                    left: fitPadding.left,
                },
                duration: 350,
            },
        );
    }, [
        fitCoordinates,
        fitPadding.top,
        fitPadding.right,
        fitPadding.bottom,
        fitPadding.left,
        zoom,
    ]);
    const currentRegion =
        region ?? initialRegion;

    const lineCollection = useMemo<
        GeoJSON.FeatureCollection<
            GeoJSON.LineString,
            LineProperties
        >
    >(
        () => ({
            type: 'FeatureCollection',
            features: polylines
                .filter(
                    polyline =>
                        polyline.coordinates.length >= 2,
                )
                .map(createLineFeature),
        }),
        [polylines],
    );

    return (
        <View style={[styles.container, style]}>
            <Map
                mapStyle={MAP_STYLE}
                style={styles.map}
            >
                <Camera
                    ref={cameraRef}
                    center={[
                        currentRegion.longitude,
                        currentRegion.latitude,
                    ]}
                    zoom={zoom}
                />
                {showsUserLocation && userLocation && (
                    <Marker
                        id="user-location"
                        lngLat={[
                            userLocation.longitude,
                            userLocation.latitude,
                        ]}
                        anchor="center"
                    >
                        <View style={styles.userMarker}>
                            <View
                                style={styles.userMarkerCenter}
                            />
                        </View>
                    </Marker>
                )}
                {markers.map((marker: MapMarker) => (
                    <Marker
                        key={marker.id}
                        id={marker.id}
                        lngLat={[
                            marker.coordinate.longitude,
                            marker.coordinate.latitude,
                        ]}
                        anchor="bottom"
                        onPress={() =>
                            onMarkerPress?.(marker)
                        }
                    >
                        <Pressable
                            style={[
                                styles.marker,
                                {
                                    backgroundColor:
                                        marker.color ?? '#E53935',
                                },
                            ]}
                        >
                            <View
                                style={styles.markerCenter}
                            />
                        </Pressable>
                    </Marker>
                ))}

                {lineCollection.features.length > 0 && (
                    <GeoJSONSource
                        id="application-polylines-source"
                        data={lineCollection}
                    >
                        <Layer
                            id="application-polylines-layer"
                            type="line"
                            paint={
                                {
                                    'line-color': [
                                        'coalesce',
                                        ['get', 'color'],
                                        '#1976D2',
                                    ],
                                    'line-width': [
                                        'coalesce',
                                        ['get', 'width'],
                                        5,
                                    ],
                                    'line-opacity': 1,
                                } as never
                            }
                            layout={
                                {
                                    'line-cap': 'round',
                                    'line-join': 'round',
                                } as never
                            }
                        />
                    </GeoJSONSource>
                )}
            </Map>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },

    map: {
        flex: 1,
    },

    marker: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },

    markerCenter: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    userMarker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
            'rgba(33, 150, 243, 0.25)',
    },

    userMarkerCenter: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2196F3',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
});