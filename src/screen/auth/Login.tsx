import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../../utils/TextInputField';
import Loading from '../../utils/Loader';
import StatusBarCompoent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import { styles } from './loginStyle';
import ResponsiveSize from '../../utils/ResponsiveSize';
import { wp } from '../../utils/Constant';
import CustomButton from '../../compoent/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCustomer, } from '../../Api/apiRequest';
import { useDispatch } from 'react-redux';

export default function Login() {
  // ram12@gmail.com
  // 123456
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dispatch = useDispatch();


  const handleIdentityText = (value: string) => {
    setEmail(value.trim());
    if (value.trim() === '') {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(value.trim())) {
      setEmailError('Please enter a valid Email Address');
    } else {
      setEmailError('');
    }
  };

  const handlePassText = (value: string) => {
    setPassword(value);
    if (value.trim() === '') {
      setPasswordError('Password is required');
    } else if (value.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const LoginFunction = async () => {
    const role = await AsyncStorage.getItem('userRole');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmedEmail === '') {
      setEmailError('Email   is required');
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Please enter a valid Email Address');
      return;
    } else {
      setEmailError('');
    }
    if (trimmedPassword === '') {
      setPasswordError('Password is required');
      return;
    } else if (trimmedPassword?.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }
    try {
      const params = {
        email: email,
        password: password,
        roleType: role,
        navigation: navigation,
      };
      const response = await LoginCustomer(params, setLoading, dispatch);
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />

      <ScrollView showsVerticalScrollIndicator={false} >
        {loading ? <Loading /> : null}
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 15,
            flex: 1,
            marginTop: hp(8)
          }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

            <Image
              source={imageIndex.app}
              style={{ height: 125, width: 125 }} resizeMode='contain'
            />
          </View>
          <View style={{ marginTop: 7 }}>
            <Text style={styles.txtHeading}>Login</Text>
            <Text style={styles.txtsubHeading}>
              Enter your email and password
            </Text>
          </View>
          <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
            <TextInputField
              lable={"Email"}
              text={email}
              onChangeText={handleIdentityText}
              placeholder={'Email Address '}
              firstLogo={true}
              img={imageIndex.emai}
            />
            {emailError ? <Text style={{ color: 'red', fontSize: 12 }}>{emailError}</Text> : null}
            <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"Password"}
                text={password}
                onChangeText={handlePassText}
                placeholder={'Password'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.lock}
              />
            </View>
            {passwordError ? <Text style={{ color: 'red', fontSize: 12 }}>{passwordError}</Text> : null}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.PasswordReset)
              }}
              style={{
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'rgba(51, 75, 72, 1)',
                  fontSize: 16,
                  fontWeight: '400',
                  lineHeight: 18,
                }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            title={'Login'}
            onPress={() => navigation.navigate(ScreenNameEnum.TabNavigator)
            }
            buttonStyle={{ width: "100%", marginTop: 28 }}
          />


          <Text style={{ lineHeight: 16, marginTop: 28, marginBottom: 12, fontSize: 16, color: "rgba(0, 0, 0, 1)", textAlign: "center", fontWeight: "500" }}>OR</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image
              source={imageIndex.googlelogin}
              style={{
                height: 55,
                width: "100%",
                resizeMode: 'contain',
              }}
            />
          </View>

        </View>
        <View
          style={{
             flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            alignSelf: 'center',
             justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 16, lineHeight: 22, color: 'rgba(0, 0, 0, 1)', }}>
            Don’t have an account?{' '}
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.navigate(ScreenNameEnum.SignUpScreen)
            }}>
            <Text style={Styles.text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: 'rgba(255, 77, 76, 1)',
    bottom: 2
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#E8442E',
    height: 55,

    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: wp(90),
  },
});


