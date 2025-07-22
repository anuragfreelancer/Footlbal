import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GetProfile } from '../../../redux/Api/AuthApi';
import { GetAllChatMessage } from '../../../redux/Api/AuthApi';

const useHome = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const [imgloading, setImgloading] = useState(true);
  const getLogin = useSelector((state: any) => state?.feature);
  const [chatMess, setChatMess] = useState<any[]>([]);

  useEffect(() => {
    GetProfile(isLogin?.userData?.id, dispatch);
    GetAbout();
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
  return {
    isLoading,
    navigation,
    getLogin ,
    imgloading ,
    setImgloading ,
    chatMess
  };
};

export default useHome;
