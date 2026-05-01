
import { StyleSheet } from 'react-native';
import ResponsiveSize from '../../../../utils/ResponsiveSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#A0D803",
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1C1E",
  },
  profileLink: {
    fontSize: 14,
    color: "#A0D803",
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  playerAvatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1C1E",
  },
  position: {
    fontSize: 13,
    color: "#6C757D",
    marginTop: 2,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  actionButton: {
    marginRight: 12,
    backgroundColor: "#F8F9FA",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
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
  deleteIcon: {
    tintColor: "#FF4D4D",
  },
  detailContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: 10,
  },
  label: {
    fontSize: 11,
    color: "#ADB5BD",
    fontWeight: "600",
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 12,
    color: "#495057",
    fontWeight: "700",
    marginTop: 2,
  },
});

export default styles;
