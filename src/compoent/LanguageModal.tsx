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
          style={styles.blurOverlay} 
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
                <View style={styles.flagWrapper}>
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
                <View style={styles.flagWrapper}>
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

          <TouchableOpacity onPress={onClose} style={styles.closeBtnPremium} activeOpacity={0.8}>
            <Text style={styles.closeBtnTextPremium}>{localizationStrings.Cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContentPremium: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  titlePremium: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  optionSelected: {
    borderColor: '#A0D803',
    backgroundColor: '#F0FDF4',
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  flagIcon: {
    fontSize: 20,
  },
  optionLabel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  optionLabelActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#A0D803',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A0D803',
  },
  closeBtnPremium: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  closeBtnTextPremium: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '700',
  },
});
