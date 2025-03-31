import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GetProfile } from '../../../redux/Api/AuthApi';
const useHome = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const [imgloading, setImgloading] = useState(true);

  useEffect(() => {
    GetProfile(isLogin?.userData?.id, dispatch);
  }, [])
  const getLogin = useSelector((state: any) => state?.feature);
 
  return {
    isLoading,
    navigation,
    getLogin ,
    imgloading ,
    setImgloading
  };
};

export default useHome;
