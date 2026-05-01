import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';  
import { GetProfile, UpdateProfile_Api } from '../../../../redux/Api/AuthApi';
import localizationStrings from '../../../../compoent/Localization/Localization';
const useEdit = () => {
  const [isLoading, setisLoading] = useState()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fullName, setFullName] = useState<any>();
  const [PhoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [imagePrfile, setImagePrfile] = useState<any>();
  const getLogin = useSelector((state: any) => state?.feature);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const isLogin = useSelector((state: any) => state?.auth);
   useEffect(() => {
    if (getLogin?.userGetData ||isLogin?.userData) {
      setFullName(getLogin?.userGetData?.user_name || isLogin?.userData?.user_name || "");
      setPhoneNumber(getLogin?.userGetData?.mobile || isLogin?.userData?.mobile || "");
    }
  }, [getLogin]);
  // const pickImageFromGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   })
  //     .then((image) => {
  //       setImagePrfile(image)
  //       setIsModalVisible(false);
  //     })
  //     .catch((error) => console.log(error));
  // };
  const pickImageFromGallery = async () => {
    setTimeout(() => {
      const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 400,
        quality: 0.8,
        includeBase64: false,
      };
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
         } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets?.[0]?.uri;
           setImagePrfile(imageUri)
           setIsModalVisible(false);
           
        }
      });
    }, 200); // Delay helps when launched from modal or state update
  };

  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      setImagePrfile(image.path)
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }

  };

  const handleSubmit = async () => {
    if (fullName.trim() === "") {
      setErrorMessage(localizationStrings?.namRequired);
      return; // Stop execution if validation fails
    }
    try {
      const params = {
        name: fullName,
        images: imagePrfile,
        userId: isLogin?.userData?.id || getLogin?.userGetData.id ,
        mobile: PhoneNumber,
        email: getLogin?.userGetData?.email ||isLogin?.userData?.email ,
        navigation: navigation
      };
       const response = await UpdateProfile_Api(params, setisLoading);
         GetProfile(isLogin?.userData?.id, dispatch);
    
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleTextChange = (text: string) => {
    setFullName(text);
    setErrorMessage(""); // Clear error when typing
  };

  return {
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
    getLogin,
    errorMessage, setErrorMessage,
    handleTextChange
  };
};

export default useEdit;
