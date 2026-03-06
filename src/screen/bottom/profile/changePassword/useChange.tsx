import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
 import { useSelector } from 'react-redux';
import { ChangePasswordApi } from '../../../../redux/Api/AuthApi';
import localizationStrings from '../../../../compoent/Localization/Localization';
 

const useChange = () => {
  const [credentials, setCredentials] = useState({
    currentPass:"",
    password: '',
    confirmPassword: '',
  }); 
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();
  const isLogin = useSelector((state:any) => state?.auth);
  const handleChange = (field:string, value:string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors((prev:any) => ({ ...prev, [field]: '' }));
    if (field === "password" && value.length < 6) {
      setErrors((prev:any) => ({ ...prev, password: localizationStrings.Passwordcharacters }));
    }
    if (field === "currentPass" && value.length < 6) {
      setErrors((prev:any) => ({ ...prev, currentPass: localizationStrings.Passwordcharacters }));
    }
    if (field === "confirmPassword" && value !== credentials.password) {
      setErrors((prev:any) => ({ ...prev, confirmPassword: localizationStrings.PasswordsDoNotMatch }));
    }
  };

  const handleResetPass = async () => {
    const { password, confirmPassword, currentPass } = credentials;
    let validationErrors:any = {};
    if (!currentPass.trim()) validationErrors.currentPass = localizationStrings.CurrentPasswordRequired;
    if (!password.trim()) validationErrors.password = localizationStrings.Passwordrequired;
    else if (password.length < 6) validationErrors.password = localizationStrings.Passwordcharacters;
    if (!confirmPassword.trim()) validationErrors.confirmPassword = localizationStrings.ConfirmPasswordRequired;
    else if (confirmPassword.length < 6) validationErrors.confirmPassword = localizationStrings.Passwordcharacters;
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(localizationStrings.Error, localizationStrings.PasswordsDoNotMatch);
      return;
    }
    const params = {
      currentPass:currentPass,
      password: password,
      confirm_password: confirmPassword,
      userId: isLogin?.userData?.id,
      navigation: navigation,
    };
  
    try {
        const response = await ChangePasswordApi(params, setisLoading);
       
    } catch (error) {
      console.error(error);
    }
  };
  

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation,
  };
};

export default useChange;
