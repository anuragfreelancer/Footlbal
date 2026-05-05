import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Platform } from "react-native";
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
    const effort = Number(item.rate_efforts) || 0;
    const badgeColor = effort > 7 ? "#EF4444" : effort > 4 ? "#F59E0B" : "#10B981";

    return (
      <TouchableOpacity style={styles.reportCard} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.reportMain}>
          <Text style={styles.reportDate}>{item?.rpf_date || "—"}</Text>
          <Text style={styles.reportSession} numberOfLines={1}>{item.rpf_session || localizationStrings.TrainingSession}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <View style={[styles.scoreBadge, { backgroundColor: badgeColor }]}>
            <Text style={styles.scoreValue}>{effort}</Text>
            <Text style={styles.scoreLabel}>RPE</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const chartDataScreen1 = {
    weekly: { data: [1400, 2800, 100, 1600, 100, 800, 200] },
    monthly: { data: [70, 200, 150] },
    yearly: { data: [180, 222, 111] },
  };

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

      <View style={{
        marginHorizontal: 16,
        marginBottom: 11
      }}>
        <ChartComponent data={chartDataScreen1} statusText={localizationStrings.Safe} statusColor="rgba(160, 216, 3, 1)" />


      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Recent Reports Section */}
        {rpfData?.userGetData?.length > 0 && (
          <View style={{ marginBottom: 10 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{localizationStrings.RecentSession || "Recent Reports"}</Text>
            </View>
            <FlatList
              data={rpfData.userGetData.slice(0, 10)}
              scrollEnabled={false}
              keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
              renderItem={({ item }) => <RecentSessionCard item={item} />}
            />
          </View>
        )}

        {/* Chat Messages Section */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{localizationStrings.ChatMessages || "Chat Messages"}</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredMessages}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<EmptyListComponent message={localizationStrings?.Nochat} />}
            keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                style={styles.messageContainer}
                // onPress={() =>
                //   navigation.navigate(ScreenNameEnum.ChatScreen, { item })
                // }
                onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen, {
                  item: item
                })}
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
                  <Text style={styles.name} numberOfLines={1}>
                    {item?.email ?? ""}
                  </Text>
                  {/* <Text style={styles.lastMessage} numberOfLines={1}>
                    {item?.last_message ?? ""}
                  </Text> */}
                </View>
                <Image source={imageIndex.bubbleChat} style={styles.chatIcon} resizeMode="contain" />

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
    marginHorizontal: 10
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
  },
  listContent: {
    paddingBottom: 24,
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  reportMain: {
    flex: 1,
    marginRight: 12,
  },
  reportDate: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  reportSession: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "rgba(255,255,255,0.9)",
    textTransform: "uppercase",
    marginTop: -2,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    marginHorizontal: 6,
    marginTop: 1,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  chatIcon: {
    width: 22,
    height: 22,
    tintColor: "#A0D803",
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
});

export default Reports;
