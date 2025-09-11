// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import localizationStrings from './Localization/Localization';

// const StartSectionModal = ({
//   visible,
//   onClose,
//   onStart,
//   selectedPlayers,
// }:any) => {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const showDatePicker = () => setDatePickerVisibility(true);
//   const hideDatePicker = () => setDatePickerVisibility(false);

//   const showTimePicker = () => setTimePickerVisibility(true);
//   const hideTimePicker = () => setTimePickerVisibility(false);

//   const handleDateConfirm = (selectedDate) => {
//     setDate(selectedDate);
//     hideDatePicker();
//   };

//   const handleTimeConfirm = (selectedTime) => {
//     setTime(selectedTime);
//     hideTimePicker();
//   };

//   const handleStart = async () => {
//     setLoading(true);
//     try {
//       await onStart({ date, time });
//     } finally {
//       setLoading(false);
//       onClose();
//     }
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <Text style={styles.title}>{localizationStrings?.SelectTime}</Text>

//           {/* <FlatList
//             data={selectedPlayers}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <Text style={styles.playerText}>• {item.name}</Text>
//             )}
//             style={{ maxHeight: 120, marginBottom: 12 }}
//           /> */}

//           {/* Date & Time Buttons */}
//           <View style={styles.dateTimeRow}>
//             <TouchableOpacity style={styles.selectBtn} onPress={showDatePicker}>
//               <Text style={styles.selectText}>{date.toDateString()}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.selectBtn} onPress={showTimePicker}>
//               <Text style={styles.selectText}>⏰ {time.toLocaleTimeString()}</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.selectedText}>
//             Date: {date.toLocaleDateString()}
//           </Text>
//           <Text style={styles.selectedText}>
//             {localizationStrings?.Time}: {time.toLocaleTimeString()}
//           </Text>

//           {/* Modal Date/Time Pickers */}
//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="date"
//             onConfirm={handleDateConfirm}
//             onCancel={hideDatePicker}
//           />
//           <DateTimePickerModal
//             isVisible={isTimePickerVisible}
//             mode="time"
//             onConfirm={handleTimeConfirm}
//             onCancel={hideTimePicker}
//             is24Hour={false}
//           />

//           {/* Action Buttons */}
//           {loading ? (
//             <ActivityIndicator size="large" color="#4C8BF5" style={{ marginTop: 20 }} />
//           ) : (
//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 style={[styles.actionBtn, { backgroundColor: '#ccc' }]}
//                 onPress={onClose}
//               >
//                 <Text>{localizationStrings.Cancel}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionBtn, { backgroundColor: 'rgba(160, 216, 3, 1)' }]}
//                 onPress={handleStart}
//               >
//                 <Text style={{ color: '#fff' ,fontSize:15 }}>{localizationStrings?.Start}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default StartSectionModal;
// const styles = StyleSheet.create({
//     overlay: {
//       flex: 1,
//       backgroundColor: '#00000088',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     container: {
//       backgroundColor: '#fff',
//       padding: 20,
//       width: '90%',
//       borderRadius: 14,
//       elevation: 10,
//       shadowColor: '#000',
//       shadowOpacity: 0.2,
//       shadowOffset: { width: 0, height: 2 },
//       shadowRadius: 6,
//     },
//     title: {
//       fontSize: 20,
//       fontWeight: '700',
//       marginBottom: 10,
//       textAlign: 'center',
//       color: '#333',
//     },
//     playerText: {
//       fontSize: 16,
//       paddingVertical: 4,
//       color: '#333',
//     },
//     dateTimeRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginTop: 12,
//     },
//     selectBtn: {
//       backgroundColor: 'gray',
//       paddingVertical: 12,
//        borderRadius: 8,
//       flex: 1,
//        alignItems: 'center',
//       height:48,
//       justifyContent:"center" ,
//       margin:5,
//     },
//     selectText: {
//       color: '#fff',
//       fontSize: 15,
//       fontWeight: '500',
//     },
//     selectedText: {
//       fontSize: 15,
//       color: '#555',
//       marginTop: 10,
//       textAlign: 'center',
//     },
//     buttonRow: {
//       flexDirection: 'row',
//       marginTop: 20,
//       justifyContent: 'space-between',
//     },
//     actionBtn: {
//       flex: 1,
//       padding: 12,
//       borderRadius: 8,
//       marginHorizontal: 5,
//       alignItems: 'center',
//     },
//   });
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import localizationStrings from './Localization/Localization';

