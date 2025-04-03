 
import { useCallback, useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Getplayer } from '../../../../redux/Api/AuthApi';
 const usePlayers = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
    const [allPlay, setAllPlay] = useState<any>([]);
    useFocusEffect(
      useCallback(() => {
        GetplayerApi();
      }, [])
    );
    
   const GetplayerApi = async () => {
    try {
      const state = await Getplayer(isLogin?.userData?.id,setisLoading);
      if (state) {
         setAllPlay(state);

      }
    } catch (error) {
    }
  };
 
  
  return {
    allPlay, setAllPlay,
    isLoading,setisLoading,
    navigation ,
    isLogin
  };
};

export default usePlayers;
