 

import React, { useCallback, useMemo } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CalendarComponent from "../../../compoent/CalendarComponent";
import CommonCard from "../../../compoent/CommonCard";
import useCalendar from "./useCalendar";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import LoadingModal from "../../../utils/Loader";
import styles from "./style";
import localizationStrings from "../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";

const CustomCalendar = () => {
  useLanguage();
  const { players, isLoading, selectedDates, setSelectedDates } = useCalendar();

  const handleDateSelect = useCallback((date:any) => {
     if (date !== selectedDates) {
      setSelectedDates(date);
    }
  }, [selectedDates, setSelectedDates]);

   function formatDate(dateStr:any) {
      return dateStr?.split(" ")[0]; 
  }
  const filteredPlayers = useMemo(() => {
    return (
      players?.userGetData?.filter((player: any) => {
         return formatDate(player?.created_at) === selectedDates;
      }) || []
    );
  }, [players, selectedDates]);

   
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <Text style={styles.header}>{localizationStrings?.State}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"  , marginHorizontal:15}}>
          <CalendarComponent onDateSelect={handleDateSelect} />
        </View>
        <Text style={{
          marginLeft: 15,
          fontSize: 18,
          color: "#192126",
          fontWeight: "700",
          marginTop: 15
        }}>
 {localizationStrings?.PlayersAttendin}
        </Text>
        <FlatList
          style={{ marginTop: 10, padding: 15 }}
          data={filteredPlayers}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />}
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
