import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { height, width } from '../../constants/Layout';
import { useMapContext } from '../../provider/MapProvider';

const RadiusSelector = () => {
  const { radius, setRadius } = useMapContext();

  return (
    <View style={styles.container}>
      <Text style={styles.rangeText}>{radius / 1000} Km</Text>
      <Slider
        value={radius / 1000}
        onValueChange={(value) => setRadius(+value * 1000)}
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
