import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LoginUserApi } from '../../../redux/Api/AuthApi';
 import {   Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from '../../../compoent/Localization/Localization';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
const useLogin = () => {
  // const requestPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     try {
  //       await messaging().requestPermission();
  //       const token = await messaging().getToken();
      
  //     } catch (error) {
  //       console.log('Permission rejected', error);
  //     }
  //   }
  // };
  const [deviceToken,setDeviceToken] = useState("")

  // const requestUserPermission = async (token:any) => {
 
  //    try {
  //      if (Platform.OS === 'android' && Platform.Version >= 33) {
  //       const postNotificationPermission = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       );
  
  //       if (postNotificationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
  //         Alert.alert(
  //           'Permission Required',
  //           'Please enable notifications in your device settings to receive notifications.',
  //           [
  //             { text: 'Cancel', style: 'cancel' },
  //             { text: 'Open Settings', onPress: () => Linking.openSettings() },
  //           ],
  //         );
  //         return;
  //       }
  //     }
  
  //     // Request Firebase messaging permissions
  //     const authStatus = await messaging().requestPermission();
  //     const isPermissionGranted =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //     if (isPermissionGranted) {
  
  //       // Retrieve FCM Token
  //       const fcmToken = await messaging().getToken();
  //       if (fcmToken) {
   
  //          if (token) {
  //           console.log("token",token)
  //            sendLocalNotificationWithToken(token);
  //         } else {
  //           console.log('Using FCM token:', fcmToken);
  //           setDeviceToken(fcmToken)
  //           sendLocalNotificationWithToken(fcmToken);
  //         }
  //       } else {
  //         console.error('Failed to retrieve FCM Token.');
  //         Alert.alert('Error', 'Unable to retrieve FCM Token.');
  //       }
  //     } else {
  //       console.warn('Notification permission denied.');
  //       Alert.alert(
  //         'Permission Denied',
  //         'Notifications are disabled in your device settings. Please enable them.',
  //         [
  //           { text: 'Cancel', style: 'cancel' },
  //           { text: 'Open Settings', onPress: () => Linking.openSettings() },
  //         ],
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error requesting notification permission:', error);
  //    }
  // };
  
  
  // useEffect(() => {
  //   requestUserPermission();
  //   requestPermission();
    
  // }, []);
    // useEffect(() => {
    //    // This handles foreground push notifications
    //   const unsubscribe = messaging().onMessage((remoteMessage) => {
    //      PushNotification.createChannel(
    //       {
    //         channelId: 'SportAppFootlball', // Unique channel ID
    //         channelName: 'App Sport Notifications', // Channel name shown in system settings
    //         channelDescription: 'Notifications for FootlbalApp App', // Optional description
    //         importance: 4, // High importance for heads-up notifications
    //         vibrate: true, // Enable vibration
    //        },
    //       (created) => console.log(`Channel created: ${created}`), // Debugging callback
    //     );
    //     // Cancel any previous local notifications
    //     PushNotification.cancelAllLocalNotifications();
    //     // Display the local notification with the message from Firebase
    //     PushNotification.localNotification({
    //       channelId: 'SportAppFootlball',
    //       title: remoteMessage?.notification?.title,
    //       message: remoteMessage?.notification?.body,
    //     });
    //   });
  
    //    return () => unsubscribe();
  
    // }, []);
  
    // Handle background notifications
    // useEffect(() => {
    //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //      navigateToNotification();
    //   });
  
    //   // Handle initial notification when the app is opened from a notification
    //   messaging()
    //     .getInitialNotification()
    //     .then((remoteMessage) => {
    //       if (remoteMessage) {
    //         navigateToNotification();
    //       }
    //     });
    // }, []);
  
   
    // const [credentials, setCredentials] = useState({ email: 'Kp1@gmail.com', password: '123456' });
    // const [credentials, setCredentials] = useState({ email: 'coach13@gmail.com', password: '123456' });
    // const [credentials, setCredentials] = useState({ email: 'Condo@gmail.com', password: '123456' });
    // const [credentials, setCredentials] = useState({ email: 'Testing@gmail.com', password: '123456' });
    // const [credentials, setCredentials] = useState({ email: 'coach12@gmail.com', password: '1234567' });
    // Testing@gmail.com


    // Dp@gmail.com
    // John@gmail.com
    const [credentials, setCredentials] = useState({ email: 'L444o@gmail.com', password: '123456' }); 
//  const [credentials, setCredentials] = useState({ email: 'test223@gmail.com', password: '123456' }); 
 
    const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const handleChange = (field:any, value:any) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Clear error when typing
    if (field === 'email') {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: localizationStrings.Emailrequired }));
      } else if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: localizationStrings.validemail }));
      }
    }
    if (field === 'password' && value.length < 5) {
      setErrors(prev => ({ ...prev, password: localizationStrings.Passwordcharacters }));
    }
  };

  const loginFunctiom = async () => {
    const { email, password } = credentials;
    const newErrors:any = {};
    if (!emailRegex.test(email)) newErrors.email = localizationStrings.Emailrequired;
    if (!password.trim()) newErrors.password = localizationStrings.Passwordrequired;
    else if (password.length < 6) newErrors.password = localizationStrings.Passwordcharacters;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const role = await AsyncStorage.getItem('userRole');

    try {
      const params = {
        email: email,
        password: password,
        navigation: navigation,
        token:deviceToken ,
        logintype :role

      };
        const response = await LoginUserApi(params, setisLoading, dispatch);
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    loginFunctiom,
    navigation
  };
};

export default useLogin;
