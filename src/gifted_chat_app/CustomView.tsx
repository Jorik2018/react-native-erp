import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import MapView, {
  type MapViewProps,
  //type MapStyleElement,
} from 'react-native-maps';

type Location = {
  latitude: number;
  longitude: number;
};

type ChatMessage = {
  location?: Location | null;
};

type CustomViewProps = {
  currentMessage?: ChatMessage;
  containerStyle?: StyleProp<ViewStyle>;
  mapViewStyle?: StyleProp<ViewStyle>;
  mapProps?: Omit<
    MapViewProps,
    | 'style'
    | 'region'
    | 'scrollEnabled'
    | 'zoomEnabled'
  >;
};

const emptyMessage: ChatMessage = {};

export function CustomView({
  currentMessage = emptyMessage,
  containerStyle,
  mapViewStyle,
  mapProps = {},
}: CustomViewProps) {
  const location = currentMessage.location;

  if (!location) {
    return null;
  }

  const openLocation = async () => {
    const {latitude, longitude} = location;

    const url = Platform.select({
      ios: `https://maps.apple.com/?ll=${latitude},${longitude}`,
      android: `https://maps.google.com/?q=${latitude},${longitude}`,
      web: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });

    if (!url) {
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        console.warn('No se puede abrir la ubicación:', url);
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error('Error al abrir la ubicación:', error);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Abrir ubicación en el mapa"
      style={[styles.container, containerStyle]}
      onPress={openLocation}
    >
      <MapView
        {...mapProps}
        style={[styles.mapView, mapViewStyle]}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});