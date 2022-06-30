import React, {
  createContext,
  Dispatch,
  FC,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import MapView from 'react-native-maps';
import { Address, LatitudeLongitude } from '../services/types';

interface MapProvider {
  location: LatitudeLongitude;
  setLocation: Dispatch<LatitudeLongitude>;
  setIsOpenAddressEditor: Dispatch<boolean>;
  isOpenAddressEditor: boolean;
  mapRef: RefObject<MapView>;
  altitude: number;
  setAltitude: Dispatch<number>;
  address?: Address;
  setAddress: Dispatch<Address>;
}

export const DEFAULT_COORD_FRANCE = {
  latitude: 46,
  longitude: 2,
};

export const MapContext = createContext({} as MapProvider);
export const MapProvider: FC = ({ children }) => {
  const mapRef = useRef<MapView>(null);
  // const { user } = useUserContext();
  const [address, setAddress] = useState<Address>();
  const [location, setLocation] =
    useState<LatitudeLongitude>(DEFAULT_COORD_FRANCE);

  const [altitude, setAltitude] = useState<number>(3000000);

  useEffect(() => {
    setAltitude(location === DEFAULT_COORD_FRANCE ? 3000000 : 6000);
  }, [location]);
  const [isOpenAddressEditor, setIsOpenAddressEditor] =
    useState<boolean>(false);

  return (
    <MapContext.Provider
      value={{
        isOpenAddressEditor,
        setIsOpenAddressEditor,
        location,
        setLocation,
        mapRef,
        altitude,
        setAltitude,
        address,
        setAddress,
      }}
    >
      {/*<AddressEditorModal />*/}
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
