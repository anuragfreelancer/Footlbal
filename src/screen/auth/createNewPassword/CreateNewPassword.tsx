import {
  View,
  Text,
  Image,
   StyleSheet,
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
import { wp } from '../../../utils/Constant';
import CustomButton from '../../../compoent/CustomButton';
 import CustomHeader from '../../../compoent/CustomHeader';
import useCreateNewPassword from './useCreateNewPassword';
import LoadingModal from '../../../utils/Loader';

export default function CreateNewPassword() {
  const { credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation, } = useCreateNewPassword();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
      <View style={{ marginTop: 18 }}>
        <CustomHeader imageSource={imageIndex.backorange} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        {isLoading ? <LoadingModal /> : null}

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
              text={credentials.password}
              placeholder={'Password'}
              onChangeText={(value) => handleChange('password', value)} // Handles email input dynamically

              firstLogo={true}
              showEye={true}
              img={imageIndex.phone}
            />
            {errors.password ? <Text style={{ color: 'red', fontSize: 12,marginTop:8 }}>{errors.password}</Text> : null}
            <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"Confirm Password"}
                text={credentials.confirmPassword}
                onChangeText={(value) => handleChange('confirmPassword', value)} // Handles email input dynamically
                placeholder={'Confirm Password'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.phone}
              />
            </View>
            {errors.confirmPassword ? <Text style={{ color: 'red', fontSize: 12 ,marginTop:10}}>{errors.confirmPassword}</Text> : null}

          </View>


        </View>

      </ScrollView>
      <View style={{
        justifyContent: 'flex-start', marginBottom: 11,
        marginHorizontal: 12
      }}>
        <CustomButton
          title={'Save'}
          onPress={handleResetPass
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


