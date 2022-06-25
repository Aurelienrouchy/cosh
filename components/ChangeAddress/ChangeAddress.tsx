import React, { View, StyleSheet, Pressable, Text } from 'react-native';
import { useMapContext } from '../../provider/MapProvider';
import { width } from '../../constants/Layout';

const ChangeAddress = () => {
  const { setIsOpenAddressEditor, selectedAddress, range } = useMapContext();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.address}>
          {selectedAddress.slice(0, width / 15) || 'Changer de lieu'}
        </Text>
        <Text style={styles.distance}>{range} Km</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => setIsOpenAddressEditor(true)}
      >
        <Text>Changer</Text>
      </Pressable>
    </View>
  );
};

const BUTTON_WIDTH = 100;
export const CHANGE_ADDRESS_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    height: CHANGE_ADDRESS_HEIGHT,
    justifyContent: 'center',
    width: width - 40 - BUTTON_WIDTH,
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
  },
  button: {
    height: 30,
    width: BUTTON_WIDTH,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangeAddress;
