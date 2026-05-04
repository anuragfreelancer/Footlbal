import React from "react";
import { View, ScrollView } from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import TextInputField from "../../../../utils/TextInputField";
import styles from "./style";
import useChange from "./useChange";
import ErrorText from "../../../../compoent/ErrorText";
import LoadingModal from "../../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import { Text } from "react-native-gesture-handler";

const ChangePassword = () => {
  useLanguage();
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
  } = useChange();

  return (
    <View style={styles.mainView}>
      <StatusBarComponent />

      {/* Curved Top Background */}
      <View style={styles.topBackground} />

      {isLoading && <LoadingModal />}

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <CustomHeader
            imageSource={imageIndex.backNav}
            label={localizationStrings.ChangePassword}
            textStyle={{ color: 'white' }}
          />
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Form Card */}
          <View style={styles.formContainer}>


            <View style={styles.inputWrapper}>
              <TextInputField
                lable={localizationStrings?.currentpass}
                placeholder={localizationStrings?.currentpass}
                firstLogo={true}
                showEye={true}
                text={credentials.currentPass}
                onChangeText={(value: any) => handleChange('currentPass', value)}
                img={imageIndex.lock}
                borderColor="#A0D803" // Themed border
              />
              {errors.currentPass && <ErrorText message={errors.currentPass} Styles={{ marginTop: 8 }} />}
            </View>

            <View style={styles.inputWrapper}>
              <TextInputField
                lable={localizationStrings?.newpass}
                placeholder={localizationStrings?.newpass}
                firstLogo={true}
                showEye={true}
                text={credentials.password}
                onChangeText={(value: any) => handleChange('password', value)}
                img={imageIndex.lock}
                borderColor="#A0D803"
              />
              {errors.password && <ErrorText message={errors.password} Styles={{ marginTop: 8 }} />}
            </View>

            <View style={styles.inputWrapper}>
              <TextInputField
                lable={localizationStrings?.confirmpass}
                placeholder={localizationStrings?.confirmpass}
                firstLogo={true}
                showEye={true}
                text={credentials.confirmPassword}
                onChangeText={(value: any) => handleChange('confirmPassword', value)}
                img={imageIndex.lock}
                borderColor="#A0D803"
              />
              {errors.confirmPassword && <ErrorText message={errors.confirmPassword} Styles={{ marginTop: 8 }} />}
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={[styles.butt, styles.saveButtonShadow]}>
          <CustomButton
            title={localizationStrings?.Save}
            onPress={() => handleResetPass()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChangePassword;