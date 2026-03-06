import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const cardPadding = 20;
const cardMargin = 16;
const chartWidth = Math.max(screenWidth - cardMargin * 2 - cardPadding * 2 - 24, 220);

const normalizeToPercent = (arr) => {
  if (!arr?.length) return arr;
  const max = Math.max(...arr);
  if (max === 0) return arr.map(() => 0);
  return arr.map((v) => Math.round((v / max) * 100));
};

const getSubtitle = (type) => {
  const t = type?.toLowerCase?.() || "weekly";
  if (t === "weekly") return "Last 7 days";
  if (t === "monthly") return "Last 6 weeks";
  if (t === "yearly") return "Last 12 months";
  return type ? `${type.charAt(0).toUpperCase() + type.slice(1)} view` : "Overview";
};

const CHART_COLOR = "rgba(160, 216, 3, 1)";
const TYPES = ["weekly", "monthly", "yearly"];

const WEEKLY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getChartLabelsAndData = (selectedType, rawData) => {
  const currentData = normalizeToPercent(rawData);
  const t = (selectedType || "weekly").toLowerCase();

  if (t === "weekly") {
    const data = currentData.length >= 7 ? currentData.slice(0, 7) : currentData.length > 0
      ? [...currentData, ...Array(7 - currentData.length).fill(0)]
      : [0, 0, 0, 0, 0, 0, 0];
    return { labels: WEEKLY_LABELS, data };
  }
  if (t === "monthly") {
    const len = 6;
    const data = currentData.length >= len ? currentData.slice(0, len) : currentData.length > 0
      ? [...currentData, ...Array(len - currentData.length).fill(0)]
      : Array(len).fill(0);
    const labels = Array.from({ length: len }, (_, i) => `W${i + 1}`);
    return { labels, data };
  }
  if (t === "yearly") {
    const len = 12;
    const data = currentData.length >= len ? currentData.slice(0, len) : currentData.length > 0
      ? [...currentData, ...Array(len - currentData.length).fill(0)]
      : Array(len).fill(0);
    const labels = Array.from({ length: len }, (_, i) => MONTH_ABBR[i]);
    return { labels, data };
  }
  const data = currentData.length > 0 ? currentData : [0, 0, 0, 0, 0, 0, 0];
  return { labels: WEEKLY_LABELS.slice(0, data.length), data };
};

const ChartComponent1 = ({ data, statusText, statusColor, totalPlayers }) => {
  const [selectedType, setSelectedType] = useState("weekly");
  const types = TYPES.filter((t) => data?.[t]);
  const rawData = data?.[selectedType]?.data ?? [];
  const { labels: chartLabels, data: chartData } = getChartLabelsAndData(selectedType, rawData);
  const currentData = normalizeToPercent(rawData);
  const peak = currentData.length ? Math.max(...currentData) : 0;
  const avg = currentData.length
    ? Math.round(currentData.reduce((a, b) => a + b, 0) / currentData.length)
    : 0;

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "rgba(236, 253, 218, 0.5)",
    backgroundGradientTo: "rgba(255, 255, 255, 0)",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
    labelColor: () => "#475569",
    useShadowColorFromDataset: false,
    propsForDots: { r: 5, strokeWidth: 2, stroke: "#fff" },
    propsForBackgroundLines: { stroke: "#E2E8F0", strokeWidth: 0.5 },
    propsForVerticalLabels: { fill: "#475569", fontSize: 12, fontWeight: "600" },
    propsForHorizontalLabels: { fill: "#475569", fontSize: 11, fontWeight: "500" },
    formatYLabel: (label) => `${label}%`,
    fillShadowGradient: "rgba(160, 216, 3, 0.35)",
    fillShadowGradientOpacity: 1,
  };

  const hasData = currentData.length > 0;
  const hasNonZeroData = hasData && Math.max(...currentData) > 0;

  return (
    <View style={[styles.card, hasNonZeroData && styles.cardWithData]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{statusText}</Text>
          <Text style={styles.cardHint}>
            {getSubtitle(selectedType)}
            {typeof totalPlayers === "number" ? ` · ${totalPlayers} player${totalPlayers !== 1 ? "s" : ""}` : ""}
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
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>Peak</Text>
          <Text style={styles.statValue}>{peak}%</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>Avg</Text>
          <Text style={styles.statValue}>{avg}%</Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        {hasNonZeroData ? (
          <LineChart
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: chartData,
                  color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
                  strokeWidth: 2.5,
                },
              ],
            }}
            width={chartWidth}
            height={208}
            yAxisSuffix="%"
            fromZero
            yAxisInterval={25}
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
        ) : (
          <View style={styles.emptyChart}>
            <Text style={styles.emptyChartText}>No session data yet</Text>
            <Text style={styles.emptyChartSubtext}>
              Add players and run sessions to see your activity here
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
    marginTop: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardWithData: {
    borderLeftWidth: 4,
    borderLeftColor: CHART_COLOR,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  cardHint: {
    fontSize: 13,
    color: "#6B7280",
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  tabTextActive: {
    color: CHART_COLOR,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginRight: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  chartWrapper: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 4,
    overflow: "hidden",
    backgroundColor: "rgba(248, 250, 252, 0.9)",
    minHeight: 208,
  },
  chart: {
    marginLeft: -8,
    borderRadius: 14,
  },
  emptyChart: {
    minHeight: 208,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyChartText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },
  emptyChartSubtext: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
    textAlign: "center",
  },
});

export default ChartComponent1;

