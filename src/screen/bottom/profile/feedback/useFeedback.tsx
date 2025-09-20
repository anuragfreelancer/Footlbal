import {   useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import { useSelector } from 'react-redux';
import { FeedbackApicall } from '../../../../redux/Api/AuthApi';
import { Alert } from 'react-native';
import localizationStrings from '../../../../compoent/Localization/Localization';
const useFeedback = () => {
    const navigation = useNavigation();
  const [isLoading, setisLoading]   = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackText, setfeedbackText] = useState("");
  const isLogin = useSelector((state: any) => state?.auth);
  const SendFeedback = async () => {
    if (!feedbackText.trim()) {
      setErrorMessage(localizationStrings?.feedback);
      return;
    } else {
      setErrorMessage(""); // Clear the error when input is valid
    }
console.log("isLogin?.userData?.id",isLogin?.userData?.id)
    const param = {
      userID: isLogin?.userData?.id,
      feedbackText: feedbackText,
    };

    try {
      const response = await FeedbackApicall(param, setisLoading);
      if (response) {
        setFeedbackText("");
       }
    } catch (error) {
      setFeedbackText("");
      console.error("Message send failed:", error);
     }
  };


 

  return {

    isLoading,
    navigation,
     feedbackText, setfeedbackText ,
     SendFeedback ,
     errorMessage, setErrorMessage
  };
};

export default useFeedback;
