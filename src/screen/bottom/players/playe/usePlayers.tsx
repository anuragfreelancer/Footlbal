import { useEffect, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import { GetaboutusePolicyApi } from '../../../../redux/Api/AuthApi';
 const usePlayers = () => {
   const [isLoading,setisLoading] = useState(false)
   const navigation = useNavigation();
  const [allPlay, setAllPlay] = useState<any>([]);
  
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

 



  return {
    allPlay, setAllPlay,
    isLoading,setisLoading,
    navigation
    };
};

export default usePlayers;
