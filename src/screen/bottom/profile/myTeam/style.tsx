import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp(22),
    backgroundColor: '#A0D803',
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
  },
  headerWrapper: {
    marginHorizontal: wp(3),
    marginTop: hp(1),
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(5),
    marginTop: hp(2),
    padding: wp(5),
    backgroundColor: "white",
    borderRadius: wp(6),
    justifyContent: "space-between",
    marginBottom: hp(3),
    borderWidth: 1.5,
    borderColor: "rgba(160, 216, 3, 1)",
  },
  avatar: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    borderWidth: 3,
    borderColor: "#FFFFFF",
    backgroundColor: '#F1F5F9',
  },
  profileInfo: {
    flex: 1,
    marginLeft: wp(4),
  },
  profileName: {
    fontSize: hp(2.4),
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  profileLink: {
    fontSize: hp(1.6),
    color: "#A0D803",
    fontWeight: "700",
    marginTop: hp(0.5),
  },
  sectionTitle: {
    marginHorizontal: wp(6),
    fontSize: hp(2),
    color: "#0F172A",
    fontWeight: "800",
    marginBottom: hp(2),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: wp(4),
    borderRadius: wp(5),
    marginVertical: hp(1),
    marginHorizontal: wp(5),
    borderWidth: 1.5,
    borderColor: "rgba(160, 216, 3, 1)",
  },
  playerAvatar: {
    height: wp(15),
    width: wp(15),
    borderRadius: wp(7.5),
    borderWidth: 2,
    borderColor: "rgba(160, 216, 3, 0.1)",
    backgroundColor: '#F1F5F9',
  },
  infoContainer: {
    flex: 1,
    marginLeft: wp(4),
  },
  name: {
    fontSize: hp(1.9),
    fontWeight: "700",
    color: "#0F172A",
  },
  position: {
    fontSize: hp(1.5),
    color: "#64748B",
    marginTop: 2,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1.2),
    gap: wp(3),
  },
  actionButton: {
    backgroundColor: "rgba(160, 216, 3, 0.1)",
    padding: wp(2),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: 'rgba(160, 216, 3, 0.2)',
  },
  actionIcon: {
    height: wp(4),
    width: wp(4),
    resizeMode: 'contain',
  },
  editIcon: {
    tintColor: "#A0D803",
  },
  msgIcon: {
    tintColor: "#3B82F6",
  },
  detailContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  label: {
    fontSize: hp(1.2),
    color: "#94A3B8",
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: hp(1.6),
    color: "#475569",
    fontWeight: "700",
    marginTop: 2,
  },
});

export default styles;

