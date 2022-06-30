import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { height, width } from '../../constants/Layout';
import { useMapContext } from '../../provider/MapProvider';

const RadiusSelector = () => {
  const { altitude, setAltitude } = useMapContext();

  return (
    <View style={styles.container}>
      <Text style={styles.rangeText}>{altitude / 1000} Km</Text>
      <Slider
        value={altitude / 1000}
        onValueChange={(value) => setAltitude(+value * 1000)}
        minimumValue={1}
        maximumValue={50}
        step={1}
      />
    </View>
  );
};

export default RadiusSelector;

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    padding: 10,
  },
  rangeText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});
