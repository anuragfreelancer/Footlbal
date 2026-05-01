import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", marginTop: 11 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 4,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 4,
  },
  avatar: {
    width: 50, height: 50, borderRadius: 25, marginRight: 12,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "gray"


  },
  infoContainer: { flex: 1 },
  name: { fontSize: 12, fontWeight: "600", color: "black" },
  position: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600", color: "black" },
  value: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  fab: {
    position: "absolute",
    bottom: 1,
    right: 20,
    backgroundColor: "rgba(160, 216, 3, 1)",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    height: 55

  },
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default styles;
