export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
export enum PLAN_TYPE {
  FREE = 'free',
  PREMIUM = 'premium',
  PREMIUM_PLUS = 'premium_plus',
}
export enum PRICE_RANGE {
  $ = '$',
  $$ = '$$',
  $$$ = '$$$',
  $$$$ = '$$$$',
}
export enum PLAN_BILLING_TYPE {
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
}
export enum VERIFICATION_STATUS {
  VERIFIED = 'verified',
  IN_PROGRESS = 'in_progress',
  NOT_VERIFIED = 'not_verified',
}

export interface GeoPoint {
  type: string;
  coordinates: number[];
}

type PhoneType = {
  countryCode: string;
  number: string;
};

export type LatitudeLongitude = {
  latitude: number;
  longitude: number;
};

export interface LatLng {
  lat: number;
  lng: number;
}

export interface IAddress {
  formatted_address: string;
  place_id: string;
  street_number?: string;
  route?: string;
  locality?: string;
  country?: string;
  geocode: LatLng;
}

export interface IUser {
  id: string;
  role: ROLE;
  name: string;
  phone: PhoneType;
  website?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  providerId?: string;
  planType: PLAN_TYPE;
  planBillingType?: PLAN_BILLING_TYPE;
  placeIds?: string[];
  placeId: string;
  followers?: string[];
  verificationStatus: VERIFICATION_STATUS;
  categories: string[];
  otherSocialNetworks: string[];
  events: string[];
  eventsLiked: string[];
}
export interface IEvent extends IAddress {
  id: number;
  title: string;
  desc: string;
  coverUri: string;
  photos: string[];
  followers: string[];
  endAt: Date;
  beginAt?: Date;
  distance: number;
  price: number;
  userId: string[];
  place: string;
  type: string[];
}

export interface IPlace extends IAddress {
  name: string;
  coverUri: string;
  openHours: string[];
  desc: string;
  phone: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  followers?: string[];
  categories: string[];
  priceRange: PRICE_RANGE;
}
