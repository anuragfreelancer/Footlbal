import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useEdit from "./useEdit";
import ResponsiveSize from "../../../../utils/ResponsiveSize";
import styles from "./style";
import CustomButton from "../../../../compoent/CustomButton";
import ImagePickerModal from "../../../../compoent/ImagePickerModal";
import CustomHeader from "../../../../compoent/CustomHeader";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import LoadingModal from "../../../../utils/Loader";
import TextInputField from "../../../../utils/TextInputField";
import imageIndex from "../../../../assets/imageIndex";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
const EditProfile = () => {
  useLanguage();
  const {
    imagePrfile,
    isLoading,
    takePhotoFromCamera,
    pickImageFromGallery,
    isModalVisible,
    setIsModalVisible,
    fullName,
    PhoneNumber,
    setPhoneNumber,
    handleSubmit,
    getLogin,
    errorMessage,
    handleTextChange,
  } = useEdit();

  return (
    <SafeAreaView style={styles.mainView}>
      <LoadingModal visible={isLoading} />

      <StatusBarComponent />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ marginHorizontal: 12, marginTop: 5 }}>
              <CustomHeader
                imageSource={imageIndex.backNav}
                label={localizationStrings.Edit}
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
              <View style={styles.profileContainer}>
                <View style={styles.iamgeView}>
                  <Image
                    source={
                      imagePrfile
                        ? { uri: imagePrfile }
                        : getLogin?.userGetData?.image && !getLogin.userGetData.image.endsWith("/users/")
                          ? { uri: getLogin.userGetData.image }
                          : imageIndex.prfEdit
                    }
                    style={styles.profileImage}
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    activeOpacity={0.8}
                    style={styles.cameraIconContainer}
                  >
                    <Image
                      source={imageIndex.floter}
                      style={styles.cameraIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form Fields */}
              <View style={{ marginHorizontal: 15 }}>
                <View style={{ marginTop: 15 }}>
                  <TextInputField
                    text={fullName}
                    onChangeText={handleTextChange}
                    lable={localizationStrings?.full}
                    placeholder={localizationStrings?.full}
                    firstLogo
                    img={imageIndex.myteam}
                  />
                </View>

                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                <View style={{ marginTop: 15 }}>
                  <TextInputField
                    text={PhoneNumber}
                    onChangeText={setPhoneNumber}
                    lable={localizationStrings?.mb}
                    placeholder={localizationStrings?.mb}
                    firstLogo
                    img={imageIndex.phone}
                    type="decimal-pad"
                  />
                </View>
              </View>

              {/* Image Picker Modal */}
              <ImagePickerModal
                modalVisible={isModalVisible}
                setModalVisible={setIsModalVisible}
                pickImageFromGallery={pickImageFromGallery}
                takePhotoFromCamera={takePhotoFromCamera}
              />
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.buttView}>
              <CustomButton title={localizationStrings.Save} onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default EditProfile;
