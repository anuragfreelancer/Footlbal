
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 15, marginBottom: 40, },
   profileContainer: { alignItems: 'center', marginTop: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 80 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 18, marginBottom: 10, color: "#000000" },
  input: { height:55,
    justifyContent:"center", borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8', },
  dropdownContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10, backgroundColor: '#f8f8f8' },
  picker: { height: 50, width: '100%' },
  radioButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, },
  radioText: { marginLeft: 10, fontSize: 15, color: "#ADA4A5" },
  saveButton: { backgroundColor: '#BFFF00', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 20 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  textInupt: {
    color: "#2D2D2D",
    fontSize: 14,
    fontWeight: "400"
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8',
  },
  img: {
    height: 22,
    width: 22
  },
  butt: {
    justifyContent: 'flex-start', marginBottom: 5,
    marginHorizontal: 15
  },
  dropView: {
    height: 45,
    justifyContent: "center",
  },
  redText: {
    color: "red", bottom: 5
  },
  dobText: {
    color: "#2D2D2D",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 5
  }
});
export default styles;
