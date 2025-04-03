import React from "react";
import { View, Text,FlatList, Image, TouchableOpacity,SafeAreaView } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
 import ScreenNameEnum from "../../../routes/screenName.enum";
import styles from "./style";
import useMessageList from "./useMessageList";
import EmptyListComponent from "../../../compoent/EmptyListComponent";

 
const Messages = () => {
         const {
            chatMess, setchatMess,
            isLoading,
            navigation ,    
        }= useMessageList()
     
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white"
        }}>
            <StatusBarComponent/>
            <View style={{
                marginTop: 15,
                marginHorizontal: 12
            }}>
                <CustomHeader imageSource={imageIndex.backNavs} label="Message" />

            </View>
            <View style={styles.container}>
            <SearchBar/>
                <FlatList
                showsVerticalScrollIndicator={false}
                    data={[]}
                    ListEmptyComponent={<EmptyListComponent message="No chat history found" />}  
                    keyExtractor={(item:any) => item.id}
                    renderItem={({ item }:any) => (
                        <TouchableOpacity style={styles.messageContainer} 
                        onPress={()=>
                            navigation.navigate(ScreenNameEnum.ChatScreen)
                        }
                        >
                            <Image source={item.image} style={styles.profileImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.message}>{item.message}</Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.time}>{item.time}</Text>
                                {item.unread && <View style={styles.unreadBadge} >
                                    <Text style={{ color: "white", fontSize: 11 }}>4</Text>
                                </View>}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};



export default Messages;
