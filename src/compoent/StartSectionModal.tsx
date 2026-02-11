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
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import imageIndex from '../assets/imageIndex';

interface Questionnaire {
  id: number;
  training_title: string;
  description?: string;
}

interface StartSectionModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: (data: {
    date: Date;
    time: Date;
    type: string;
    questionnaire: number | null;
    questionnaire1: number | null;
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

  // State for session type
  const [type, setType] = useState('TRAINING');

  // State for selected questionnaires
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<number | null>(null);
  const [selectedQuestionnaire1, setSelectedQuestionnaire1] = useState<number | null>(null);

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
        const res = await fetch(
          'https://kmmps.store/api/get_training?type=before_training'
        );
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
    if (!selectedQuestionnaire || !selectedQuestionnaire1) {
      alert('Please select both questionnaires');
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

  const renderQuestionnaireItem = (
    item: Questionnaire,
    selectedId: number | null,
    onSelect: (id: number) => void,
    onCloseDropdown: () => void
  ) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        style={styles.questionnaireCard}
        onPress={() => {
          onSelect(item.id);
          onCloseDropdown();
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.questionnaireTitle}>{item.training_title}</Text>
            {item.question && (
              <Text style={styles.questionnaireDesc} numberOfLines={2}>
                {item.question}
              </Text>
            )}
          </View>
          <Image
            source={isSelected ? imageIndex.radioSlied : imageIndex.radio}
            style={{ width: 22, height: 22 }}
          />
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
    selectedId: number | null,
    onSelect: (id: number) => void
  ) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.dropdownOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.dropdownListLarge}>
          <Text style={styles.dropdownHeader}>{title}</Text>
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
              contentContainerStyle={{ paddingVertical: 10 }}
              renderItem={({ item }) =>
                renderQuestionnaireItem(item, selectedId, onSelect, onClose)
              }
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title || 'Plan a Training Session'}</Text>

          {/* Session Type */}
          <Text style={styles.label}>Session Type</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTypeDropdown(true)}>
            <Text style={styles.dropdownText}>
              {type === 'TRAINING' ? 'Training' : 'Match'}
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
                {['TRAINING', 'MATCH'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setType(item);
                      setShowTypeDropdown(false);
                    }}>
                    <Text style={styles.dropdownItemText}>
                      {item === 'TRAINING' ? 'Training' : 'Match'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* First Questionnaire */}
          <Text style={styles.label}>{Before}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowQuestionnaireDropdown(true)}>
            <Text style={[styles.dropdownText, { flex: 1 }]}>
              {selectedQuestionnaire
                ? questionnaires.find((q) => q.id === selectedQuestionnaire)
                    ?.training_title
                : 'Select Questionnaire --'}
            </Text>
            <Image source={imageIndex.downarrow} style={styles.dropdownIcon} />
          </TouchableOpacity>

          {/* Second Questionnaire */}
          <Text style={styles.label}>{Training}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowQuestionnaireDropdown2(true)}>
            <Text style={[styles.dropdownText, { flex: 1 }]}>
              {selectedQuestionnaire1
                ? questionnaires1.find((q) => q.id === selectedQuestionnaire1)
                    ?.question
                : 'Select Questionnaire --'}
            </Text>
            <Image source={imageIndex.downarrow} style={styles.dropdownIcon} />
          </TouchableOpacity>

          {/* Questionnaire Dropdowns */}
          {renderQuestionnaireDropdown(
            showQuestionnaireDropdown,
            () => setShowQuestionnaireDropdown(false),
            'Before Training Questionnaire',
            questionnaires,
            loadingQuestions,
            selectedQuestionnaire,
            setSelectedQuestionnaire
          )}

          {renderQuestionnaireDropdown(
            showQuestionnaireDropdown2,
            () => setShowQuestionnaireDropdown2(false),
            'Training Questionnaire',
            questionnaires1,
            loadingQuestions1,
            selectedQuestionnaire1,
            setSelectedQuestionnaire1
          )}

          {/* Date & Time */}
          <Text style={styles.label}>Date & Time</Text>
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
                <Text style={styles.cancelText}>Cancel</Text>
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
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
  questionnaireDesc: { fontSize: 17, color: 'black', marginTop: 4 ,fontWeight:"600"},
});