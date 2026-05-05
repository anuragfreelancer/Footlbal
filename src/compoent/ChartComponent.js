import React, { useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet, Platform } from "react-native";
import { LineChart } from "react-native-chart-kit";
import imageIndex from "../assets/imageIndex";
import localizationStrings from "./Localization/Localization";

const screenWidth = Dimensions.get("window").width;
// Responsive width: Exactly fits within the card's horizontal padding
const chartWidth = screenWidth - 60;


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

  const brandGreen = "#A0D803";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleBlock}>
          <View style={[styles.statusDot, { backgroundColor: statusColor || brandGreen }]} />
          <View>
            <Text style={styles.statusText}>{statusText || localizationStrings.Safe}</Text>
            <Text style={styles.cardSubtitle}>{getSubtitle(selectedType)}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          style={styles.selectorButton}
        >
          <Text style={styles.selectorText}>
            {selectedType === "weekly" ? localizationStrings.Weekly : selectedType === "monthly" ? localizationStrings.Monthly : localizationStrings.Yearly}
          </Text>
          <Image
            source={imageIndex.arrowDown}
            style={styles.selectorIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{peak}%</Text>
          <Text style={styles.statLabel}>{localizationStrings.Peak}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{avg}%</Text>
          <Text style={styles.statLabel}>{localizationStrings.Avg}</Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        <LineChart
          data={{
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
              {
                data: currentData.length ? currentData : [0, 0, 0, 0, 0, 0, 0],
                color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
                strokeWidth: 3,
              },
            ],
          }}
          width={chartWidth}
          height={180}
          yAxisSuffix="%"
          fromZero
          yAxisInterval={25}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
            labelColor: () => "#94A3B8",
            propsForDots: {
              r: "5",
              strokeWidth: "3",
              stroke: "#FFFFFF",
            },
            propsForBackgroundLines: {
              stroke: "#F1F5F9",
              strokeWidth: 1,
              strokeDasharray: "", // solid lines for premium feel
            },
            fillShadowGradient: brandGreen,
            fillShadowGradientOpacity: 0.15,
            useShadowColorFromDataset: false,
          }}
          bezier
          withDots={true}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLabels={true}
          style={styles.chart}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{localizationStrings.SelectPeriod || "Select Period"}</Text>
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
                  {selectedType === item && (
                    <View style={styles.checkWrapper}>
                      <Text style={styles.modalCheck}>✓</Text>
                    </View>
                  )}
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
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 12,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 5, // main shadow for Android
        marginHorizontal: 1,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  titleBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "600",
    marginTop: 1,
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  selectorText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 6,
  },
  selectorIcon: {
    width: 12,
    height: 12,
    tintColor: "#1A1A1A",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 11,
    color: "#6C757D",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  chart: {
    borderRadius: 20,
    marginTop: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: "80%",

    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
      },
      android: {
        elevation: 0.1,

      },
    }),
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 4,
  },
  modalItemActive: {
    backgroundColor: "rgba(160, 216, 3, 0.08)",
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
  },
  modalItemTextActive: {
    color: "#A0D803",
  },
  checkWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#A0D803",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCheck: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ChartComponent;


