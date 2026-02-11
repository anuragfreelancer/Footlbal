import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PremiumUI = ({ expiry }) => {
  return (
    <View style={[styles.card, styles.premium]}>
      <Text style={styles.title}>Premium Active ✅</Text>
      <Text style={styles.text}>Valid till: {expiry}</Text>
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
