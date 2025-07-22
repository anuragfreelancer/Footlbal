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


const Messages = () => {
    const {
         isLoading,
        navigation,
        filteredMessages,
        searchData,
        setSearchData,
    } = useMessageList()


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white"
        }}>      {isLoading ? <LoadingModal /> : null}

            <StatusBarComponent />
            <View style={{
                marginTop: 15,
                marginHorizontal: 12
            }}>
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
                    ListEmptyComponent={<EmptyListComponent message="No chat history found" />}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: any) => (
                        <TouchableOpacity style={styles.messageContainer}
                            onPress={() =>
                                navigation.navigate(ScreenNameEnum.ChatScreen, {
                                    item: item
                                })
                            }
                        >
                            <Image source={{
                                uri: item.image
                            }}
                                style={styles.profileImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.user_name}</Text>
                                <Text style={{
                                    color: "#797C7B",
                                    fontSize: 12,
                                    lineHeight: 12,
                                }}>{item?.last_message}</Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.time}>  {item?.updated_at
                                    ? moment(item.updated_at).isBefore(moment().subtract(24, 'hours'))
                                        ? moment(item.updated_at).format("MMMM Do YYYY")
                                        : moment(item.updated_at).fromNow()
                                    : "N/A"} </Text>
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
