import { useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { logout } from '../../../../redux/feature/authSlice';
import { successToast } from '../../../../utils/customToast';
  
 const useProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false)
    const getLogin = useSelector((state: any) => state?.feature);
    const isLogin = useSelector((state: any) => state?.auth);

    const handleLogout = () => {
      dispatch(logout());
      setModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNameEnum.SPLASH_SCREEN }],
      });
      successToast('Successful');
    };
  return {
    modal, setModal ,
    handleLogout,navigation ,
    getLogin ,
    isLogin
  };
};

export default useProfileScreen;
