import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform, Image } from 'react-native';

// Define props type
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  secoundImg?: any;  // Optional image
}

// Functional component with React.memo
const CustomButton: React.FC<CustomButtonProps> = React.memo(({
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
      {secoundImg && (
        <Image
          source={secoundImg}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
});

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
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(9, 40, 34, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
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
  },
  image: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginLeft: 20,
  },
});

export default CustomButton;
