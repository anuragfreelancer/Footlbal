import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from "react-native-image-crop-picker";
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { PlayerPostApi, PositioncCategory, Teamcategory, TrainingCategory } from '../../../../redux/Api/AuthApi';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import localizationStrings from '../../../../compoent/Localization/Localization';

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
  const [notes, setNotes] = useState<any>('');
  const [dropOpen, setDropOpen] = useState(false);
  const [postionData, setPostionData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [trainingData, setTrainingData] = useState([]);
  const [selectedOption, setSelectedOption] = useState<any>('');
  const [selectedPosition, setSelectedPosition] = useState<any>('');
  const [selectedTraining, setSelectedTraining] = useState<any>('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = useSelector((state: any) => state?.auth);
  useEffect(() => {
    Teamlist();
    Positionlist();
    Traininglist()
  }, [])




  const sendEmailFootball = async (email, password) => {
    try {
      const url = `https://brayhuae.com/api/send_email_football?email=${email}&password=${password}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("sendEmailFootball  Response:", data);
      return data;

    } catch (error) {
      console.log("API Error:", error);
      return null;
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors: any = {};

    if (!fullName.trim()) {
      newErrors.fullName = localizationStrings.namRequired;
      valid = false;
    }

    if (!injuryHistory.trim()) {
      newErrors.injuryHistory = localizationStrings?.selectinjury;
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = localizationStrings?.Passwordrequired;
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = localizationStrings?.Passwordcharacters;
      valid = false;
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = localizationStrings?.Emailrequired;
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = localizationStrings?.validemail;
      valid = false;
    }

    if (!selectedOption) {
      newErrors.selectedOption = localizationStrings?.selectteam;
      valid = false;
    }

    if (!selectedPosition) {
      newErrors.selectedPosition = localizationStrings?.Pleaseposition;
      valid = false;
    }

    if (!selectedTraining) {
      newErrors.selectedTraining = localizationStrings?.Pleasetraining;
      valid = false;
    }

    if (!notes.trim()) {
      newErrors.notes = localizationStrings?.Performancerequired;
      valid = false;
    }

    // if (!imagePrfile) {
    //   newErrors.imagePrfile = localizationStrings?.Profilerequired;
    //   valid = false;
    // }

    if (!dob) {
      newErrors.dob = localizationStrings?.Daterequired;
      valid = false;
    }

    if (!playerId.trim()) {
      newErrors.playerId = localizationStrings?.Playerrequired,
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
          injury: injuryHistory,
          team: selectedOption?.id,
          posttion: selectedPosition.id,
          traing: selectedTraining.id,
          email: email,
          pass: password
        };
        const response = await PlayerPostApi(params, setisLoading);
        console.log("response add ", response)
        if (response) {
          sendEmailFootball(email, password)
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };


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
          console.log('User cancelled image picker');
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
      const image: any = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        compressImageQuality: 0.6, // 0 to 1 (0.5 = medium quality)

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
      console.log("error", error)
    }
  };
  const Positionlist = async () => {
    try {
      const states = await PositioncCategory();
      console.log("states", states)
      if (states) {
        setPostionData(states?.result)
      }
    } catch (error) {
      console.log("PositioncCategory", error)

    }
  };
  const Traininglist = async () => {
    try {
      const states = await TrainingCategory();
      console.log("states", states)
      if (states) {
        setTrainingData(states?.result)
      }
    } catch (error) {
      console.log("TrainingCategory", error)

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
    trainingData,
    email, setEmail,
    password, setPassword
  };
};
export default useAddPlayer;
