import React from "react";
import { View, ScrollView,    } from "react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";

const ChangePassword = () => {
  useLanguage();
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
   } = useChange()

  return (
    <SafeAreaView style={styles.mainView}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
    <View style={{
      marginTop:11
    }}>
      <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings.ChangePassword} />
      </View>
      <ScrollView style={styles.container}>
        <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
          <TextInputField
            lable={localizationStrings?.currentpass}

            placeholder={localizationStrings?.currentpass}
            firstLogo={true}
            text={credentials.currentPass}
            onChangeText={(value:any) => handleChange('currentPass', value)} // Ha
            img={imageIndex.lock}
          />
          {errors.currentPass && <ErrorText message={errors.currentPass} Styles={{ marginTop: 15 }} />}

          <View style={{ marginTop: 12 }}>
            <TextInputField
              lable={localizationStrings?.newpass}
              placeholder={localizationStrings?.newpass}
              firstLogo={true}
              showEye={true}
              text={credentials.password}
              onChangeText={(value:any) => handleChange('password', value)} // Handles email input dynamically
              img={imageIndex.lock}
            />
            {errors.password && <ErrorText message={errors.password} Styles={{ marginTop: 15 }} />}
          </View>
          <View style={{ marginTop: 12 }}>
            <TextInputField
              lable={localizationStrings?.confirmpass}
              onChangeText={(value:any) => handleChange('confirmPassword', value)} // Handles email input dynamically
              text={credentials.confirmPassword}
              placeholder={localizationStrings?.confirmpass}
              firstLogo={true}
              showEye={true}
              img={imageIndex.lock}
            />
          </View>
          {errors.confirmPassword && <ErrorText message={errors.confirmPassword} Styles={{ marginTop: 15 }} />}
        </View>
      </ScrollView>
      <View style={styles.butt}>
        <CustomButton
          title={localizationStrings?.Save}
          onPress={() =>
            handleResetPass()
          }
        />
      </View>
    </SafeAreaView>
  );
};




export default ChangePassword;