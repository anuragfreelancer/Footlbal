import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F6", // Soft professional background
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: '#A0D803',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContainer: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
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
    width: 115,
    height: 115,
    borderRadius: 57.5,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
      },
      android: {
        // elevation: 6,
      },
    }),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C757D',
  },
  detailValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: "700",
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
      },
      android: {
        // elevation: 6,
      },
    }),
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    color: "#1A1A1A",
  },
  notesText: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  reportButton: {
    backgroundColor: 'rgba(160, 216, 3, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(160, 216, 3, 0.3)',
  },
  reportButtonText: {
    color: '#047857',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default styles;

