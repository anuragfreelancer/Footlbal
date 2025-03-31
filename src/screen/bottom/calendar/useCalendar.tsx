import { useEffect, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import { GetaboutusePolicyApi } from '../../../redux/Api/AuthApi';
  const useCalendar = () => {
   const [isLoading,setisLoading] = useState(false)
   const navigation = useNavigation();
  const [allPlay, setAllPlay] = useState<any>([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const GetAbout = async () => {
    try {
        const state = await GetaboutusePolicyApi(setisLoading);
        if (state) {
          setAllPlay(state?.result);   
        }
    } catch (error) {
      setAllPlay([]);  
    }
};

useEffect(() => {
  GetAbout();  // Function call
}, []);



  return {
    allPlay, setAllPlay,
    isLoading,
    navigation ,
    selectedDates, setSelectedDates
    };
};

export default useCalendar;
