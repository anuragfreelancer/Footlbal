import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputField from '../../../utils/TextInputField';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { styles } from '../loginStyle';
import ResponsiveSize from '../../../utils/ResponsiveSize';
import { wp } from '../../../utils/Constant';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useLogin from './useLogin';
import LoadingModal from '../../../utils/Loader';
import localizationStrings from '../../../compoent/Localization/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    loginFunctiom,
    navigation
  } = useLogin()
  const [role, setRole] = useState(null);

  useFocusEffect(() => {
    const fetchUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole !== null) {
          setRole(storedRole); // Assuming it's stored as a plain string
        }
      } catch (error) {
        console.error('Error retrieving user role:', error);
      }
    };

    fetchUserRole();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <LoadingModal visible={isLoading} />
      <StatusBarCompoent />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardDismissMode="on-drag"
          >

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
                <Text style={styles.txtHeading}>{localizationStrings.Login}</Text>
                <Text style={styles.txtsubHeading}>
                  {localizationStrings.EnterEmailPass || "Enter your email and password"}
                </Text>
              </View>
              <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
                <TextInputField
                  lable={localizationStrings.Email}
                  text={credentials.email}
                  onChangeText={(value: string) =>
                    handleChange('email', value.replace(/\s/g, '')) // ✅ remove all spaces
                  }
                  placeholder={localizationStrings.EmailAddress}
                  firstLogo={true}
                  img={imageIndex.emai}
                />
                {errors.email ? <Text style={{ color: 'red', fontSize: 12, marginTop: 15 }}>{errors.email}</Text> : null}
                <View style={{ marginTop: 12 }}>
                  <TextInputField
                    lable={localizationStrings.Password}
                    text={credentials.password}
                    onChangeText={(value: string) =>
                      handleChange('password', value.replace(/\s/g, '')) // ✅ remove all spaces
                    }
                    // onChangeText={(value: string) => handleChange('password', value)} // Handles email input dynamically
                    placeholder={localizationStrings.Password}
                    firstLogo={true}
                    showEye={true}
                    img={imageIndex.lock}
                  />
                </View>
                {errors.password ? <Text style={{ color: 'red', fontSize: 12, marginTop: 15 }}>{errors.password}</Text> : null}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(ScreenNameEnum.PasswordReset)
                  }}
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  {role === "Coach" && <Text
                    style={{
                      color: 'rgba(51, 75, 72, 1)',
                      fontSize: 16,
                      fontWeight: '400',
                      lineHeight: 18,
                    }}>
                    {localizationStrings.ForgotPass || "Forgot your password?"}
                  </Text>}

                </TouchableOpacity>
              </View>
              <CustomButton
                title={localizationStrings.Login}
                onPress={() => loginFunctiom()}
                buttonStyle={{ width: "100%", marginTop: 28 }}
              />

              {/* <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image
              source={imageIndex.googlelogin}
              style={{
                height: 55,
                width: "100%",
                resizeMode: 'contain',
              }}
            />
          </View> */}

            </View>
            {role === "Coach" && (
              <View style={Styles.signUpContainer}>
                <Text style={Styles.dontHaveAccountText}>
                  {localizationStrings.Donthaveaccount || "Don’t have an account?"}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(ScreenNameEnum.SignUpScreen)}
                  activeOpacity={0.7}
                  style={Styles.signUpButton}
                >
                  <Text style={Styles.signUpText}> {localizationStrings.SignUp}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  dontHaveAccountText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  signUpButton: {
    paddingVertical: 4,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(160, 216, 3, 1)', // Brand Lime Green
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: 'rgba(160, 216, 3, 1)',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'rgba(160, 216, 3, 1)',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: wp(90),
  },
});


