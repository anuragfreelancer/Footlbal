import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {   GetChat, SendMessage } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';
const useChatScreen = () => {
  const routes: any = useRoute();
  const { item } = routes.params || ""
  const navigation = useNavigation();
  const [isLoading, setisLoading]   = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const isLogin = useSelector((state: any) => state?.auth);
   let userName = item  ;
 
   const sendMessage = async () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;
    const param = {
        senderId: isLogin?.userData?.id,   
      receiverId:item?.id,
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
       const response = await SendMessage(param,setisLoading);
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
     
        senderId: item.id,   
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
    messageText, setMessageText ,
    messages, setMessages ,
    sendMessage ,
    isLogin 
  };
};

export default useChatScreen;
