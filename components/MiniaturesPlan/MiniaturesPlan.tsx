import React, { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import { width } from '../../constants/Layout';
import { useEventsContext } from '../../provider/EventProvider';
import EventMiniature from '../EventMiniature/EventMiniature';
import { useMapContext } from '../../provider/MapProvider';

const MiniaturesPlan = () => {
  const { events } = useEventsContext();
  const { mapRef } = useMapContext();

  if (!events.length) {
    return (
      <View>
        <Text>No Events</Text>
      </View>
    );
  }

  const onScroll = useCallback(({ nativeEvent }) => {
    if (mapRef.current) {
      const length = nativeEvent.contentSize.width / width;
      const currentIndex =
        length -
        Math.round(
          (nativeEvent.contentSize.width - nativeEvent.contentOffset.x) / width,
        );

      mapRef.current.animateCamera(
        {
          center: {
            latitude:
              events[currentIndex < 0 ? 0 : currentIndex].location
                .coordinates[1],
            longitude:
              events[currentIndex < 0 ? 0 : currentIndex].location
                .coordinates[0],
          },
        },
        { duration: 150 },
      );
    }
  }, []);

  return (
    <View style={styles.buttonContainer}>
      <ScrollView
        horizontal
        scrollEventThrottle={100}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={onScroll}
      >
        {events.map((event) => (
          <Pressable key={event.title} style={[styles.button]}>
            <EventMiniature event={event} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default MiniaturesPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    width,
    height: 200,
    bottom: 10,
    zIndex: 1,
  },
  button: {
    width,
    height: 200,
    alignItems: 'center',
  },
});
