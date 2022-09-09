import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect } from 'react';
import { width } from '../../constants/Layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import PlaceOrAddressFinder from '../PlaceOrAddressFinder/PlaceOrAddressFinder';
import { PLACEHOLDER_COLOR } from '../../constants/Colors';
import UploadCover from '../UploadCover/UploadCover';
import { Controller, useForm } from 'react-hook-form';

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

interface CreateEventFormProps {
  onOpenPlaceForm: () => void;
}

const CreateEventForm: FC<CreateEventFormProps> = ({ onOpenPlaceForm }) => {
  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      desc: '',
      location: {
        coordinates: [],
      },
      coverUri: '',
      photos: [],
      followers: [],
      endAt: new Date(),
      beginAt: new Date(),
      distance: 0,
      price: 0,
      userId: '',
      place: '',
      type: [],
    },
  });
  // const ref = useRef<KeyboardAwareScrollView>(null);

  // const handleAddressTextChange = () => {
  //   ref.current?.scrollToPosition(0, -100);
  // };

  // const handleSubmitForm = (data: any) => {
  //   console.log(data);
  // };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 300,
            }}
            render={({ field: { onChange, value } }) => (
              <UploadCover onChange={onChange} value={value} />
            )}
            name="coverUri"
          />
          {errors.coverUri && (
            <Text style={styles.errors}>This is required.</Text>
          )}

          <Text style={styles.label}>Nom</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.title && styles.errors]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer un titre"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
              />
            )}
            name="title"
          />
          {errors.title && <Text style={styles.errors}>This is required.</Text>}

          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.multiline,
                  errors.title && styles.errors,
                ]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer une description"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
                multiline
              />
            )}
            name="desc"
          />
          {errors.desc && <Text style={styles.errors}>This is required.</Text>}

          <Text style={styles.label}>Lieu ou adresse</Text>
          <PlaceOrAddressFinder
            onSelect={() => ({})}
            onChangeText={() => ({})}
          />
          <TouchableOpacity
            onPress={onOpenPlaceForm}
            style={styles.addPlaceButton}
          >
            <Text>Ajouter un lieu</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default CreateEventForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 50,
  },
  keyboardAwareScrollView: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 20,
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
  },
  multiline: {
    paddingTop: 15,
    height: 100,
  },
  placeContainer: {
    flexDirection: 'row',
  },
  addPlaceButton: {
    height: 50,
    width: width - 40,
    borderRadius: 10,
    backgroundColor: '#e2e2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  address: {
    width: width - 40,
  },
  resultsStyle: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  lastInput: {
    marginBottom: 30,
  },
  errors: {
    color: 'red',
    marginTop: 5,
    borderColor: 'red',
  },
});
