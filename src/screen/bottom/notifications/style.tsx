
import {   StyleSheet } from 'react-native';
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginTop: 15
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    fontSize: 12,
    color: '#28A745',
    fontWeight: 'bold',
    backgroundColor: '#DFF6DD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
export default styles;
