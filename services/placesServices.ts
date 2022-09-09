import axios from 'axios';
import { GeoPoint, PRICE_RANGE } from './types';

const baseUrl = 'http://192.168.1.33:3000/place';

export interface PlaceDto {
  name: string;
  desc: string;
  location: GeoPoint;
  coverUri: string;
  openHours: number[][];
  placeId: string;
  email: string;
  priceRange: PRICE_RANGE;
  categories: string[];
  phone?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
}
export const postPlace = (place: PlaceDto) => axios.post(baseUrl, place);
