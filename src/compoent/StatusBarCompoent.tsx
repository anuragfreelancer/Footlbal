import React from 'react';
import { StatusBar, View, Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type StatusBarComponentProps = {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
};

const StatusBarComponent: React.FC<StatusBarComponentProps> = ({
  barStyle = 'dark-content',
  backgroundColor = 'transparent',
  translucent = true,
}) => {
  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={Platform.OS === 'android' ? 'transparent' : backgroundColor}
      translucent={Platform.OS === 'android' ? true : translucent}
    />
  );
};


export default StatusBarComponent;
