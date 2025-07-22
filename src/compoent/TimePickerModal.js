import React, { useState } from 'react';
import {
  Modal,
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePickerModal = ({ time, setTime, visible, onClose }) => {
  const [tempTime, setTempTime] = useState(time);

  const handleConfirm = () => {
    setTime(tempTime);
    onClose();
  };

  const handleChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      onClose();
      if (selectedTime) {
        setTime(selectedTime);
      }
    } else {
      setTempTime(selectedTime || tempTime);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Time</Text>

          <DateTimePicker
            value={tempTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />

          {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.doneButton} onPress={handleConfirm}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#A0D803',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom:15
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
