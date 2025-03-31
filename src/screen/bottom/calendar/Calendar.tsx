import React  from "react";
import { View, Text,  StyleSheet,   SafeAreaView, FlatList, ScrollView } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CalendarComponent from "../../../compoent/CalendarComponent";
import CommonCard from "../../../compoent/CommonCard";
import useCalendar from "./useCalendar";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import ScreenNameEnum from "../../../routes/screenName.enum";
import LoadingModal from "../../../utils/Loader";
import styles from "./style";

const CustomCalendar = () => {
 const players = Array(1).fill({
  name: "Animes S.",
  position: "Forward",
  trainingType: "Chest",
  intensity: "Beginner",
  image:imageIndex.bagePng, // Replace with actual image URL
});

const {allPlay,  
  isLoading,
  navigation ,
  setSelectedDates} = useCalendar()
  return (
    <SafeAreaView style={styles.container}>
       {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <Text style={styles.header}>State</Text>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CalendarComponent onDateSelect={setSelectedDates} />
        </View>
        <Text style={{
          marginLeft: 15,
          fontSize: 18,
          color: "#192126",
          fontWeight: "700",
          marginTop: 15
        }}>Players Attending Session</Text>
        <FlatList
        style={{marginTop:10,   padding: 15 }}
          data={players}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent message="No players found" />} // Common Empty Component
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CommonCard
              item={item}
              onPress={() => navigation.navigate(ScreenNameEnum.PlayerDetails, {
                item: item
              })}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};



export default CustomCalendar;