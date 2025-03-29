import React from "react";
import { View, ScrollView,  SafeAreaView } from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import ResponsiveSize from "../../../../utils/ResponsiveSize";
import TextInputField from "../../../../utils/TextInputField";
import { hp } from "../../../../utils/Constant";
import styles from "./style";
import useChange from "./useChange";
import ErrorText from "../../../../compoent/ErrorText";
import LoadingModal from "../../../../utils/Loader";



const ChangePassword = () => {
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation,
  } = useChange()

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <CustomHeader imageSource={imageIndex.backNav} label="Change Password" />
      <ScrollView style={styles.container}>
        <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
          <TextInputField
            lable={"Current Password"}

            placeholder={'Current Password'}
            firstLogo={true}
            text={credentials.currentPass}
            onChangeText={(value) => handleChange('currentPass', value)} // Ha
            img={imageIndex.lock}
          />
          {errors.currentPass && <ErrorText message={errors.currentPass} Styles={{ marginTop: 15 }} />}

          <View style={{ marginTop: 12 }}>
            <TextInputField
              lable={"New Password"}
              placeholder={'New Password'}
              firstLogo={true}
              showEye={true}
              text={credentials.password}
              onChangeText={(value) => handleChange('password', value)} // Handles email input dynamically
              img={imageIndex.lock}
            />
            {errors.password && <ErrorText message={errors.password} Styles={{ marginTop: 15 }} />}

          </View>
          <View style={{ marginTop: 12 }}>
            <TextInputField
              lable={"Confirm Password"}
              onChangeText={(value) => handleChange('confirmPassword', value)} // Handles email input dynamically
              text={credentials.confirmPassword}
              placeholder={'Confirm Password'}
              firstLogo={true}
              showEye={true}
              img={imageIndex.lock}
            />
          </View>
          {errors.confirmPassword && <ErrorText message={errors.confirmPassword} Styles={{ marginTop: 15 }} />}
        </View>
      </ScrollView>
      <View style={{
        justifyContent: 'flex-start', marginBottom: 11,
        marginHorizontal: 12
      }}>
        <CustomButton
          title={'Save'}
          onPress={() =>
            handleResetPass()
          }
        />
      </View>
    </SafeAreaView>
  );
};




export default ChangePassword;