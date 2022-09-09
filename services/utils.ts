import { LatLng } from 'react-native-maps';

interface LatLngFromServer {
  lat: number;
  lng: number;
}

export function formatLocation(
  location: number[] | LatLng | LatLngFromServer,
): LatLng {
  if (Array.isArray(location)) {
    return {
      latitude: location[0],
      longitude: location[1],
    };
  } else if ('latitude' in location) {
    return {
      latitude: location['latitude'],
      longitude: location['longitude'],
    };
  } else {
    return {
      latitude: location['lat'],
      longitude: location['lng'],
    };
  }
}

// export function parseDatetoArray() {}

// export function parseNumbertoDate(number: number) {

// }
