import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import { ReactNativeFirebase } from '@react-native-firebase/app';

export const useUploadImage = (uri: string) => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<ReactNativeFirebase.NativeFirebaseError>();
  const [transferred, setTransferred] = useState(0);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (uri) {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setIsloading(true);
      setTransferred(0);
      const task = storage().ref(filename).putFile(uploadUri);

      task.on(
        'state_changed',
        (snapshot) => {
          return setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
          );
        },
        (err) => {
          setError(err);
        },
        async () => {
          const downloadUrl = await storage().ref(filename).getDownloadURL();

          setUrl(downloadUrl);
          setIsloading(false);
        },
      );
    }
  }, [uri]);

  return {
    isLoading,
    transferred,
    error,
    url,
  };
};
