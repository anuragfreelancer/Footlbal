import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';

const PushNotification =
  Platform.OS === 'android' ? require('react-native-push-notification') : null;

class FirebaseMessagingService {
  async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        this.showPermissionDeniedAlert();
        return false;
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      this.showPermissionDeniedAlert();
    }
    return enabled;
  }

  // ✅ FIX 1: Was missing closing brace — getFcmToken() was nested inside this method
  showPermissionDeniedAlert(): void {
    Alert.alert(
      'Permission Required',
      'Please enable notifications in your device settings to receive updates.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
  }

  async getFcmToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      const token = await messaging().getToken();
      if (token) {
        console.log('✅ FCM Token:', token);
        return token;
      }
    } catch (error) {
      console.error('❌ Failed to get FCM token:', error);
    }
    return null;
  }

  initialize(): () => void {
    try {
      // 1. Create Channel for Android
      if (Platform.OS === 'android' && PushNotification) {
        PushNotification.createChannel(
          {
            channelId: 'SportAppFootball',           // ✅ FIX 2: typo "Footlball" → "Football"
            channelName: 'App Sport Notifications',
            channelDescription: 'Notifications for FootballApp',  // ✅ FIX 2: same typo
            importance: 4,
            vibrate: true,
          },
          (created: boolean) => console.log(`✅ Channel created: ${created}`)
        );
      }

      // 2. Foreground message listener
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log('🔔 Foreground Message:', remoteMessage);

        if (Platform.OS === 'android' && PushNotification) {
          PushNotification.localNotification({
            channelId: 'SportAppFootball',           // ✅ FIX 2: keep consistent with channel above
            title: remoteMessage.notification?.title ?? 'New Notification',
            message: remoteMessage.notification?.body ?? '',
            playSound: true,
            soundName: 'default',
          });
        }
      });

      // 3. Background notification tap handler
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log('📂 App opened from background:', remoteMessage);
      });

      // 4. Quit-state notification tap handler
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log('📂 App opened from quit state:', remoteMessage);
          }
        });

      // 5. Token refresh listener
      messaging().onTokenRefresh((token) => {
        console.log('🔄 FCM Token Refreshed:', token);
      });

      return unsubscribe;
    } catch (error) {
      console.error('❌ FirebaseMessagingService initialization failed:', error);
      return () => { };
    }
  }
}

export default new FirebaseMessagingService();