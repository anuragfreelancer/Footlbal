import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
 import ScreenNameEnum from "../../../../routes/screenName.enum";
import CommonCard from '../../../../compoent/CommonCard'
import styles from "./style";
import usePlayers from "./usePlayers";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import LoadingModal from "../../../../utils/Loader";
 
const Players = () => {
  const {
    allPlay,
    isLoading,
    navigation,
    isLogin,
  } = usePlayers();
  console.log("00",allPlay?.userGetData)
    return (
    <SafeAreaView style={styles.container}>
       {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <View style={[styles.container, {
        padding: 15
      }]}>
        <Text style={styles.header}>Players</Text>
        <FlatList
          data={allPlay?.userGetData}
          style={{ marginTop: 18 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent message="No players found" />} // Common Empty Component
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }:any) => (
            console.log("ss",item),
             <CommonCard
              item={item}
              onPress={() => navigation.navigate(ScreenNameEnum.PlayerDetails, {
                item: item
              })}
            />
          )}
        />
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
