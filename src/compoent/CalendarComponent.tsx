import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import imageIndex from "../assets/imageIndex";
import moment from "moment";

export interface MarkedDateConfig {
  dotColor?: string;
  color?: string;
}

const CalendarComponent = ({ onDateSelect, markedDates = {} }: { onDateSelect: (date: string) => void, markedDates: Record<string, MarkedDateConfig> }) => {

  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    onDateSelect(selectedDate);
  }, []);

  const changeMonth = (direction: "prev" | "next") => {

    const newMonth =
      direction === "next"
        ? moment(currentMonth).add(1, "months")
        : moment(currentMonth).subtract(1, "months");

    setCurrentMonth(newMonth);

    const firstDay = newMonth?.clone().startOf("month").format("YYYY-MM-DD");

    setSelectedDate(firstDay);

    onDateSelect(firstDay);
  };

  const handleDateSelection = (date: string) => {

    setSelectedDate(date);

    onDateSelect(date);
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

        <TouchableOpacity style={styles.navButton} onPress={() => changeMonth("prev")}>
          <Image source={imageIndex.backNav} style={styles.navIcon} />
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity style={styles.navButton} onPress={() => changeMonth("next")}>
          <Image source={imageIndex.nextArrow} style={styles.navIcon} />
        </TouchableOpacity>

      </View>

      <View style={styles.weekRow}>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day} {" "}
          </Text>
        ))}
      </View>

      <FlatList
        data={renderDays()}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {

          if (!item) return <View style={styles.dayBox} />;

          const mark = markedDates[item];

          const dotColor = mark?.dotColor ?? mark?.color;

          const isSelected = item === selectedDate;

          const hasSession = !!dotColor;

          const circleColor = hasSession
            ? dotColor
            : isSelected
              ? "#A0D803"
              : undefined;

          return (

            <TouchableOpacity
              style={styles.dayBox}
              onPress={() => handleDateSelection(item)}
            >

              <View style={styles.dayContent}>

                {circleColor ? (

                  <View
                    style={[
                      styles.dayCircle,
                      { backgroundColor: circleColor },
                    ]}
                  >
                    <Text style={styles.dayNumberInCircle}>
                      {moment(item).date()}
                    </Text>
                  </View>

                ) : (

                  <Text style={styles.dayText}>
                    {moment(item).date()}
                  </Text>

                )}

                {hasSession && (
                  <View
                    style={[
                      styles.eventDot,
                      { backgroundColor: dotColor },
                    ]}
                  />
                )}

              </View>

            </TouchableOpacity>

          );

        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  monthText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1C1E",
  },

  navButton: {
    padding: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },

  navIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: "#1A1C1E",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  weekDay: {
    width: 40,
    textAlign: "center",
    fontWeight: "600",
  },

  dayBox: {
    width: 40,
    height: 40,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  dayContent: {
    alignItems: "center",
  },

  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  dayNumberInCircle: {
    color: "#fff",
    fontWeight: "700",
  },

  dayText: {
    fontSize: 14,
  },

  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginTop: 3,
  },

});

export default CalendarComponent;