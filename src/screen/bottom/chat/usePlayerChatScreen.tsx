import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GetChat, GetchatPlayer, GetProfile, SendMessage } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';
const usePlayerChatScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const isLogin = useSelector((state: any) => state?.auth);
  const getLogin = useSelector((state: any) => state?.feature);

  const [userName, setUserName] = useState<any>(null);

  useEffect(() => {
    const fetchCoachProfile = async () => {
      if (getLogin?.userGetData?.coach_id) {
        const data = await GetchatPlayer(getLogin?.userGetData?.coach_id);
        if (data && data.result) {
          setUserName(data.result);
        }
      }
    };
    fetchCoachProfile();
  }, [getLogin?.userGetData?.coach_id]);
  const sendMessage = async () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;
    const param = {
      senderId: isLogin?.userData?.id,
      receiverId: getLogin?.userGetData?.coach_id,
      chatMessage: messageText,
    };
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        text: trimmedMessage,
        time: "Now",
        sentByUser: true,
      },
    ]);
    try {
      const response = await SendMessage(param, setisLoading);
      setMessageText(""),
        GetAbout();
    } catch (error) {
      console.error("Message send failed:", error);
    } finally {
    }
  };


  const GetAbout = async () => {
    try {
      const param = {

        senderId: getLogin?.userGetData?.coach_id,
        receiverId: isLogin?.userData?.id,
      };
      const state = await GetChat(param);  // navigation object pass karein
      if (state) {
        setMessages(state?.result)
      } else {
      }
    } catch (error) {
    }
  };


  useEffect(() => {
    GetAbout();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      GetAbout();
    }, 5000);

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);


  return {

    isLoading,
    navigation,
    userName,
    messageText, setMessageText,
    messages, setMessages,
    sendMessage,
    isLogin,
    getLogin
  };
};

export default usePlayerChatScreen;
