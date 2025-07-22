import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddAttendanceModal = ({ visible, onConfirm,onClose }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => onConfirm('No')}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add Attendance</Text>
          <Text style={styles.message}>Do you want to add attendance?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.yesButton} onPress={() => onConfirm('Yes')}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: '#00000088',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 16,
      elevation: 5,
      shadowColor: '#000',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    yesButton: {
      backgroundColor: 'rgba(160, 216, 3, 1)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    noButton: {
      backgroundColor: '#F44336',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  }); 
  
export default AddAttendanceModal;
