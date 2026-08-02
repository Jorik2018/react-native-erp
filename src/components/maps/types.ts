// components/maps/types.ts

import type {
  StyleProp,
  ViewStyle,
} from 'react-native';

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type MapRegion = LatLng & {
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export type MapMarkerType =
  | 'default'
  | 'destination'
  | 'car'
  | 'driver';

export type MapMarker = {
  id: string;
  coordinate: LatLng;
  type?: MapMarkerType;
  title?: string;
  description?: string;
  color?: string;
  rotation?: number;
};

export type MapPolyline = {
  id: string;
  coordinates: LatLng[];
  color?: string;
  width?: number;
};

import type {
  ReactNode,
} from 'react';

export type AppMapProps = {
  initialRegion: MapRegion;
  region?: MapRegion;
  zoom?: number;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  fitCoordinates?: LatLng[];
  fitPadding?: MapEdgePadding;
  showsUserLocation?: boolean;
  userLocation?: LatLng | null;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onMarkerPress?: (marker: MapMarker) => void;
};

export type MapEdgePadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

