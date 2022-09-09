import React, { StyleSheet, ScrollView, View } from 'react-native';
import { useEventsContext } from '../../provider/EventProvider';
import EventMiniature from '../EventMiniature/EventMiniature';

const EventsList = () => {
  const { events } = useEventsContext();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.events} showsVerticalScrollIndicator={false}>
        {events.map((event) => (
          <EventMiniature key={event.title} event={event} />
        ))}
      </ScrollView>
    </View>
  );
};

export default EventsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  events: {
    flex: 1,
  },
});
