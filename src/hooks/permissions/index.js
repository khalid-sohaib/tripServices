import {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

const usePermissions = () => {
  const [hasStoragePermission, setHasStoragePermission] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission();
    }
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setHasStoragePermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
    }
  };

  return {hasStoragePermission, requestStoragePermission};
};

export default usePermissions;
