import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
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
        navigation,
        takePhotoFromCamera,
        pickImageFromGallery,
        isModalVisible, setIsModalVisible,
        fullName, setFullName,
        PhoneNumber, setPhoneNumber,
        email, setEmail,
        handleSubmit,
    } = useEdit()

    return (
        <View
            style={styles.mainView}
        >
            {isLoading ? <LoadingModal /> : null}
            <SafeAreaView style={styles.mainView}
            >
                <View style={{ marginHorizontal: 12, marginTop: 15 }}>
                    <CustomHeader imageSource={imageIndex.backNav} label={"Edit profile"} />
                </View>
                <StatusBarComponent />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}  >
                    <View style={styles.profileContainer}>
                        <View style={styles.iamgeView}>
                            <Image
                                resizeMode="cover"
                                source={imagePrfile ? { uri: imagePrfile.path } : imageIndex.ProfielImge}
                                style={{ height: ResponsiveSize.height(105), width: ResponsiveSize.width(105), borderRadius: 105 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(true)}
                            style={{ bottom: ResponsiveSize.height(23), alignItems: "center", justifyContent: "center", height: 30, width: 30, borderRadius: 30 }}>
                            <Image
                                source={imageIndex.editLogo}
                                style={{ marginLeft: 30, height: ResponsiveSize.height(33), width: ResponsiveSize.width(33) }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 15 }}>
                        <View style={{ marginTop: 15 }}>
                            <TextInputField
                                text={fullName}
                                onChangeText={setFullName}
                                lable={"Full Name"}
                                placeholder={'Full Name '}
                                firstLogo={true}
                                img={imageIndex.myteam}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextInputField
                                text={PhoneNumber}
                                onChangeText={setPhoneNumber}
                                lable={"Mobile Number"}
                                placeholder="Mobile Number"
                                firstLogo={true}
                                img={imageIndex.myteam}
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

