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
  Modal,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import imageIndex from '../../../../assets/imageIndex';
import localizationStrings from '../../../../compoent/Localization/Localization';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import { StartSection, EndSection, GetQuestionByCoachApi, AddQuestionApi } from '../../../../redux/Api/AuthApi';
import CustomHeader from '../../../../compoent/CustomHeader';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';




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

  // Modals Visibility
  const [showAddQModal, setShowAddQModal] = useState(false);

  // New Question Form State
  const [newQText, setNewQText] = useState('');
  const [newQType, setNewQType] = useState<'before' | 'after'>('before');

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

  const handleAddNewQuestion = async () => {
    if (!newQText.trim()) return;
    if (!coachId) {
      Alert.alert(localizationStrings.Error, localizationStrings.SomethingWentWrong);
      return;
    }

    try {
      setLoading(true);
      const params = {
        coach_id: coachId,
        session_id: '0',
        question: newQText.trim(),
        question_type: newQType === 'before' ? 'before_training' : 'after_training'
      };

      const response = await AddQuestionApi(params, setLoading);
      if (response && response.status === '1') {
        Alert.alert(localizationStrings.Success, localizationStrings.SubmittedSuccess);
        setNewQText('');
        setShowAddQModal(false);
        fetchQuestions(); // Refresh list from backend
      }
    } catch (error) {
      console.error('Error adding custom question:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestionSelection = (question: any, isBefore: boolean) => {
    const list = isBefore ? selectedBefore : selectedAfter;
    const setList = isBefore ? setSelectedBefore : setSelectedAfter;

    if (list.some(q => q.id === question.id)) {
      setList(list.filter(q => q.id !== question.id));
    } else {
      setList([...list, question]);
    }
  };


  const handleStart = async () => {
    // if (selectedBefore.length === 0 || selectedAfter.length === 0) {
    //   Alert.alert(
    //     localizationStrings.Validation || "Validation",
    //     "Please select at least one question for both sections."
    //   );
    //   return;
    // }

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
      Alert.alert(localizationStrings.Error, localizationStrings.SomethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  const sessionTypes = [
    { key: 'training', label: localizationStrings.TrainingSession || "Training", icon: '🏃' },
    { key: 'match', label: localizationStrings.MatchSession || "Match", icon: '⚽' },
    { key: 'break', label: localizationStrings.BreakSession || "Break", icon: '🧘' },
  ];

  const renderAllQuestions = (allList: any[], isBefore: boolean) => {
    if (allList.length === 0) {
      return (
        <View style={styles.emptyCardTrigger}>
          <Text style={styles.modalEmptyText}>{localizationStrings.StartSectionScreen_NoQuestionsAvailable || "No questions available. Tap \"Add Question\" below."}</Text>
        </View>
      );
    }

    const selectedList = isBefore ? selectedBefore : selectedAfter;

    return (
      <View style={styles.questionContainer}>
        {allList.map((q, index) => {
          const isSelected = selectedList.some(item => item.id === q.id);
          return (
            <TouchableOpacity
              key={q.id || index}
              style={[styles.listItem, isSelected && styles.listItemActive]}
              onPress={() => toggleQuestionSelection(q, isBefore)}
            >
              <View style={styles.flex}>
                <Text style={[styles.liText, isSelected && styles.liTextActive]}>
                  {q.question || q.title || ''}
                </Text>
              </View>
              <View style={styles.liActionRow}>
                <View style={[styles.liCheck, isSelected && styles.liCheckActive]}>
                  {isSelected && <Text style={styles.checkTxt}>✓</Text>}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <StatusBarComponent />

      <View style={{ marginHorizontal: 12, marginTop: 5 }}>
        <CustomHeader
          imageSource={imageIndex.backNav}
          label={localizationStrings.AddNewQuestion || "Add Question / Start Session"}
        />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.main}>

              {/* SESSION TYPE */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionLabel}>{localizationStrings.StartSectionScreen_SessionType || "SESSION TYPE"}</Text>
                <View style={styles.typeGrid}>
                  {sessionTypes.map((item) => (
                    <TouchableOpacity
                      key={item.key}
                      style={[styles.typeBox, type === item.key && styles.typeBoxActive]}
                      onPress={() => setType(item.key)}
                    >
                      <Text style={[styles.typeTxt, type === item.key && styles.typeTxtActive]}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* QUESTIONNAIRES */}
              {fetchingQuestions ? (
                <View style={styles.modalLoader}>
                  <ActivityIndicator color="#A0D803" size="large" />
                </View>
              ) : (
                <>
                  <View style={styles.sectionCard}>
                    <View style={styles.sectionHeaderRow}>
                      <Text style={styles.sectionLabel}>{Before || (localizationStrings.BeforeSessionHeader || "BEFORE SESSION")}</Text>
                      <View style={styles.countBadge}><Text style={styles.countText}>{selectedBefore.length} / {availableBefore.length}</Text></View>
                    </View>
                    {renderAllQuestions(availableBefore, true)}
                  </View>

                  <View style={styles.sectionCard}>
                    <View style={styles.sectionHeaderRow}>
                      <Text style={styles.sectionLabel}>{Training || (localizationStrings.AfterSessionHeader || "AFTER SESSION")}</Text>
                      <View style={[styles.countBadge, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.countText, { color: '#B45309' }]}>{selectedAfter.length} / {availableAfter.length}</Text></View>
                    </View>
                    {renderAllQuestions(availableAfter, false)}
                  </View>
                </>
              )}

              {/* ADD QUESTION BTN */}
              <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddQModal(true)}>
                <Text style={styles.addBtnTxt}>{localizationStrings.AddCustomQuestionBtn || "+ Add Custom Question"}</Text>
              </TouchableOpacity>

              {/* SCHEDULE */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionLabel}>{localizationStrings.StartSectionScreen_Schedule || "SCHEDULE"}</Text>
                <View style={styles.pickContainer}>
                  <TouchableOpacity style={styles.pickBox} onPress={() => setDatePickerVisibility(true)}>
                    <View style={styles.pickIconBox}><Image source={imageIndex.calendar} style={styles.pickIcon} /></View>
                    <View>
                      <Text style={styles.pickLabel}>{localizationStrings.DateLabel || "DATE"}</Text>
                      <Text style={styles.pickValue}>{date.toLocaleDateString()}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.pickDivider} />
                  <TouchableOpacity style={styles.pickBox} onPress={() => setTimePickerVisibility(true)}>
                    <View style={styles.pickIconBox}><Image source={imageIndex.clocks} style={styles.pickIcon} /></View>
                    <View>
                      <Text style={styles.pickLabel}>{localizationStrings.Time || "TIME"}</Text>
                      <Text style={styles.pickValue}>{time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>

          {/* FOOTER */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.mainBtn} onPress={handleStart} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.mainBtnTxt}>{localizationStrings.StartSection || "Start section"}</Text>}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>



      {/* MODAL 2: ADD NEW QUESTION */}
      <Modal visible={showAddQModal} animationType="slide" transparent onRequestClose={() => setShowAddQModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: '55%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{localizationStrings.AddNewQuestion || "Add New Question"}</Text>
              <TouchableOpacity onPress={() => setShowAddQModal(false)}><Image source={imageIndex.close} style={styles.closeIcon} /></TouchableOpacity>
            </View>

            <View style={styles.pillContainer}>
              <Text style={styles.inputLabel}>{localizationStrings.SelectSection || "Select Section"}</Text>
              <View style={styles.pillBg}>
                <TouchableOpacity style={[styles.pillItem, newQType === 'before' && styles.pillActive]} onPress={() => setNewQType('before')}>
                  <Text style={[styles.pillTxt, newQType === 'before' && styles.pillTxtActive]}>{localizationStrings.BeforeSessionHeader || "Before Session"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pillItem, newQType === 'after' && styles.pillActive]} onPress={() => setNewQType('after')}>
                  <Text style={[styles.pillTxt, newQType === 'after' && styles.pillTxtActive]}>{localizationStrings.AfterSessionHeader || "After Session"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{localizationStrings.QuestionTextLabel || "Question Text"}</Text>
              <TextInput
                style={styles.largeInput}
                placeholder={localizationStrings.StartSectionScreen_ExHowHeavy || "Ex: How heavy were your legs today?"}
                placeholderTextColor="#94A3B8"
                multiline
                value={newQText}
                onChangeText={setNewQText}
              />
            </View>

            <TouchableOpacity
              style={[styles.doneBtn, !newQText.trim() && { backgroundColor: '#E2E8F0' }]}
              onPress={handleAddNewQuestion}
              disabled={!newQText.trim()}
            >
              <Text style={styles.doneBtnTxt}>{localizationStrings.AddQuestion || "Add Question"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={(d) => { setDate(d); setDatePickerVisibility(false); }} onCancel={() => setDatePickerVisibility(false)} />
      <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={(t) => { setTime(t); setTimePickerVisibility(false); }} onCancel={() => setTimePickerVisibility(false)} />
    </View>
  );
};

export default StartSectionScreen;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAFC' },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 150 },
  main: { padding: 16 },

  sectionCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#64748B', marginBottom: 12, letterSpacing: 1 },

  typeGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  typeBox: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 10, paddingVertical: 12, marginHorizontal: 4, alignItems: 'center' },
  typeBoxActive: { backgroundColor: '#A0D803' },
  typeTxt: { fontSize: 13, fontWeight: '600', color: '#64748B', textAlign: "center" },
  typeTxtActive: { color: '#FFF' },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  countBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  countText: { fontSize: 11, fontWeight: '700', color: '#475569' },

  emptyCardTrigger: { padding: 16, alignItems: 'center', justifyContent: 'center' },
  modalEmptyText: { color: '#94A3B8', fontSize: 13 },
  modalLoader: { padding: 40, alignItems: 'center' },

  questionContainer: { marginTop: 4 },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  listItemActive: { backgroundColor: '#F0FDF4', borderColor: '#A0D803' },
  liEmoji: { fontSize: 18, marginRight: 12 },
  liText: { fontSize: 14, fontWeight: '500', color: '#334155' },
  liTextActive: { color: '#0F172A', fontWeight: '600' },
  liActionRow: { flexDirection: 'row', alignItems: 'center' },
  liCheck: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  liCheckActive: { backgroundColor: '#A0D803', borderColor: '#A0D803' },
  checkTxt: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

  addBtn: { backgroundColor: '#A0D803', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  addBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  pickContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
  pickBox: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12 },
  pickIconBox: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  pickIcon: { width: 14, height: 14, tintColor: '#475569' },
  pickLabel: { fontSize: 9, fontWeight: '800', color: '#64748B', marginBottom: 2 },
  pickValue: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  pickDivider: { width: 1, height: '50%', backgroundColor: '#CBD5E1', alignSelf: 'center' },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', flexDirection: 'row', padding: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16, borderTopWidth: 1, borderColor: '#F1F5F9' },
  cancelBtn: { paddingHorizontal: 20, justifyContent: 'center' },
  cancelTxt: { fontSize: 15, fontWeight: '600', color: '#64748B' },
  mainBtn: { flex: 1, backgroundColor: '#A0D803', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  mainBtnTxt: { fontSize: 16, fontWeight: '700', color: '#FFF' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  closeIcon: { width: 22, height: 22, tintColor: '#64748B' },
  pillContainer: { marginBottom: 20 },
  pillBg: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
  pillItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  pillActive: { backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.05, elevation: 1 },
  pillTxt: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  pillTxtActive: { color: '#0F172A' },

  doneBtn: { backgroundColor: '#0F172A', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 10 },
  doneBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#475569', marginBottom: 8 },
  largeInput: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, height: 100, fontSize: 14, color: '#0F172A', textAlignVertical: 'top', borderWidth: 1, borderColor: '#E2E8F0' },
});

