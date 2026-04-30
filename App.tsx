import React, { FunctionComponent, useEffect } from 'react';
import { LogBox } from 'react-native';

import 'react-native-gesture-handler';
import AppNavigator from './src/navigators/AppNavigator';
import FirebaseMessagingService from './src/services/FirebaseMessagingService';

LogBox.ignoreAllLogs();

const App: FunctionComponent<any> = () => {
  useEffect(() => {
    const unsubscribe = FirebaseMessagingService.initialize();
    FirebaseMessagingService.requestPermission();
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return <AppNavigator />;
};

export default App;
