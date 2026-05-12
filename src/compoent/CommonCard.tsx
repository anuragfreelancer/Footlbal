import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import imageIndex from "../assets/imageIndex";

const SESSION_COLORS: Record<string, string> = {
  TRAINING: "#2563EB",
  MATCH: "#DC2626",
  BREAK: "#F59E0B",
};

interface CommonCardProps {
  item: {
    image: string;
    player_name: string;
    load_type_id: string;
    injury: string;
    user_name: string;
  };
  onPress?: () => void;
  accentBorder?: boolean;
  sessionType?: string;
}

const CommonCard: React.FC<CommonCardProps> = React.memo(({ item, onPress, accentBorder = false, sessionType }) => {
  const typeUpper = String(sessionType || "").toUpperCase();
  const dotColor = SESSION_COLORS[typeUpper] || SESSION_COLORS.TRAINING;
  const showDot = !!sessionType;

  return (
    <TouchableOpacity
      style={[styles.card, accentBorder && styles.cardAccent]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.avatarWrap}>
        <Image
          source={
            item?.image &&
              item.image !== "https://kmmps.store/public/uploads/users/"
              ? { uri: item.image }
              : imageIndex.prfEdit
          }
          defaultSource={imageIndex.prfEdit}
          onError={() => console.log("Image load failed")}
          style={styles.avatar}
        />
        {/* <Image source={{ uri: item?.image }} style={styles.avatar} /> */}
        {showDot && <View style={[styles.sessionDot, { backgroundColor: dotColor }]} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.user_name}</Text>
          <Text style={styles.position}>Forward</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Training Type</Text>
          <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
            {item.load_type_id}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Intensity</Text>
          <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
            {item.injury}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginVertical: 0,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1.5,
    borderColor: "rgba(160, 216, 3, 1)",
  },
  cardAccent: {
    borderLeftWidth: 4,
    borderLeftColor: "#A0D803",
  },
  avatarWrap: {
    position: "relative",
    marginRight: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F3F4F6",
  },
  sessionDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  position: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },
  detailContainer: {
    alignItems: "center",
    minWidth: 0,
    flexShrink: 1,
    marginHorizontal: 6,
    maxWidth: "28%",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
});

export default CommonCard;
