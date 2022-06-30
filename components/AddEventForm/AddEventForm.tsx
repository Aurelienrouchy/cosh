import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { width } from '../../constants/Layout';
import { Event } from '../../provider/EventProvider';
import PlaceOrAddressFinder from '../PlaceOrAddressFinder/PlaceOrAddressFinder';
import { PLACEHOLDER_COLOR } from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//     location: GeoPoint Donner par le lieu
//     coverUri: string
//     beginAt: Date
//     endAt: Date
//     price: number
//     followers: Types.ObjectId[]
//     userId: Types.ObjectId[]
//     placeId: string
//     type: string[]
//     active: boolean
//     private: boolean

const AddEventForm = () => {
  const [values, setValues] = useState<Event>({} as Event);

  const handleForm = (key: keyof Event, value: any) => {
    setValues({ ...values, [key]: value });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView}>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleForm('title', val)}
          value={values['title']}
          placeholder="Entrer un titre"
          placeholderTextColor={PLACEHOLDER_COLOR}
          clearButtonMode="while-editing"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          onChangeText={(val) => handleForm('desc', val)}
          value={values['desc']}
          placeholder="Entrer une description"
          placeholderTextColor={PLACEHOLDER_COLOR}
          clearButtonMode="while-editing"
          multiline
        />
        <Text style={styles.label}>Lieu ou adresse</Text>
        <PlaceOrAddressFinder onSelect={() => ({})} onChangeText={() => ({})} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddEventForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  keyboardAwareScrollView: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    width: width - 40,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
  },
  multiline: {
    paddingTop: 15,
    height: 100,
  },
});
