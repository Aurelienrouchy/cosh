import React, { FC } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { width } from '../../constants/Layout';

interface CirclePeoplesProps {
  peoples: string[];
}

const CirclePeoples: FC<CirclePeoplesProps> = ({ peoples }) => {
  return (
    <View style={styles.container}>
      {peoples.map((people, index) => (
        <ImageBackground
          key={index}
          resizeMode="cover"
          style={[styles.image, { transform: [{ translateX: index * -15 }] }]}
          source={{ uri: people }}
        />
      ))}
    </View>
  );
};

export default CirclePeoples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFF',
  },
});
