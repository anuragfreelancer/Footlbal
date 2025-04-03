import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import ChartComponent from "../../../compoent/ChartComponent";
import useReports from "./useReports";
import LoadingModal from "../../../utils/Loader";
import ScreenNameEnum from "../../../routes/screenName.enum";

const screenWidth = Dimensions.get("window").width;

const Reports = () => {
  const chartDataScreen1 = {
    weekly: { data: [55, 44, 22] },
    monthly: { data: [12, 22, 2] },
    yearly: { data: [43, 22, 19] },
  };

  const chartDataScreen2 = {
    weekly: { data: [15, 25, 35] },
    monthly: { data: [22, 33] },
    yearly: { data: [33, 45, 444] },
  };

  const {
    rpfData,  
    isLoading,  
    navigation,
    isLogin
  } = useReports();
   const RecentSessionCard = ({ item }) => {
     return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.boldText}>Date - {item?.rpf_date}</Text>
            <Text style={styles.lightText}>{item.rpf_session}</Text>
          </View>
          <View style={styles.scoreSection}>
            <Text style={styles.boldText}>RPE Score</Text>
            <Text style={styles.scoreText}>{item.rate_efforts}</Text>
          </View>
          <View style={styles.scoreSection}>
            <Image
              source={item.rate_efforts > 6 ? imageIndex.greenGrap : imageIndex.redGrap}
              style={{ height: 24, width: 24 }}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? <LoadingModal /> : null}

      <StatusBarComponent />
      <Text style={styles.header}>
        {isLogin?.userData?.type === "Coach" ? "Reports" : "Performance"}
      </Text>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          <Text style={styles.title}>Recent Session</Text>
          <FlatList
            data={rpfData?.userGetData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RecentSessionCard item={item} />}
          />
        </View>

        <ChartComponent data={chartDataScreen1} statusText="Safe" statusColor="green" />
        {/* <ChartComponent data={chartDataScreen2} statusText="Medium" statusColor="#FFF100" />
        <ChartComponent data={chartDataScreen2} statusText="High Risk" statusColor="#E81224" /> */}
      </ScrollView>
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
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7ED321",
    borderRadius: 30,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
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
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", marginVertical: 10, marginTop: 30 },
});

export default Reports;
 