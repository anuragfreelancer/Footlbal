import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform, Image } from 'react-native';
import { color } from '../constant';

// Define props type
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  secoundImg:any
}

// Functional component
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  secoundImg,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {
        secoundImg && (
          <Image source={secoundImg} style={{
            height:24,
            width:24,
            resizeMode:"contain",
            marginLeft:20
          }} />
        )
      }
    </TouchableOpacity>
  );
};

// Default styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(160, 216, 3, 1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
     flexDirection: "row",
    // Shadow added here
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(9, 40, 34, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 1, // Android ke liye

      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
  },
  disabledButton: {
    backgroundColor: color.buttonColor,
  },
});

export default CustomButton;
