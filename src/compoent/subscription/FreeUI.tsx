import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FreeUI = () => {
  return (
    <View style={[styles.card, styles.free]}>
      <Text style={styles.title}>Free Plan</Text>
      <Text style={styles.text}>
        Upgrade to unlock all premium features
      </Text>
    </View>
  );
};

export default FreeUI;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  free: {
    backgroundColor: '#F0F0F0',
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
