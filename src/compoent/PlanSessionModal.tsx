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
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import imageIndex from '../assets/imageIndex';
import localizationStrings from '../compoent/Localization/Localization';

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
      } catch (_) { }
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
      } catch (_) { }
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
    if (ids.length === 0) return localizationStrings.SelectOption || "Select Option";
    if (ids.length === 1) {
      const q = list.find((x) => x.id === ids[0]);
      return q?.training_title ?? q?.question ?? `ID ${ids[0]}`;
    }
    return `${ids.length} ${localizationStrings.SelectedCount || "Selected"}`;
  };

  const handleSubmit = async () => {
    if (selectedPlayerIds.length === 0) {
      Alert.alert(localizationStrings.SelectPlayers, localizationStrings.Pleaseselectleastone);
      return;
    }
    if (selectedQuestionnaire.length === 0 || selectedQuestionnaire1.length === 0) {
      Alert.alert(localizationStrings.SelectQuestionnaires, localizationStrings.SelectQuestionnairesMessage);
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
        navigation: { goBack: () => { } },
      };
      const response = await StartSection(params, () => setLoading(false));
      if (response?.status === '1') {
        setSelectedPlayerIds([]);
        onSuccess();
        onClose();
      }
    } catch (e) {
      Alert.alert(localizationStrings.Error, localizationStrings.SomethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  const formatDisplayDate = (d: string) => {
    if (!d) return "—";
    const [y, m, day] = d.split('-');
    const date = new Date(parseInt(y!), parseInt(m!) - 1, parseInt(day!));
    return date.toDateString();
  };

  const playerList = Array.isArray(players) ? players : players?.userGetData ?? [];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={s.overlay}>
        <View style={s.container}>
          {/* Header */}
          <View style={s.header}>
            <Text style={s.title}>{localizationStrings.PlanSession || "Plan Session"}</Text>
            <TouchableOpacity onPress={onClose} style={s.closeButton}>
              <Image source={imageIndex.close} style={s.closeIcon} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
            {/* Player Selection */}
            <View style={s.section}>
              <View style={s.labelRow}>
                <Text style={s.label}>{localizationStrings.SelectPlayers}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (selectedPlayerIds.length === playerList.length) {
                      setSelectedPlayerIds([]);
                    } else {
                      setSelectedPlayerIds(playerList.map((p: any) => Number(p.id)));
                    }
                  }}
                >
                  <Text style={s.selectAllText}>
                    {selectedPlayerIds.length === playerList.length ? localizationStrings.DeselectAll || "Deselect All" : localizationStrings.SelectAll || "Select All"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={s.playerGrid}>
                {playerList.map((item: any) => {
                  const id = Number(item?.id);
                  const isSel = selectedPlayerIds.includes(id);
                  return (
                    <TouchableOpacity
                      key={id}
                      style={[s.playerItem, isSel && s.playerItemSelected]}
                      onPress={() => togglePlayer(id)}
                    >
                      <View style={{ position: 'relative' }}>
                        <Image
                          source={item?.image ? { uri: item.image } : imageIndex.user}
                          style={s.avatar}
                        />
                        {isSel && (
                          <View style={s.checkBadge}>
                            <Text style={s.checkBadgeIcon}>✓</Text>
                          </View>
                        )}
                      </View>
                      <Text style={s.playerName} numberOfLines={1}>
                        {item?.user_name?.split(' ')[0] ?? ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>


            {/* Date & Time */}
            <View style={s.section}>
              <Text style={s.label}>{localizationStrings.DateAndTime}</Text>
              <View style={s.dateTimeRow}>
                <View style={s.infoBox}>
                  <Image source={imageIndex.calendar} style={s.boxIcon} />
                  <Text style={s.boxText}>{formatDisplayDate(selectedDate)}</Text>
                </View>
                <TouchableOpacity
                  style={s.infoBox}
                  onPress={() => setTimePickerVisibility(true)}
                >
                  <Image source={imageIndex.time} style={s.boxIcon} />
                  <Text style={s.boxText}>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Session Type */}
            <View style={s.section}>
              <Text style={s.label}>{localizationStrings.SessionType}</Text>
              <View style={s.typeSelector}>
                {['TRAINING', 'MATCH', 'BREAK'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[s.typePill, type === item && s.typePillSelected]}
                    onPress={() => setType(item)}
                  >
                    <Text style={[s.typeText, type === item && s.typeTextSelected]}>
                      {item === 'TRAINING' ? localizationStrings.SessionTraining : item === 'MATCH' ? localizationStrings.SessionMatch : localizationStrings.SessionBreak}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Questionnaires */}
            <View style={s.section}>
              <Text style={s.label}>{localizationStrings.BeforeTraining}</Text>
              <TouchableOpacity style={s.dropdown} onPress={() => setShowQuestionnaireDropdown(true)}>
                <Text style={s.dropdownText} numberOfLines={1}>{getLabel(selectedQuestionnaire, questionnaires)}</Text>
                <Image source={imageIndex.downarrow} style={s.dropdownIcon} />
              </TouchableOpacity>
            </View>

            <View style={s.section}>
              <Text style={s.label}>{localizationStrings.AfterTraining}</Text>
              <TouchableOpacity style={s.dropdown} onPress={() => setShowQuestionnaireDropdown2(true)}>
                <Text style={s.dropdownText} numberOfLines={1}>{getLabel(selectedQuestionnaire1, questionnaires1)}</Text>
                <Image source={imageIndex.downarrow} style={s.dropdownIcon} />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={s.footer}>
            {loading ? (
              <ActivityIndicator size="large" color="#A0D803" />
            ) : (
              <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
                <Text style={s.submitText}>{localizationStrings.PlanSession || "Plan Session"}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Dropdown Modals */}
      <Modal visible={showQuestionnaireDropdown} transparent animationType="fade">
        <View style={s.dropdownOverlay}>
          <View style={s.dropdownCard}>
            <Text style={s.dropdownHeader}>{localizationStrings.BeforeTraining}</Text>
            {loadingQuestions ? (
              <ActivityIndicator size="large" color="#A0D803" style={{ marginVertical: 30 }} />
            ) : (
              <FlatList
                data={questionnaires}
                keyExtractor={(i) => String(i.id)}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[s.qItem, selectedQuestionnaire.includes(item.id) && s.qItemSelected]}
                    onPress={() => toggleQuestionnaire(selectedQuestionnaire, setSelectedQuestionnaire, item.id)}
                  >
                    <Text style={[s.qText, selectedQuestionnaire.includes(item.id) && s.qTextSelected]}>
                      {item.training_title ?? item.question ?? ''}
                    </Text>
                    {selectedQuestionnaire.includes(item.id) && <Text style={s.qCheck}>✓</Text>}
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity style={s.doneBtn} onPress={() => setShowQuestionnaireDropdown(false)}>
              <Text style={s.doneBtnText}>{localizationStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showQuestionnaireDropdown2} transparent animationType="fade">
        <View style={s.dropdownOverlay}>
          <View style={s.dropdownCard}>
            <Text style={s.dropdownHeader}>{localizationStrings.AfterTraining}</Text>
            {loadingQuestions1 ? (
              <ActivityIndicator size="large" color="#A0D803" style={{ marginVertical: 30 }} />
            ) : (
              <FlatList
                data={questionnaires1}
                keyExtractor={(i) => String(i.id)}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[s.qItem, selectedQuestionnaire1.includes(item.id) && s.qItemSelected]}
                    onPress={() => toggleQuestionnaire(selectedQuestionnaire1, setSelectedQuestionnaire1, item.id)}
                  >
                    <Text style={[s.qText, selectedQuestionnaire1.includes(item.id) && s.qTextSelected]}>
                      {item.training_title ?? item.question ?? ''}
                    </Text>
                    {selectedQuestionnaire1.includes(item.id) && <Text style={s.qCheck}>✓</Text>}
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity style={s.doneBtn} onPress={() => setShowQuestionnaireDropdown2(false)}>
              <Text style={s.doneBtnText}>{localizationStrings.Done}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    </Modal>
  );
};


const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '92%',
    maxHeight: '85%',
    borderRadius: 32,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.15,
        shadowRadius: 25,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    padding: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: '#94A3B8',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A0D803',
  },

  playerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  playerItem: {
    width: 65,
    alignItems: 'center',
    position: 'relative',
  },
  playerItemSelected: {
    opacity: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  playerName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    marginTop: 6,
  },
  checkBadge: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#A0D803',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  checkBadgeIcon: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  boxIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    tintColor: '#A0D803',
  },
  boxText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 5,
    borderRadius: 16,
  },
  typePill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  typePillSelected: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  typeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  typeTextSelected: {
    color: '#A0D803',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: '#94A3B8',
  },
  footer: {
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#A0D803',
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#A0D803",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownCard: {
    backgroundColor: '#fff',
    width: '85%',
    maxHeight: '60%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  dropdownHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  qItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  qItemSelected: {
    backgroundColor: '#F7FCF0',
  },
  qText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
    fontWeight: '500',
  },
  qTextSelected: {
    color: '#1E293B',
    fontWeight: '700',
  },
  qCheck: {
    color: '#A0D803',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  doneBtn: {
    backgroundColor: '#A0D803',
    margin: 16,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default PlanSessionModal;

