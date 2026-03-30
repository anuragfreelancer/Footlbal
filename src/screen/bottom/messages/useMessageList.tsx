 
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GetAllChatMessage, GetCoachSession } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';

const useMessageList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [chatMess, setChatMess] = useState<any[]>([]);
  const isLogin = useSelector((state: any) => state?.auth);
  const [searchData, setSearchData] = useState('');
    const [getCoach_session, setgetCoach_session] = useState([])

  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
  const GetAbout = async () => {
    const userId = isLogin?.userData?.id;
    if (!userId) {
      setChatMess([]);
      setFilteredMessages([]);
      return;
    }
    try {
      setIsLoading(true);
      const response = await GetAllChatMessage(setIsLoading, userId);
      if (response && response?.userGetData) {
        const list = Array.isArray(response?.userGetData) ? response?.userGetData : [];
        setChatMess(list);
        setFilteredMessages(list);
      } else {
        setChatMess([]);
        setFilteredMessages([]);
      }
    } catch (error) {
      setChatMess([]);
      setFilteredMessages([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    Get_coach_session()
  },[])
  const Get_coach_session = async () => {
    try {
   
      const response = await GetCoachSession(setIsLoading, isLogin?.userData?.id);
       if (response && response?.userGetData?.length > 0) {
         setgetCoach_session(response.userGetData);
      } else {
        setgetCoach_session([]);
      }
    } catch (error) {
      console.error("Error fetching coach session:", error);
      setgetCoach_session([]);
    } finally {
     }
  };
  useEffect(() => {
    GetAbout();
  }, []);

  useEffect(() => {
    if (searchData?.trim() === '') {
      setFilteredMessages(chatMess);
    } else {
      const filtered = chatMess?.filter((msg) =>
        msg?.user_name?.toLowerCase().includes(searchData?.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchData, chatMess]);

  return {
    chatMess,
    setChatMess,
    getCoach_session,
    isLoading,
    navigation,
    filteredMessages,
    setFilteredMessages,
    searchData,
    setSearchData,
    isLogin
  };
};

export default useMessageList;
