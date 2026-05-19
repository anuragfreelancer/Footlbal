import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import localizationStrings from '../Localization/Localization';
import { useLanguage } from '../Localization/LanguageContext';

const PremiumUI = ({ expiry }: any) => {
  useLanguage();
  return (
    <View style={[styles.card, styles.premium]}>
      <Text style={styles.title}>{localizationStrings.PremiumActive}</Text>
      <Text style={styles.text}>{localizationStrings.ValidTill} {expiry}</Text>
    </View>
  );
};

export default PremiumUI;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  premium: {
    backgroundColor: '#E6FFF2',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    marginTop: 6,
    fontSize: 14,
  },
});
