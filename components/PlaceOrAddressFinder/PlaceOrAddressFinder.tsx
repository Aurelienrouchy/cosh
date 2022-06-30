import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
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
import { Address, AddressResults } from '../../services/types';
import { PLACEHOLDER_COLOR } from '../../constants/Colors';

interface AddressFinderProps {
  onSelect: (address: Address) => void;
  onChangeText: (address: string) => void;
  resetAfterSelect?: boolean;
}

const PlaceOrAddressFinder: FC<AddressFinderProps> = ({
  onSelect,
  onChangeText,
  resetAfterSelect = false,
}) => {
  const [address, setAddress] = useState<string>('');
  const [results, setResults] = useState<AddressResults[]>([]);

  const handleSearchAddress = (text: string) => {
    onChangeText(text);
    setAddress(text);
    getAddressFromText(text).then((data) => {
      return setResults(data);
    });
  };

  const handleSelectAddress = (result: AddressResults) => {
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

  useEffect(() => {
    resultsHeight.value = withSpring(results.length ? results.length * 40 : 0, {
      mass: 0.6,
    });
  }, [results]);

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={handleSearchAddress}
        value={address}
        placeholder="Chercher un lieu ou une adresse"
        placeholderTextColor={PLACEHOLDER_COLOR}
        clearButtonMode="while-editing"
      />
      {results.length > 0 && (
        <Animated.View style={[styles.results, animatedStyleResults]}>
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

export default PlaceOrAddressFinder;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    width: width - 40,
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
    borderColor: '#000',
    borderWidth: 1,
  },
  result: {
    height: 40,
    backgroundColor: 'white',
    width: width - 60,
    justifyContent: 'center',
    padding: 10,
  },
});
