import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { UpdatePassUserApi } from '../../../redux/Api/AuthApi';
 

const useCreateNewPassword = () => {
  const [credentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
  });
  const route = useRoute();
  const { userId } = route.params || ''; // Provide a fallback if route.params is undefined
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();
  const handleChange = (field:string, value:string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    if (field === "password" && value.length < 5) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 5 characters." }));
    }
    if (field === "confirmPassword" && value !== credentials.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    }

  };

  const handleResetPass = async () => {
    const { password, confirmPassword } = credentials;
    let validationErrors:any = {};
    if (!password.trim()) validationErrors.password = 'Password is required.';
    if (!confirmPassword.trim()) validationErrors.confirmPassword = 'Confirm Password is required.';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    const params = {
      password: password,
      confirm_password: confirmPassword,
      userId: userId,
      navigation: navigation,
    };
    try {
       const response = await UpdatePassUserApi(params, setisLoading);
    } catch (error) {
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

export default useCreateNewPassword;
