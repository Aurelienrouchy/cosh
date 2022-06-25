import React, { useCallback, useEffect } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ExpoLocation from 'expo-location';
import { GeoCode, useMapContext } from '../provider/MapProvider';
import { height, width } from '../constants/Layout';
import AddressFinder from '../components/AddressFinder/AddressFinder';
import Button from '../components/Button/Button';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import axios from 'axios';
import { API_KEY } from '../constants/utils';

export const DEFAULT_COORD_FRANCE = {
  latitude: 46,
  longitude: 2,
};
const MarkerImage = require('../components/Map/record.png');

const GetLocation = () => {
  const { setLocation, setIsOpenAddressEditor, location } = useMapContext();
  const requestPermissions = async () => {
    try {
      const foreground = await ExpoLocation.requestForegroundPermissionsAsync();
      console.log(foreground);
      if (foreground.granted) {
        await ExpoLocation.requestBackgroundPermissionsAsync();

        const requestedLocation = await ExpoLocation.getCurrentPositionAsync();

        setLocation(requestedLocation.coords);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsOpenAddressEditor(true);
  }, []);

  const getCurrentLocation = () => {};
  const handlePress = () => {};

  const animatedValue = useSharedValue(-100);
  const animatedStyleForButton = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -animatedValue.value,
      },
    ],
  }));

  const handleSelectAddress = (address: string, geoCode: GeoCode) => {
    animatedValue.value = withSpring(0);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        camera={{
          center: location || DEFAULT_COORD_FRANCE,
          heading: 0,
          pitch: 0,
          zoom: 0,
          altitude: location ? 6000 : 3000000,
        }}
      >
        <Marker coordinate={location || DEFAULT_COORD_FRANCE}>
          <Image style={styles.marker} source={MarkerImage} />
        </Marker>
      </MapView>
      <Animated.View style={[styles.button, animatedStyleForButton]}>
        <Button onPress={handlePress} text="Let's go" />
      </Animated.View>
      <View style={styles.modal}>
        <Button
          onlyText={false}
          onPress={getCurrentLocation}
          text="Get current location"
          textStyle={styles.buttonLocationText}
          style={styles.buttonLocation}
        />
        <AddressFinder handleSelect={handleSelectAddress} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default GetLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: '#FFF',
    width,
    height: height / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 15,
    height: 15,
  },
  button: {
    width,
    alignItems: 'center',
    position: 'absolute',
    bottom: height / 3 + 30,
  },
  buttonLocation: {
    marginBottom: 20,
  },
  buttonLocationText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
