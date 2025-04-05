 
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GetAllChatMessage } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';

const useMessageList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [chatMess, setChatMess] = useState<any[]>([]);
  const isLogin = useSelector((state: any) => state?.auth);
  const [searchData, setSearchData] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
  const GetAbout = async () => {
    try {
      setIsLoading(true);
      const response = await GetAllChatMessage(setIsLoading, isLogin?.userData?.id);
      if (response && response?.userGetData?.length > 0) {
        setChatMess(response?.userGetData);
        setFilteredMessages(response?.userGetData);
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
    isLoading,
    navigation,
    filteredMessages,
    setFilteredMessages,
    searchData,
    setSearchData,
  };
};

export default useMessageList;
