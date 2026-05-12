import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Animated,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import imageIndex from '../../../../assets/imageIndex';
import localizationStrings from '../../../../compoent/Localization/Localization';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import { StartSection, EndSection, GetQuestionByCoachApi } from '../../../../redux/Api/AuthApi';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import CustomHeader from '../../../../compoent/CustomHeader';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';
import { errorToast } from '../../../../utils/customToast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';




const StartSectionScreen = ({ route, navigation }: any) => {
  useLanguage();
  const { Before, Training, playerIds, coachId, mode } = route.params || {};

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [type, setType] = useState('training');

  // Dynamic Lists (API + Custom)
  const [availableBefore, setAvailableBefore] = useState<any[]>([]);
  const [availableAfter, setAvailableAfter] = useState<any[]>([]);

  // Selected questions
  const [selectedBefore, setSelectedBefore] = useState<any[]>([]);
  const [selectedAfter, setSelectedAfter] = useState<any[]>([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    if (!coachId) return;
    setFetchingQuestions(true);
    try {
      const allQs = await GetQuestionByCoachApi(coachId);
      console.log("sss", allQs)
      if (allQs && Array.isArray(allQs)) {
        const before = allQs.filter((q: any) => q.question_type === 'before_training');
        const after = allQs.filter((q: any) => q.question_type === 'after_training');
        setAvailableBefore(before);
        setAvailableAfter(after);
      }
    } catch (error) {
      console.error('Error fetching/loading questions:', error);
    } finally {
      setFetchingQuestions(false);
    }
  };

  const toggleQuestionSelection = (question: any, isBefore: boolean) => {
    ReactNativeHapticFeedback.trigger("impactLight");
    const list = isBefore ? selectedBefore : selectedAfter;
    const setList = isBefore ? setSelectedBefore : setSelectedAfter;

    if (list.some(q => q.id === question.id)) {
      setList(list.filter(q => q.id !== question.id));
    } else {
      setList([...list, question]);
    }
  };


  const handleStart = async () => {
    ReactNativeHapticFeedback.trigger("notificationSuccess");
    try {
      setLoading(true);
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = time.toTimeString().split(' ')[0];

      const params: any = {
        players: playerIds,
        date: formattedDate,
        time: formattedTime,
        coach_id: coachId,
        navigation: navigation,
      };

      const allSelectedIds = [...selectedBefore, ...selectedAfter].map(q => q.id).join(",");

      let response;
      if (mode === 'end') {
        params.question_id = allSelectedIds;
        response = await EndSection(params, setLoading);
      } else {
        params.session_type = type;
        params.question_id = allSelectedIds;
        response = await StartSection(params, setLoading);
      }

      if (response?.status === '1') {
        if (route.params?.onSuccess) route.params.onSuccess(response);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error:', error);
      errorToast(localizationStrings.Error || "")
    } finally {
      setLoading(false);
    }
  };

  const sessionTypes = [
    { key: 'training', label: localizationStrings.TrainingSession || "Training", icon: '🏃‍♂️' },
    { key: 'match', label: localizationStrings.MatchSession || "Match", icon: '⚽' },
    { key: 'break', label: localizationStrings.BreakSession || "Break", icon: '🧘' },
  ];

  const renderAllQuestions = (allList: any[], isBefore: boolean) => {
    if (allList.length === 0) {
      return (
        <View style={styles.emptyCardTrigger}>
          <Text style={styles.modalEmptyText}>{localizationStrings.NoQuestionnaireData}</Text>
        </View>
      );
    }

    const selectedList = isBefore ? selectedBefore : selectedAfter;

    return (
      <View style={styles.questionContainer}>
        {allList?.map((q, index) => {
          const isSelected = selectedList.some(item => item.id === q.id);
          return (
            <AnimatedItem
              key={q.id || index}
              onPress={() => toggleQuestionSelection(q, isBefore)}
              delay={(index + 3) * 100}
            >
              <View style={[styles.listItem, isSelected && styles.listItemActive]}>
                <Text style={[styles.liText, isSelected && styles.liTextActive]}>
                  {q?.question || q?.title || ''}
                </Text>
                <View style={[styles.liCheck, isSelected && styles.liCheckActive]}>
                  {isSelected && <Text style={styles.checkTxt}>✓</Text>}
                </View>
              </View>
            </AnimatedItem>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <StatusBarComponent />


      <SafeAreaView style={styles.flex} edges={['top']}>
        <CustomHeader
          imageSource={imageIndex.backNav}
          label={localizationStrings.StartSection}

        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* STICKY INDICATOR / PROGRESS (Optional, but adds premium feel) */}
              <View style={{ height: 1 }} />

              <View style={styles.main}>

                {/* STICKY INDICATOR / PROGRESS (Optional, but adds premium feel) */}
                <AnimatedItem
                  onPress={() => navigation.navigate(ScreenNameEnum.AddQuestion, { onSuccess: fetchQuestions, coachId: coachId })}
                  delay={600}
                >
                  <View style={styles.addBtn}>
                    <Text style={styles.addBtnTxt}>+{" "} {localizationStrings.AddCustomQuestionBtn || "Add Custom Question"}</Text>
                  </View>
                </AnimatedItem>
                {/* SESSION TYPE */}
                <View style={styles.glassCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.sectionLabel}>{localizationStrings.SessionType}</Text>
                  </View>
                  <View style={[styles.typeGrid, {
                    marginTop: 15,
                    marginBottom: 5
                  }]}>
                    {sessionTypes.map((item, index) => (
                      <AnimatedItem
                        key={item.key}
                        onPress={() => setType(item.key)}
                        delay={index * 100}
                        style={{ flex: 1 }}
                      >
                        <View style={[styles.typeBox, type === item.key && styles.typeBoxActive]}>

                          <Text
                            style={[styles.typeTxt, type === item.key && styles.typeTxtActive]}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                          >
                            {item.label}
                          </Text>
                          {type === item.key && <View style={styles.activeIndicator} />}
                        </View>
                      </AnimatedItem>
                    ))}
                  </View>
                </View>

                {/* QUESTIONNAIRES */}
                {fetchingQuestions ? (
                  <View style={styles.modalLoader}>
                    <ActivityIndicator color="#A0D803" size="large" />
                    <Text style={styles.loaderTxt}>Chargement des questions...</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.glassCard}>
                      <View style={styles.sectionHeaderRow}>
                        <View style={styles.cardHeader}>
                          <View style={[styles.cardDot, { backgroundColor: '#10B981' }]} />
                          <Text style={styles.sectionLabel}>{Before || (localizationStrings.BeforeSessionHeader || "BEFORE SESSION")}</Text>
                        </View>
                        <View style={styles.countBadge}>
                          <Text style={styles.countText}>{selectedBefore.length}/{availableBefore.length}</Text>
                        </View>
                      </View>
                      {renderAllQuestions(availableBefore, true)}
                    </View>

                    <View style={styles.glassCard}>
                      <View style={styles.sectionHeaderRow}>
                        <View style={styles.cardHeader}>
                          <View style={[styles.cardDot, { backgroundColor: '#F59E0B' }]} />
                          <Text style={styles.sectionLabel}>{Training || (localizationStrings.AfterSessionHeader || "AFTER SESSION")}</Text>
                        </View>
                        <View style={[styles.countBadge, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }]}>
                          <Text style={[styles.countText, { color: '#D97706' }]}>{selectedAfter.length}/{availableAfter.length}</Text>
                        </View>
                      </View>
                      {renderAllQuestions(availableAfter, false)}
                    </View>
                  </>
                )}

                {/* ADD QUESTION BTN */}


                {/* SCHEDULE */}
                <View style={styles.glassCard}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardDot, { backgroundColor: '#6366F1' }]} />
                    <Text style={styles.sectionLabel}>{localizationStrings.Schedule || ""}</Text>
                  </View>
                  <View style={[styles.pickContainer, {
                    marginTop: 9
                  }]}>
                    <TouchableOpacity style={styles.pickBox} onPress={() => setDatePickerVisibility(true)}>
                      <View style={[styles.pickIconBox, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
                        <Image source={imageIndex.calendar} style={[styles.pickIcon, { tintColor: '#6366F1' }]} />
                      </View>
                      <View>
                        <Text style={styles.pickLabel}>{localizationStrings.DateLabel || "DATE"}</Text>
                        <Text style={styles.pickValue}>{date.toLocaleDateString()}</Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.pickDivider} />

                    <TouchableOpacity style={styles.pickBox} onPress={() => setTimePickerVisibility(true)}>
                      <View style={[styles.pickIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                        <Image source={imageIndex.clocks} style={[styles.pickIcon, { tintColor: '#10B981' }]} />
                      </View>
                      <View>
                        <Text style={styles.pickLabel}>{localizationStrings.Time || "TIME"}</Text>
                        <Text style={styles.pickValue}>{time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </ScrollView>

            {/* PREMIUM FOOTER */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.mainBtn, loading && styles.btnDisabled]}
                onPress={handleStart}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <View style={styles.btnContent}>
                    <Text style={styles.mainBtnTxt}>{localizationStrings.StartSection || "Start section"}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={(d) => { setDate(d); setDatePickerVisibility(false); }} onCancel={() => setDatePickerVisibility(false)} />
        <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={(t) => { setTime(t); setTimePickerVisibility(false); }} onCancel={() => setTimePickerVisibility(false)} />
      </SafeAreaView>
    </View>
  );
};

export default StartSectionScreen;

const AnimatedItem = ({ children, isSelected, onPress, delay = 0, style }: any) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        tension: 40,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[{ opacity, transform: [{ scale }, { translateY }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={style}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAFC' },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: hp(22) },
  main: { padding: wp(5) },

  // HEADER
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  backCircle: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backIcon: { width: wp(5), height: wp(5), resizeMode: 'contain' },
  headerTitle: { fontSize: hp(2.4), fontWeight: '600', color: '#0F172A', letterSpacing: 0.5 },

  // CARDS
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: wp(8),
    padding: wp(5),
    marginBottom: hp(2.5),
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
  },
  cardDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A0D803', marginRight: 10 },
  sectionLabel: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: 'black',
    letterSpacing: 1.5,
  },

  // SESSION TYPES
  typeGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: wp(3) },
  typeBox: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: wp(10),
    minHeight: hp(5),
    alignItems: 'center',
    justifyContent: "center",
    borderWidth: 2,
    borderColor: 'transparent',
    padding: wp(2),
    position: 'relative',
    overflow: 'hidden',
  },
  typeBoxActive: {
    backgroundColor: '#A0D803',
    borderColor: '#A0D803',
  },
  iconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(4),
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  iconContainerActive: { backgroundColor: 'rgba(160, 216, 3, 0.15)' },
  typeIcon: { fontSize: hp(3) },
  typeTxt: { fontSize: hp(2.5), fontWeight: '600', color: 'black', textAlign: 'center' },
  typeTxtActive: { color: '#0F172A', fontWeight: '600' },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '40%',
    height: 4,
    backgroundColor: '#A0D803',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  // QUESTIONS
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countBadge: {
    backgroundColor: 'rgba(160, 216, 3, 0.1)',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: 'rgba(160, 216, 3, 0.2)',
    minWidth: wp(12),
    alignItems: 'center',
  },
  countText: { fontSize: hp(1.2), fontWeight: '600', color: '#166534' },
  questionContainer: { gap: hp(1.2) },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: wp(4),
    borderRadius: wp(5),
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  listItemActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A0D803',
    shadowColor: '#A0D803',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  liText: { fontSize: hp(1.7), fontWeight: '600', color: '#475569', flex: 1 },
  liTextActive: { color: '#0F172A', fontWeight: '800' },
  liCheck: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(2),
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  liCheckActive: { backgroundColor: '#A0D803', borderColor: '#A0D803' },
  checkTxt: { color: '#FFF', fontSize: hp(1.2), fontWeight: '600' },

  // ADD BUTTON
  addBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(5),
    borderRadius: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3),
    borderWidth: 2,
    borderColor: '#A0D803',
    borderStyle: 'dotted',
    justifyContent: "center",
  },
  addIconCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: 'rgba(160, 216, 3, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  addPlus: { color: '#A0D803', fontSize: hp(2.9), fontWeight: '700' },
  addBtnTxt: { color: 'black', fontSize: hp(2), fontWeight: '600' },

  // SCHEDULE
  pickContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: wp(6),
    padding: wp(1),
    borderWidth: 1,
    borderColor: '#e9f0e2ff',
  },
  pickBox: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: wp(3.5) },
  pickIconBox: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  pickIcon: { width: wp(4.5), height: wp(4.5) },
  pickLabel: { fontSize: hp(1.1), fontWeight: '800', color: '#94A3B8', marginBottom: 2, },
  pickValue: { fontSize: hp(1.6), fontWeight: '600', color: '#0F172A' },
  pickDivider: { width: 1, height: '50%', backgroundColor: '#E2E8F0', alignSelf: 'center' },

  // FOOTER & MAIN BUTTON
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(2.5),
  },
  mainBtn: {
    backgroundColor: '#A0D803',
    borderRadius: wp(6),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnDisabled: { backgroundColor: '#CBD5E1', shadowOpacity: 0 },
  btnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  mainBtnTxt: { fontSize: hp(2), fontWeight: '600', color: '#FFF', letterSpacing: 1, },
  btnArrowCircle: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(3),
  },
  btnArrow: { color: '#FFF', fontSize: hp(1.8), fontWeight: '600' },

  // LOADERS
  modalLoader: { padding: hp(5), alignItems: 'center' },
  loaderTxt: { marginTop: hp(1.5), color: 'black', fontWeight: '600' },
  emptyCardTrigger: { padding: hp(4), alignItems: 'center', justifyContent: 'center' },
  modalEmptyText: { color: '#94A3B8', fontSize: hp(1.7), textAlign: 'center', fontStyle: 'italic', lineHeight: hp(2.5) },
});
