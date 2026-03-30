 
import { useCallback, useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Getplayer } from '../../../../redux/Api/AuthApi';
 const useMyTeam = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
    const [MyTeam, setMyTeam] = useState<any>([]);
    const getLogin = useSelector((state: any) => state?.feature);

    useEffect(()=>{
      GetplayerApi()
    },[])
    
   const GetplayerApi = async () => {
    try {
      const state = await Getplayer(isLogin?.userData?.id,setisLoading);
      if (state) {
         setMyTeam(state);

      }
    } catch (error) {
    }
  };
 
  
  return {
    MyTeam, setMyTeam,
    isLoading,setisLoading,
    navigation ,
    isLogin,
    getLogin ,
   };
};

export default useMyTeam;
