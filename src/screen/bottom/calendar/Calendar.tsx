import React, { useCallback, useState } from "react";
import { View, Text, FlatList, ScrollView, TouchableOpacity, Alert } from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CalendarComponent from "../../../compoent/CalendarComponent";
import CommonCard from "../../../compoent/CommonCard";
import useCalendar from "./useCalendar";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import LoadingModal from "../../../utils/Loader";
import PlanSessionModal from "../../../compoent/PlanSessionModal";
import { StartSection } from "../../../redux/Api/AuthApi";
import styles from "./style";
import localizationStrings from "../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import moment from "moment";
import ScreenNameEnum from "../../../routes/screenName.enum";

const CustomCalendar = () => {
  useLanguage();
  const {
    isLoading,
    sessions,
    selectedDates,
    setSelectedDates,
    markedDates,
    filteredPlayers,
    eventsForSelectedDate,
    getSessionTimeStr,
    getSessionTypeLabel,
    fetchData,
    players,
    navigation,
    isCoach,
    isLogin,
    NewfilterData,
  } = useCalendar();
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [startSectionModalVisible, setStartSectionModalVisible] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const handleStartSectionAPI = async ({
    date,
    time,
    type,
    questionnaire,
    questionnaire1,
  }: {
    date: Date;
    time: Date;
    type: string;
    questionnaire: number[];
    questionnaire1: number[];

  }) => {
    if (!(time instanceof Date) || !(date instanceof Date)) {
      Alert.alert(localizationStrings.InvalidInput, localizationStrings.date);
      return;
    }
    const playerList = players?.userGetData ?? [];
    if (playerList.length === 0) {
      Alert.alert(
        localizationStrings.InvalidInput || "",
        localizationStrings?.noplayers || "No players available"
      );
      return;
    }
    try {
      setSessionLoading(true);
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = time.toTimeString().split(" ")[0];
      const ids = playerList.map((p: any) => Number(p.id));
      const params = {
        players: ids,
        date: formattedDate,
        time: formattedTime,
        coach_id: isLogin?.userData?.id,
        session_type: type,
        question_id: questionnaire1.join(","),
        training_id: questionnaire.join(","),
        navigation,
      };
      const response = await StartSection(params, setSessionLoading);
      if (response?.status === "1") {
        setStartSectionModalVisible(false);
        fetchData();
      }
    } catch (error) {
      Alert.alert(
        localizationStrings.InvalidInput || "Error",
        localizationStrings.SomethingWentWrong
      );
    } finally {
      setSessionLoading(false);
    }
  };

  const handleDateSelect = useCallback(
    (date: string) => {
      if (date !== selectedDates) {
        setSelectedDates(date);
      }
    },
    [selectedDates, setSelectedDates]
  );

  console.log("filteredPlayers -- ", filteredPlayers)

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <Text style={styles.header}>{localizationStrings?.Schedule}</Text>

      {/* Legend: Blue = Training, Red = Match, Orange = Break */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#2563EB" }]} />
          <Text style={styles.legendText}>{localizationStrings?.SessionTraining}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#DC2626" }]} />
          <Text style={styles.legendText}>{localizationStrings?.SessionMatch}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#F59E0B" }]} />
          <Text style={styles.legendText}>{localizationStrings?.SessionBreak}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 15 }}>
          <CalendarComponent
            onDateSelect={handleDateSelect}
            markedDates={markedDates}
          />
        </View>


        {isCoach && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              {localizationStrings?.PlayersAttendin}
            </Text>
            <FlatList
              style={{ marginTop: 10, padding: 15 }}
              // data={players?.userGetData}
              data={filteredPlayers}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                isCoach ? (
                  <TouchableOpacity
                    style={styles.emptyStateCard}
                    onPress={() => {
                      navigation.navigate(ScreenNameEnum.Players)
                    }}
                    // onPress={() => setStartSectionModalVisible(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.emptyStateText}>{localizationStrings?.noplayers}</Text>
                    <Text style={styles.startSessionHint}>{localizationStrings?.StartSection}</Text>
                  </TouchableOpacity>
                ) : (
                  <EmptyListComponent message={localizationStrings?.noplayers} />
                )
              }
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <CommonCard item={item} sessionType={item?.sessionType} />}
            />
          </>
        )}

        {isCoach && (
          <PlanSessionModal
            visible={planModalVisible}
            onClose={() => setPlanModalVisible(false)}
            onSuccess={fetchData}
            selectedDate={selectedDates}
            players={players?.userGetData ?? []}
            navigation={navigation}
          />
        )}


      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomCalendar;
