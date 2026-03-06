import React, { useCallback, useState } from "react";
import { View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CalendarComponent from "../../../compoent/CalendarComponent";
import CommonCard from "../../../compoent/CommonCard";
import useCalendar from "./useCalendar";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import LoadingModal from "../../../utils/Loader";
import PlanSessionModal from "../../../compoent/PlanSessionModal";
import styles from "./style";
import localizationStrings from "../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import moment from "moment";

const CustomCalendar = () => {
  useLanguage();
  const {
    isLoading,
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
  } = useCalendar();
  const [planModalVisible, setPlanModalVisible] = useState(false);

  const handleDateSelect = useCallback(
    (date: string) => {
      if (date !== selectedDates) {
        setSelectedDates(date);
      }
    },
    [selectedDates, setSelectedDates]
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <Text style={styles.header}>{localizationStrings?.State}</Text>

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
          <TouchableOpacity
            style={styles.planSessionBtn}
            onPress={() => setPlanModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.planSessionBtnText}>{localizationStrings?.PlanSession}</Text>
          </TouchableOpacity>
        )}

        {/* <Text style={styles.sectionTitle}>{localizationStrings?.Events}</Text>
        {eventsForSelectedDate.length === 0 ? (
          <EmptyListComponent message={localizationStrings?.NoEvents} />
        ) : (
          eventsForSelectedDate.map((s: any, idx: number) => {
            const type = String(s?.session_type || "TRAINING").toUpperCase();
            const dotColor = type === "MATCH" ? "#DC2626" : type === "BREAK" ? "#F59E0B" : "#2563EB";
            const timeStr = getSessionTimeStr(s);
            const formattedTime = timeStr
              ? moment(timeStr, ["HH:mm:ss", "H:mm:ss"]).format("h:mm A")
              : "—";
            return (
              <View key={s?.id ?? idx} style={styles.eventCard}>
                <View style={[styles.eventDot, { backgroundColor: dotColor }]} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventType}>{getSessionTypeLabel(s)}</Text>
                  <Text style={styles.eventTime}>{formattedTime}</Text>
                </View>
              </View>
            );
          })
        )} */}

        {isCoach && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              {localizationStrings?.PlayersAttendin}
            </Text>
            <FlatList
              style={{ marginTop: 10, padding: 15 }}
              data={filteredPlayers}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyListComponent message={localizationStrings?.noplayers} />
              }
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <CommonCard item={item} />}
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
