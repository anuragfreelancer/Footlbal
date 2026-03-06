import React, { useState } from "react";
import { View, Text,Image, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import imageIndex from "../assets/imageIndex";
import localizationStrings from "./Localization/Localization";
 
const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 48;

const normalizeToPercent = (arr) => {
  if (!arr?.length) return arr;
  const max = Math.max(...arr);
  if (max === 0) return arr.map(() => 0);
  return arr.map((v) => Math.round((v / max) * 100));
};

const getSubtitle = (type) => {
  const t = type?.toLowerCase?.() || "weekly";
  if (t === "weekly") return localizationStrings.Last7Days;
  if (t === "monthly") return localizationStrings.MonthlyTrend;
  if (t === "yearly") return localizationStrings.YearlyView;
  return type ? `${type.charAt(0).toUpperCase() + type.slice(1)} view` : localizationStrings.OverviewView;
};

const ChartComponent = ({ data, statusText, statusColor }) => {
  const [selectedType, setSelectedType] = useState("weekly");
  const [modalVisible, setModalVisible] = useState(false);
  const types = Object.keys(data);
  const rawData = data[selectedType]?.data ?? [];
  const currentData = normalizeToPercent(rawData);
  const peak = currentData.length ? Math.max(...currentData) : 0;
  const avg = currentData.length
    ? Math.round(currentData.reduce((a, b) => a + b, 0) / currentData.length)
    : 0;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleBlock}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <View>
            <Text style={styles.statusText}>{statusText}</Text>
            <Text style={styles.cardSubtitle}>{getSubtitle(selectedType)}</Text>
            <Text style={styles.statsInline}>{localizationStrings.Peak} {peak}% · {localizationStrings.Avg} {avg}%</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(true)} style={styles.selectorButton}>
          <Text style={styles.selectorText}>
            {selectedType === "weekly" ? localizationStrings.Weekly : selectedType === "monthly" ? localizationStrings.Monthly : localizationStrings.Yearly}
          </Text>
          <Image source={imageIndex.arrowDown} 
          style={{
            height:15,
            width:15 ,
            tintColor:"white"
          }}
          resizeMode="contain"
          />
    
        </TouchableOpacity>
      </View>
      <View style={styles.chartWrapper}>
        <LineChart
          data={{
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
              {
                data: currentData.length ? currentData : [0, 0, 0, 0, 0, 0, 0],
                color: (opacity = 1) => `rgba(72, 187, 120, ${opacity})`,
                strokeWidth: 2.5,
              },
            ],
          }}
          width={chartWidth}
          height={200}
          yAxisSuffix="%"
          fromZero
          yAxisInterval={25}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "rgba(240, 253, 244, 0.5)",
            backgroundGradientTo: "rgba(255, 255, 255, 0)",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(72, 187, 120, ${opacity})`,
            labelColor: () => "#94A3B8",
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            propsForDots: { r: 3.5, strokeWidth: 2, stroke: "#fff" },
            propsForBackgroundLines: { stroke: "#E2E8F0", strokeWidth: 0.8 },
            propsForVerticalLabels: { fill: "#64748B", fontSize: 10, fontWeight: "500" },
            propsForHorizontalLabels: { fill: "#64748B", fontSize: 10, fontWeight: "500" },
            formatYLabel: (label) => `${label}%`,
            fillShadowGradient: "rgba(72, 187, 120, 0.2)",
            fillShadowGradientOpacity: 1,
          }}
          bezier
          withDots={true}
          withShadow={false}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          style={styles.chart}
        />
      </View>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
               {types.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setSelectedType(item);
                    setModalVisible(false);
                  }}
                  style={[styles.modalItem, selectedType === item && styles.modalItemActive]}
                >
                  <Text style={[styles.modalItemText, selectedType === item && styles.modalItemTextActive]}>
                    {item === "weekly" ? localizationStrings.Weekly : item === "monthly" ? localizationStrings.Monthly : localizationStrings.Yearly}
                  </Text>
                  {selectedType === item && <Text style={styles.modalCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  titleBlock: { flexDirection: "row", alignItems: "center", gap: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusText: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  cardSubtitle: { fontSize: 13, color: "#64748B", marginTop: 2, fontWeight: "500" },
  statsInline: { fontSize: 11, color: "#94A3B8", marginTop: 4, fontWeight: "500" },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 3,
  },
  selectorText: { fontSize: 13, fontWeight: "600", color: "white" },
  selectorChevron: { fontSize: 12, color: "#64748B" },
  chartWrapper: {
     borderRadius: 14,
    paddingVertical: 5,
   },
  chart: { marginLeft: -6, borderRadius: 14 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 16,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  modalItemActive: {
   },
  modalItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  modalItemTextActive: {
    color: "#166534",
    fontWeight: "600",
  },
  modalCheck: {
    fontSize: 14,
    fontWeight: "700",
    color: "#22C55E",
  },
});

export default ChartComponent;

