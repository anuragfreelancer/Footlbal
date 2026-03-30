import React, { useState, useMemo } from "react";
import localizationStrings from "./Localization/Localization";
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

const formatShortDate = (str) => {
  if (!str) return "";
  const d = String(str).split(" ")[0] || str;
  const parts = d.split("-");
  if (parts.length >= 3) return `${parts[2]}/${parts[1]}`;
  return d.length > 5 ? d.slice(0, 5) : d;
};

const buildRPEChartData = (sessions) => {
  const list = Array.isArray(sessions) ? [...sessions] : [];
  const sorted = list
    .filter((s) => s != null && (s.rate_efforts != null || s.rate_efforts === 0))
    .sort((a, b) => new Date(b.rpf_date || 0) - new Date(a.rpf_date || 0));

  const weekly = sorted.slice(0, 7).reverse();
  const monthly = sorted.slice(0, 12).filter((_, i) => i % 2 === 0 || i < 6).slice(0, 6).reverse();
  const yearly = sorted.slice(0, 12).reverse();

  return {
    weekly: {
      data: weekly.map((s) => Number(s.rate_efforts) || 0),
      labels: weekly.map((s) => formatShortDate(s.rpf_date)),
    },
    monthly: {
      data: monthly.map((s) => Number(s.rate_efforts) || 0),
      labels: monthly.map((s) => formatShortDate(s.rpf_date)),
    },
    yearly: {
      data: yearly.map((s) => Number(s.rate_efforts) || 0),
      labels: yearly.map((s) => formatShortDate(s.rpf_date)),
    },
  };
};

const getSubtitle = (type) => {
  const t = type?.toLowerCase?.() || "weekly";
  if (t === "weekly") return localizationStrings.Last7Sessions || "Last 7 sessions";
  if (t === "monthly") return localizationStrings.Last6Sessions || "Last 6 sessions";
  if (t === "yearly") return localizationStrings.Last12Sessions || "Last 12 sessions";
  return `${type?.charAt(0)?.toUpperCase() + type?.slice(1)} view`;
};

const RPE_CHART_COLOR = "rgba(160, 216, 3, 1)";
const TYPES = ["weekly", "monthly", "yearly"];

const RPEChartComponent = ({ sessions }) => {
  const [selectedType, setSelectedType] = useState("weekly");

  const chartDataByType = useMemo(() => buildRPEChartData(sessions), [sessions]);
  const current = chartDataByType[selectedType] || {};
  const rawData = current.data || [];
  const labels = current.labels || [];
  const n = Math.max(rawData.length, 1);
  const padLabels =
    labels.length >= n
      ? labels.slice(0, n)
      : [...labels, ...Array(n - labels.length).fill("")];
  const padData =
    rawData.length >= n
      ? rawData
      : [...Array(n - rawData.length).fill(0), ...rawData];

  const peak = rawData.length ? Math.max(...rawData) : 0;
  const avg = rawData.length
    ? Math.round((rawData.reduce((a, b) => a + b, 0) / rawData.length) * 10) / 10
    : 0;

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "rgba(236, 253, 218, 0.6)",
    backgroundGradientTo: "rgba(255, 255, 255, 0)",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
    labelColor: () => "#475569",
    useShadowColorFromDataset: false,
    propsForDots: { r: 5, strokeWidth: 2, stroke: "#fff" },
    propsForBackgroundLines: { stroke: "#E2E8F0", strokeWidth: 0.5 },
    propsForVerticalLabels: { fill: "#475569", fontSize: 12, fontWeight: "600" },
    propsForHorizontalLabels: { fill: "#475569", fontSize: 11, fontWeight: "500" },
    formatYLabel: (label) => (label === "0" ? "0" : label),
    fillShadowGradient: "rgba(160, 216, 3, 0.4)",
    fillShadowGradientOpacity: 1,
  };

  const hasData = padData.length > 0 && Math.max(...padData) > 0;

  return (
    <View style={[styles.card, hasData && styles.cardWithData]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{localizationStrings.RPETrend || "RPE Score Trend"}</Text>
          <Text style={styles.cardHint}>{localizationStrings.RPEScaleHint || "Scale 1–10 · Rate of Perceived Exertion"}</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            activeOpacity={0.7}
            onPress={() => setSelectedType(type)}
            style={[
              styles.tab,
              selectedType === type && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedType === type && styles.tabTextActive,
              ]}
            >
              {type === "weekly" ? localizationStrings.Weekly : type === "monthly" ? localizationStrings.Monthly : localizationStrings.Yearly}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{localizationStrings.Peak || "Peak"}</Text>
          <Text style={styles.statValue}>{peak}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{localizationStrings.Avg || "Avg"}</Text>
          <Text style={styles.statValue}>{avg}</Text>
        </View>
        <Text style={styles.rangeLabel} numberOfLines={1}>{getSubtitle(selectedType)}</Text>
      </View>

      <View style={styles.chartWrapper}>
        {hasData ? (
          <LineChart
            data={{
              labels: padLabels,
              datasets: [
                {
                  data: padData,
                  color: (opacity = 1) => `rgba(160, 216, 3, ${opacity})`,
                  strokeWidth: 2.5,
                },
              ],
            }}
            width={chartWidth}
            height={208}
            fromZero
            yAxisInterval={1}
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
            <View style={styles.emptyChartInner}>
              <Text style={styles.emptyChartText}>{localizationStrings.NoRPEData || "No RPE data yet"}</Text>
              <Text style={styles.emptyChartSubtext}>
                {localizationStrings.CompleteSessionsHint || "Complete sessions and submit RPE to see your effort trend"}
              </Text>
            </View>
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
    borderLeftColor: RPE_CHART_COLOR,
  },
  cardHeader: {
    marginBottom: 14,
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
    marginBottom: 14,
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
    color: RPE_CHART_COLOR,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 10,
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
  rangeLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  chartWrapper: {
    borderRadius: 14,
    paddingVertical: 12,
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
  emptyChartInner: {
    paddingHorizontal: 24,
    alignItems: "center",
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
    lineHeight: 20,
  },
});

export default RPEChartComponent;
