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
      newErrors.fullName = "Full Name is required";
      valid = false;
    }
    if (!injuryHistory.trim()) {
      newErrors.injuryHistory = "Please Select Injury  is required";
     }
    if (!selectedOption) {
      newErrors.selectedOption = 'Please select a Team.';
    }

    if (!selectedPosition) {
      newErrors.selectedPosition = 'Please select a Position.';
    }
    if (!selectedTraining) {
      newErrors.selectedTraining = "Please select a Training type.";
    }
    if (!notes.trim()) {
      newErrors.notes = "Notes Performance is required";
      valid = false;
    }
    if (!imagePrfile) {
      newErrors.imagePrfile = "Image is required";
      valid = false;
    }
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    }
    if (!playerId.trim()) {
      newErrors.playerId = "Player ID is required";
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
          traing:selectedTraining.id
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
    trainingData
  };
};
export default useAddPlayer;
