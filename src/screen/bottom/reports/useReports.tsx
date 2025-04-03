 
import { useCallback, useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {  GetSubmitRPF } from '../../../redux/Api/AuthApi';
  const useReports = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
    const [rpfData, setRpfData] = useState<any>([]);
    useFocusEffect(
      useCallback(() => {
        GetplayerApi();
      }, [])
    );
    
   const GetplayerApi = async () => {
    try {
      const state = await GetSubmitRPF(isLogin?.userData?.id,setisLoading);
      if (state) {
        setRpfData(state);

      }
    } catch (error) {
    }
  };
 
  
  return {
    rpfData, setRpfData,
    isLoading,setisLoading,
    navigation ,
    isLogin
  };
};

export default useReports;
