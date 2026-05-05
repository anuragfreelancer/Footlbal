import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8FAF9",
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180, // Slightly taller for more presence
    backgroundColor: '#A0D803',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerTitleSection: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  mainHeaderTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 15,
    ...Platform.select({

      android: {
        elevation: 4,
      },
    }),
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  actionButtonText: {
    fontWeight: '800',
    color: '#FFFFFF',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F3F5',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectedCard: {
    borderColor: '#A0D803',
    backgroundColor: '#F7FCF0',
    borderWidth: 1.5,
    ...Platform.select({

      android: {
        elevation: 6,
      },
    }),
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: '#F1F3F5',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  playerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
  },
  position: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  checkboxContainer: {
    height: 28,
    width: 28,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxUnselected: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    borderColor: '#A0D803',
    backgroundColor: '#A0D803',
  },
  checkIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  fab: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#A0D803",
    borderRadius: 20,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({

      android: {
        elevation: 10,
      },
    }),
  },
  fabText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});


export default styles;
