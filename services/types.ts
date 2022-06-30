export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
export enum PLAN_TYPE {
  FREE = 'free',
  PREMIUM = 'premium',
  PREMIUM_PLUS = 'premium_plus',
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

export type Address = {
  formatted_address: string;
  place_id: string;
  street_number?: string;
  route?: string;
  locality: string;
  country: string;
  geocode: LatLng;
};

export type User = {
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
};

export type AddressResults = { description: string; place_id: string };
