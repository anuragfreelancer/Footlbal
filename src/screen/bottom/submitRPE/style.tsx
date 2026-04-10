import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const horizontalPadding = 20;

const styles = StyleSheet.create({
  keyboardAvoid: { flex: 1 },
  container: { flex: 1, padding: horizontalPadding, paddingBottom: 16, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 120 },
  header: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 24, color: "#0f172a" },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  label: { fontSize: 14, marginBottom: 10, fontWeight: "600", color: "#334155" },
  errorText: { color: "#DC2626", fontSize: 12, marginTop: 6 },
  radioGroup: { flexDirection: "row", alignItems: "center", gap: 20 },
  radioItem: { flexDirection: "row", alignItems: "center" },
  radioIcon: { height: 22, width: 22, marginRight: 8 },
  radioText: { color: "#1e293b", fontSize: 15, fontWeight: "600" },
  datePicker: {
    borderColor: "#E2E8F0",
    padding: 14,
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  datePickerText: { fontSize: 14, color: "#334155", flex: 1, flexShrink: 0 },
  dateTimeRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  commentsInput: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  commentsInputText: { fontSize: 14, color: "#1e293b", paddingVertical: 0 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  calendarContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 16, width: 320 },
  closeButton: { marginTop: 16, padding: 14, backgroundColor: "#A0D803", borderRadius: 12, alignItems: "center" },
  closeButtonText: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  buttView: { paddingHorizontal: 20, paddingVertical: 16, marginBottom: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" },

  // ─── Question Slider Card ─────────────────────────────────────────
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
    color: "#0f172a",
  },

  // Slider track with colored segments
  sliderContainer: {
    position: "relative",
    height: 20,
    justifyContent: "center",
    marginHorizontal: 0,
  },
  sliderTrackBase: {
    height: 6,
    borderRadius: 3,
    flexDirection: "row",
    overflow: "hidden",
  },
  sliderSegment: {
    flex: 1,
    height: 6,
  },
  sliderThumbOuter: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    top: -4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderThumbInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  // ─── Tick marks ───────────────────────────────────────────────────
  tickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 0,
  },
  tickLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "600",
    width: 24,
    textAlign: "center",
  },

  // Vertical accent markers on the track
  accentMarker: {
    position: "absolute",
    width: 3,
    height: 18,
    borderRadius: 1.5,
    top: 1,
    zIndex: 2,
  },

  // ─── Text toggle / input ──────────────────────────────────────────
  textToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  textToggleBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginLeft: 6,
  },
  questionTextInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    fontSize: 14,
    color: "#1e293b",
  },

  // ─── Section header for questionnaire area ────────────────────────
  questionnaireSectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 16,
    marginTop: 8,
  },

  // ─── Header Banner (HMMP RPE style) ──────────────────────────────
  headerBanner: {
    backgroundColor: "#1E3A5F",
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerBackBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerBackText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    marginTop: 4,
  },
});

export default styles;
