import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
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

export default function Login() {
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    loginFunctiom,
    navigation
  } = useLogin()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading ? <LoadingModal /> : null}
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false} >
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
              text={credentials.email}

              onChangeText={(value:string) => handleChange('email', value)} // Handles email input dynamically

              placeholder={'Email Address '}
              firstLogo={true}
              img={imageIndex.emai}
            />
            {errors.email ? <Text style={{ color: 'red', fontSize: 12 ,marginTop:15 }}>{errors.email}</Text> : null}
            <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"Password"}
                text={credentials.password}
                onChangeText={(value:string) => handleChange('password', value)} // Handles email input dynamically
                placeholder={'Password'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.lock}
              />
            </View>
            {errors.password ? <Text style={{ color: 'red', fontSize: 12,marginTop:15 }}>{errors.password}</Text> : null}
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
            onPress={() => loginFunctiom()}         
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


