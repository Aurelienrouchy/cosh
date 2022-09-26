import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PLACEHOLDER_COLOR } from '../../constants/Colors';
import { width } from '../../constants/Layout';
import AddressFinder from '../AddressFinder/AddressFinder';
import Button from '../Button/Button';
import OpenHoursSeletor from '../HoursSeletor/HoursSeletor';
import PriceRange from '../PriceRange/PriceRange';
import UploadCover from '../UploadCover/UploadCover';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { PlaceDto, postPlace } from '../../services/placesServices';

const CreatePlaceForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coverUri: '',
      name: '',
      placeId: '',
      openHours: new Array(7).fill([]),
      desc: '',
      phone: '',
      website: '',
      facebook: '',
      instagram: '',
      email: '',
      categories: [''],
      priceRange: '',
    },
  });
  const ref = useRef<KeyboardAwareScrollView>(null);
  const [geoCode, setGeoCode] = useState<number[]>([]);
  const { mutate, isLoading, isError } = useMutation(postPlace, {
    onSuccess: (data) => {
      console.log('success', data);
    },
    onError: (error) => {
      console.log('erro', error);
    },
  });

  const handleAddressTextChange = () => {
    ref.current?.scrollToPosition(0, -100);
  };

  const handleSubmitForm = (data: any) => {
    mutate({
      ...data,
      location: {
        type: ['Point'],
        coordinates: geoCode,
      },
    } as PlaceDto);
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/** Cover */}
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

          {/** Name */}
          <Text style={styles.label}>Nom</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.errors]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer un titre"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
              />
            )}
            name="name"
          />
          {errors.name && <Text style={styles.errors}>This is required.</Text>}

          {/** Description */}
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.multiline,
                  errors.desc && styles.errors,
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

          {/** Adresse */}
          <Text style={styles.label}>Adresse</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <AddressFinder
                style={[
                  styles.address,
                  errors.placeId ? styles.errors : styles.address,
                ]}
                onSelect={({ place_id, geocode }) => {
                  onChange(place_id);
                  setGeoCode([geocode.lat, geocode.lng]);
                }}
                onChangeText={handleAddressTextChange}
                resultsStyle={styles.resultsStyle}
              />
            )}
            name="placeId"
          />
          {errors.placeId && (
            <Text style={styles.errors}>This is required.</Text>
          )}

          {/** Open Hours */}
          <Text style={styles.label}>Heures d&apos;ouvertures</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <OpenHoursSeletor onChange={onChange} value={value} />
            )}
            name="openHours"
          />
          {errors.openHours && (
            <Text style={styles.errors}>This is required.</Text>
          )}

          {/** Price Range */}
          <Text style={styles.label}>Tranche de prix</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <PriceRange onChange={onChange} />
            )}
            name="priceRange"
          />
          {errors.priceRange && (
            <Text style={styles.errors}>This is required.</Text>
          )}

          {/** Phone */}
          <Text style={styles.label}>Telephone</Text>
          <Controller
            control={control}
            rules={{
              pattern: /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.phone && styles.errors]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer un numero de telephone"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
              />
            )}
            name="phone"
          />
          {errors.phone && (
            <Text style={styles.errors}>Doit etre au format +33 ou 0x</Text>
          )}

          {/** Email */}
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.errors]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer une email"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errors}>This is a required.</Text>
          )}

          {/** Website */}
          <Text style={styles.label}>Website</Text>
          <Controller
            control={control}
            rules={{
              pattern:
                /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.website && styles.errors]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer un site internet"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
              />
            )}
            name="website"
          />
          {errors.website && (
            <Text style={styles.errors}>
              Doit etre au format wwww.exemple.com
            </Text>
          )}

          {/** Facebook */}
          <Text style={styles.label}>Facebook</Text>
          <Controller
            control={control}
            rules={{
              pattern:
                /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.lastInput,
                  errors.facebook && styles.errors,
                ]}
                onChangeText={onChange}
                value={value}
                placeholder="Entrer votre facebook"
                placeholderTextColor={PLACEHOLDER_COLOR}
                clearButtonMode="while-editing"
              />
            )}
            name="facebook"
          />
          {errors.facebook && (
            <Text style={styles.errors}>
              Doit etre au format wwww.exemple.com
            </Text>
          )}
          <Button onPress={handleSubmit(handleSubmitForm)} text="Ajouter" />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default CreatePlaceForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
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
