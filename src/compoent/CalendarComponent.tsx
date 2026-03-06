 // import React, { useState } from "react";
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
// import moment from "moment";
// import imageIndex from "../assets/imageIndex";

// interface CalendarComponentProps {
//   onDateSelect: any;
// }

// const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelect }) => {
//   const [currentMonth, setCurrentMonth] = useState(moment());
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   const changeMonth = (direction: "next" | "prev") => {
//     setCurrentMonth((prev) =>
//       direction === "next" ? moment(prev).add(1, "months") : moment(prev).subtract(1, "months")
//     );
//     setSelectedDate(null); // Reset selection when changing the month
//   };

//   const handleDateSelection = (date: string) => {
//     setSelectedDate(date);
//     onDateSelect(date); // Notify parent about the selected date
//   };

//   const renderDays = (): (string | null)[] => {
//     const startOfMonth = moment(currentMonth).startOf("month");
//     const endOfMonth = moment(currentMonth).endOf("month");
//     const days: (string | null)[] = [];

//     for (let i = 0; i < startOfMonth.day(); i++) {
//       days.push(null);
//     }

//     for (let i = 1; i <= endOfMonth.date(); i++) {
//       days.push(moment(currentMonth).date(i).format("YYYY-MM-DD"));
//     }

//     return days;
//   };

//   return (
//     <View style={styles.card}>
//       <View style={styles.calendarHeader}>
//         <TouchableOpacity onPress={() => changeMonth("prev")} style={styles.arrowButton}>
//           <Image source={imageIndex.circleBak} style={{ height: 24, width: 24 }} resizeMode="contain" />
//         </TouchableOpacity>
//         <Text style={styles.monthText}>{currentMonth.format("MMMM YYYY")}</Text>
//         <TouchableOpacity onPress={() => changeMonth("next")} style={styles.arrowButton}>
//           <Image source={imageIndex.circleleft} style={{ height: 24, width: 24 }} resizeMode="contain" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.weekRow}>
//         {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
//           <Text key={day} style={styles.weekDay}>{day}</Text>
//         ))}
//       </View>
//       <FlatList
//         data={renderDays()}
//         numColumns={7} 
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.dayBox,  ]}
//             onPress={() => item && handleDateSelection(item)}
//             disabled={!item}
//           >
//             <Text style={!item || item !== selectedDate ? styles.dayText : {  justifyContent:"center", textAlign:"center", color: "white" ,height:23,width:23, backgroundColor:"#A0D803"}}>
//               {item ? moment(item).date() : ""}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#FFF",
//     borderRadius: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 2,
//     alignItems: "center",
//     margin: 20,
//   },
//   calendarHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 11
//   },
//   monthText: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#0A1811"
//   },
//   arrowButton: {
//     padding: 10,
//   },
//   weekRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 10,
//   },
//   weekDay: {
//     fontWeight: "700",
//     width: 42,
//     textAlign: "center",
//     color: "#7B827E",
//     fontSize: 12,
//   },
//   dayBox: {
//     width: 38,
//     height: 20,
//     margin: 4,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   selectedDay: {
//     backgroundColor: "#A0D803",
//     width: 35,
//     height: 33,
//   },
//   dayText: {
//     fontSize: 13,
//     color: "#0A1811"
//   },
// });

// export default CalendarComponent;
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
    setCurrentMonth((prev) =>
      direction === "next" ? moment(prev).add(1, "months") : moment(prev).subtract(1, "months")
    );
    setSelectedDate(null); // Reset selection when changing the month
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
        <TouchableOpacity onPress={() => changeMonth("prev")} style={styles.arrowButton} activeOpacity={0.7}>
          <Image source={imageIndex.circleBak} style={styles.arrowIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={() => changeMonth("next")} style={styles.arrowButton} activeOpacity={0.7}>
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
          return (
            <TouchableOpacity
              style={styles.dayBox}
              onPress={() => handleDateSelection(item)}
            >
              <View style={styles.dayContent}>
                {dotColor ? (
                  <View style={[styles.eventDot, { backgroundColor: dotColor }]} />
                ) : null}
                <Text
                  style={
                    isSelected
                      ? [styles.selectedDayText, dotColor ? { borderColor: dotColor } : undefined]
                      : styles.dayText
                  }
                >
                  {moment(item).date()}
                </Text>
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
    width: 36,
    height: 36,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  dayContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 3,
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
