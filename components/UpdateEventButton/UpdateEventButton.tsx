import React from 'react';
import { Pressable, Text, View } from 'react-native';
import axios from 'axios';
import { useEventsContext } from '../../provider/EventProvider';

const UpdateEventButton = () => {
  const { setEvents, buttonIsVisible, setButtonIsVisible } = useEventsContext();

  const updateEvents = async () => {
    // const distance = event.latitudeDelta * 69 * 1.609344 * 1000;
    // console.log(distance);
    //
    // try {
    //   const eventsFromServer = await axios.get(
    //     'http://192.168.1.33:3000/event/near',
    //     {
    //       params: {
    //         distance: distance,
    //         long: event.longitude,
    //         lat: event.latitude,
    //       },
    //     },
    //   );
    //   setEvents(eventsFromServer.data);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <View>
      <Pressable onPress={updateEvents}>
        <Text>Actualiser</Text>
      </Pressable>
    </View>
  );
};

export default UpdateEventButton;
