
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", }, // Lighter gray for background
  header: { fontSize: 24, color: "#111827", fontWeight: "700", textAlign: "center", marginTop: 28 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827"
  },
  position: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2
  },
  contentContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  endButton: {
    backgroundColor: "#EF4444", // Red for "End"
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  endButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  questionSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  questionItem: {
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 8,
  },
  questionLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  questionText: {
    fontSize: 13,
    color: "#1E293B",
    marginTop: 2,
    fontWeight: "500",
  },
  answerText: {
    fontSize: 13,
    color: "#059669",
    marginTop: 2,
    fontWeight: "600",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 12, // Circular checkbox
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: "#EF4444",
    backgroundColor: "#EF4444",
  }
});
export default styles;
