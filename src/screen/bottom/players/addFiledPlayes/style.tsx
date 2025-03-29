
import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15, marginBottom: 20, },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  profileContainer: { alignItems: 'center', marginTop: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 18, marginBottom: 10, color: "#000000" },
  input: { borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8', },
  dropdownContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10, backgroundColor: '#f8f8f8' },
  picker: { height: 50, width: '100%' },
  radioButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, },
  radioText: { marginLeft: 10, fontSize: 14, color: "#ADA4A5" },
  saveButton: { backgroundColor: '#BFFF00', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 20 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  textInupt: {
    color: "#2D2D2D",
    fontSize: 14,
    fontWeight: "400"
  }
});
export default styles;
