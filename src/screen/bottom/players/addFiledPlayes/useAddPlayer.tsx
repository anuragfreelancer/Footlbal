import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 
import ImagePicker from "react-native-image-crop-picker";
import { Alert } from 'react-native';

const useAddPlayer = () => {
    const [fullName, setFullName] = useState("");
    const navigation = useNavigation();
    const [dob, setDob] = useState("");
    const [playerId, setPlayerId] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setisLoading] = useState(false)
    const [injuryHistory, setInjuryHistory] = useState(null);
    const [open, setOpen] = useState(false);
    const [imagePrfile, setImagePrfile] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const validate = () => {
      let valid = true;
      let newErrors:any = {};
      if (!fullName.trim()) {
        newErrors.fullName = "Full Name is required";
        valid = false;
      }
      if (!dob) {
        newErrors.dob = "Date of Birth is required";
        valid = false;
      }
      if (!playerId.trim()) {
        newErrors.playerId = "Player ID is required";
        valid = false;
      } else if (isNaN(playerId)) {
        newErrors.playerId = "Player ID must be a number";
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleSubmit = () => {
      if (validate()) {
        console.log("Form submitted:", { fullName, dob, playerId });
      }
    };
  
    const pickImageFromGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      })
        .then((image:any) => {
          setImagePrfile(image)
          setIsModalVisible(false);
        })
        .catch((error) => console.log(error));
    };
  
    const takePhotoFromCamera = async () => {
      try {
        const image:any = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
        });
        setImagePrfile(image)
        setIsModalVisible(false);
      } catch (error:any) {
        Alert.alert('Error', error.message);
      }
    };
  return {
    fullName, setFullName ,
    dob, setDob ,
    playerId, setPlayerId ,
    errors, setErrors ,
    navigation,
    injuryHistory, setInjuryHistory,
    handleSubmit ,
    open, setOpen ,

    imagePrfile,
    isModalVisible, setIsModalVisible ,
    takePhotoFromCamera ,
    pickImageFromGallery
  };
};
 export default useAddPlayer;
