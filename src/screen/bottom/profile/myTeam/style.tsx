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
    backgroundColor: '#A0D803', // Brand green
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerWrapper: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 24,
    justifyContent: "space-between",
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        // elevation: 10,
      },
    }),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        // elevation: 4,
      },
    }),
  },
  profileInfo: {
    flex: 1,
    marginLeft: 18,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  profileLink: {
    fontSize: 14,
    color: "#A0D803",
    fontWeight: "700",
    marginTop: 4,
  },
  sectionTitle: {
    marginHorizontal: 22,
    fontSize: 18,
    color: "#1A1A1A",
    fontWeight: "800",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 22,
    marginVertical: 8,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
      },
      android: {
        // elevation: 5,
      },
    }),
  },
  playerAvatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "rgba(160, 216, 3, 0.1)",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  position: {
    fontSize: 13,
    color: "#6C757D",
    marginTop: 2,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    backgroundColor: "rgba(160, 216, 3, 0.08)",
    padding: 8,
    borderRadius: 10,
  },
  actionIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  editIcon: {
    tintColor: "#A0D803",
  },
  msgIcon: {
    tintColor: "#007AFF",
  },
  detailContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    color: "#ADB5BD",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 13,
    color: "#495057",
    fontWeight: "700",
    marginTop: 2,
  },
});

export default styles;

