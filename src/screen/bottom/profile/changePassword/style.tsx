import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#F4F7F6", // Soft professional background
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: '#A0D803', // Brand green
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerWrapper: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 55,
    borderRadius: 24,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        // elevation: 8,
      },
    }),
  },
  inputWrapper: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  butt: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 15,
  },
  saveButtonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#A0D803",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        // elevation: 8,
      },
    }),
  },
});

export default styles;

