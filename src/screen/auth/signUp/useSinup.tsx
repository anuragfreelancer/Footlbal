import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SinupUserApi } from '../../../redux/Api/AuthApi';
  
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const useSignup = () => {
   const [errors, setErrors] = useState({});
   const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const [credentials, setCredentials] = useState({
     email: 'Ram1@gmail.com',
    password: '12345',
    mobile: '965423227',
  });
  const handleChange = (field:string, value:string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Clear error on input change
  };
  const validateFields = () => {
    const {   email, password, mobile } = credentials;
    let validationErrors = {};
     if (!email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Enter a valid email address.';
    }
    if (!mobile!.trim()) validationErrors.mobile = 'mobile is required.';

    if (!password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }
   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false; 
    }
    return true;  
  };

  const handleSignup = async () => {
    if (!validateFields()) return; // Stop execution if validation fails
    try {
        const params = {
             email: credentials?.email ,
            password: credentials?.password  ,
            mobile: credentials?.mobile ,
            navigation: navigation,
        };
         const response = await SinupUserApi(params, setisLoading);
    } catch (error) {
        console.error("Signup Error:", error);
    }
};
  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleSignup,
    navigation,
   };
};

export default useSignup;
