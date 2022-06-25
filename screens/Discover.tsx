import React, { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ChangeAddress from '../components/ChangeAddress/ChangeAddress';

export default function Discover({
  navigation,
}: RootTabScreenProps<'Discover'>) {
  return (
    <View style={styles.container}>
      <ChangeAddress />
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
