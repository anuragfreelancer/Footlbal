
import { StyleSheet } from 'react-native';
import ResponsiveSize from '../../../../utils/ResponsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Light gray background for a modern feel
  },
  headerWrapper: {
    paddingHorizontal: ResponsiveSize.width(16),
    paddingTop: ResponsiveSize.height(10),
    backgroundColor: "#fff",
  },
  coachSection: {
    backgroundColor: "#fff",
    paddingVertical: ResponsiveSize.height(20),
    paddingHorizontal: ResponsiveSize.width(16),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: ResponsiveSize.height(10),
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: ResponsiveSize.height(80),
    height: ResponsiveSize.height(80),
    borderRadius: ResponsiveSize.height(40),
    borderWidth: 3,
    borderColor: "#A0D803", // Lime green ring
  },
  profileInfo: {
    marginLeft: ResponsiveSize.width(16),
    flex: 1,
  },
  profileName: {
    fontSize: ResponsiveSize.fSize(20),
    fontWeight: "800",
    color: "#1A1C1E",
  },
  profileLink: {
    fontSize: ResponsiveSize.fSize(14),
    color: "#6C757D",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: ResponsiveSize.width(16),
    marginVertical: ResponsiveSize.height(15),
    paddingHorizontal: ResponsiveSize.width(12),
    height: ResponsiveSize.height(50),
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: ResponsiveSize.fSize(14),
    color: "#1A1C1E",
  },
  listHeader: {
    marginHorizontal: ResponsiveSize.width(16),
    marginTop: 5,
    marginBottom: 5,
    fontSize: ResponsiveSize.fSize(18),
    color: "#1A1C1E",
    fontWeight: "800",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: ResponsiveSize.width(12),
    borderRadius: 18,
    marginVertical: ResponsiveSize.height(8),
    marginHorizontal: ResponsiveSize.width(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  playerAvatar: {
    height: ResponsiveSize.height(54),
    width: ResponsiveSize.height(54),
    borderRadius: ResponsiveSize.height(27),
    borderWidth: 2,
    borderColor: "#F1F3F5",
  },
  infoContainer: {
    flex: 1,
    marginLeft: ResponsiveSize.width(14),
  },
  name: {
    fontSize: ResponsiveSize.fSize(15),
    fontWeight: "700",
    color: "#1A1C1E",
  },
  position: {
    fontSize: ResponsiveSize.fSize(13),
    color: "#99A1A7",
    marginTop: 2,
  },
  detailContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  arrowIcon: {
    height: 20,
    width: 20,
    tintColor: "#CED4DA",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  label: {
    fontSize: ResponsiveSize.fSize(11),
    color: "#99A1A7",
    fontWeight: "500",
  },
  value: {
    fontSize: ResponsiveSize.fSize(11),
    color: "#1A1C1E",
    fontWeight: "700",
    marginLeft: 4,
  },
});

export default styles;
