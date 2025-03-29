import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ChartComponent = () => {
  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      {/* Status */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "green", marginRight: 5 }} />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Safe</Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ backgroundColor: "#FF6F61", color: "#fff", padding: 5, borderRadius: 10 }}>
            Weekly ▼
          </Text>
        </View>
      </View>

      {/* Chart */}
      <LineChart
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              data: [60, 80, 50, 70, 90, 40, 60],
              color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 40} // Dynamic width
        height={220}
        yAxisSuffix="%"
        yAxisInterval={1} // Optional: Adjust step intervals
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#FF6F61",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      {/* Floating Tooltip */}
      <View
        style={{
          position: "absolute",
          top: 120,
          left: screenWidth * 0.6,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Fri, 28 May</Text>
        <Text style={{ fontSize: 14, color: "green" }}>50% ↑</Text>
        <Text style={{ fontSize: 12 }}>Upperbody Workout</Text>
      </View>
    </View>
  );
};

export default ChartComponent;
