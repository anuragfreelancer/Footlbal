import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import ScreenNameEnum from "../../../routes/screenName.enum";
import styles from "./style";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import usePlayers from "../players/playe/usePlayers";
import { color } from "../../../constant";


const AllPlayerMessages = () => {
    useLanguage();
    const {
        isLogin,
        isLoading,
        navigation,
        searchPlaylist, setSearchPlaylist,
        filterData,
    } = usePlayers();


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBarComponent />

            <View style={styles.container}>
                <Text style={styles.header}>{localizationStrings.Messages}</Text>
                <SearchBar
                    value={searchPlaylist}
                    onSearchChange={setSearchPlaylist}
                />
                {isLoading ? <ActivityIndicator


                    size={55}
                    color={color.primary} style={{



                        marginVertical: 30
                    }} /> : (




                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filterData}
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
                                        {item?.user_name ?? "Unknown Player"}
                                    </Text>
                                    <Text style={styles.lastMessage} numberOfLines={1}>
                                        {item?.email ?? ""}
                                    </Text>
                                </View>
                                <View style={styles.timeContainer}>
                                    <Image
                                        source={imageIndex.bubbleChat}
                                        style={{ width: 20, height: 20, tintColor: 'rgba(160, 216, 3, 1)' }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}



            </View>
        </SafeAreaView>
    );
};



export default AllPlayerMessages;
