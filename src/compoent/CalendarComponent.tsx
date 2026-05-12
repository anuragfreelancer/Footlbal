import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions, PixelRatio, useWindowDimensions } from "react-native";
import imageIndex from "../assets/imageIndex";
import moment from "moment";
import { height } from "../utils/Constant";

export interface MarkedDateConfig {
  dotColor?: string;
  color?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Scaling utility to normalize sizes across different screen densities and resolutions
const scale = SCREEN_WIDTH / 375;
const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const CalendarComponent = ({ onDateSelect, markedDates = {} }: { onDateSelect: (date: string) => void, markedDates: Record<string, MarkedDateConfig> }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  // Dynamic responsive values
  const responsivePadding = normalize(15);
  const responsiveFontSizeLarge = normalize(18);
  const responsiveFontSizeMedium = normalize(14);
  const responsiveFontSizeSmall = normalize(12);
  const navIconSize = normalize(20);
  const dayBoxHeight = normalize(45);
  const dayCircleSize = normalize(30);

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
    <View style={[styles.card, { padding: responsivePadding }]}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity style={styles.navButton} onPress={() => changeMonth("prev")}>
          <Image
            source={imageIndex.backNavs}
            style={{
              height: 23,
              width: 23,
              resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>

        <Text
          style={[styles.monthText, { fontSize: responsiveFontSizeLarge }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity style={styles.navButton} onPress={() => changeMonth("next")}>
          <Image
            source={imageIndex.nextArrow}
            style={[styles.navIcon, { width: navIconSize, height: navIconSize }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <Text
            key={day}
            style={[styles.weekDay, { fontSize: responsiveFontSizeSmall }]}
            numberOfLines={1}
          >
            {day}
          </Text>
        ))}
      </View>

      <FlatList
        data={renderDays()}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => {
          if (!item) return <View style={[styles.dayBox, { height: dayBoxHeight }]} />;

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
              style={[styles.dayBox, { height: dayBoxHeight }]}
              onPress={() => handleDateSelection(item)}
            >
              <View style={styles.dayContent}>
                {circleColor ? (
                  <View
                    style={[
                      styles.dayCircle,
                      {
                        backgroundColor: circleColor,
                        width: dayCircleSize,
                        height: dayCircleSize,
                        borderRadius: dayCircleSize / 2
                      },
                    ]}
                  >
                    <Text
                      style={[styles.dayNumberInCircle, { fontSize: responsiveFontSizeMedium }]}
                      numberOfLines={1}
                    >
                      {moment(item).date()}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[styles.dayText, { fontSize: responsiveFontSizeMedium }]}
                    numberOfLines={1}
                  >
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
    borderRadius: normalize(20),
    width: "100%",
    alignSelf: "center",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: normalize(15),
  },
  monthText: {
    flex: 1,
    fontWeight: "800",
    color: "#1A1C1E",
    textAlign: "center",
    marginHorizontal: normalize(10),
  },
  navButton: {
    padding: normalize(8),
    backgroundColor: "#F8F9FA",
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    resizeMode: 'contain',
    tintColor: "#1A1C1E",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(5),
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    color: "#6C757D",
  },
  dayBox: {
    flex: 1,
    marginVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  dayCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumberInCircle: {
    color: "#fff",
    fontWeight: "700",
  },
  dayText: {
    color: "#1A1C1E",
    fontWeight: "500",
  },
  eventDot: {
    width: normalize(5),
    height: normalize(5),
    borderRadius: normalize(2.5),
    marginTop: normalize(2),
    position: "absolute",
    bottom: normalize(-8),
  },
});

export default CalendarComponent;