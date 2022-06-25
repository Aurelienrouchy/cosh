import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { width } from '../../constants/Layout';
import CirclePeoples from '../CirclePeoples/CirclePeoples';

const peoples = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
];

interface PeoplesAreJoinedProps {
  people?: string[];
}

const PeoplesAreJoined: FC<PeoplesAreJoinedProps> = ({}) => {
  const numberOfPeople = '11,4K';
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.number}>{numberOfPeople}</Text>
        <Text style={styles.text}> People are joined: </Text>
      </View>
      <CirclePeoples peoples={peoples} />
    </View>
  );
};

export default PeoplesAreJoined;

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  number: {
    fontWeight: 'bold',
  },
  text: {
    color: '#8c8c8c',
  },
  all: {
    color: '#ff7a7a',
  },
});
