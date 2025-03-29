import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

const messages = [
    { id: "1", name: "Alex Linderson", message: "How are you today?", time: "2 min ago", image: imageIndex.foodBagImg, unread: true },
    { id: "2", name: "Team Align", message: "Don’t miss to attend the meeting.", time: "2 min ago", image: imageIndex.foodBagImg, unread: true },
    { id: "3", name: "John Abraham", message: "Hey! Can you join the meeting?", time: "2 min ago", image: imageIndex.foodBagImg, unread: false },
    { id: "4", name: "Sabila Sayma", message: "How are you today?", time: "2 min ago", image: imageIndex.foodBagImg, unread: false },
];

const Messages = () => {
        const navigation = useNavigation();
     
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
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 15 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1 },
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea",
    },
    profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    textContainer: { flex: 1 },
    name: { fontSize: 16, fontWeight: "bold" },
    message: { color: "gray" },
    timeContainer: { alignItems: "flex-end" },
    time: { fontSize: 12, color: "gray" },
    unreadBadge: { width: 21, height: 21, borderRadius: 20, backgroundColor: "red", marginTop: 4, alignItems: "center", justifyContent: "center" },
});

export default Messages;
