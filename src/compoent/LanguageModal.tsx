import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from './Localization/Localization';
import { useLanguage } from './Localization/LanguageContext';

const LanguageModal = ({ visible, onClose, onSelectLanguage }: any) => {
  const { language, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await AsyncStorage.getItem('Lng');
      setSelectedLanguage(lang || language || 'English');
    };
    if (visible) fetchLanguage();
  }, [visible, language]);

  const handleLanguageSelect = async (lang: string) => {
    await changeLanguage(lang);
    setSelectedLanguage(lang);
    onSelectLanguage?.(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContentPremium}>
          <View style={styles.modalHandle} />
          <Text style={styles.titlePremium}>{localizationStrings.ChooseYourLanguage}</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedLanguage === 'English' && styles.optionSelected,
              ]}
              onPress={() => handleLanguageSelect('English')}
              activeOpacity={0.7}
            >
              <View style={styles.optionInner}>
                <View style={[styles.flagWrapper, selectedLanguage === 'English' && styles.flagWrapperActive]}>
                  <Text style={styles.flagIcon}>🇬🇧</Text>
                </View>
                <Text style={[styles.optionLabel, selectedLanguage === 'English' && styles.optionLabelActive]}>
                  {localizationStrings.English}
                </Text>
              </View>
              <View style={[styles.radioOuter, selectedLanguage === 'English' && styles.radioOuterActive]}>
                {selectedLanguage === 'English' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedLanguage === 'French' && styles.optionSelected,
              ]}
              onPress={() => handleLanguageSelect('French')}
              activeOpacity={0.7}
            >
              <View style={styles.optionInner}>
                <View style={[styles.flagWrapper, selectedLanguage === 'French' && styles.flagWrapperActive]}>
                  <Text style={styles.flagIcon}>🇫🇷</Text>
                </View>
                <Text style={[styles.optionLabel, selectedLanguage === 'French' && styles.optionLabelActive]}>
                  {localizationStrings.French}
                </Text>
              </View>
              <View style={[styles.radioOuter, selectedLanguage === 'French' && styles.radioOuterActive]}>
                {selectedLanguage === 'French' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.cancelBtn} activeOpacity={0.8}>
            <Text style={styles.cancelBtnText}>{localizationStrings.Cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContentPremium: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 12,
  },
  titlePremium: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginVertical: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 18,
    borderRadius: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },
  optionSelected: {
    borderColor: '#A0D803',
    backgroundColor: 'rgba(160, 216, 3, 0.05)',
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  flagWrapperActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(160, 216, 3, 0.2)',
  },
  flagIcon: {
    fontSize: 22,
  },
  optionLabel: {
    fontSize: 17,
    color: '#495057',
    fontWeight: '600',
  },
  optionLabelActive: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DEE2E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#A0D803',
    backgroundColor: '#FFFFFF',
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#A0D803',
  },
  cancelBtn: {
    backgroundColor: '#F2F2F7',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  cancelBtnText: {
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LanguageModal;

