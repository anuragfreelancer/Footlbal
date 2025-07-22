 
import { useCallback, useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Getplayer } from '../../../../redux/Api/AuthApi';
 const useEndSectionScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
    const [allPlay, setAllPlay] = useState<any>([]);
    const [searchPlaylist, setSearchPlaylist] = useState<string>("");
    const [filterData, setFilterData] = useState<any>("");
    useFocusEffect(
      useCallback(() => {
        GetplayerApi();
      }, [])
    );
    
   const GetplayerApi = async () => {
    try {
      const state = await Getplayer(isLogin?.userData?.id,setisLoading);
      if (state) {
         setAllPlay(state?.userGetData);
         setFilterData(state?.userGetData)

      }
    } catch (error) {
    }
  };
  useEffect(() => {
    if (searchPlaylist?.trim() === '') {
      setFilterData(allPlay);
    } else {
      const filtered = allPlay?.filter((msg:any) =>
        msg?.user_name?.toLowerCase()?.includes(searchPlaylist?.toLowerCase())
      );
      setFilterData(filtered);
    }
  }, [searchPlaylist, allPlay]);
  
  
  return {
    allPlay, setAllPlay,
    isLoading,setisLoading,
    navigation ,
    isLogin ,
    searchPlaylist, setSearchPlaylist ,
    filterData, setFilterData
  };
};

export default useEndSectionScreen;
