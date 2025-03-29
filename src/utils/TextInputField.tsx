import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import imageIndex from '../assets/imageIndex';

export default function TextInputField({ ...props }) {
  const [showPassword, setShowPassword] = useState(props.hide);
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isFocused, setIsFocused] = useState(false);

  const onChangeText = (value: string) => {
    if (props.onChangeText) {
      props.onChangeText(value);
    }
  };

  return (
    <View style={{ height: hp(7), justifyContent: 'center', marginVertical: 12 }}>
      {props.lable && (
        <Text style={{
          color: isFocused ?  "rgba(237, 126, 98, 1)" :"#EBEBEB",
          fontSize: 14,
          fontWeight: "600",
        }}>{props.lable}</Text>
      )}

      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: 'white',
            borderColor: !isFocused ? "#EBEBEB" : "rgba(237, 126, 98, 1)",
            height: 60,
            borderRadius: 15,
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1.8,
            marginTop:5
           },
          props.style,
        ]}>

        {props.firstLogo && (
          <View
            style={{
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: '10%',
            }}>
            <Image
              source={props.img}
              style={{ width: 24, height: 24 }}
              tintColor={isFocused ? "rgba(237, 126, 98, 1)" : "#EBEBEB"}
              resizeMode="contain"
            />
          </View>
        )}
                  <View style={{
            borderWidth:1,
            borderColor:!isFocused ? "#EBEBEB" : "rgba(237, 126, 98, 1)",
            height:31,
            width:2,
            borderRadius:10
          }}/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: props.showEye ? '70%' : '85%',
            marginLeft: props.firstLogo ? 0 : 15,
            height: 50,

          }}>
          <View style={{ width: '80%' }}>
            <TextInput
              placeholderTextColor="#ADA4A5"
              style={[
                {
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 14,
                  marginTop: 5,
                  flex: 1,
                  marginLeft:10

                },
                props.textStyle,
              ]}
              onChangeText={onChangeText}
              value={props.text} // Directly using parent `email` state
              placeholder={props.placeholder}
              secureTextEntry={showPassword}
              maxLength={props.maxLength}
              keyboardType={props.type}
              onFocus={() => setIsFocused(true) || props.onFocus}
              onBlur={() => setIsFocused(false)}
              editable={props.editable}
            />
          </View>
        </View>
        {props.showEye && (
          <TouchableOpacity
            onPress={PasswordVisibility}
            style={{
              height: 42,
              width: 42,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={showPassword ? imageIndex.eye : imageIndex.visible}
              style={{ width: 24, height: 24, tintColor: 'gray' }}
              tintColor={isFocused ? "rgba(237, 126, 98, 1)" : "#EBEBEB"}

            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
