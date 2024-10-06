import {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

const usePermissions = () => {
  const [hasStoragePermission, setHasStoragePermission] = useState(false);

  const checkStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      setHasStoragePermission(granted);
      return granted;
    }
    return true; // Assume permission granted for iOS
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'This app needs access to your storage to save/share files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setHasStoragePermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
    }
    return true; // Assume permission granted for iOS
  };

  useEffect(() => {
    checkStoragePermission();
  }, []);

  return {
    hasStoragePermission,
    requestStoragePermission,
    checkStoragePermission,
  };
};

export default usePermissions;
