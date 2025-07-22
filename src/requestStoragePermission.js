import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export async function requestStoragePermission() {
  let permission;

  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    }
  } else if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  }

  if (!permission) {
    console.warn('Unsupported platform');
    return false;
  }

  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.warn('This feature is not available on this device/context');
        return false;

      case RESULTS.DENIED:
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;

      case RESULTS.LIMITED:
        return true;

      case RESULTS.GRANTED:
        return true;

      case RESULTS.BLOCKED:
        console.warn('Permission is blocked. Ask user to enable it from settings.');
        return false;

      default:
        return false;
    }
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
}
