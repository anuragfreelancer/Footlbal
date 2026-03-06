
import {   StyleSheet } from 'react-native';
      
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 5,},
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#000' },
  profileContainer: { alignItems: 'center', marginVertical: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, },
  detailLabel: { fontSize: 16, fontWeight: '700', color: '#000',marginLeft:5 },
  detailValue: { fontSize: 14, color: '#5A6565', right: 18,fontWeight:"700" },
  notesContainer: { borderRadius: 10, margin: 20 },
  notesTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: "#000000" },
  notesText: { fontSize: 16, color: '#9DB2BF', marginBottom: 5, lineHeight: 25 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 ,alignItems:"center" },
  button: {height:55,alignItems:"center",justifyContent:"center",  paddingHorizontal: 20, borderRadius: 40,width:"40%" },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' , textAlign:"center"},
butt:{
  justifyContent: 'flex-start', marginBottom: 11,
  marginHorizontal: 15
},
  buttCol: {  backgroundColor: "#A0D803", padding: 10, borderTopRightRadius: 20, borderBottomRightRadius: 20 }
});
export default styles;
