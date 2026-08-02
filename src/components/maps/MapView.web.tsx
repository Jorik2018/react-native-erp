import {
    useEffect,
    useRef,
} from 'react';

import Feature from 'ol/Feature.js';
import OlMap from 'ol/Map.js';
import View from 'ol/View.js';

import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';

import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';

import OSM from 'ol/source/OSM.js';
import VectorSource from 'ol/source/Vector.js';

import {
    fromLonLat,
} from 'ol/proj.js';

import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
} from 'ol/style.js';

import type {
    AppMapProps,
    MapMarker,
} from './types';

import 'ol/ol.css';

export default function AppMap({
    initialRegion,
    markers = [],
    polylines = [],
    zoom = 14,
    style,
    onMarkerPress,
    fitCoordinates = [],
    fitPadding = {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
    },
    children,
}: AppMapProps) {
    const containerRef =
        useRef<HTMLDivElement | null>(null);

    const mapRef =
        useRef<OlMap | null>(null);

    const markerSourceRef =
        useRef(new VectorSource());

    const polylineSourceRef =
        useRef(new VectorSource());

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const markerLayer = new VectorLayer({
            source: markerSourceRef.current,
            style: feature => {
                const color =
                    feature.get('color') ?? '#E53935';

                return new Style({
                    image: new CircleStyle({
                        radius: 8,
                        fill: new Fill({
                            color,
                        }),
                        stroke: new Stroke({
                            color: '#FFFFFF',
                            width: 2,
                        }),
                    }),
                });
            },
        });

        const polylineLayer = new VectorLayer({
            source: polylineSourceRef.current,
            style: feature =>
                new Style({
                    stroke: new Stroke({
                        color:
                            feature.get('color') ?? '#1976D2',
                        width:
                            feature.get('width') ?? 5,
                        lineCap: 'round',
                        lineJoin: 'round',
                    }),
                }),
        });

        const map = new OlMap({
            target: containerRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                polylineLayer,
                markerLayer,
            ],
            view: new View({
                center: fromLonLat([
                    initialRegion.longitude,
                    initialRegion.latitude,
                ]),
                zoom,
            }),
        });

        map.on('singleclick', event => {
            map.forEachFeatureAtPixel(
                event.pixel,
                feature => {
                    const marker =
                        feature.get('marker') as
                        | MapMarker
                        | undefined;

                    if (marker) {
                        onMarkerPress?.(marker);
                        return true;
                    }

                    return undefined;
                },
            );
        });

        mapRef.current = map;

        return () => {
            map.setTarget(undefined);
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        const source = markerSourceRef.current;

        source.clear();

        const features = markers.map(marker => {
            const feature = new Feature({
                geometry: new Point(
                    fromLonLat([
                        marker.coordinate.longitude,
                        marker.coordinate.latitude,
                    ]),
                ),
            });

            feature.set('marker', marker);
            feature.set('color', marker.color);

            return feature;
        });

        source.addFeatures(features);
    }, [markers]);

    useEffect(() => {
        const source = polylineSourceRef.current;

        source.clear();

        const features = polylines
            .filter(
                polyline =>
                    polyline.coordinates.length >= 2,
            )
            .map(polyline => {
                const geometry = new LineString(
                    polyline.coordinates.map(
                        ({ latitude, longitude }) =>
                            fromLonLat([
                                longitude,
                                latitude,
                            ]),
                    ),
                );

                const feature = new Feature({
                    geometry,
                });

                feature.set('color', polyline.color);
                feature.set('width', polyline.width);

                return feature;
            });

        source.addFeatures(features);
    }, [polylines]);

    useEffect(() => {
        const view = mapRef.current?.getView();

        view?.animate({
            center: fromLonLat([
                initialRegion.longitude,
                initialRegion.latitude,
            ]),
            zoom,
            duration: 350,
        });
    }, [
        initialRegion.latitude,
        initialRegion.longitude,
        zoom,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (
            !map ||
            fitCoordinates.length === 0
        ) {
            return;
        }

        const projectedCoordinates =
            fitCoordinates.map(
                coordinate =>
                    fromLonLat([
                        coordinate.longitude,
                        coordinate.latitude,
                    ]),
            );

        if (
            projectedCoordinates.length === 1
        ) {
            map.getView().animate({
                center:
                    projectedCoordinates[0],
                zoom,
                duration: 300,
            });

            return;
        }

        const line = new LineString(
            projectedCoordinates,
        );

        map.getView().fit(
            line.getExtent(),
            {
                padding: [
                    fitPadding.top,
                    fitPadding.right,
                    fitPadding.bottom,
                    fitPadding.left,
                ],
                duration: 350,
                maxZoom: 17,
            },
        );
    }, [
        fitCoordinates,
        fitPadding,
        zoom,
    ]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: 300,
                ...(style as React.CSSProperties),
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                }}
            />

            {children ? (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                    }}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
}