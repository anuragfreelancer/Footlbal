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
  import CustomHeader from '../../compoent/CustomHeader';
  
  export default function CreateNewPassword() {
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
        <View style={{ marginTop: 18 }}>
            <CustomHeader imageSource={imageIndex.backorange} />
          </View>
        <ScrollView showsVerticalScrollIndicator={false} >
          {loading ? <Loading /> : null}
         
          <View
            style={{
              backgroundColor: '#FFF',
              padding: 15,
              flex: 1,
              marginTop: hp(2)
            }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
  
              <Image
                source={imageIndex.forBag}
                style={{ height: 230, width: 300 }} resizeMode='cover'
              />
            </View>
            <View style={{ marginTop: 7 }}>
              <Text style={styles.txtHeading}>Create New Password</Text>
              <Text style={styles.txtsubHeading}>
              Your new password must be different from previous used passwords.
              </Text>
            </View>
            <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
            <TextInputField
                  lable={"Password"}
                  text={password}
                  onChangeText={handlePassText}
                  placeholder={'Password'}
                  firstLogo={true}
                  showEye={true}
                  img={imageIndex.phone}
                 />
              {emailError ? <Text style={{ color: 'red', fontSize: 12 }}>{emailError}</Text> : null}
              <View style={{ marginTop: 12 }}>
                <TextInputField
                  lable={"Confirm Password"}
                  text={password}
                  onChangeText={handlePassText}
                  placeholder={'Confirm Password'}
                  firstLogo={true}
                  showEye={true}
                  img={imageIndex.phone}
                 />
              </View>
              {passwordError ? <Text style={{ color: 'red', fontSize: 12 }}>{passwordError}</Text> : null}
          
            </View>
            
  
          </View>
  
        </ScrollView>
        <View style={{
                                justifyContent: 'flex-start', marginBottom: 11,
                                marginHorizontal:12
                              }}>
            <CustomButton
              title={'Save'}
              onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)
  
              }
              buttonStyle={{ width: "100%", marginTop: 28 }}
            />
  
  </View>
  
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
  
  
  