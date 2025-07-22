import {  useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GetNotifications, Getplayer } from '../../../redux/Api/AuthApi';
 const useNotifications = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const [notifications, setNotifications] = useState()
  const isLogin = useSelector((state: any) => state?.auth);
  

  const GetplayerApi = async () => {
    try {
      const state = await GetNotifications(isLogin?.userData?.id,setisLoading);
      if (state) {
        console.log("push ---- ",state)
         setNotifications(state?.userGetData);

      }
    } catch (error) {
    }
  };
  useEffect(()=>{
    GetplayerApi()
  },[])
  
  return {
    isLoading,
    navigation,
    notifications, setNotifications
    
  };
};

export default useNotifications;
