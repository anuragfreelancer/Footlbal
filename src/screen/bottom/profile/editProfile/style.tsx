import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#F0F3F5", // Even softer premium background
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#A0D803', // Brand green
    borderBottomLeftRadius: 50, // More pronounced curve
    borderBottomRightRadius: 50,
  },
  headerWrapper: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },
  iamgeView: {
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  profileImage: {
    height: 115,
    width: 115,
    borderRadius: 57.5,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#A0D803',
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 6,
    //   },

    // }),
  },
  cameraIcon: {
    height: 20,
    width: 20,
    tintColor: '#FFFFFF',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 28,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
      },
      android: {
        // elevation: 6,
      },
    }),
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    marginBottom: 5, // Spacing handled by TextInputField marginVertical
  },
  buttView: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: 'transparent',
  },
  saveButtonShadow: {

  },
  errorText: {
    color: "#FF3B30",
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default styles;


