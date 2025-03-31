import { useEffect, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import { GetaboutusePolicyApi } from '../../../../redux/Api/AuthApi';
 const useAboutFootb = () => {
   const [isLoading,setisLoading] = useState()
   const navigation = useNavigation();
  const [AboutData, setAboutData] = useState<any>([]);
  
  const GetAbout = async () => {
    try {
        const state = await GetaboutusePolicyApi(setisLoading);
        if (state) {
              setAboutData(state?.result);   
        }
    } catch (error) {
         setAboutData([]);  
    }
};

useEffect(() => {
  GetAbout();  // Function call
}, []);



  return {
    AboutData, setAboutData,
    isLoading,setisLoading,
    navigation
    };
};

export default useAboutFootb;
