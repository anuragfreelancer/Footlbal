import { useEffect, useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import { PrivacyPolicyApi } from '../../../../redux/Api/AuthApi';
 const useLegalinfor = () => {
   const [isLoading,setisLoading] = useState()
   const navigation = useNavigation();
  const [privacyData, setPrivacyData] = useState([]);
  
  const GetPrivacy = async () => {
    try {
        const state = await PrivacyPolicyApi(setisLoading);
        if (state) {
          console.log("state",state)
             setPrivacyData(state?.result);   
        }
    } catch (error) {
         setPrivacyData([]);  
    }
};

useEffect(() => {
     GetPrivacy();  // Function call
}, []);



  return {
    privacyData, setPrivacyData,
    isLoading,setisLoading,
    navigation
    };
};

export default useLegalinfor;
