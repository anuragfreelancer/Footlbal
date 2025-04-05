import React from "react";
import { View,   Image, Text,TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import useEdit from "./useEdit";
import styles from "./style";
import CustomButton from "../../../../compoent/CustomButton";
import ImagePickerModal from "../../../../compoent/ImagePickerModal";
import imageIndex from "../../../../assets/imageIndex";
import ResponsiveSize from "../../../../utils/ResponsiveSize";
import CustomHeader from "../../../../compoent/CustomHeader";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import LoadingModal from "../../../../utils/Loader";
import TextInputField from "../../../../utils/TextInputField";

const EditProfile = () => {
    const {
        imagePrfile,
        isLoading,
        takePhotoFromCamera,
        pickImageFromGallery,
        isModalVisible, setIsModalVisible,
        fullName,  
        PhoneNumber, setPhoneNumber,
         handleSubmit,
        getLogin ,
        errorMessage,  
        handleTextChange
    } = useEdit()

    return (
        <View
            style={styles.mainView}
        >
            {isLoading ? <LoadingModal /> : null}
            <SafeAreaView style={styles.mainView}
            >
                <View style={{ marginHorizontal: 12, marginTop: 28 }}>
                    <CustomHeader imageSource={imageIndex.backNav} label={"Edit profile"} />
                </View>
                <StatusBarComponent />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}  >
                    <View style={styles.profileContainer}>
                        <View style={styles.iamgeView}>
                            <Image
                                resizeMode="cover"
                                source={imagePrfile ? { uri: imagePrfile?.path } : { uri: getLogin?.userGetData?.image }}
                                style={{ height: ResponsiveSize.height(100), width: ResponsiveSize.width(95), borderRadius: 95,borderWidth:1 ,borderColor:"#9DB2BF"}}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(true)}
                            style={{ bottom: ResponsiveSize.height(35), alignItems: "center", justifyContent: "center", height: 30, width: 30, borderRadius: 30 }}>
                            <Image
                                source={imageIndex.floter}
                                style={{ marginLeft: 30, height: ResponsiveSize.height(33), width: ResponsiveSize.width(33) }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15 }}>
                        <View style={{ marginTop: 15 }}>
                            <TextInputField
                               text={fullName}
                               onChangeText={handleTextChange}
                                lable={"Full Name"}
                                placeholder={'Full Name '}
                                firstLogo={true}
                                img={imageIndex.myteam}
                            />
                        </View>
                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                        <View style={{ marginTop: 15 }}>
                            <TextInputField
                                text={PhoneNumber}
                                onChangeText={setPhoneNumber}
                                lable={"Mobile Number"}
                                placeholder="Mobile Number"
                                firstLogo={true}
                                img={imageIndex.myteam}
                                type={"decimal-pad"}
                            />
                        </View>
                    </View>
                    <ImagePickerModal
                        modalVisible={isModalVisible}
                        setModalVisible={setIsModalVisible}
                        pickImageFromGallery={pickImageFromGallery}
                        takePhotoFromCamera={takePhotoFromCamera}
                    />
                </ScrollView >
                <View style={styles.buttView}>
                    <CustomButton title={"Update"} onPress={() => handleSubmit()} />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default EditProfile;

