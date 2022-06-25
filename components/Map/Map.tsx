import React, { Image, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useMapContext } from '../../provider/MapProvider';
import MiniaturesPlan from '../MiniaturesPlan/MiniaturesPlan';
import { useEventsContext } from '../../provider/EventProvider';
import axios from 'axios';
import { useMemo, useState } from 'react';

const MarkerImage = require('./record.png');

const MapComponent = () => {
  const { mapRef, location } = useMapContext();
  const { events, setEvents } = useEventsContext();
  const [altitude, setAltitude] = useState(10000);

  const onRegionChangeComplete = async (event) => {
    // setUpdateEventsButtonVisible(true);
  };

  const camera = useMemo(
    () => ({
      center: {
        latitude: events
          ? events[0].location.coordinates[1]
          : location.latitude,
        longitude: events
          ? events[0].location.coordinates[0]
          : location.longitude,
      },
      heading: 0,
      pitch: 0,
      zoom: 0,
      altitude,
    }),
    [events, altitude],
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.container}
        onRegionChangeComplete={onRegionChangeComplete}
        camera={camera}
      >
        {events.length &&
          events.map(({ location, title }) => (
            <Marker
              key={title}
              coordinate={{
                latitude: location.coordinates[1],
                longitude: location.coordinates[0],
              }}
            >
              <Image style={styles.marker} source={MarkerImage} />
            </Marker>
          ))}
      </MapView>
      <MiniaturesPlan />
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  marker: {
    width: 15,
    height: 15,
  },
});
