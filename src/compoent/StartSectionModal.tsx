import React, { useState } from 'react';
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

const StartSectionModal = ({
  visible,
  onClose,
  onStart,
  selectedPlayers,
}:any) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleTimeConfirm = (selectedTime) => {
    setTime(selectedTime);
    hideTimePicker();
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      await onStart({ date, time });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Selected Players</Text>

          {/* <FlatList
            data={selectedPlayers}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Text style={styles.playerText}>• {item.name}</Text>
            )}
            style={{ maxHeight: 120, marginBottom: 12 }}
          /> */}

          {/* Date & Time Buttons */}
          <View style={styles.dateTimeRow}>
            <TouchableOpacity style={styles.selectBtn} onPress={showDatePicker}>
              <Text style={styles.selectText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectBtn} onPress={showTimePicker}>
              <Text style={styles.selectText}>⏰ {time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.selectedText}>
            Date: {date.toLocaleDateString()}
          </Text>
          <Text style={styles.selectedText}>
            Time: {time.toLocaleTimeString()}
          </Text>

          {/* Modal Date/Time Pickers */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
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
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: 'rgba(160, 216, 3, 1)' }]}
                onPress={handleStart}
              >
                <Text style={{ color: '#fff' ,fontSize:15 }}>Start</Text>
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
      width: '90%',
      borderRadius: 14,
      elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 10,
      textAlign: 'center',
      color: '#333',
    },
    playerText: {
      fontSize: 16,
      paddingVertical: 4,
      color: '#333',
    },
    dateTimeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    selectBtn: {
      backgroundColor: 'gray',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      height:55,
      justifyContent:"center"
    },
    selectText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
    },
    selectedText: {
      fontSize: 15,
      color: '#555',
      marginTop: 10,
      textAlign: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-between',
    },
    actionBtn: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'center',
    },
  });
  