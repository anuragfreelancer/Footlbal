import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from './Localization/Localization';

const LanguageModal = ({ visible, onClose, onSelectLanguage }: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await AsyncStorage.getItem('Lng');
      setSelectedLanguage(lang || 'English'); // Default to English
    };
    if (visible) fetchLanguage();
  }, [visible]);

  const handleLanguageSelect = async (lang: string) => {
    localizationStrings.setLanguage(lang);
    await AsyncStorage.setItem('Lng', lang);
    setSelectedLanguage(lang);
    onSelectLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
            onPress={onClose}
      style={styles.overlay}>
        <TouchableOpacity  
        
  
        style={styles.modalContainer}>
          <Text style={styles.title}>{localizationStrings.ChooseYourLanguage}</Text>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedLanguage === 'English' && styles.selectedOption,
            ]}
            onPress={() => handleLanguageSelect('English')}
          >
            <Text style={styles.flag}>🇬🇧</Text>
            <Text style={styles.optionText}>{localizationStrings.English}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedLanguage === 'French' && styles.selectedOption,
            ]}
            onPress={() => handleLanguageSelect('French')}
          >
            <Text style={styles.flag}>🇫🇷</Text>
            <Text style={styles.optionText}>{localizationStrings.French}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>{localizationStrings.Cancel}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>

  );
};

export default LanguageModal;

const PRIMARY_COLOR = '#A0D803';      // Green highlight
const BACKGROUND_LIGHT = '#F2FFE2';  // Light green background
const TEXT_COLOR = '#2C2C2C';        // Dark gray for text

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: TEXT_COLOR,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#FAFAFA',
  },
  selectedOption: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: BACKGROUND_LIGHT,
  },
  flag: {
    fontSize: 20,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#FFF2F2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFCCCC',
  },
  cancelText: {
    color: '#FF4D4D',
    fontSize: 16,
    fontWeight: '500',
  },
});
