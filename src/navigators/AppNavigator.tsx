import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';
import NetInfo from '@react-native-community/netinfo';
import NetworkStatusModal from '../compoent/NetworkStatusModal';
import { LanguageProvider } from '../compoent/Localization/LanguageContext';
import PaymentDeepLinkHandler from '../utils/PaymentDeepLinkHandler';
import UpdateModal from '../checkAppUpdate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessaging } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import NotificationService from '../NotificationService';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppNavigator: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
      setModalVisible(!state.isConnected); // Agar internet off ho to modal show kare, on ho to hide kare
    });
    getFcmToken()
    return () => unsubscribe();

  }, []);
  const getFcmToken = async () => {
    try {
      const fcmToken = await getMessaging().getToken();

      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.log('✅ FCM Token:', fcmToken);
        return fcmToken;
      } else {
        throw new Error('FCM Token not received');
      }

    } catch (error) {
      console.log(`❌ FCM Token Error: `, error);
      return null;
    }
  };
  const initNotifications = async () => {
    try {
      // Step 1: iOS ke liye register
      await NotificationService.registerAppWithFCM();

      // Step 2: Permission maango
      const granted = await NotificationService.requestPermission();
      if (!granted) {
        console.log('Notification permission denied — stopping init');
        return;
      }

      // Step 3: Android notification channel banao
      await NotificationService.createChannel();

      // Step 4: FCM token lo
      await NotificationService.getFcmToken();

      // Step 5: Foreground listeners setup karo
      const unsubscribe = NotificationService.setupListeners();

      console.log('Notifications initialized successfully');
    } catch (error) {
      console.log('Notification init error:', error);
    }
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <LanguageProvider>
              <UpdateModal />
              <PaymentDeepLinkHandler />
              <NetworkStatusModal modalVisible={modalVisible} offlineText="No Internet! Please check your connection." />
              <SafeAreaView style={{ flex: 1 }} edges={['bottom']} >
                {/* <SafeAreaView style={{ flex: 1 }} edges={['top']}> */}

                <RegistrationRoutes />
              </SafeAreaView>

              <Toast config={toastConfig} />
            </LanguageProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigator;
