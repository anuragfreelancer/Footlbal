 
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import moment from "moment";
import imageIndex from "../assets/imageIndex";

export type MarkedDateConfig = {
  color?: string;
  dotColor?: string;
};

interface CalendarComponentProps {
  onDateSelect: (date: string) => void;
  markedDates?: Record<string, MarkedDateConfig>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelect, markedDates = {} }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD")); // Set today's date as default

  useEffect(() => {
    onDateSelect(selectedDate); // Notify parent about the initially selected date
  }, []);

  const changeMonth = (direction: "next" | "prev") => {
    const newMonth = direction === "next"
      ? moment(currentMonth).add(1, "months")
      : moment(currentMonth).subtract(1, "months");
    setCurrentMonth(newMonth);
    const firstDay = newMonth.clone().startOf("month").format("YYYY-MM-DD");
    setSelectedDate(firstDay);
    onDateSelect(firstDay);
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date); // Notify parent about the selected date
  };

  const renderDays = (): (string | null)[] => {
    const startOfMonth = moment(currentMonth).startOf("month");
    const endOfMonth = moment(currentMonth).endOf("month");
    const days: (string | null)[] = [];

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
        <TouchableOpacity onPress={() => changeMonth("prev")} style={[styles.arrowButton, styles.arrowButtonPrev]} activeOpacity={0.7}>
          <Image source={imageIndex.circleBak} style={styles.arrowIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={() => changeMonth("next")} style={[styles.arrowButton, styles.arrowButtonNext]} activeOpacity={0.7}>
          <Image source={imageIndex.circleleft} style={styles.arrowIcon} resizeMode="contain" />
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
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (!item) return <View style={styles.dayBox} />;
          const mark = markedDates[item];
          const dotColor = mark?.dotColor ?? mark?.color;
          const isSelected = item === selectedDate;
          const hasSession = !!dotColor;
          const circleColor = hasSession ? dotColor : isSelected ? "#A0D803" : undefined;
          return (
            <TouchableOpacity
              style={styles.dayBox}
              onPress={() => handleDateSelection(item)}
              activeOpacity={0.7}
            >
              <View style={styles.dayContent}>
                {circleColor ? (
                  <View style={[styles.dayCircle, { backgroundColor: circleColor }]}>
                    <Text style={styles.dayNumberInCircle}>{moment(item).date()}</Text>
                  </View>
                ) : (
                  <Text style={styles.dayText}>{moment(item).date()}</Text>
                )}
                {hasSession ? (
                  <View style={[styles.eventDot, { backgroundColor: dotColor }]} />
                ) : null}
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  monthText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.2,
  },
  arrowButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  arrowButtonPrev: {
    borderWidth: 2,
    borderColor: "#A0D803",
  },
  arrowButtonNext: {
    borderWidth: 2,
    borderColor: "#A0D803",
  },
  arrowIcon: {
    height: 22,
    width: 22,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  weekDay: {
    fontWeight: "600",
    width: 36,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 11,
  },
  dayBox: {
    width: 40,
    height: 40,
    margin: 2.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  dayContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircle: {
    width: 33,
    height: 33,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
marginTop:10
  },
  dayNumberInCircle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  dayText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  selectedDayText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    height: 32,
    width: 32,
    lineHeight: 32,
    textAlign: "center",
    backgroundColor: "#A0D803",
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default CalendarComponent;
