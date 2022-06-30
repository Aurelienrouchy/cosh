import React from 'react';
import { Image, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ExpoLocation from 'expo-location';
import { DEFAULT_COORD_FRANCE, useMapContext } from '../provider/MapProvider';
import {
  height,
  MODAL_HEIGHT,
  RESULTS_ADDRESS_HEIGHT,
  width,
} from '../constants/Layout';
import AddressFinder from '../components/AddressFinder/AddressFinder';
import Button from '../components/Button/Button';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ICONS_NAME } from '../constants/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { getAddressFromGeoCode } from '../services/googleGeocode';
import { Address } from '../services/types';
import { BASE_URL } from '../constants/utils';
import axios from 'axios';
import { useUserContext } from '../provider/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GetLocationScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MarkerImage = require('../components/Map/record.png');

const GetLocation = () => {
  const { setAddress, address, setLocation, location, altitude, setAltitude } =
    useMapContext();
  const { setUser } = useUserContext();
  const navigation = useNavigation<GetLocationScreenProp>();

  const handleCurrentLocation = async () => {
    try {
      const foreground = await ExpoLocation.requestForegroundPermissionsAsync();

      if (foreground.granted) {
        const requestedLocation = await ExpoLocation.getCurrentPositionAsync({
          accuracy: 100,
        });

        const { latitude, longitude } = requestedLocation.coords;

        const address: Address = await getAddressFromGeoCode({
          latitude,
          longitude,
        });

        setLocation({ latitude, longitude });
        setAddress(address);

        translateY.value = withSpring(1);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleChangeText = (text: string) => {
    modalHeight.value = withSpring(
      text.length ? RESULTS_ADDRESS_HEIGHT + MODAL_HEIGHT : MODAL_HEIGHT,
      {
        mass: 0.6,
      },
    );
  };

  const setAsyncStorageUserId = async (id: string) => {
    try {
      return await AsyncStorage.setItem('userId', id);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePress = async () => {
    if (!address) {
      // TODO: Afficher message d'erreur
      return;
    }

    const payload = {
      placeId: address?.place_id,
      geocode: {
        type: 'Point',
        coordinates: [address?.geocode.lat, address?.geocode.lng],
      },
    };

    try {
      // TODO : Ajouter un loader
      const res = await axios.post(BASE_URL + '/user/', payload);

      setAsyncStorageUserId(res.data.id);

      setUser(res.data);
    } catch (e) {
      // TODO: Afficher message d'erreur
      console.log(e);
    }
  };

  const translateY = useSharedValue(0);
  const animatedStyleForButton = useAnimatedStyle(() => ({
    opacity: translateY.value,
  }));

  const modalHeight = useSharedValue(MODAL_HEIGHT);
  const animatedStyleModal = useAnimatedStyle(() => ({
    height: modalHeight.value,
    marginTop: -modalHeight.value,
  }));

  const handleSelectAddress = (address: any): void => {
    setAddress(address);

    setLocation({
      latitude: address.geocode.lat,
      longitude: address.geocode.lng,
    });

    modalHeight.value = MODAL_HEIGHT;
    translateY.value = withSpring(1);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        camera={{
          center: location,
          heading: 0,
          pitch: 0,
          zoom: 0,
          altitude: altitude,
        }}
      >
        <View style={styles.cache} />
        {location !== DEFAULT_COORD_FRANCE && (
          <Marker coordinate={location}>
            <Image style={styles.marker} source={MarkerImage} />
          </Marker>
        )}
      </MapView>
      <Animated.View style={[styles.modal, animatedStyleModal]}>
        <Animated.View style={[styles.button, animatedStyleForButton]}>
          <Button onPress={handlePress} text="Let's go" />
        </Animated.View>
        <Button
          onPress={handleCurrentLocation}
          text="Get current location"
          textStyle={styles.buttonLocationText}
          style={styles.buttonLocation}
          iconName={ICONS_NAME.NAVIGATION}
        />
        <AddressFinder
          onChangeText={handleChangeText}
          onSelect={handleSelectAddress}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default GetLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    bottom: 30,
    left: 20,
    backgroundColor: '#FFF',
    width: width - 40,
    height: MODAL_HEIGHT,
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',

    shadowColor: '#9c9c9c',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  map: {
    flex: 1,
  },
  cache: { flex: 1 },
  marker: {
    width: 15,
    height: 15,
  },
  button: {
    width,
    alignItems: 'center',
    top: -80,
    position: 'absolute',
  },
  buttonLocation: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLocationText: {
    color: '#000',
    fontWeight: 'bold',
  },
  loading: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: height / 2 - 50,
    left: width / 2 - 50,
    backgroundColor: 'red',
  },
});
