import React from 'react';
import { Text } from 'react-native';
 
const ErrorText = ({ message, Styles}) => {
  if (!message) return null; // Agar error message nahi hai toh kuch mat dikhana

  return <Text style={[{ color: 'red', fontSize: 12, },Styles]}>{message}</Text>
};

export default ErrorText
