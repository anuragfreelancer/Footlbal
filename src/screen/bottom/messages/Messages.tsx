import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import ScreenNameEnum from "../../../routes/screenName.enum";
import styles from "./style";
import useMessageList from "./useMessageList";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import moment from "moment";
import LoadingModal from "../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";


const Messages = () => {
    useLanguage();
    const {
        isLoading,
        navigation,
        filteredMessages,
        searchData,
        setSearchData,
    } = useMessageList()


    return (
        <SafeAreaView style={styles.safeArea}>
            <LoadingModal visible={isLoading} />
            <StatusBarComponent />
            <View style={styles.headerWrap}>
                <CustomHeader imageSource={imageIndex.backNavs} label="Message" />
            </View>
            <View style={styles.container}>
                <SearchBar
                    value={searchData}
                    onSearchChange={setSearchData}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredMessages}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<EmptyListComponent message={localizationStrings?.Nochat} />}
                    keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
                    renderItem={({ item }: any) => (
                        <TouchableOpacity
                            style={styles.messageContainer}
                            onPress={() =>
                                navigation.navigate(ScreenNameEnum.ChatScreen, { item })
                            }
                            activeOpacity={0.7}
                        >
                            <Image
                                source={
                                    item?.image && item.image !== "https://kmmps.store/public/uploads/users/"
                                        ? { uri: item.image }
                                        : imageIndex.prfEdit
                                }
                                style={styles.profileImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.name} numberOfLines={1}>
                                    {item?.user_name ?? "aaa"}
                                    {item?.email ?? ""}
                                </Text>
                                <Text style={styles.lastMessage} numberOfLines={1}>
                                    {item?.last_message ?? ""}
                                </Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.time}>
                                    {item?.updated_at
                                        ? moment(item.updated_at).isBefore(moment().subtract(24, "hours"))
                                            ? moment(item.updated_at).format("MMM D, YYYY")
                                            : moment(item.updated_at).fromNow()
                                        : ""}
                                </Text>
                                {(item?.unread_count > 0 || item?.unread) && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadBadgeText}>
                                            {item?.unread_count > 0 ? item.unread_count : ""}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};



export default Messages;
