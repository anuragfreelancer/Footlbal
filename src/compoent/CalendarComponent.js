import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import moment from "moment";
import imageIndex from "../assets/imageIndex";

const CalendarComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDates, setSelectedDates] = useState([]);

  const changeMonth = (direction) => {
    setCurrentMonth((prev) =>
      direction === "next" ? moment(prev).add(1, "months") : moment(prev).subtract(1, "months")
    );
  };

  const toggleDateSelection = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const renderDays = () => {
    const startOfMonth = moment(currentMonth).startOf("month");
    const endOfMonth = moment(currentMonth).endOf("month");
    const days = [];

    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= endOfMonth.date(); i++) {
      days.push(moment(currentMonth).date(i).format("YYYY-MM-DD"));
    }

    return days;
  };

  return (
    <View style={styles.card}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => changeMonth("prev")} style={styles.arrowButton}>
          <Image source={imageIndex.circleBak}
            style={{ height: 24, width: 24 }}
            resizeMode="contain"
          />

        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={() => changeMonth("next")} style={styles.arrowButton}>
          <Image source={imageIndex.circleleft}
            style={{ height: 24, width: 24 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <Text key={day} style={styles.weekDay}>{day}</Text>
        ))}
      </View>
      <FlatList
        data={renderDays()}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayBox,
              selectedDates.includes(item) && styles.selectedDay
            ]}
            onPress={() => item && toggleDateSelection(item)}
            disabled={!item}
          >
            <Text style={!selectedDates.includes(item) ? styles.dayText : {
              color: "white"
            }}>{item ? moment(item).date() : ""}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    alignItems: "center",
    margin: 20,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 11
  },
  monthText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0A1811"
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  weekDay: {
    fontWeight: "700",
    width: 40,
    textAlign: "center",
    color: "#7B827E",
  },
  dayBox: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: "#A0D803",
  },
  dayText: {
    fontSize: 16,
  },
});

export default CalendarComponent;