const StartSectionModal = ({ visible, onClose, onStart }: any) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [type, setType] = useState("TRAINING");
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showQuestionnaireDropdown, setShowQuestionnaireDropdown] = useState(false);
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  // 📌 API call for questionnaire
  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        setLoadingQuestions(true);
        const res = await fetch(
          "https://kmmps.store/api/get_training?type=before_training"
        );
        const json = await res.json();
        if (json?.result) {
          setQuestionnaires(json.result);
        }
      } catch (err) {
        console.log("API Error:", err);
      } finally {
        setLoadingQuestions(false);
      }
    };
    if (visible) {
      fetchQuestionnaires();
    }
  }, [visible]);

  const handleStart = async () => {
    if (!selectedQuestionnaire) {
      alert("Please select a questionnaire!");
      return;
    }
    setLoading(true);
    try {
      await onStart({ date, time, type, questionnaire: selectedQuestionnaire });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{localizationStrings?.SelectTime}</Text>

          {/* Dropdown for Type */}
          <Text style={styles.label}>{localizationStrings?.SelectType}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTypeDropdown(true)}
          >
            <Text style={styles.dropdownText}>
              {type === "TRAINING" ? "Training" : "Match"}
            </Text>
          </TouchableOpacity>

          <Modal visible={showTypeDropdown} transparent animationType="fade">
            <TouchableOpacity
              style={styles.dropdownOverlay}
              onPress={() => setShowTypeDropdown(false)}
            >
              <View style={styles.dropdownList}>
                {["TRAINING", "MATCH"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setType(item);
                      setShowTypeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>
                      {item === "TRAINING" ? "Training" : "Match"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Dropdown for Questionnaire */}
          <Text style={styles.label}>{localizationStrings?.Select}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowQuestionnaireDropdown(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedQuestionnaire
                ? questionnaires.find((q) => q.id === selectedQuestionnaire)?.training_title
                : "-- Sélectionner --"}
            </Text>
          </TouchableOpacity>

          <Modal visible={showQuestionnaireDropdown} transparent animationType="fade">
            <TouchableOpacity
              style={styles.dropdownOverlay}
              onPress={() => setShowQuestionnaireDropdown(false)}
            >
              <View style={styles.dropdownList}>
                {loadingQuestions ? (
                  <ActivityIndicator size="large" color="#4C8BF5" />
                ) : (
                  <FlatList
                    data={questionnaires}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedQuestionnaire(item.id);
                          setShowQuestionnaireDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>
                          {item.training_title}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* Date & Time */}
          <View style={styles.dateTimeRow}>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text style={styles.selectText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setTimePickerVisibility(true)}
            >
              <Text style={styles.selectText}>⏰ {time.toLocaleTimeString()}</Text>
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

          {/* Action Buttons */}
          {loading ? (
            <ActivityIndicator size="large" color="#4C8BF5" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#ccc' }]}
                onPress={onClose}
              >
                <Text>{localizationStrings.Cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: 'rgba(160, 216, 3, 1)' }]}
                onPress={handleStart}
              >
                <Text style={{ color: '#fff', fontSize: 15 }}>
                  {localizationStrings?.Start}
                </Text>
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
  overlay: { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: '#fff', padding: 20, width: '90%', borderRadius: 14 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 10, textAlign: 'center', color: '#333' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  dropdown: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 10 },
  dropdownText: { fontSize: 15, color: '#333' },
  dropdownOverlay: { flex: 1, backgroundColor: '#00000055', justifyContent: 'center', alignItems: 'center' },
  dropdownList: { backgroundColor: '#fff', width: '80%', borderRadius: 10, maxHeight: 250 },
  dropdownItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  dropdownItemText: { fontSize: 16, color: '#333' },
  dateTimeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  selectBtn: { backgroundColor: 'gray', paddingVertical: 12, borderRadius: 8, flex: 1, alignItems: 'center', height: 48, justifyContent: 'center', margin: 5 },
  selectText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  buttonRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' },
  actionBtn: { flex: 1, padding: 12, borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
});
