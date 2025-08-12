
import {   StyleSheet } from 'react-native';
      
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      marginHorizontal: 15,
      marginTop:25
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal:15,
   
    },
    // card: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   backgroundColor: "white",
    //   padding: 10,
    //   borderRadius: 15,
    //   marginVertical: 6,
    //   marginHorizontal:2,
    //   shadowColor: "#000",
    //   shadowOpacity: 0.1,
    //   shadowRadius: 5,
    //   elevation: 1,
    
    // },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    infoContainer: { flex: 1 },
    name: { fontSize: 12, fontWeight: "600",color:"black" },
    position: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)"  },
    detailContainer: { alignItems: "center", marginHorizontal: 10 },
    // label: { fontSize: 12, fontWeight: "600",color:"black" },
    // value: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)" },
  
    userInfo: {
      marginLeft: 15,
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    userSubtitle: {
      fontSize: 14,
      color: "gray",
    },
    notificationIcon: {
      padding: 10,
    },
    chartStyle: {
      marginVertical: 8,
      borderRadius: 10,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    activeCard: {
      borderColor: "#4CAF50",
      borderWidth: 2,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    label: {
      fontWeight: "600",
      color: "#555",
    },
    value: {
      fontWeight: "500",
      color: "#222",
    },
    statusRow: {
      marginTop: 8,
      alignItems: "flex-start",
    },
    status: {
      fontWeight: "700",
      fontSize: 14,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
    },
    activeStatus: {
      color: "#fff",
      backgroundColor: "#4CAF50",
    },
    endStatus: {
      color: "#fff",
      backgroundColor: "#E53935",
    },
  
  });
export default styles;
