 
import { useCallback, useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import {  GetSubmitRPF } from '../../../redux/Api/AuthApi';
  const useReports = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
    const [rpfData, setRpfData] = useState<any>([]);
    const route = useRoute() as any;
    const playerUserId = route?.params?.playerUserId;
    const playerName = route?.params?.playerName;

    useFocusEffect(
      useCallback(() => {
        GetplayerApi();
      }, [playerUserId])
    );
    
   const GetplayerApi = async () => {
    try {
      // Use playerUserId if provided (coach view), otherwise use the current user's ID
      const targetUserId = playerUserId || isLogin?.userData?.id;
      const state = await GetSubmitRPF(targetUserId, setisLoading);
      if (state) {
        setRpfData(state);
      }
    } catch (error) {
    }
  };
 
  
  return {
    rpfData, setRpfData,
    isLoading,setisLoading,
    navigation,
    isLogin,
    playerName,
    playerUserId
  };
};

export default useReports;
