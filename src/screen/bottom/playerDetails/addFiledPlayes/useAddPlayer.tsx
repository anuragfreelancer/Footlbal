import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from "react-native-image-crop-picker";
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { PlayerPostApi, PositioncCategory, Teamcategory, TrainingCategory } from '../../../../redux/Api/AuthApi';

const useAddPlayer = () => {
  const [fullName, setFullName] = useState("");
  const navigation = useNavigation();
  const [dob, setDob] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setisLoading] = useState(false)
  const [injuryHistory, setInjuryHistory] = useState<any>("");
  const [open, setOpen] = useState(false);
  const [imagePrfile, setImagePrfile] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postionModal, setPostionModal] = useState(false);
  const [tariningModal, setTariningModal] = useState(false);
  const [notes, setNotes] = useState <any>('');
  const [dropOpen, setDropOpen] = useState(false);
  const [postionData, setPostionData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [trainingData, setTrainingData] = useState([]);
  const [selectedOption, setSelectedOption] = useState  <any>('');
  const [selectedPosition, setSelectedPosition] = useState  <any>('');
  const [selectedTraining, setSelectedTraining] = useState  <any>('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const isLogin = useSelector((state: any) => state?.auth);
  useEffect(() => {
    Teamlist();
    Positionlist();
    Traininglist()
  }, [])
  const validate = () => {
    let valid = true;
    let newErrors: any = {};
  
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
      valid = false;
    }
  
    if (!injuryHistory.trim()) {
      newErrors.injuryHistory = "Please select an injury history.";
      valid = false;
    }
  
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }
  
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
  
    if (!selectedOption) {
      newErrors.selectedOption = "Please select a team.";
      valid = false;
    }
  
    if (!selectedPosition) {
      newErrors.selectedPosition = "Please select a position.";
      valid = false;
    }
  
    if (!selectedTraining) {
      newErrors.selectedTraining = "Please select a training type.";
      valid = false;
    }
  
    if (!notes.trim()) {
      newErrors.notes = "Performance notes are required.";
      valid = false;
    }
  
    if (!imagePrfile) {
      newErrors.imagePrfile = "Profile image is required.";
      valid = false;
    }
  
    if (!dob) {
      newErrors.dob = "Date of Birth is required.";
      valid = false;
    }
  
    if (!playerId.trim()) {
      newErrors.playerId = "Player ID is required.";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
   const handleSubmit = async () => {
    if (validate()) {
      try {
        const params = {
          fullName: fullName,
          addImage: imagePrfile,
          userId: isLogin?.userData?.id,
          navigation: navigation,
          dob: dob,
          playerId: playerId,
          notes: notes,
          injury: injuryHistory ,
          team:selectedOption?.id,
          posttion:selectedPosition.id,
          traing:selectedTraining.id,
          email:email,
          pass:password
        };
         const response = await PlayerPostApi(params, setisLoading);
        if (response) {
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then((image: any) => {
        setImagePrfile(image)
        setIsModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const takePhotoFromCamera = async () => {
    try {
      const image: any = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      setImagePrfile(image)
      setIsModalVisible(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };
  const Teamlist = async () => {
    try {
      const state = await Teamcategory(setisLoading);
      if (state) {
         setTeamData(state?.result);

      }
    } catch (error) {
    }
  };
  const Positionlist = async () => {
    try {
      const states = await PositioncCategory();
      if (states) {
        setPostionData(states?.result)
      }
    } catch (error) {
    }
  };
  const Traininglist = async () => {
    try {
      const states = await TrainingCategory();
      if (states) {
        setTrainingData(states?.result)
      }
    } catch (error) {
    }
  };

  return {
    fullName, setFullName,
    dob, setDob,
    playerId, setPlayerId,
    errors, setErrors,
    navigation,
    injuryHistory, setInjuryHistory,
    handleSubmit,
    open, setOpen,
    imagePrfile,
    isModalVisible, setIsModalVisible,
    takePhotoFromCamera,
    pickImageFromGallery,
    dropOpen, setDropOpen,
    selectedOption, setSelectedOption,
    isLoading,
    notes, setNotes,
    teamData,
    postionModal, setPostionModal,
    tariningModal, setTariningModal,
    selectedPosition, setSelectedPosition,
    selectedTraining, setSelectedTraining,
    postionData,
    trainingData ,
    email, setEmail ,
    password, setPassword
  };
};
export default useAddPlayer;
