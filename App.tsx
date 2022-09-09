import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { MapProvider } from './provider/MapProvider';
import { StyleSheet } from 'react-native';
import { EventProvider } from './provider/EventProvider';

import './services/firebase';
import { UserProvider } from './provider/UserProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <MapProvider>
            <EventProvider>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </EventProvider>
          </MapProvider>
        </UserProvider>
      </QueryClientProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
