import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: -8,
    marginBottom: 24,
    marginLeft: 16,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  segmentActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  segmentTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  segmentTxtActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  textInputWrapper: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 20
  },
  textInput: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
    textAlignVertical: 'top',
    height: '80%',
  },
  footer: {
    padding: 24,

    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  submitBtn: {
    backgroundColor: '#A0D803',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',

  },
  submitBtnDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnTxt: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
