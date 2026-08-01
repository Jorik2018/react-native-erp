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
  | 'car';

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

export type AppMapProps = {
  initialRegion: MapRegion;
  region?: MapRegion;
  zoom?: number;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  style?: StyleProp<ViewStyle>;
  onMarkerPress?: (marker: MapMarker) => void;
};