import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Get_user_by_id, GetCoachSession, GetProfile } from '../../../redux/Api/AuthApi';
import { GetAllChatMessage } from '../../../redux/Api/AuthApi';

const useHome = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const [getCoach_session, setgetCoach_session] = useState([])
  const [getUser, setgetUser] = useState([])
  const isLogin = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const [imgloading, setImgloading] = useState(true);
  const getLogin = useSelector((state: any) => state?.feature);
  const [chatMess, setChatMess] = useState<any[]>([]);
   useEffect(() => {
    GetProfile(isLogin?.userData?.id, dispatch);
    // GetAbout();
    Get_coach_session();
    Get_sscoach_session()
  }, [])
  const GetAbout = async () => {
    try {
      setisLoading(true);
      const response = await  GetAllChatMessage(setisLoading, isLogin?.userData?.id);
      if (response && response?.userGetData?.length > 0) {
        setChatMess(response?.userGetData);
       } else {
        setChatMess([]);
       }
    } catch (error) {
      setChatMess([]);
     } finally {
      setisLoading(false);
    }
  };
  const Get_coach_session = async () => {
    try {
      setisLoading(true);
  
      const response = await GetCoachSession(setisLoading, isLogin?.userData?.id);
       if (response && response?.userGetData?.length > 0) {
        setgetCoach_session(response.userGetData);
      } else {
        setgetCoach_session([]);
      }
    } catch (error) {
      console.error("Error fetching coach session:", error);
      setgetCoach_session([]);
    } finally {
      setisLoading(false);
    }
  };
  const Get_sscoach_session = async () => {
    try {
      setisLoading(true);
  
      const response = await Get_user_by_id(setisLoading, isLogin?.userData?.id);
      console.log("ddd",response)
       if (response && response?.userGetData) {
        setgetUser(response.userGetData);
      } else {
        setgetUser([]);
      }
    } catch (error) {
      console.error("Error fetching coach session:", error);
      setgetUser([]);
    } finally {
      setisLoading(false);
    }
  };
  
  return {
    isLoading,
    navigation,
    getLogin ,
    imgloading ,
    setImgloading ,
    chatMess ,
    getCoach_session ,
    getUser
  };
};

export default useHome;
