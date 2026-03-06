
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerWrap: {
    marginTop: 12,
    marginHorizontal: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1 },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  message: { color: "#6B7280" },
  timeContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(160, 216, 3, 1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});

export default styles;
