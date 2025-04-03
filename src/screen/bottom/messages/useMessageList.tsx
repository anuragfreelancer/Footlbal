import { useEffect, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import { GetaboutusePolicyApi } from '../../../redux/Api/AuthApi';
  const useMessageList = () => {
   const [isLoading,setisLoading] = useState(false)
   const navigation = useNavigation();
  const [chatMess, setchatMess] = useState<any>([]);
 
  const GetAbout = async () => {
    try {
        const state = await GetaboutusePolicyApi(setisLoading);
        if (state) {
          setchatMess(state?.result);   
        }
    } catch (error) {
      setchatMess([]);  
    }
};

useEffect(() => {
  GetAbout();  // Function call
}, []);



  return {
    chatMess, setchatMess,
    isLoading,
    navigation ,
     };
};

export default useMessageList;
