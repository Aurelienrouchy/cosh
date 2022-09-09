import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TextStyle,
} from 'react-native';
import React, { FC, useState } from 'react';
import {
  MODAL_HEIGHT,
  RESULTS_ADDRESS_HEIGHT,
  width,
} from '../../constants/Layout';
import {
  getAddressFromText,
  getAddressFromPlaceId,
} from '../../services/googleGeocode';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { IAddress } from '../../services/types';

interface AddressFinderProps {
  onSelect: (address: IAddress) => void;
  onChangeText: (address: string) => void;
  resetAfterSelect?: boolean;
  style?: TextStyle | TextStyle[];
  resultsStyle?: TextStyle;
}

const AddressFinder: FC<AddressFinderProps> = ({
  onSelect,
  onChangeText,
  resetAfterSelect = false,
  style,
  resultsStyle,
}) => {
  const [address, setAddress] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearchAddress = (text: string) => {
    onChangeText(text);
    setAddress(text);
    getAddressFromText(text).then((data) => {
      resultsHeight.value = withSpring(data.length ? MODAL_HEIGHT : 0, {
        mass: 0.6,
      });
      return setResults(data);
    });
  };

  const handleSelectAddress = (result: any) => {
    getAddressFromPlaceId(result.place_id).then((address) => {
      onSelect(address);
    });

    setAddress(resetAfterSelect ? '' : result.description);
    setResults([]);
    Keyboard.dismiss();
  };

  const resultsHeight = useSharedValue(0);
  const animatedStyleResults = useAnimatedStyle(() => ({
    height: resultsHeight.value,
  }));

  return (
    <>
      <TextInput
        style={[styles.input, style]}
        onChangeText={handleSearchAddress}
        value={address}
        placeholder="Enter address"
        clearButtonMode="while-editing"
      />
      {results.length > 0 && (
        <Animated.View
          style={[styles.results, animatedStyleResults, resultsStyle]}
        >
          <ScrollView>
            {results.map((res) => (
              <TouchableOpacity
                key={res.place_id}
                onPress={() => handleSelectAddress(res)}
              >
                <Text style={styles.result}>{res.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
};

export default AddressFinder;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    width: width - 80,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    borderColor: '#000',
    borderWidth: 1,
  },
  results: {
    height: RESULTS_ADDRESS_HEIGHT,
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
