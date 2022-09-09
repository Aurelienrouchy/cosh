import React, { FC, useCallback, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { height, width } from '../constants/Layout';
import { SharedElement } from 'react-navigation-shared-element';
import IconAndText from '../components/IconAndText/IconAndText';
import MapView, { Marker } from 'react-native-maps';
import PeoplesAreJoined from '../components/PeoplesAreJoined/PeoplesAreJoined';
import { IEvent } from '../services/types';

const EventScreen: FC = () => {
  const route: RouteProp<{ params: { event: IEvent } }, 'params'> = useRoute();
  const event = route.params.event;
  const navigation = useNavigation();

  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backIcon}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png',
          }}
        />
      </Pressable>
      <Image
        source={{ uri: event.coverUri }}
        style={styles.cover}
        resizeMode="cover"
      />
      <ScrollView style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <Text style={styles.price}>
            {event.price === 0 ? 'Free' : event.price + ' €'}
          </Text>
        </View>
        <View style={styles.content}>
          <PeoplesAreJoined />
        </View>
        <View style={styles.content}>
          <Text style={styles.titleContent}>Description</Text>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 4}
          >
            {event.desc}
          </Text>

          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ textAlign: 'right', marginTop: 10, color: '#ff7a7a' }}
            >
              {textShown ? 'Read less' : 'Read more'}
            </Text>
          ) : null}
        </View>
        <View style={styles.content}>
          <IconAndText
            icon={
              'https://cdn-icons.flaticon.com/png/512/3421/premium/3421853.png?token=exp=1651158462~hmac=b444f393178de415615c83eb7d3b6518'
            }
            title={event.userId[0]}
            subTitle={event.place}
            style={styles.textAndIcon}
          />
          <IconAndText
            icon={
              'https://cdn-icons.flaticon.com/png/512/2278/premium/2278049.png?token=exp=1651158461~hmac=0129b8702110c59b55d34d91609bb05d'
            }
            title={'Ce Samedi'}
            subTitle={'21:00 - 6:00'}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.titleContent}>Map</Text>
          <View style={styles.cacheMap} />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 48.87517733969621,
              longitude: 2.358548697086385,
              latitudeDelta: 0.1522,
              longitudeDelta: 0.1021,
            }}
          >
            <Marker
              coordinate={{
                latitude: 48.87517733969621,
                longitude: 2.358548697086385,
              }}
              title="test"
              description="desc"
            />
          </MapView>
        </View>
        <View style={styles.content} />
      </ScrollView>
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFF',
  },
  cover: {
    width,
    height: height / 4,
  },
  backContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fcd4d4',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  backIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '180deg' }],
  },
  inner: {
    width,
    padding: 20,
    paddingBottom: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffd1d1',
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: width - 100,
    overflow: 'hidden',
  },
  content: {
    marginVertical: 15,
    position: 'relative',
  },
  textAndIcon: { marginBottom: 20 },
  titleContent: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  map: {
    height: 200,
    width: width - 40,
    borderRadius: 10,
  },
  cacheMap: {
    position: 'absolute',
    top: 42,
    zIndex: 2,
    height: 200,
    width: width - 40,
    borderRadius: 10,
  },
});
