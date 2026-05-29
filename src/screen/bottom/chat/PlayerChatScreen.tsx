import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import imageIndex from "../../../assets/imageIndex";
import useChatScreen from "./useChatScreen";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import moment from "moment";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import userPlayerChatScreen from "./useChatScreen";
import usePlayerChatScreen from "./usePlayerChatScreen";

const PlayerChatScreen = () => {
    useLanguage();
    const {
        isLoading,
        navigation,
        userName,
        messageText, setMessageText,
        messages,
        sendMessage,

        isLogin,
        getLogin
    } = usePlayerChatScreen();


    const renderMessage = ({ item }: any) => {
        const isMyMessage = item.sender_id === isLogin?.userData?.id;

        return (
            <View
                style={[
                    styles.messageContainer,
                    isMyMessage ? styles.sentMessage : styles.receivedMessage,
                ]}
            >
                {!isMyMessage && (
                    <Image
                        source={
                            userName?.image && userName.image !== "https://kmmps.store/public/uploads/users/"
                                ? { uri: userName?.image }
                                : imageIndex.prfEdit
                        }
                        style={styles.profileImage}
                    />
                )}
                <View
                    style={[styles.messageBubble, isMyMessage ? styles.sentBubble : styles.receivedBubble]}>
                    <Text style={[styles.messageText, isMyMessage ? styles.sentText : styles.receivedText]}>
                        {item.chat_message}
                    </Text>

                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBarComponent />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <View style={styles.header}>
                    {userName?.image && userName?.image !== "https://kmmps.store/public/uploads/users/" ? (
                        <Image source={{ uri: userName?.image }} style={styles.userImage} />
                    ) : (
                        <Image source={imageIndex.prfEdit} style={styles.userImage} />
                    )}
                    <View>
                        <Text style={styles.userName}>{userName?.user_name}</Text>
                        <Text style={styles.userName}>{userName?.email}</Text>

                    </View>

                </View>

                <FlatList
                    style={styles.messageList}
                    contentContainerStyle={styles.messageListContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyListComponent message={localizationStrings?.Nochat} />}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
                />

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
                                <ActivityIndicator size="small" color="#A0D803" />
                            ) : (
                                <Image source={imageIndex.sendMessage} style={styles.sendIcon} />
                            )}
                        </TouchableOpacity>
                    ) : null}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    keyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    messageList: {
        flex: 1,
    },
    messageListContent: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        paddingBottom: 16,
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
        borderRadius: 8
    },
    receivedBubble: {
        backgroundColor: "#F2F7FB",
        borderRadius: 8
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
        paddingVertical: 8,
        marginHorizontal: 10,
        marginBottom: 10,
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

export default PlayerChatScreen;


