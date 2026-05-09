import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    // Android 11 (API 30) and above use Scoped Storage or Photo Picker
    // No broad storage permission is required for picking images via launchImageLibrary
    // For Play Store compliance, we should avoid requesting broad storage permissions.
    return true;
  } else if (Platform.OS === 'ios') {
    const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    try {
      const result = await check(permission);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) return true;
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  }

  return true;
}

