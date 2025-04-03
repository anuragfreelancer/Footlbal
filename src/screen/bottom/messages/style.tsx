
import {   StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f2f2f2",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1 },
  messageContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eaeaea",
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  message: { color: "gray" },
  timeContainer: { alignItems: "flex-end" },
  time: { fontSize: 12, color: "gray" },
  unreadBadge: { width: 21, height: 21, borderRadius: 20, backgroundColor: "red", marginTop: 4, alignItems: "center", justifyContent: "center" },
});
export default styles;
