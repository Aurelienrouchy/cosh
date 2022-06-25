import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import React, { FC, useState } from 'react';
import { height, width } from '../../constants/Layout';
import { GeoCode } from '../../provider/MapProvider';
import { searchAddress, searchGeocode } from '../../services/googleGeocode';

interface AddressFinderProps {
  handleSelect: (address: string, geoCode: GeoCode) => void;
  resetAfterSelect?: boolean;
}

const AddressFinder: FC<AddressFinderProps> = ({
  handleSelect,
  resetAfterSelect = false,
}) => {
  const [address, setAddress] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearchAddress = (text: string) => {
    setAddress(text);
    searchAddress(text).then((data) => {
      return setResults(data);
    });
  };

  const handleSelectAddress = (address: string) => {
    searchGeocode(address).then((geoCode) => {
      handleSelect(address, geoCode);
    });

    setAddress(resetAfterSelect ? '' : address);

    // Keyboard.dismiss();
  };

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={handleSearchAddress}
        value={address}
        placeholder="Enter address"
      />
      {results.length > 0 && (
        <View style={styles.results}>
          <ScrollView>
            {results.map((res) => (
              <TouchableOpacity
                key={res}
                onPress={() => handleSelectAddress(res)}
              >
                <Text style={styles.result}>{res}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AddressFinder;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    width: width - 60,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  results: {
    height: height / 4 - 50 - 40,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  result: {
    height: 40,
    backgroundColor: 'white',
    width: width - 60,
    justifyContent: 'center',
    padding: 10,
  },
});
