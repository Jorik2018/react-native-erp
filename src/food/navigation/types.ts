import type { LatLng } from "../../components/maps/types";

export type Courier = {
    avatar?: any;
    name: string;
};

export type Restaurant = {
    name?: string;
    location: LatLng;
    courier: Courier;
    rating?: number;
};

export type CurrentLocation = {
  gps: LatLng;
  streetName: string;
};

export type RootStackParamList = {
  Home: undefined;

  OrderDelivery: {
    restaurant: Restaurant;
    currentLocation: CurrentLocation;
  };

  Restaurants: undefined;
};