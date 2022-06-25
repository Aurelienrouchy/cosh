import React, {
  createContext,
  Dispatch,
  FC,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { DEFAULT_COORD_FRANCE } from '../screens/GetLocation';

export type GeoCode = {
  latitude: number;
  longitude: number;
};

interface MapProvider {
  selectedAddress: string;
  setSelectedAddress: Dispatch<string>;
  radius: number;
  setRadius: Dispatch<number>;
  location?: LatLng;
  setLocation: Dispatch<LatLng>;
  setIsOpenAddressEditor: Dispatch<boolean>;
  isOpenAddressEditor: boolean;
  mapRef: RefObject<MapView>;
}

export const RADIUS_BASE_IN_METRE = 10 * 1000;

export const MapContext = createContext({} as MapProvider);
export const MapProvider: FC = ({ children }) => {
  const mapRef = useRef<MapView>(null);

  const [radius, setRadius] = useState<number>(RADIUS_BASE_IN_METRE);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [location, setLocation] = useState<LatLng>(DEFAULT_COORD_FRANCE);

  const [isOpenAddressEditor, setIsOpenAddressEditor] =
    useState<boolean>(false);

  return (
    <MapContext.Provider
      value={{
        isOpenAddressEditor,
        setIsOpenAddressEditor,
        location,
        setLocation,
        selectedAddress,
        setSelectedAddress,
        radius,
        setRadius,
        mapRef,
      }}
    >
      {/*<AddressEditorModal />*/}
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
