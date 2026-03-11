import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
import localizationStrings from "./Localization/Localization";
import { useLanguage } from "./Localization/LanguageContext";

const screenWidth = Dimensions.get("window").width;
const chartWidthWeekly = Math.max(screenWidth - 48, 300);
const chartWidthMonthly = Math.max(screenWidth - 48, 6 * 68);

const getSubtitle = (type) => {
  const t = type?.toLowerCase?.() || "weekly";
  if (t === "weekly") return localizationStrings.Last7Days;
  if (t === "monthly") return localizationStrings.Last6Weeks;
  return type ? `${type.charAt(0).toUpperCase() + type.slice(1)} view` : localizationStrings.OverviewView;
};

const CHART_COLOR = "rgba(160, 216, 3, 1)";
const CHART_COLOR_LIGHT = "rgba(160, 216, 3, 0.2)";
const TYPES = ["weekly", "monthly"];

// Weekly: actual dates (day + short month) for last 7 days
const getWeeklyLabels = () => {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = moment().subtract(i, "days");
    labels.push(d.format("D MMM"));
  }
  return labels;
};

// Monthly: short labels (start date only) to avoid overlap - "18 Jan", "25 Jan"
const getMonthlyLabels = () => {
  const labels = [];
  for (let i = 5; i >= 0; i--) {
    if (i === 0) {
      labels.push(moment().format("D MMM"));
    } else {
      const start = moment().subtract(i + 1, "weeks").startOf("week");
      labels.push(start.format("D MMM"));
    }
  }
  return labels;
};

const getChartLabelsAndData = (selectedType, rawData) => {
  const arr = Array.isArray(rawData) ? rawData : [];
  const t = (selectedType || "weekly").toLowerCase();

  if (t === "weekly") {
    const data = arr.length >= 7 ? arr.slice(0, 7) : arr.length > 0
      ? [...arr, ...Array(7 - arr.length).fill(0)]
      : [0, 0, 0, 0, 0, 0, 0];
    return { labels: getWeeklyLabels(), data };
  }
  if (t === "monthly") {
    const len = 6;
    const data = arr.length >= len ? arr.slice(0, len) : arr.length > 0
      ? [...arr, ...Array(len - arr.length).fill(0)]
      : Array(len).fill(0);
    return { labels: getMonthlyLabels(), data };
  }
  const data = arr.length > 0 ? arr : [0, 0, 0, 0, 0, 0, 0];
  return { labels: getWeeklyLabels(), data };
};

const ChartComponent1 = ({ data, statusText, statusColor, totalPlayers }) => {
  useLanguage();
  const [selectedType, setSelectedType] = useState("weekly");
  const types = TYPES.filter((t) => data?.[t]);
  const rawData = data?.[selectedType]?.data ?? [];
  const { labels: chartLabels, data: chartData } = getChartLabelsAndData(selectedType, rawData);
  const peak = chartData.length ? Math.max(...chartData) : 0;
  const avg = chartData.length
    ? Math.round(chartData.reduce((a, b) => a + b, 0) / chartData.length)
    : 0;

  const labelColor = "#64748B";
  const isMonthly = selectedType === "monthly";
  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "#F8FAFC",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
    labelColor: () => labelColor,
    useShadowColorFromDataset: false,
    propsForDots: { r: 5, strokeWidth: 2, stroke: "#fff" },
    propsForBackgroundLines: { stroke: "#E2E8F0", strokeWidth: 0.6 },
    propsForVerticalLabels: { fill: labelColor, fontSize: 12, fontWeight: "600" },
    propsForHorizontalLabels: {
      fill: labelColor,
      fontSize: isMonthly ? 11 : 12,
      fontWeight: "600",
    },
    formatYLabel: (label) => String(label),
    fillShadowGradient: CHART_COLOR_LIGHT,
    fillShadowGradientOpacity: 1,
  };

  const hasData = chartData.length > 0;
  const showChart = hasData;
  const chartWidth = selectedType === "monthly" ? chartWidthMonthly : chartWidthWeekly;

  return (
    <View style={[styles.card, showChart && styles.cardWithData]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{statusText}</Text>
          <Text style={styles.cardHint}>
            {getSubtitle(selectedType)}
            {typeof totalPlayers === "number" ? ` · ${totalPlayers} ${totalPlayers !== 1 ? localizationStrings.Players : localizationStrings.Player}` : ""}
          </Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {(types.length ? types : TYPES).map((type) => (
          <TouchableOpacity
            key={type}
            activeOpacity={0.7}
            onPress={() => setSelectedType(type)}
            style={[styles.tab, selectedType === type && styles.tabActive]}
          >
          <Text
            style={[styles.tabText, selectedType === type && styles.tabTextActive]}
            >
              {type === "weekly" ? localizationStrings.Weekly : localizationStrings.Monthly}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{localizationStrings.Peak}</Text>
          <Text style={styles.statValue}>{peak}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{localizationStrings.Avg}</Text>
          <Text style={styles.statValue}>{avg}</Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        {showChart ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chartScroll}>
            <LineChart
              key={selectedType}
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: chartData,
                    color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={chartWidth}
              height={220}
              fromZero
              yAxisInterval={Math.max(1, Math.ceil(peak / 5))}
              chartConfig={chartConfig}
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
          </ScrollView>
        ) : (
          <View style={styles.emptyChart}>
            <Text style={styles.emptyChartText}>{localizationStrings.NoSessionDataYet}</Text>
            <Text style={styles.emptyChartSubtext}>
              {localizationStrings.AddPlayersRunSessions}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardWithData: {
    borderLeftWidth: 5,
    borderLeftColor: CHART_COLOR,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  cardHint: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
   },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
  },
  tabTextActive: {
    color: CHART_COLOR,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
     paddingHorizontal: 16,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginRight: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  chartWrapper: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    minHeight: 80,
  },
  chartScroll: {
    paddingRight: 24,
  },
  chart: {
    marginLeft: -4,
    borderRadius: 16,
  },
  emptyChart: {
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyChartText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#64748B",
    textAlign: "center",
  },
  emptyChartSubtext: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ChartComponent1;

