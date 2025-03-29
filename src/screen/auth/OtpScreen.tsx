import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from
  'react-native-confirmation-code-field';
import Loading from '../../utils/Loader';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { otp_Verify } from '../../Api/apiRequest';
import CustomHeader from '../../compoent/CustomHeader';
import ScreenNameEnum from '../../routes/screenName.enum';

export default function OtpScreen() {
  const route = useRoute();
  const { email } = route.params || ""; // Provide a fallback if route.params is undefined
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleChangeText = (text: string) => {
    setValue(text);

    if (text.length < 4) {
      setErrorMessage('Please enter a 4-digit code.');
    } else {
      setErrorMessage('');
    }
  };
  const handleVerifyOTP = async () => {
    const role = await AsyncStorage.getItem('userRole');
    if (value.length !== 4) {
      setErrorMessage('Please enter a valid 4-digit OTP.');
      return;
    }
    setErrorMessage('');
    setisLoading(true);
    try {
      const params = {
        email: email,
        navigation: navigation,
        otp: value,
      };
      const response = await otp_Verify(params, setisLoading);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  ;



  return (
    <View style={{
      backgroundColor: '#FFF',
      padding: 15,
      flex: 1,
    }}>
      {isLoading ? <Loading /> : null}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBarComponent />
        <View style={{ marginTop: 18 }}>
          <CustomHeader imageSource={imageIndex.backorange} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

            <Image
              source={imageIndex.forBag}
              style={{ height: 230, width: 300 }} resizeMode='cover'
            />
          </View>
          <View style={{ marginTop: 7 }}>
            <Text style={styles.txtHeading}>Check your mail</Text>
            <Text style={styles.txtsubHeading}>
            Please put the 4 digits sent to you
            </Text>
          </View>
          <View
            style={{ height: hp(10), marginHorizontal: 18, marginTop: 60, justifyContent: "flex-start" }} >
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={handleChangeText}
              cellCount={4}
              rootStyle={{


              }}

              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View style={{ marginStart: -1, backgroundColor: '#E9E9E9', borderRadius: 10, }}>


                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {/* {errorMessage ? (
              <Text style={{ color: 'red', marginTop: 18 }}>{errorMessage}</Text>
            ) : null} */}
          </View>


        </ScrollView>
        <View style={{
          justifyContent: 'flex-start', marginBottom: 11
        }}>
          <CustomButton
            title={'Verify'}
            onPress={()=>
              navigation.navigate(ScreenNameEnum.CreatePassword)
            }
          />
        </View>


      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    backgroundColor: '#E8442E',
    height: 55,

    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(23),

    width: wp(90),
  },
  txtHeading: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    color: 'rgba(0, 0, 0, 1)'
  },
  textEr: { color: 'red', fontSize: 12 },

  txtsubHeading: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(157, 178, 191, 1)',
    marginTop: 10
  },

  codeFieldRoot: { marginTop: 20, },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1.5,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    color: '#000',
    borderRadius: 10,
    backgroundColor: '#E9E9E9',

  },
  focusCell: {
    borderColor: 'rgba(237, 126, 98, 1)',

    backgroundColor: 'rgba(247, 248, 248, 1)',



  },
});



