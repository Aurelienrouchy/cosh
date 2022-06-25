import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import AddressEditorModal from '../components/AddressEditorModal/AddressEditorModal';
import * as Location from 'expo-location';

interface AddressProvider {
  selectedAddress: string;
  setSelectedAddress: Dispatch<string>;
  range: number;
  setRange: Dispatch<number>;
  location: Location.LocationObject;
  setLocation: Dispatch<Location.LocationObject>;
  setIsOpenAddressEditor: Dispatch<boolean>;
  isOpenAddressEditor: boolean;
}

export const AddressContext = createContext({} as AddressProvider);
export const AddressProvider: FC = ({ children }) => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const [range, setRange] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject,
  );

  useEffect(() => {
    (async () => {
      if (!status?.granted) {
        await requestPermission();
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  const [isOpenAddressEditor, setIsOpenAddressEditor] =
    useState<boolean>(false);

  return (
    <AddressContext.Provider
      value={{
        isOpenAddressEditor,
        setIsOpenAddressEditor,
        location,
        setLocation,
        selectedAddress,
        setSelectedAddress,
        range,
        setRange,
      }}
    >
      <AddressEditorModal />
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);
