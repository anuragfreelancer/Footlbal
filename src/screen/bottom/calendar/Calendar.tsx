// import React, { useCallback } from "react";
// import { View, Text, SafeAreaView, FlatList, ScrollView } from "react-native";
// import StatusBarComponent from "../../../compoent/StatusBarCompoent";
// import CalendarComponent from "../../../compoent/CalendarComponent";
// import CommonCard from "../../../compoent/CommonCard";
// import useCalendar from "./useCalendar";
// import EmptyListComponent from "../../../compoent/EmptyListComponent";
//  import LoadingModal from "../../../utils/Loader";
// import styles from "./style";

// const CustomCalendar = () => {

//   const { players,
//     isLoading, navigation,
//     selectedDates, setSelectedDates } = useCalendar();
    

//     const handleDateSelect = useCallback((date) => {
//       console.log("-----date",date)
//       if (date !== selectedDates) {  // Prevent unnecessary updates
//         setSelectedDates(date);
//       }
//     }, [selectedDates, setSelectedDates]);
    

 
 
//      function formatDate(dateStr) {
//         return dateStr.split(" ")[0]; // Extract YYYY-MM-DD
//     }
    
 
    
    
//   return (
//     <SafeAreaView style={styles.container}>
//       {isLoading ? <LoadingModal /> : null}
//       <StatusBarComponent />
//       <Text style={styles.header}>State</Text>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <CalendarComponent onDateSelect={handleDateSelect} />        </View>
//         <Text style={{
//           marginLeft: 15,
//           fontSize: 18,
//           color: "#192126",
//           fontWeight: "700",
//           marginTop: 15
//         }}>Players Attending Session</Text>
//         <FlatList
//           style={{ marginTop: 10, padding: 15 }}
//           data={players?.userGetData}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={<EmptyListComponent message="No Players Found" />}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item }) => (
//             console.log("item", item),
//             <CommonCard
//               item={item}
//             // onPress={() => navigation.navigate(ScreenNameEnum.PlayerDetails, {
//             //   item: item
//             // })}
//             />
//           )}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };



// export default CustomCalendar;

import React, { useCallback, useMemo } from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView } from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CalendarComponent from "../../../compoent/CalendarComponent";
import CommonCard from "../../../compoent/CommonCard";
import useCalendar from "./useCalendar";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import LoadingModal from "../../../utils/Loader";
import styles from "./style";

const CustomCalendar = () => {
  const { players, isLoading, selectedDates, setSelectedDates } = useCalendar();

  const handleDateSelect = useCallback((date:any) => {
    console.log("-----date", date);
    if (date !== selectedDates) {
      setSelectedDates(date);
    }
  }, [selectedDates, setSelectedDates]);

   function formatDate(dateStr:any) {
      return dateStr.split(" ")[0]; 
  }
  const filteredPlayers = useMemo(() => {
    return (
      players?.userGetData?.filter((player: any) => {
         return formatDate(player.date_time) === selectedDates;
      }) || []
    );
  }, [players, selectedDates]);
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <Text style={styles.header}>State</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CalendarComponent onDateSelect={handleDateSelect} />
        </View>
        <Text style={{
          marginLeft: 15,
          fontSize: 18,
          color: "#192126",
          fontWeight: "700",
          marginTop: 15
        }}>
          Players Attending Session
        </Text>
        <FlatList
          style={{ marginTop: 10, padding: 15 }}
          data={filteredPlayers}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent message="No Players Found" />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CommonCard item={item} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomCalendar;
