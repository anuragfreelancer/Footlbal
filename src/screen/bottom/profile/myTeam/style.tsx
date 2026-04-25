
import { StyleSheet } from 'react-native';
import ResponsiveSize from '../../../../utils/ResponsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", marginVertical: 10 },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,

    backgroundColor: "white",
    justifyContent: "space-between",
    marginTop: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileInfo: {
    marginLeft: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 12,
    borderWidth: 0.5,
    borderColor: "rgba(153, 153, 153, 1)"

  },
  // avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  infoContainer: { flex: 1, marginLeft: 15 },
  name: { fontSize: 12, fontWeight: "600", color: "black" },
  position: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600", color: "black" },
  value: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 1)"
  },
  profileLink: {
    fontSize: 12,
    color: "rgba(157, 178, 191, 1)",
    fontWeight: "400"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    justifyContent: "space-between",
  },
  menuText: {
    fontSize: 14,
    marginLeft: 10,
    color: "rgba(53, 44, 72, 1)",
    fontWeight: "500"
  },
});
export default styles;
