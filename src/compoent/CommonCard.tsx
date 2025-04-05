import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from "react-native";

interface CommonCardProps {
  item: {
    image: ImageSourcePropType;
    player_name: string;
    load_type_id: string;
    injury: string;
  };
  onPress: () => void;
}

const CommonCard: React.FC<CommonCardProps> = React.memo(({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item?.image }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.user_name}</Text>
          <Text style={styles.position}>Forward</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Training Type</Text>
          <Text style={styles.value}>{item.load_type_id}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Intensity</Text>
          <Text style={styles.value}>{item.injury}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {},
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
  },
  position: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(153, 153, 153, 1)",
  },
  detailContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
  },
  value: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(153, 153, 153, 1)",
    textTransform: "uppercase",
  },
});

export default CommonCard;
