import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import ChartComponent from "../../../compoent/ChartComponent";

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



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <Text style={styles.header}>Reports</Text>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* <View
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
        </View> */}

        <ChartComponent data={chartDataScreen1} statusText="Safe" statusColor="green" />

        {/* <ChartComponent data={chartDataScreen2} statusText="Medium" statusColor="#FFF100" />
        <ChartComponent data={chartDataScreen2} statusText="High Risk" statusColor="#E81224" /> */}



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
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", marginVertical: 10,marginTop:30 },
});

export default Reports;
