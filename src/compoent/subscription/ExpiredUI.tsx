import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

const FreeWallUI = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(true);

  const floatAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
 

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateY: floatAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.badge,{
            color:"black"
        }]}>🎉 FREE TRIAL</Text>
        <Text style={styles.title}>Start your 7-day free trial now.</Text>
      </View>

      <Text style={styles.description}>
           Subscription starts automatically after trial.
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={() =>
          navigation.navigate(ScreenNameEnum.SubscriptionPlansScreen)
        }
      >
        <Text style={styles.buttonText}>View Subscription Plans</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FreeWallUI;

const GREEN = 'rgba(160, 216, 3, 1)';

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#F7FBEA',
    borderWidth: 1,
    borderColor: 'rgba(160, 216, 3, 0.35)',
  },
  header: {
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(160, 216, 3, 0.2)',
    color: GREEN,
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: GREEN,
  },
  description: {
    marginTop: 2,
    fontSize: 15,
    color: '#222',
    lineHeight: 22,
  },
  button: {
    marginTop: 4,
    backgroundColor: GREEN,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
