
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
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F3F4F6",
    },
    sessionCardInner: {
      flex: 1,
    },
    sessionInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    sessionIcon: {
      width: 18,
      height: 18,
      tintColor: "#6B7280",
      marginRight: 10,
    },
    sessionInfoContent: {
      flex: 1,
    },
    sessionInfoLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: "#9CA3AF",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    sessionInfoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1F2937",
    },
    questionSectionHome: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: "#F3F4F6",
    },
    questionHeaderHome: {
      fontSize: 14,
      fontWeight: "700",
      color: "#111827",
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    questionItemHome: {
      backgroundColor: "#F9FAFB",
      borderRadius: 12,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: "#F3F4F6",
    },
    questionLabelHome: {
      fontSize: 11,
      fontWeight: "700",
      color: "#9CA3AF",
      textTransform: "uppercase",
      marginBottom: 4,
    },
    questionTextHome: {
      fontSize: 13,
      fontWeight: "600",
      color: "#374151",
      lineHeight: 18,
    },
    answerLabelHome: {
      fontSize: 11,
      fontWeight: "700",
      color: "rgba(160, 216, 3, 1)",
      textTransform: "uppercase",
      marginTop: 8,
      marginBottom: 4,
    },
    answerTextHome: {
      fontSize: 13,
      fontWeight: "500",
      color: "#4B5563",
      lineHeight: 18,
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
    rateButton: {
      marginTop: 12,
      backgroundColor: "rgba(160, 216, 3, 1)",
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "rgba(160, 216, 3, 0.4)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    rateButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#0f172a",
    },
    ratingGivenBadge: {
      marginTop: 12,
      backgroundColor: "#F1F5F9",
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E2E8F0",
    },
    ratingGivenText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#64748B",
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 12,
        textAlign: 'center'
    },
    modalMessage: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        gap: 12
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelBtn: {
        backgroundColor: '#F3F4F6'
    },
    endBtn: {
        backgroundColor: '#EF4444'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '700'
    },
    endButton: {
      marginTop: 12,
      backgroundColor: "#EF4444",
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "rgba(239, 68, 68, 0.4)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    endButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#fff',
    },
  });
export default styles;
