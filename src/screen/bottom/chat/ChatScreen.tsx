import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import { useNavigation } from "@react-navigation/native";

const messagesData = [
    { id: "1", text: "Hello! Jhon Abraham", time: "09:25 AM", sentByUser: true },
    { id: "2", text: "Hello ! Nezar! How are you?", time: "09:26 AM", sentByUser: false },
    { id: "3", text: "You did your job well!", time: "09:26 AM", sentByUser: true },
    { id: "4", text: "Have a great working week!!\nHope you like it", time: "09:26 AM", sentByUser: false },
];

const ChatScreen = () => {
    const [messages, setMessages] = useState(messagesData);
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        if (messageText.trim().length === 0) return;
        const newMessage = {
            id: Math.random().toString(),
            text: messageText,
            time: "09:27 AM",
            sentByUser: true,
        };
        setMessages([...messages, newMessage]);
        setMessageText("");
    };

    const renderMessage = ({ item }) => (
        <View>
            <View
                style={{
                    alignSelf: item.sentByUser ? "flex-end" : "flex-start",
                    backgroundColor: item.sentByUser ? "#A0D803" : "#F2F7FB",
                    padding: 10,
                    marginVertical: 5,
                    maxWidth: "75%",
                    borderBottomLeftRadius: item.sentByUser ? 20 : 11,  // Adjust this value as needed
                    borderTopRightRadius: item.sentByUser ? 20 : 11, // Adjust this value as needed
                }}
            >
                <Text style={{ color: item.sentByUser ? "#fff" : "#000" }}>{item.text}</Text>
                <Text style={{ fontSize: 10, color: item.sentByUser ? "#fff" : "gray", alignSelf: "flex-end" }}>{item.time}</Text>
            </View>
        </View>
    );
const naviagtion = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <TouchableOpacity onPress={()=>naviagtion.goBack()}>
                    <Image source={imageIndex.backorange} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <Image
                    source={imageIndex.foodBagImg}
                    style={{ width: 40, height: 40, borderRadius: 20, marginHorizontal: 20 }}
                />
                <View>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Jhon Abraham</Text>
                    <Text style={{ fontSize: 12, fontWeight: "400", color: "#797C7B" }}>Active now</Text>

                </View>
            </View>
            <FlatList data={messages} renderItem={renderMessage} keyExtractor={(item) => item.id} />
            {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, paddingTop: 5 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadius: 20, padding: 10, marginRight: 10 }}
          placeholder="Write your message"
          value={messageText}
          onChangeText={setMessageText}
        />
        
      </View> */}

            <View style={{ flexDirection: "row", alignItems: "center", }}>

                <TouchableOpacity>
                    <Image source={imageIndex.attage} style={{ height: 24, width: 24, marginRight: 5 }} />
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#F3F6F6",
                        borderRadius: 12,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                        width: "68%"
                    }}
                >
                    <TextInput
                        style={{ flex: 1, padding: 10 ,color:"black"}}
                        placeholderTextColor={"black"}
                        placeholder="Write your message"
                        value={messageText}
                        onChangeText={setMessageText}
                    />
                    <Image source={imageIndex.copy} 
                    resizeMode="contain"
                    style={{ height: 22, width: 22,  }} />

                </View>

                <TouchableOpacity>
                    <Image source={imageIndex.camera} style={{ height: 24, width: 24, marginRight: 5 }} />
                </TouchableOpacity>



                {/* Send Button */}
                <TouchableOpacity>
                    <Image source={imageIndex.microphone} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default ChatScreen;
