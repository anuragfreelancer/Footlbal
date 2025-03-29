import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";

const screenWidth = Dimensions.get("window").width;

const Reports = () => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      },
    ],
  };
  const players = Array(2).fill({
    name: "Animes S.",
    position: "Forward",
    trainingType: "Chest",
    intensity: "Beginner",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  });
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
          <Text style={styles.header}>Reports</Text>
    
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10, // Smooth corners
            shadowColor: "#000",
            shadowOpacity: 0.2,
            marginVertical: 2,
            marginHorizontal: 3,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 3 }, // iOS shadow
            elevation: 1.1,
            overflow: "hidden",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Image
            source={imageIndex.workFirst}
            style={{
              width: "100%", // Ensures the image takes up full width of parent
              height: undefined, // Allows dynamic height based on aspect ratio
              aspectRatio: 384 / 263, // Maintains the correct aspect ratio
              resizeMode: "contain", // Ensures full visibility without cropping
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10, // Smooth corners
            shadowColor: "#000",
            shadowOpacity: 0.2,
            marginVertical: 2,
            marginHorizontal: 3,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 3 }, // iOS shadow
            elevation: 1.1,
            overflow: "hidden",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Image
            source={imageIndex.medium}
            style={{
              width: "100%", // Ensures the image takes up full width of parent
              height: undefined, // Allows dynamic height based on aspect ratio
              aspectRatio: 384 / 263, // Maintains the correct aspect ratio
              resizeMode: "contain", // Ensures full visibility without cropping
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10, // Smooth corners
            shadowColor: "#000",
            shadowOpacity: 0.2,
            marginVertical: 2,
            marginHorizontal: 3,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 3 }, // iOS shadow
            elevation: 1.1,
            overflow: "hidden",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Image
            source={imageIndex.highRi}
            style={{
              width: "100%", // Ensures the image takes up full width of parent
              height: undefined, // Allows dynamic height based on aspect ratio
              aspectRatio: 384 / 263, // Maintains the correct aspect ratio
              resizeMode: "contain", // Ensures full visibility without cropping
            }}
          />
        </View>
        
 
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 15
  },
  header: { fontSize: 24,color:"black", fontWeight: "700", textAlign: "center", marginVertical: 10 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal:1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  infoContainer: { flex: 1 },
  name: { fontSize: 12, fontWeight: "600",color:"black" },
  position: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)"  },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600",color:"black" },
  value: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)" },

  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  notificationIcon: {
    padding: 10,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  sectionContainer: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  weeklyButton: {
    backgroundColor: "#FF7043",
    padding: 5,
    borderRadius: 5,
  },
  weeklyText: {
    color: "white",
    fontSize: 12,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default Reports;
