 
import { useCallback, useEffect, useState } from 'react';
import {   useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Getplayer } from '../../../../redux/Api/AuthApi';
 const useMyTeam = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
    const [MyTeam, setMyTeam] = useState<any>([]);
    const getLogin = useSelector((state: any) => state?.feature);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPlayers, setFilteredPlayers] = useState<any>([]);

    useEffect(()=>{
      GetplayerApi()
    },[])
    
    useEffect(() => {
      if (MyTeam?.userGetData) {
        const filtered = MyTeam.userGetData.filter((player: any) =>
          player.user_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPlayers(filtered);
      }
    }, [searchQuery, MyTeam]);
    
   const GetplayerApi = async () => {
    try {
      const state = await Getplayer(isLogin?.userData?.id,setisLoading);
      if (state) {
         setMyTeam(state);
      }
    } catch (error) {
    }
  };
  
  return {
    MyTeam, setMyTeam,
    isLoading,setisLoading,
    navigation ,
    isLogin,
    getLogin,
    searchQuery, setSearchQuery,
    filteredPlayers,
   };

};

export default useMyTeam;
