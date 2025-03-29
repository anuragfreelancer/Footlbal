import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LoginUserApi } from '../../../redux/Api/AuthApi';
  
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: 'test11@gmail.com', password: '1234567' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const handleChange = (field:any, value:any) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Clear error when typing
    if (field === 'email') {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: 'Email is required.' }));
      } else if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      }
    }
    if (field === 'password' && value.length < 5) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 5 characters long.' }));
    }
  };

  const loginFunctiom = async () => {
    const { email, password } = credentials;
    const newErrors:any = {};
    if (!emailRegex.test(email)) newErrors.email = 'Email is required.';
    if (!password.trim()) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const params = {
        email: email,
        password: password,
        navigation: navigation,
      };
       const response = await LoginUserApi(params, setisLoading, dispatch);
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    loginFunctiom,
    navigation
  };
};

export default useLogin;
