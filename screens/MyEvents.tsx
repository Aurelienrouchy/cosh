import { useNavigation } from '@react-navigation/native';
import React, { StyleSheet } from 'react-native';
import Button from '../components/Button/Button';

import { Text, View } from '../components/Themed';

export default function MyEvents() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text>My Events</Text>
      <Button
        onPress={() => navigation.navigate('CreateEvent')}
        text="Ajouter"
      />
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
