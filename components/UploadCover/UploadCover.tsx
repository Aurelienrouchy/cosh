import React, { FC, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { width } from '../../constants/Layout';
import { useUploadImage } from '../../services/googleCloud';

interface UploadCoverProps {
  onChange: (uri: string) => void;
  value: string;
}

const UploadCover: FC<UploadCoverProps> = ({ onChange, value }) => {
  const [imageUri, setImageUri] = useState<string>(value);
  const { isLoading, error, url } = useUploadImage(imageUri);

  useEffect(() => {
    if (url) {
      onChange?.(url);
    }
  }, [url]);

  useEffect(() => {
    (async () => {
      if (Constants.platform?.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraRollStatus.status !== 'granted') {
          // TODO Ajouter un truc ici
          //   alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const options = {
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.4,
    };

    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {isLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : imageUri ? (
        <View style={styles.container}>
          <Image style={styles.cover} source={{ uri: imageUri }} />
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={require('./../../assets/images/upload.png')}
          />
          {error && <Text>Error dans l&apos;upload</Text>}
          <Text>Ajouter une cover</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UploadCover;

const Loader = (props: any) => (
  <ContentLoader
    style={styles.loader}
    speed={2}
    width={400}
    height={200}
    viewBox="0 0 400 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="-11" y="-39" rx="0" ry="0" width="430" height="352" />
  </ContentLoader>
);

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 200,
    backgroundColor: '#e9effb',
    borderWidth: 2,
    borderColor: '#367de9',
    borderRadius: 16,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: width - 40,
    height: 200,
    borderRadius: 16,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 20,
  },
  loader: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});
