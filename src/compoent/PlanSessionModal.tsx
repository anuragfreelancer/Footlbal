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

interface Questionnaire {
  id: number;
  training_title?: string;
  question?: string;
}

interface PlanSessionModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedDate: string;
  players: any[];
  navigation: any;
}

const PlanSessionModal: React.FC<PlanSessionModalProps> = ({
  visible,
  onClose,
  onSuccess,
  selectedDate,
  players,
  navigation,
}) => {
  const [time, setTime] = useState(new Date());
  const [type, setType] = useState('TRAINING');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showQuestionnaireDropdown, setShowQuestionnaireDropdown] = useState(false);
  const [showQuestionnaireDropdown2, setShowQuestionnaireDropdown2] = useState(false);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [questionnaires1, setQuestionnaires1] = useState<Questionnaire[]>([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<number[]>([]);
  const [selectedQuestionnaire1, setSelectedQuestionnaire1] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingQuestions1, setLoadingQuestions1] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const fetchQ = async () => {
      setLoadingQuestions(true);
      try {
        const res = await fetch('https://kmmps.store/api/get_training?type=before_training');
        const json = await res.json();
        if (json?.result) setQuestionnaires(json.result);
      } catch (_) {}
      setLoadingQuestions(false);
    };
    fetchQ();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const fetchQ1 = async () => {
      setLoadingQuestions1(true);
      try {
        const res = await fetch('https://kmmps.store/api/get_question');
        const json = await res.json();
        if (json?.result) setQuestionnaires1(json.result);
      } catch (_) {}
      setLoadingQuestions1(false);
    };
    fetchQ1();
  }, [visible]);

  const togglePlayer = (id: number) => {
    setSelectedPlayerIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleQuestionnaire = (ids: number[], setIds: React.Dispatch<React.SetStateAction<number[]>>, id: number) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getLabel = (ids: number[], list: Questionnaire[]) => {
    if (ids.length === 0) return 'Select --';
    if (ids.length === 1) {
      const q = list.find((x) => x.id === ids[0]);
      return q?.training_title ?? q?.question ?? `ID ${ids[0]}`;
    }
    return `${ids.length} selected`;
  };

  const handleSubmit = async () => {
    if (selectedPlayerIds.length === 0) {
      Alert.alert('Select Players', 'Please select at least one player.');
      return;
    }
    if (selectedQuestionnaire.length === 0 || selectedQuestionnaire1.length === 0) {
      Alert.alert('Select Questionnaires', 'Please select at least one questionnaire for before and after.');
      return;
    }

    setLoading(true);
    try {
      const { StartSection } = await import('../redux/Api/AuthApi');
      const formattedTime = time.toTimeString().split(' ')[0];
      const params = {
        players: selectedPlayerIds,
        date: selectedDate,
        time: formattedTime,
        session_type: type,
        navigation: { goBack: () => {} },
      };
      const response = await StartSection(params, () => setLoading(false));
      if (response?.status === '1') {
        setSelectedPlayerIds([]);
        onSuccess();
        onClose();
      }
    } catch (e) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const formatDisplayDate = (d: string) => {
    const [y, m, day] = d.split('-');
    const date = new Date(parseInt(y!), parseInt(m!) - 1, parseInt(day!));
    return date.toDateString();
  };

  const playerList = Array.isArray(players) ? players : players?.userGetData ?? [];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={s.overlay}>
        <View style={s.container}>
          <Text style={s.title}>Plan Session</Text>

          <Text style={s.label}>Select Players</Text>
          <FlatList
            data={playerList}
            keyExtractor={(item) => String(item?.id)}
            style={s.playerList}
            renderItem={({ item }) => {
              const id = Number(item?.id);
              const isSel = selectedPlayerIds.includes(id);
              return (
                <TouchableOpacity
                  style={[s.playerRow, isSel && s.playerRowSelected]}
                  onPress={() => togglePlayer(id)}
                >
                  {item?.image ? (
                    <Image source={{ uri: item.image }} style={s.avatar} />
                  ) : (
                    <Image source={imageIndex.user} style={s.avatar} />
                  )}
                  <Text style={s.playerName}>{item?.user_name ?? ''}</Text>
                  <View style={[s.checkbox, isSel && s.checkboxSelected]}>
                    {isSel && <Text style={s.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <Text style={s.label}>Date & Time</Text>
          <View style={s.dateTimeRow}>
            <View style={[s.selectBtn, s.dateReadOnly]}>
              <Text style={s.selectText}>{formatDisplayDate(selectedDate)}</Text>
            </View>
            <TouchableOpacity style={s.selectBtn} onPress={() => setTimePickerVisibility(true)}>
              <Text style={s.selectText}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={s.label}>Session Type</Text>
          <TouchableOpacity style={s.dropdown} onPress={() => setShowTypeDropdown(true)}>
            <Text style={s.dropdownText}>
              {type === 'TRAINING' ? 'Training' : type === 'MATCH' ? 'Match' : 'Break'}
            </Text>
            <Image source={imageIndex.downarrow} style={s.dropdownIcon} />
          </TouchableOpacity>

          <Modal visible={showTypeDropdown} transparent animationType="fade">
            <TouchableOpacity style={s.dropdownOverlay} onPress={() => setShowTypeDropdown(false)}>
              <View style={s.dropdownList}>
                {['TRAINING', 'MATCH', 'BREAK'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={s.dropdownItem}
                    onPress={() => {
                      setType(item);
                      setShowTypeDropdown(false);
                    }}
                  >
                    <Text style={s.dropdownItemText}>
                      {item === 'TRAINING' ? 'Training' : item === 'MATCH' ? 'Match' : 'Break'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          <Text style={s.label}>Before Training</Text>
          <TouchableOpacity style={s.dropdown} onPress={() => setShowQuestionnaireDropdown(true)}>
            <Text style={s.dropdownText}>{getLabel(selectedQuestionnaire, questionnaires)}</Text>
            <Image source={imageIndex.downarrow} style={s.dropdownIcon} />
          </TouchableOpacity>

          <Text style={s.label}>After Training</Text>
          <TouchableOpacity style={s.dropdown} onPress={() => setShowQuestionnaireDropdown2(true)}>
            <Text style={s.dropdownText}>{getLabel(selectedQuestionnaire1, questionnaires1)}</Text>
            <Image source={imageIndex.downarrow} style={s.dropdownIcon} />
          </TouchableOpacity>

          <Modal visible={showQuestionnaireDropdown} transparent animationType="fade">
            <TouchableOpacity style={s.dropdownOverlay} onPress={() => setShowQuestionnaireDropdown(false)}>
              <View style={s.dropdownListLarge}>
                <Text style={s.dropdownHeader}>Before Training</Text>
                {loadingQuestions ? (
                  <ActivityIndicator size="large" color="#4C8BF5" style={{ marginTop: 20 }} />
                ) : (
                  <FlatList
                    data={questionnaires}
                    keyExtractor={(i) => String(i.id)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={s.qItem}
                        onPress={() => toggleQuestionnaire(selectedQuestionnaire, setSelectedQuestionnaire, item.id)}
                      >
                        <Text>{item.training_title ?? item.question ?? ''}</Text>
                        <View style={[s.checkbox, selectedQuestionnaire.includes(item.id) && s.checkboxSelected]}>
                          {selectedQuestionnaire.includes(item.id) && <Text style={s.checkmark}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
                <TouchableOpacity style={s.doneBtn} onPress={() => setShowQuestionnaireDropdown(false)}>
                  <Text style={s.doneBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          <Modal visible={showQuestionnaireDropdown2} transparent animationType="fade">
            <TouchableOpacity style={s.dropdownOverlay} onPress={() => setShowQuestionnaireDropdown2(false)}>
              <View style={s.dropdownListLarge}>
                <Text style={s.dropdownHeader}>After Training</Text>
                {loadingQuestions1 ? (
                  <ActivityIndicator size="large" color="#4C8BF5" style={{ marginTop: 20 }} />
                ) : (
                  <FlatList
                    data={questionnaires1}
                    keyExtractor={(i) => String(i.id)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={s.qItem}
                        onPress={() => toggleQuestionnaire(selectedQuestionnaire1, setSelectedQuestionnaire1, item.id)}
                      >
                        <Text>{item.training_title ?? item.question ?? ''}</Text>
                        <View style={[s.checkbox, selectedQuestionnaire1.includes(item.id) && s.checkboxSelected]}>
                          {selectedQuestionnaire1.includes(item.id) && <Text style={s.checkmark}>✓</Text>}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
                <TouchableOpacity style={s.doneBtn} onPress={() => setShowQuestionnaireDropdown2(false)}>
                  <Text style={s.doneBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

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

          {loading ? (
            <ActivityIndicator size="large" color="#4C8BF5" style={{ marginTop: 20 }} />
          ) : (
            <View style={s.buttonRow}>
              <TouchableOpacity style={[s.actionBtn, s.cancelBtn]} onPress={onClose}>
                <Text style={s.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.actionBtn, s.submitBtn]} onPress={handleSubmit}>
                <Text style={s.submitText}>Plan Session</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: '#fff', padding: 20, width: '95%', maxHeight: '90%', borderRadius: 10 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16, textAlign: 'center', color: '#222' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#555' },
  playerList: { maxHeight: 120, marginBottom: 4 },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  playerRowSelected: { borderColor: '#A0D803', backgroundColor: '#F2FFE2' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  playerName: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: { backgroundColor: '#A0D803', borderColor: '#A0D803' },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  dateTimeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  selectBtn: {
    flex: 1,
    backgroundColor: '#263E41',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  dateReadOnly: { opacity: 0.9 },
  selectText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#F7F7F7',
  },
  dropdownText: { fontSize: 15, color: '#333' },
  dropdownIcon: { width: 20, height: 20, tintColor: '#555' },
  dropdownOverlay: { flex: 1, backgroundColor: '#00000055', justifyContent: 'center', alignItems: 'center' },
  dropdownList: { backgroundColor: '#fff', width: '80%', borderRadius: 14, overflow: 'hidden' },
  dropdownItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  dropdownItemText: { fontSize: 16, color: '#333' },
  dropdownListLarge: { backgroundColor: '#fff', width: '90%', maxHeight: '60%', borderRadius: 11, overflow: 'hidden' },
  dropdownHeader: { textAlign: 'center', fontWeight: '700', fontSize: 18, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: '#F7F7F7' },
  qItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  doneBtn: { backgroundColor: 'rgba(160, 216, 3, 1)', paddingVertical: 14, margin: 16, borderRadius: 12, alignItems: 'center' },
  doneBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  buttonRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' },
  actionBtn: { flex: 1, padding: 14, borderRadius: 12, marginHorizontal: 5, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#E0E0E0' },
  submitBtn: { backgroundColor: 'rgba(160, 216, 3, 1)' },
  cancelText: { fontWeight: '600', color: '#555' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default PlanSessionModal;
