import React, { StyleSheet } from 'react-native';
import AddEventModal from '../components/AddEventModal/AddEventModal';
import Button from '../components/Button/Button';

import { Text, View } from '../components/Themed';
import { useEventsContext } from '../provider/EventProvider';
import { RootTabScreenProps } from '../types';

export default function MyEvents({
  navigation,
}: RootTabScreenProps<'MyEvents'>) {
  const { setIsOpenAddEventModal } = useEventsContext();
  return (
    <View style={styles.container}>
      <AddEventModal />

      <Text>My Events</Text>
      <Button onPress={() => setIsOpenAddEventModal(true)} text="Ajouter" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
