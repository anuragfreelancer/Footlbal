import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import useReports from "./useReports";
import LoadingModal from "../../../utils/Loader";
import imageIndex from "../../../assets/imageIndex";
import localizationStrings from "../../../compoent/Localization/Localization";
import ChartComponent from "../../../compoent/ChartComponent";
import useHome from "../home/useHome";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import useChatScreen from "../chat/useChatScreen";
import useMessageList from "../messages/useMessageList";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import ScreenNameEnum from "../../../routes/screenName.enum";


const Reports = () => {


  const {
    rpfData,
    isLoading,
    navigation,
    isLogin,
    playerName
  } = useReports();
  useLanguage();

  const {

    filteredMessages,
    searchData,
    setSearchData,
  } = useMessageList()


  const RecentSessionCard = ({ item, onPress }: { item: any, onPress?: () => void }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.row} onPress={onPress}>
          <View>
            <Text style={styles.boldText}>{localizationStrings.DateLabel || "Date"} - {item?.rpf_date}</Text>
            <Text style={styles.lightText}>{item.rpf_session}</Text>
          </View>
          <View style={styles.scoreSection}>

            {item.rate_efforts > 6 ? <Image source={imageIndex.redGrap}
              style={{
                height: 28,
                width: 28
              }}
            /> : <Image source={imageIndex.greenGrap}

              style={{
                height: 28,
                width: 28
              }}
            />}
            <Text style={styles.boldText}>{localizationStrings.RPEScore || "RPE Score"}</Text>
            <Text style={styles.scoreText}>{item.rate_efforts}</Text>
          </View>

        </TouchableOpacity>
      </View>
    );
  };
  const chartDataScreen1 = {
    weekly: { data: [1400, 2800, 100, 1600, 100, 800, 200] },
    monthly: { data: [70, 200, 150] },
    yearly: { data: [180, 222, 111] },
  };
  const {

  } = useHome();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <View style={styles.headerRow}>

        <Text style={styles.header}>
          {playerName ? `${playerName}'s ${localizationStrings?.Reports || "Reports"}` : (isLogin?.userData?.type === "Coach" ? localizationStrings?.Reports || "Reports" : localizationStrings?.Performance || "Performance")}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>
          {isLogin?.userData?.type === "Coach"
            ? (localizationStrings.CoachMonitoringHeader || "Coach Monitoring: Detailed Player Activity & Statistics")
            : (localizationStrings.PerformanceOverviewHeader || "Performance Overview: Shared Insights for Coach & Player")}
        </Text>
      </View>
      <ChartComponent data={chartDataScreen1} statusText={localizationStrings.Safe} statusColor="rgba(160, 216, 3, 1)" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          <Text style={styles.title}>{localizationStrings?.ChatMessages}</Text>
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
                {item?.image &&
                  item.image.trim() !== "" &&
                  !item.image.endsWith("/users/") ? (
                  <Image source={{ uri: item.image }} style={styles.profileImage} />
                ) : (
                  <Image source={imageIndex.prfEdit} style={styles.profileImage} />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item?.user_name ?? ""}
                  </Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item?.last_message ?? ""}
                  </Text>
                </View>

              </TouchableOpacity>
            )}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 15
  },
  containewr: {
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  lightText: {
    fontSize: 12,
    color: "gray",
  },
  scoreSection: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 40, marginBottom: 5 },
  subHeaderContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
    textAlign: 'center',
    lineHeight: 18,
  },
  listContent: {
    paddingBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1 },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  message: { color: "#6B7280" },
  timeContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
});

export default Reports;
