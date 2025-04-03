import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
 import { useSelector } from 'react-redux';
import { ChangePasswordApi } from '../../../../redux/Api/AuthApi';
 

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
      setErrors((prev:any) => ({ ...prev, password: "Password must be at least 6 characters." }));
    }
    if (field === "currentPass" && value.length < 6) {
      setErrors((prev:any) => ({ ...prev, currentPass: "Password must be at least 6 characters." }));
    }
    if (field === "confirmPassword" && value !== credentials.password) {
      setErrors((prev:any) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    }
  };

  const handleResetPass = async () => {
    const { password, confirmPassword, currentPass } = credentials;
    let validationErrors:any = {};
    if (!currentPass.trim()) validationErrors.currentPass = 'Current password is required.';
    if (!password.trim()) validationErrors.password = 'Password is required.';
    else if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters long.';
    if (!confirmPassword.trim()) validationErrors.confirmPassword = 'Confirm Password is required.';
    else if (confirmPassword.length < 6) validationErrors.confirmPassword = 'Confirm Password must be at least 6 characters long.';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
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
      console.log("params",params)
       const response = await ChangePasswordApi(params, setisLoading);
       if(response){
        setCredentials("")
       }
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
