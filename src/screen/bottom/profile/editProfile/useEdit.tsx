import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import { GetProfile } from '../../../../redux/Api/AuthApi';
 const useEdit = () => {
  const [isLoading, setisLoading] = useState()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [dropOpen, setDropOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [fullName, setFullName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  //  const isLogin = useSelector((state) => state?.auth);
  const [imagePrfile, setImagePrfile] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const getLogin = useSelector((state) => state?.feature);

  // useEffect(() => {
  //   if (getLogin?.userGetData) {
  //     setFullName(getLogin?.userGetData?.user_name);
  //     setPhoneNumber(getLogin?.userGetData?.mobile);
  //   setEmail(getLogin?.userGetData?.email);
  //     setSelectedOption(getLogin.userGetData.gender);
  //     }
  // }, [isLogin]);
   
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
     
    try {
        const params = {
            name: fullName,
            images: imagePrfile,
            userId: isLogin.userData.id,
            gender:selectedOption,
            mobile:PhoneNumber
        };
        console.log("params",params.images)
        const response = await UpdateProfile_Api(params, setisLoading, navigation);
        if(response){
          GetProfile(isLogin?.userData?.id,dispatch);
        }

    } catch (error) {
        console.error("Error updating profile:", error);
    }
};


  return {
    imagePrfile,
    isLoading,
    navigation,
    takePhotoFromCamera,
    pickImageFromGallery,
    isModalVisible, setIsModalVisible,
    dropOpen, setDropOpen,
    selectedOption, setSelectedOption,
    fullName, setFullName,
    PhoneNumber, setPhoneNumber,
    email, setEmail,
    handleSubmit ,
    
   };
};

export default useEdit;
