import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import imageIndex from '../assets/imageIndex';
import localizationStrings from './Localization/Localization';

interface Questionnaire {
  id: number;
  training_title?: string;
  question?: string;
  description?: string;
}

interface StartSectionModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: (data: {
    date: Date;
    time: Date;
    type: string;
    questionnaire: number[];
    questionnaire1: number[];
  }) => Promise<void>;
  title: string;
  buttTitle: string; 
  Before: string;
  Training:string
}

const StartSectionModal = ({
  visible,
  onClose,
  onStart,
  title,
  buttTitle,
    Before ,
    Training
}: StartSectionModalProps) => {
  // State for date and time
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // State for session type: TRAINING | MATCH | BREAK
  const [type, setType] = useState('TRAINING');

  // State for selected questionnaires (multiple allowed)
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<number[]>([]);
  const [selectedQuestionnaire1, setSelectedQuestionnaire1] = useState<number[]>([]);

  // State for dropdown visibility
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showQuestionnaireDropdown, setShowQuestionnaireDropdown] = useState(false);
  const [showQuestionnaireDropdown2, setShowQuestionnaireDropdown2] = useState(false);

  // State for questionnaires data
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [questionnaires1, setQuestionnaires1] = useState<Questionnaire[]>([]);

  // State for loading
  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingQuestions1, setLoadingQuestions1] = useState(false);

  // State for date/time pickers
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Fetch first set of questionnaires
  useEffect(() => {
    const fetchQuestionnaires = async () => {
      if (!visible) return;
      
      try {
        setLoadingQuestions(true);
        // if(after_training)
        if(Training == localizationStrings.AfterTrainingQuestionnaire){
           const res = await fetch(
          'https://kmmps.store/api/get_training?type=after_training'
          
        );
  
        const json = await res.json();
        if (json?.result) {
          setQuestionnaires(json.result);
        }
        return;
        }
        const res = await fetch(
          'https://kmmps.store/api/get_training?type=before_training'
        );
        // const res = await fetch(
        //   'https://kmmps.store/api/get_training?type=before_training'
        // );
        const json = await res.json();
        if (json?.result) {
          setQuestionnaires(json.result);
        }
      } catch (err) {
        console.log('API Error:', err);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestionnaires();
  }, [visible]);

  // Fetch second set of questionnaires
  useEffect(() => {
    const fetchQuestionnaires1 = async () => {
      if (!visible) return;
      
      try {
        setLoadingQuestions1(true);
        const res = await fetch(
          'https://kmmps.store/api/get_question'
        );
        const json = await res.json();
        if (json?.result) {
          setQuestionnaires1(json.result);
        }
      } catch (err) {
        console.log('API Error:', err);
      } finally {
        setLoadingQuestions1(false);
      }
    };

    fetchQuestionnaires1();
  }, [visible]);

  const handleStart = async () => {
    if (selectedQuestionnaire.length === 0 || selectedQuestionnaire1.length === 0) {
      Alert.alert(
        localizationStrings.SelectQuestionnaires,
        localizationStrings.SelectQuestionnairesMessageFull
      );
      return;
    }

    setLoading(true);
    try {
      await onStart({
        date,
        time,
        type,
        questionnaire: selectedQuestionnaire,
        questionnaire1: selectedQuestionnaire1,
      });
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const toggleQuestionnaire = (ids: number[], setIds: React.Dispatch<React.SetStateAction<number[]>>, id: number) => {
    if (ids.includes(id)) {
      setIds(ids.filter((x) => x !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  const renderQuestionnaireItem = (
    item: Questionnaire,
    selectedIds: number[],
    onToggle: (id: number) => void
  ) => {
    const isSelected = selectedIds.includes(item.id);
    const title = item.training_title ?? item.question;

    return (
      <TouchableOpacity
        style={styles.questionnaireCard}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.questionnaireTitle}>{title}</Text>
            {item.question && (
              <Text style={styles.questionnaireDesc} numberOfLines={2}>
                {item.question}
              </Text>
            )}
          </View>
          <View
            style={{
              height: 22,
              width: 22,
              borderWidth: 2,
              borderColor: isSelected ? '#A0D803' : '#ccc',
              backgroundColor: isSelected ? '#A0D803' : '#fff',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isSelected && (
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>✓</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderQuestionnaireDropdown = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: Questionnaire[],
    loading: boolean,
    selectedIds: number[],
    onToggle: (id: number) => void
  ) => {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={onClose}>
          <View style={styles.dropdownListLarge}>
            <Text style={styles.dropdownHeader}>{title}</Text>
            <Text style={[styles.hint, { paddingHorizontal: 16 }]}>
              {localizationStrings.TapToSelectMultiple}
            </Text>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#4C8BF5"
                style={{ marginTop: 20 }}
              />
            ) : (
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingVertical: 10, flexGrow: 1 }}
                renderItem={({ item }) =>
                  renderQuestionnaireItem(item, selectedIds, onToggle)
                }
              />
            )}
            <TouchableOpacity
              style={[styles.doneButton, { marginHorizontal: 16, marginVertical: 12 }]}
              onPress={onClose}>
              <Text style={styles.doneButtonText}>{localizationStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const getQuestionnaireLabel = (
    ids: number[],
    list: Questionnaire[],
    fallbackTitleKey: 'training_title' | 'question'
  ) => {
    if (ids.length === 0) return localizationStrings.SelectQuestionnairePlaceholder;
    if (ids.length === 1) {
      const q = list.find((x) => x.id === ids[0]);
      const t = q?.training_title ?? q?.question;
      return t ?? `ID ${ids[0]}`;
    }
    return `${ids.length} ${localizationStrings.SelectedCount}`;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title || localizationStrings.PlanTrainingSession}</Text>

          {/* Clear message so client understands: questionnaire before AND after */}
          <View style={styles.messageBox}>
            <Text style={styles.messageTitle}>{localizationStrings.HowItWorks}</Text>
            <Text style={styles.messageText}>
              {localizationStrings.HowItWorksMessage}
            </Text>
            <Text style={styles.messageSubtext}>
              {localizationStrings.HowItWorksSubtext}
            </Text>
          </View>

          {/* Session Type */}
          <Text style={styles.label}>{localizationStrings.SessionType}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTypeDropdown(true)}>
            <Text style={styles.dropdownText}>
              {type === 'TRAINING' ? localizationStrings.SessionTraining : type === 'MATCH' ? localizationStrings.SessionMatch : localizationStrings.SessionBreak}
            </Text>
            <Image source={imageIndex.downarrow} style={styles.dropdownIcon} />
          </TouchableOpacity>

          {/* Session Type Dropdown */}
          <Modal visible={showTypeDropdown} transparent animationType="fade">
            <TouchableOpacity
              style={styles.dropdownOverlay}
              activeOpacity={1}
              onPress={() => setShowTypeDropdown(false)}>
              <View style={styles.dropdownList}>
                {['TRAINING', 'MATCH', 'BREAK'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setType(item);
                      setShowTypeDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>
                      {item === 'TRAINING' ? localizationStrings.SessionTraining : item === 'MATCH' ? localizationStrings.SessionMatch : localizationStrings.SessionBreak}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* First Questionnaire - before session (multiple) */}
          <Text style={styles.label}>{Before}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowQuestionnaireDropdown(true)}>
            <Text style={[styles.dropdownText, { flex: 1 }]}>
              {getQuestionnaireLabel(selectedQuestionnaire, questionnaires, 'training_title')}
            </Text>
            <Image source={imageIndex.downarrow} style={styles.dropdownIcon} />
          </TouchableOpacity>

          {/* Second Questionnaire - after session (multiple) */}
          <Text style={styles.label}>{Training}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowQuestionnaireDropdown2(true)}>
            <Text style={[styles.dropdownText, { flex: 1 }]}>
              {getQuestionnaireLabel(selectedQuestionnaire1, questionnaires1, 'question')}
            </Text>
            <Image source={imageIndex.downarrow} style={styles.dropdownIcon} />
          </TouchableOpacity>

          {/* Questionnaire Dropdowns */}
          {renderQuestionnaireDropdown(
            showQuestionnaireDropdown,
            () => setShowQuestionnaireDropdown(false),
            Before,
            questionnaires,
            loadingQuestions,
            selectedQuestionnaire,
            (id) => toggleQuestionnaire(selectedQuestionnaire, setSelectedQuestionnaire, id)
          )}

          {renderQuestionnaireDropdown(
            showQuestionnaireDropdown2,
            () => setShowQuestionnaireDropdown2(false),
            Training,
            questionnaires1,
            loadingQuestions1,
            selectedQuestionnaire1,
            (id) => toggleQuestionnaire(selectedQuestionnaire1, setSelectedQuestionnaire1, id)
          )}

          {/* Date & Time */}
          <Text style={styles.label}>{localizationStrings.DateAndTime}</Text>
          <View style={styles.dateTimeRow}>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setDatePickerVisibility(true)}>
              <Text style={styles.selectText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setTimePickerVisibility(true)}>
              <Text style={styles.selectText}>
                {time.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(d) => {
              setDate(d);
              setDatePickerVisibility(false);
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={(t) => {
              setTime(t);
              setTimePickerVisibility(false);
            }}
            onCancel={() => setTimePickerVisibility(false)}
            is24Hour={false}
          />

          {/* Buttons */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#4C8BF5"
              style={{ marginTop: 20 }}
            />
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#E0E0E0' }]}
                onPress={onClose}>
                <Text style={styles.cancelText}>{localizationStrings.Cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: 'rgba(160, 216, 3, 1)' },
                ]}
                onPress={handleStart}>
                <Text style={styles.startText}>{buttTitle}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StartSectionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    width: '95%',
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#222',
  },
  messageBox: {
    backgroundColor: '#E8F4E8',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(160, 216, 3, 0.8)',
  },
  messageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  messageBold: {
    fontWeight: '700',
    color: '#1a5f1a',
  },
  messageSubtext: {
    fontSize: 13,
    color: '#555',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    lineHeight: 20,
  },
  hint: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
    marginBottom: 4,
    
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#555',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F7F7F7',
  },
  dropdownText: { fontSize: 15, color: '#333' },
  dropdownIcon: { width: 20, height: 20, tintColor: '#555' },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  dropdownListLarge: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '60%',
    borderRadius: 11,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: { fontSize: 16, color: '#333' },
  dropdownHeader: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F7F7F7',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  selectBtn: {
    backgroundColor: 'rgba(66, 64, 67, 1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    margin: 5,
  },
  selectText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelText: { fontWeight: '600', color: '#555' },
  startText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  questionnaireCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  questionnaireTitle: { fontSize: 15, fontWeight: '600', color: '#3c3c3cff' },
  questionnaireDesc: { fontSize: 17, color: 'black', marginTop: 4, fontWeight: '600' },
  doneButton: {
    backgroundColor: 'rgba(160, 216, 3, 1)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});