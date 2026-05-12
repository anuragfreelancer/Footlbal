import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from './Localization/Localization';
import { useLanguage } from './Localization/LanguageContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

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
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContentPremium: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    paddingHorizontal: wp(6),
    paddingBottom: Platform.OS === 'ios' ? hp(5) : hp(3),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalHandle: {
    width: wp(12),
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: hp(1.5),
  },
  titlePremium: {
    fontSize: hp(2.6),
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: hp(2),
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  optionsContainer: {
    marginBottom: hp(2),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: wp(4.5),
    borderRadius: wp(5),
    marginVertical: hp(0.8),
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: 'rgba(160, 216, 3, 1)',
    backgroundColor: 'rgba(160, 216, 3, 0.05)',
  },
  optionInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagWrapper: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  flagWrapperActive: {
    borderColor: 'rgba(160, 216, 3, 0.3)',
  },
  flagIcon: {
    fontSize: hp(2.5),
  },
  optionLabel: {
    fontSize: hp(2),
    color: '#64748B',
    fontWeight: '600',
  },
  optionLabelActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  radioOuter: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioOuterActive: {
    borderColor: 'rgba(160, 216, 3, 1)',
  },
  radioInner: {
    width: wp(3.5),
    height: wp(3.5),
    borderRadius: wp(1.75),
    backgroundColor: 'rgba(160, 216, 3, 1)',
  },
  cancelBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: wp(5),
    paddingVertical: hp(2),
    alignItems: 'center',
    marginTop: hp(1),
  },
  cancelBtnText: {
    color: '#64748B',
    fontSize: hp(1.9),
    fontWeight: '700',
  },
});

export default LanguageModal;

