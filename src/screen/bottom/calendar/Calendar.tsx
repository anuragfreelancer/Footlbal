import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList, ScrollView } from "react-native";
 import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CalendarComponent from "../../../compoent/CalendarComponent";

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState("2026-04-01");
  const [selectedDates, setSelectedDates] = useState({
    "2026-04-15": { selected: true, selectedColor: "#a3e635" },
    "2026-04-16": { selected: true, selectedColor: "#a3e635" },
    "2026-04-17": { selected: true, selectedColor: "#a3e635" },
    "2026-04-18": { selected: true, selectedColor: "#a3e635" },
  });
  const players = Array(8).fill({
    name: "Animes S.",
    position: "Forward",
    trainingType: "Chest",
    intensity: "Beginner",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  });

  const changeMonth = (direction) => {
    const date = new Date(currentMonth);
    if (direction === "prev") {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    setCurrentMonth(date.toISOString().split("T")[0]); // Update month
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent/>
      <Text style={styles.header}>State</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        alignItems:"center",
        justifyContent:"center",

      }}>
      <Image source={imageIndex.calenderBag} 
      
      style={{height:300, width:400}}
      resizeMode="cover"
      />
      </View>
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CalendarComponent />
    </View> */}

           <Text style={{
                marginLeft:15,
                fontSize:18,
                color:"#192126",
                fontWeight:"700",
                marginTop:15
              }}>Players Attending Session</Text>
      <FlatList
        data={players}
        showsVerticalScrollIndicator={false}
        style={{marginTop:15}}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={imageIndex.foodBagImg} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.position}>{item.position}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Training Type</Text>
              <Text style={styles.value}>{item.trainingType}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Intensity</Text>
              <Text style={styles.value}>{item.intensity}</Text>
            </View>
          </View>
        )}
      />
</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  arrowButton: {
    padding: 5,
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", marginVertical: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  infoContainer: { flex: 1 },
  name: { fontSize: 12, fontWeight: "600", color: "black" },
  position: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600", color: "black" },
  value: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
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
});

export default CustomCalendar;