import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import ScreenNameEnum from "../../../../routes/screenName.enum";
 import styles from "./style";
import usePlayers from "./usePlayers";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
 import SearchBar from "../../../../compoent/SearchBar";

const Players = () => {
  const {
    allPlay, setAllPlay,
    isLoading, setisLoading,
    navigation,
    isLogin,
    searchPlaylist, setSearchPlaylist,
    filterData, setFilterData
  } = usePlayers();



  const CommonCard = React.memo(({ item, onPress }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: item?.image }} style={styles.avatar} />
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.user_name}</Text>
            <Text style={styles.position}>Forward</Text>
          </View>
          
          <View style={styles.detailContainer}>
           <View>
          <Text>Start</Text>
           </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
  return (
    <SafeAreaView style={styles.container}>

      <StatusBarComponent />
      <View style={[styles.container, {
        padding: 15
      }]}>
        <Text style={styles.header}>Players</Text>

        <SearchBar
          value={searchPlaylist}
          onSearchChange={setSearchPlaylist}
        />
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>) : (
          <FlatList
            data={filterData}
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message="No players found" />} // Common Empty Component
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }: any) => (
              <CommonCard
                item={item}
                onPress={() => navigation.navigate(ScreenNameEnum.PlayerDetails, {
                  item: item
                })}
              />
            )}
          />
        )}

        <TouchableOpacity style={styles.fab}
          onPress={() => {
            navigation.navigate(ScreenNameEnum.AddPlayer)
          }}
        >
          <Image source={imageIndex.floter}
            style={{ height: 74, width: 74 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default Players;
