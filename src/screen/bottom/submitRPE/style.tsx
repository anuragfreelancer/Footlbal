
  import {   StyleSheet } from 'react-native';
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    label: { fontSize: 16, marginTop: 10, fontWeight: "600" },
    radioGroup: { flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 15 },
    radioItem: { flexDirection: "row", alignItems: "center", marginRight: 20 },
    radioIcon: { height: 22, width: 22, marginRight: 5 },
    radioText: { color: "black", fontSize: 16, fontWeight: "600" },
    datePicker: { borderColor: "#0000000D", padding: 10, borderWidth: 1, flexDirection: "row", borderRadius: 5, marginTop: 15, backgroundColor: "#f9f9f9", justifyContent: "space-between" },
    input: { backgroundColor: "#F3F3F3", borderRadius: 20, padding: 10, marginTop: 20, height: 160, },
    submitButton: { backgroundColor: "#A8EB12", padding: 15, alignItems: "center", borderRadius: 5, marginTop: 20 },
    submitText: { color: "#000", fontWeight: "bold", fontSize: 16 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    calendarContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 320 },
    closeButton: { marginTop: 10, padding: 10, backgroundColor: "#A8EB12", borderRadius: 25, alignItems: "center" },
    closeButtonText: { fontSize: 14, fontWeight: "bold", color: "white" },
    buttView: { justifyContent: 'flex-start', marginHorizontal:15,marginBottom:11  },
    
    pickerContainer: {
      backgroundColor: '#fff',
      margin: 20,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
    },
    doneButton: {
      marginTop: 20,
      backgroundColor: '#007bff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    doneButtonText: {
      color: 'white',
      fontSize: 16,
    },
    cardWrapper: {
      marginBottom: 15,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 18,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2c3e50',
      flex: 1,
    },
    arrowIcon: {
      height: 16,
      width: 16,
      tintColor: '#2c3e50',
    },
    expandedSection: {
      padding: 15,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    datetime: {
      fontSize: 14,
      color: 'balck',
      fontWeight: "500"
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
    
    export default styles;
