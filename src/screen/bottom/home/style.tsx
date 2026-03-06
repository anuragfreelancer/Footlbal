
import {   StyleSheet } from 'react-native';
      
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
       marginTop: 20,
    },
    scrollContent: { paddingBottom: 24 },
    safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal:15,
   
    },
    chatListContent: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    chatCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 14,
      marginVertical: 6,
      marginHorizontal: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    chatCardAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    chatCardTextContainer: {
      flex: 1,
      justifyContent: "center",
    },
    chatCardName: {
      fontSize: 16,
      fontWeight: "600",
      color: "#111827",
    },
    avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 1, borderColor: "#E5E7EB" },
    avatarLoader: { position: "absolute", top: "35%", left: "50%", transform: [{ translateX: -10 }, { translateY: -10 }] },
    infoContainer: { flex: 1 },
    name: { fontSize: 12, fontWeight: "600",color:"black" },
    position: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)"  },
    detailContainer: { alignItems: "center", marginHorizontal: 10 },
    // label: { fontSize: 12, fontWeight: "600",color:"black" },
    // value: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)" },
  
    userInfo: {
      marginLeft: 16,
      flex: 1,
      justifyContent: "center",
    },
    userName: {
      fontSize: 18,
      fontWeight: "700",
      color: "#111827",
    },
    userEmail: {
      fontSize: 14,
      color: "#6B7280",
      marginTop: 2,
    },
    userSubtitle: {
      fontSize: 14,
      color: "gray",
    },
    sectionWrap: {
      marginHorizontal: 16,
      marginBottom: 12,
      marginTop: 4,
    },
    scheduleCard: {
      backgroundColor: "#ECFDF5",
      borderRadius: 12,
      marginHorizontal: 16,
      marginTop: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: "#A7F3D0",
    },
    scheduleCardTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#047857",
    },
    scheduleCardSubtitle: {
      fontSize: 13,
      color: "#065F46",
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#111827",
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    notificationIcon: {
      padding: 10,
    },
    chartStyle: {
      marginVertical: 8,
      borderRadius: 10,
    },
    sessionCard: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 18,
      marginBottom: 14,
       shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
       borderColor: "#E5E7EB",
      overflow: "hidden",
    },
    sessionCardActive: {
      borderLeftWidth: 4,
      borderLeftColor: "rgba(160, 216, 3, 1)",
      borderColor: "rgba(160, 216, 3, 0.35)",
    },
    sessionCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F3F4F6",
    },
    sessionDate: {
      fontSize: 16,
      fontWeight: "700",
      color: "#111827",
    },
    sessionBadge: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    sessionBadgeOngoing: {
      backgroundColor: "rgba(160, 216, 3, 0.2)",
    },
    sessionBadgeEnded: {
      backgroundColor: "#FEE2E2",
    },
    sessionBadgeText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#111827",
    },
    sessionBadgeTextEnded: {
      color: "#DC2626",
    },
    sessionTimeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    sessionTimeBlock: {
      flex: 1,
    },
    sessionTimeLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: "#6B7280",
      marginBottom: 4,
    },
    sessionTimeValue: {
      fontSize: 15,
      fontWeight: "600",
      color: "#111827",
    },
    sessionTimeOngoing: {
      color: "rgba(160, 216, 3, 1)",
    },
    sessionDetailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#F3F4F6",
    },
    sessionDetailRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    sessionDetailLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: "#6B7280",
    },
    sessionDetailValue: {
      fontSize: 14,
      fontWeight: "600",
      color: "#111827",
      flex: 1,
      textAlign: "right",
      marginLeft: 12,
    },
    sessionTimeSeparator: {
      fontSize: 14,
      color: "#9CA3AF",
      fontWeight: "500",
      marginHorizontal: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#6B7280",
    },
    value: {
      fontSize: 14,
      fontWeight: "500",
      color: "#111827",
    },
    statusRow: {
      marginTop: 12,
      alignItems: "flex-end",
    },
    status: {
      fontWeight: "600",
      fontSize: 13,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      overflow: "hidden",
    },
    activeStatus: {
      color: "#fff",
      backgroundColor: "rgba(160, 216, 3, 1)",
    },
    endStatus: {
      color: "#fff",
      backgroundColor: "#DC2626",
    },
  
  });
export default styles;
