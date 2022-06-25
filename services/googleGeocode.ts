import { GeoCode } from '../provider/MapProvider';
import axios from 'axios';
import {
  API_KEY,
  DEFAULT_LANGUAGE,
  GOOGLE_AUTOCOMPLETE_URI,
} from '../constants/utils';

export const searchGeocode = (place: string): Promise<GeoCode> => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${API_KEY}`,
    )
    .then(function (response) {
      const res = response.data.results[0];

      return {
        latitude: res.geometry.location.lat,
        longitude: res.geometry.location.lng,
      };
    });
};

export const searchAddress = (text: string): Promise<string[]> => {
  return axios
    .get(
      GOOGLE_AUTOCOMPLETE_URI +
        `input=${text}&types=geocode&language=${DEFAULT_LANGUAGE}&key=${API_KEY}`,
    )
    .then(function (response) {
      const data = response.data;
      return data.predictions.map(
        (dt: { description: string }) => dt.description,
      );
    });
};
