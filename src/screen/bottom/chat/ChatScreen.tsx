import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import useChatScreen from "./useChatScreen";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
 import moment from "moment";
import { ActivityIndicator } from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";

const ChatScreen = () => {
    useLanguage();
    const {
        isLoading,
        navigation,
        userName,
        messageText, setMessageText,
        messages,
        sendMessage,
        isLogin
    } = useChatScreen();
    const currentUserId = userName?.id; // Change this to logged-in user ID


     const renderMessage = ({ item }: any) => {
        const isCurrentUser = item.sender_id === currentUserId;
        return (
            <View
                style={[
                    styles.messageContainer,
                    !isCurrentUser ? styles.sentMessage : styles.receivedMessage,
                ]}
            >
                {isCurrentUser && (
                    <Image source={{ uri: userName?.image }} style={styles.profileImage} />
                )}
                <View
                    style={[styles.messageBubble, !isCurrentUser ? styles.sentBubble : styles.receivedBubble]}>
                    <Text style={[styles.messageText, !isCurrentUser ? styles.sentText : styles.receivedText]}>
                        {item.chat_message}
                    </Text>
                    <Text style={[styles.timeText, {
                        color: "black"
                    }]}> {item?.date
                        ? moment(item?.date).isBefore(moment().subtract(24, 'hours'))
                            ? moment(item?.date).format("MMMM Do YYYY")
                            : moment(item?.date).fromNow()
                        : "N/A"}</Text>
                </View>
            </View>
        )
    }

    return (
<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <StatusBarComponent />
    
    {/* KeyboardAvoidingView handles keyboard automatically */}
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined} // 'padding' works well for iOS
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0} // Adjust offset depending on your header height
    >
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={imageIndex.backorange} style={styles.backIcon} />
                </TouchableOpacity>
                <Image source={{ uri: userName?.image }} style={styles.userImage} />
                <View>
                    <Text style={styles.userName}>{userName?.user_name}</Text>
                </View>
            </View>

            {/* Messages */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyListComponent message={localizationStrings.Nochat} />}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id.toString()}
                />
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    placeholder={localizationStrings?.Write}
                    value={messageText}
                    onChangeText={setMessageText}
                />
                {messageText ? (
                    <TouchableOpacity onPress={sendMessage}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <Image source={imageIndex.sendMessage} style={styles.sendIcon} />
                        )}
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    </KeyboardAvoidingView>
</SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
     },
    backIcon: {
        height: 30,
        width: 30,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginTop: 15
    },
    profileImage: {
        height: 33,
        width: 33,
        borderRadius: 16.5,
        marginRight: 10,
    },
    messageBubble: {
        padding: 8,
        borderRadius: 11,
        maxWidth: "75%",
    },
    sentMessage: {
        alignSelf: "flex-end",
    },
    receivedMessage: {
        alignSelf: "flex-start",
    },
    sentBubble: {
        backgroundColor: "#A0D803",
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    receivedBubble: {
        backgroundColor: "#F2F7FB",
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    messageText: {
        fontSize: 14,
    },
    sentText: {
        color: "#fff",
    },
    receivedText: {
        color: "#000",
    },
    timeText: {
        fontSize: 10,
        color: "gray",
        alignSelf: "flex-end",
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F6F6",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        width: "100%",
    },
    input: {
        flex: 1,
        padding: 10,
        color: "black",
    },
    sendIcon: {
        height: 24,
        width: 24,
        tintColor: "#A0D803",
    },
    micIcon: {
        height: 24,
        width: 24,
        marginLeft: 10,
    },
});

export default ChatScreen;


