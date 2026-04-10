import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Get_user_by_id, Get_user_by_id2, GetCoachSession, GetProfile, UpdateCoachSessionApi } from '../../../redux/Api/AuthApi';
import { GetAllChatMessage } from '../../../redux/Api/AuthApi';
import moment from 'moment';

const useHome = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const [getCoach_session, setgetCoach_session] = useState([])
  const [getUser, setgetUser] = useState([])
  const [getUser1, setgetUser1] = useState([])
  const isLogin = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const [imgloading, setImgloading] = useState(true);
  const getLogin = useSelector((state: any) => state?.feature);
  const [chatMess, setChatMess] = useState<any[]>([]);
  const [showEndModal, setShowEndModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  useEffect(() => {
    const userId = isLogin?.userData?.id;
    GetAbout();

    if (userId) {
      GetProfile(userId, dispatch);
      GetAbout();
      Get_coach_session();
      Get_sscoach_session();
      Get_Userscoach_session1()

    }
  }, [isLogin?.userData?.id]);
  ;


  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);

  const GetAbout = async () => {
    const userId = isLogin?.userData?.id;
    if (!userId) {
      setChatMess([]);
      setFilteredMessages([]);
      return;
    }
    try {
      setisLoading(true);
      const response = await GetAllChatMessage(setisLoading, userId);
      if (response && response?.userGetData) {
        const list = Array.isArray(response.userGetData) ? response.userGetData : [];
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
      setisLoading(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      const userId = isLogin?.userData?.id;
      Get_sscoach_session();
      Get_Userscoach_session1();
      GetAbout();

      if (userId) {
        GetProfile(userId, dispatch);
        Get_coach_session();
        Get_sscoach_session();
        Get_Userscoach_session1();
      }

    }, [])
  );
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

  const Get_Userscoach_session1 = async () => {
    try {
      setisLoading(true);

      const response = await Get_user_by_id2(setisLoading, isLogin?.userData?.id);
      if (response && response?.userGetData) {
        setgetUser1(response.userGetData);
      } else {
        setgetUser1([]);
      }
    } catch (error) {
      console.error("Error fetching coach session:", error);
      setgetUser1([]);
    } finally {
      setisLoading(false);
    }
  };
  const handleEndSession = async () => {
    if (!selectedSession) return;
    try {
      setisLoading(true);
      const params = {
        id: selectedSession.id,
        session_end_date: moment().format('YYYY-MM-DD'),
        session_end_time: moment().format('HH:mm'),
      };
      const response = await UpdateCoachSessionApi(params, setisLoading);
      if (response && response.status == '1') {
        setShowEndModal(false);
        Get_coach_session(); // Refresh
        Get_sscoach_session();
        Get_Userscoach_session1();
      }
    } catch (error) {
      console.error("Error ending session:", error);
    } finally {
      setisLoading(false);
    }
  };

  return {
    isLoading,
    navigation,
    getLogin,
    imgloading,
    setImgloading,
    chatMess,
    getCoach_session,
    getUser,
    isLogin,
    filteredMessages,
    getUser1,
    showEndModal,
    setShowEndModal,
    selectedSession,
    setSelectedSession,
    handleEndSession
  };
};

export default useHome;
