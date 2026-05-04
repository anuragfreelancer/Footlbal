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
    <View style={styles.mainView}>
      <StatusBarComponent />

      {/* Curved Top Background */}
      <View style={styles.topBackground} />

      <LoadingModal visible={isLoading} />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              {/* Header */}
              <View style={styles.headerWrapper}>
                <CustomHeader
                  imageSource={imageIndex.backNav}
                  label={localizationStrings.Edit}
                  textStyle={{
                    color: "#FFF",

                  }}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                <View style={styles.profileContainer}>
                  <View style={styles.iamgeView}>
                    <View style={styles.imageRing}>
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
                    </View>

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

                {/* Form Card */}
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>{localizationStrings.PersonalDetails || "Personal Details"}</Text>

                  <View style={styles.inputWrapper}>
                    <TextInputField
                      text={fullName}
                      onChangeText={handleTextChange}
                      lable={localizationStrings?.full}
                      placeholder={localizationStrings?.full}
                      firstLogo
                      img={imageIndex.myteam}
                      // Overriding default salmon color to brand green
                      style={{ borderColor: '#A0D803' }}
                    />
                  </View>

                  {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  ) : null}

                  <View style={styles.inputWrapper}>
                    <TextInputField
                      text={PhoneNumber}
                      onChangeText={setPhoneNumber}
                      lable={localizationStrings?.mb}
                      placeholder={localizationStrings?.mb}
                      firstLogo
                      img={imageIndex.phone}
                      type="decimal-pad"
                      // Overriding default salmon color to brand green
                      style={{ borderColor: '#A0D803' }}
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

              {/* Fixed Submit Button with Shadow */}
              <View style={[styles.buttView, styles.saveButtonShadow]}>
                <CustomButton title={localizationStrings.Save} onPress={handleSubmit} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );


};

export default EditProfile;
