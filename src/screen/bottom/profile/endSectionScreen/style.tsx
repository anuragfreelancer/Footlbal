
import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white",},
  header: { fontSize: 24,color:"black", fontWeight: "700", textAlign: "center", marginTop:28  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal:1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 ,
backgroundColor:"gray"
    
   },
  infoContainer: { flex: 1 },
  name: { fontSize: 12, fontWeight: "600",color:"black" },
  position: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)"  },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600",color:"black" },
  value: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7ED321",
    borderRadius: 30,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
  },
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default styles;
