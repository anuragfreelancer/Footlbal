import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(5),
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(6),
    padding: wp(5),
    marginBottom: hp(2.5),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  inputLabel: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
    marginBottom: hp(1.5),
  },
  segmentControlContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: wp(4),
    height: hp(6.5),
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    padding: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  segmentSlider: {
    position: 'absolute',
    height: hp(5.5),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginHorizontal: 4,
  },
  segmentItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  segmentTxt: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: '#64748B',
    textTransform: "lowercase",

  },
  segmentTxtActive: {
    color: '#192a0fff',
    fontWeight: '700',
    fontSize: hp(1.7),
  },
  textInputWrapper: {
    backgroundColor: '#F8FAFC',
    borderRadius: wp(4),
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    padding: wp(4),
    minHeight: hp(20),
  },
  textInput: {
    fontSize: hp(1.8),
    color: '#0F172A',
    lineHeight: hp(2.5),
    fontWeight: '500',
    textAlignVertical: 'top',
    flex: 1,
  },
  footer: {
    paddingHorizontal: wp(6),
    paddingTop: hp(2),

  },
  submitBtn: {
    backgroundColor: '#A0D803',
    borderRadius: wp(4),
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',

  },
  submitBtnDisabled: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
  },
  submitBtnTxt: {
    color: '#FFF',
    fontSize: hp(1.9),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
