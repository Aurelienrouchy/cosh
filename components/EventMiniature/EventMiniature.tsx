import React, { FC } from 'react';
import { StyleSheet, Pressable, Text, Image } from 'react-native';
import { width } from '../../constants/Layout';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { IEvent } from '../../services/types';

interface EventMiniatureProps {
  event: IEvent;
}

const EventMiniature: FC<EventMiniatureProps> = ({ event }) => {
  const dateEnd = '21 MAI';
  const dateStart = '20 MAI';

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.push('Event', { event });
      }}
      style={styles.container}
    >
      <Image
        source={{ uri: event.coverUri }}
        style={styles.cover}
        resizeMode="cover"
      />
      <BlurView intensity={10} style={styles.distanceBlur}>
        <Text>{event.distance} Km</Text>
      </BlurView>
      <BlurView intensity={10} style={styles.likeBlur}>
        <Text>{event.price === 0 ? 'Free' : event.price + ' €'}</Text>
      </BlurView>

      <BlurView intensity={10} style={styles.inner}>
        <Text style={styles.date}>{`${dateStart} ${
          event.endAt ? ' - '.concat(dateEnd) : ''
        }`}</Text>
        <Text numberOfLines={1} style={styles.title}>
          {event.title}
        </Text>
        <Text style={styles.place}>{event.place}</Text>
      </BlurView>
    </Pressable>
  );
};

export default EventMiniature;

const WIDTH = width - 40;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 200,
    position: 'relative',
    marginBottom: 20,
  },
  cover: {
    width: WIDTH,
    height: 200,
    borderRadius: 20,
  },
  inner: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(255 ,255, 255, 0.7)',
    width: WIDTH - 20,
    marginLeft: 10,
    marginTop: 200 - 70 - 10,
    height: 70,
    borderRadius: 14,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  place: {
    fontSize: 16,
  },
  date: {
    fontWeight: 'bold',
    color: '#464646',
  },
  distanceBlur: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255 ,255, 255, 0.7)',
  },
  likeBlur: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255 ,255, 255, 0.7)',
  },
});
