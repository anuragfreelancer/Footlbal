import { useEffect, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import {   Getplayer } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';
  const useCalendar = () => {
   const [isLoading,setisLoading] = useState(false)
   const navigation = useNavigation();
   const [selectedDates, setSelectedDates] = useState([]);
   const isLogin = useSelector((state: any) => state?.auth);
    const [players, setPlayers] = useState<any>([]);
    useEffect(()=>{
      GetplayerApi()
    },[])
   const GetplayerApi = async () => {
    try {
      const state = await Getplayer(isLogin?.userData?.id,setisLoading);
      if (state) {
         setPlayers(state);

      }
    } catch (error) {
    }
  };

  return {
    players,  
    isLoading,navigation ,
    selectedDates, setSelectedDates
    };
};

export default useCalendar;
