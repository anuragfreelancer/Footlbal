import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LoginUserApi } from '../../../redux/Api/AuthApi';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseMessagingService from '../../../services/FirebaseMessagingService';
import localizationStrings from '../../../compoent/Localization/Localization';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useLogin = () => {
  const [deviceToken, setDeviceToken] = useState("")
  // Amancoach@gmail.com
  useEffect(() => {
    const fetchToken = async () => {
      const token = await FirebaseMessagingService.getFcmToken();
      if (token) {
        setDeviceToken(token);
      }
    };
    fetchToken();
  }, []);
  // deepore.technorizen@gmail.com
  // Newcoash@gmail.com

  // 1) Joshs1424@gmail.com
  // const [credentials, setCredentials] = useState({ email: 'Ramji@gmail.com', password: '123456' });
  // const [credentials, setCredentials] = useState({ email: 'playerkmmp@gmail.com', password: '123456' });
  const [credentials, setCredentials] = useState({ email: 'test@example.com', password: '123456' });
  // const [credentials, setCredentials] = useState({ email: 'Amanwo@gmail.com', password: '123456' });
  // const [credentials, setCredentials] = useState({ email: 'kmmp@gmail.com', password: '123456' });
  // const [credentials, setCredentials] = useState({ email: 'himanshusinha011@gmail.com', password: '123456' });
  // const [credentials, setCredentials] = useState({ email: 'Uplayer@gmail.com', password: '123456' });
  // const [credentials, setCredentials] = useState({ email: 'himanshusinha1110@gmail.com', password: '123456' });
  //  Teisng124@gmail.com
  const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const handleChange = (field: any, value: any) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' })); // Clear error when typing
    if (field === 'email') {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: localizationStrings.Emailrequired }));
      } else if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: localizationStrings.validemail }));
      }
    }
    if (field === 'password' && value.length < 5) {
      setErrors(prev => ({ ...prev, password: localizationStrings.Passwordcharacters }));
    }
  };

  const loginFunctiom = async () => {
    const { email, password } = credentials;
    const newErrors: any = {};
    if (!emailRegex.test(email)) newErrors.email = localizationStrings.Emailrequired;
    if (!password.trim()) newErrors.password = localizationStrings.Passwordrequired;
    else if (password.length < 6) newErrors.password = localizationStrings.Passwordcharacters;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const role = await AsyncStorage.getItem('userRole');

    try {
      const params = {
        email: email,
        password: password,
        navigation: navigation,
        token: deviceToken,
        logintype: role

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
