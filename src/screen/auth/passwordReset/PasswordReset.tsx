import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputField from '../../../utils/TextInputField';
 import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { styles } from '../loginStyle';
import ResponsiveSize from '../../../utils/ResponsiveSize';
 import CustomButton from '../../../compoent/CustomButton';
 import CustomHeader from '../../../compoent/CustomHeader';
import useForgot from './useForgot';
import ErrorText from '../../../compoent/ErrorText';
import LoadingModal from '../../../utils/Loader';

export default function PasswordReset() {
  const { credentials,
    errors,
    isLoading,
    handleChange,
    handleForgot,
    navigation, } = useForgot()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false} >
        {isLoading ? <LoadingModal /> : null}
        <View style={{ marginTop: 18 }}>
          <CustomHeader imageSource={imageIndex.backorange} />
        </View>
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
            <Text style={styles.txtHeading}>Password Reset</Text>
            <Text style={styles.txtsubHeading}>
              Please put your email or mobile number to reset your password
            </Text>
          </View>
          <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
            <TextInputField
              lable={"Email"}
              value={credentials.email}
              onChangeText={(value:string) => handleChange('email', value)}
              placeholder={'Email Address '}
              firstLogo={true}
              img={imageIndex.emai}
            />
            {errors.email && <ErrorText message={errors.email} Styles={{
              marginLeft: 16,
              marginTop: 15
            }} />}
            {/* <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"Mobile No."}
                value={credentials.mob}
                onChangeText={(value) => handleChange('mob', value)}
                placeholder={'Mobile No.'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.phone}
                type="decimal-pad"
              />
            </View> */}

            {/* {errors.mob && <ErrorText message={errors.mob} Styles={{
              marginLeft: 16,
              marginTop: 15
            }} />} */}
           
          </View>
          <View style={{
            justifyContent: 'flex-start', marginBottom: 11
          }}>
            <CustomButton
              title={'Next'}
              onPress={() => handleForgot()

              }
              // onPress={()=>navigation.navigate(ScreenNameEnum.OtpScreen)}
              buttonStyle={{ width: "100%", marginTop: 28 }}
            />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}



