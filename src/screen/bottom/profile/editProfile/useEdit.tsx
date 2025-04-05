import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import { GetProfile, UpdateProfile_Api } from '../../../../redux/Api/AuthApi';
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
  useEffect(() => {
    if (getLogin?.userGetData) {
      setFullName(getLogin?.userGetData?.user_name || "");
      setPhoneNumber(getLogin?.userGetData?.mobile || "");
    }
  }, [getLogin]);
  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then((image) => {
        setImagePrfile(image)
        setIsModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      setImagePrfile(image)
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSubmit = async () => {
    if (fullName.trim() === "") {
      setErrorMessage("Full Name is required.");
      return; // Stop execution if validation fails
    }
    try {
      const params = {
        name: fullName,
        images: imagePrfile,
        userId: getLogin?.userGetData.id,
        mobile: PhoneNumber,
        email: getLogin?.userGetData?.email,
        navigation: navigation
      };
      const response = await UpdateProfile_Api(params, setisLoading);
      if (response) {
        GetProfile(getLogin?.userGetData?.id, dispatch);
      }
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
