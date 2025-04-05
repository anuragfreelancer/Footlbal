import {  useState } from 'react';
import {   useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
 const useNotifications = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const [notifications, setNotifications] = useState()
  const isLogin = useSelector((state: any) => state?.auth);
  
  // const GetplayerApi = async () => {
  //   try {
  //     const state = await Getplayer(isLogin?.userData?.id,setisLoading);
  //     if (state) {
  //        setNotifications(state);

  //     }
  //   } catch (error) {
  //   }
  // };
 
  
  return {
    isLoading,
    navigation,
    notifications, setNotifications
    
  };
};

export default useNotifications;
