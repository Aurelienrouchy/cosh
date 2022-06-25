import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { MapProvider } from './provider/MapProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import { EventProvider } from './provider/EventProvider';

import './services/firebase';
import axios from 'axios';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    axios
      .post(
        'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC9pUKLIFmjNgAX5u1u_ZGPuEOpCZS6tmY',
      )
      .then((response) =>
        console.log('response' + JSON.stringify(response.data)),
      )
      .catch((err) => console.log('err' + err));
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaView style={[styles.container]}>
        <MapProvider>
          <EventProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </EventProvider>
        </MapProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
