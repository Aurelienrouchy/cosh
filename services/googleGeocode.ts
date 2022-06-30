import axios from 'axios';
import {
  API_KEY,
  DEFAULT_LANGUAGE,
  GOOGLE_AUTOCOMPLETE_URI,
} from '../constants/utils';
import { Address, AddressResults, LatitudeLongitude } from './types';

const getAddressFromResult = (result: any): Address => {
  return result.address_components.reduce((acc: any, cur: any) => {
    return {
      ...acc,
      [cur.types[0]]: cur.long_name,
    };
  }, {});
};

export const getAddressFromPlaceId = (id: string): Promise<Address> => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${API_KEY}`,
    )
    .then((response) => {
      const res = response.data.results[0];
      return {
        ...getAddressFromResult(res),
        formatted_address: res.formatted_address,
        place_id: res.place_id,
        geocode: res.geometry.location,
      };
    });
};

export const getAddressFromGeoCode = ({
  latitude,
  longitude,
}: LatitudeLongitude): Promise<any> => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
    )
    .then((response) => {
      const res = response.data.results[0];
      return {
        ...getAddressFromResult(res),
        formatted_address: res.formatted_address,
        place_id: res.place_id,
        geocode: res.geometry.location,
      };
    });
};

export const getAddressFromText = (text: string): Promise<AddressResults[]> => {
  return axios
    .get(
      GOOGLE_AUTOCOMPLETE_URI +
        `input=${text}&types=geocode&language=${DEFAULT_LANGUAGE}&key=${API_KEY}`,
    )
    .then((response) => {
      const data = response.data;
      return data.predictions.map((dt: AddressResults) => ({
        description: dt.description,
        place_id: dt.place_id,
      }));
    });
};
