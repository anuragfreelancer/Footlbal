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
import localizationStrings from '../Localization/Localization';
import { useLanguage } from '../Localization/LanguageContext';
import { useSubscription } from './useSubscription';

const formatStr = (str: string, ...args: (string | number)[]) => {
  return args.reduce((s, v, i) => s.replace(`{${i}}`, String(v)), str);
};

const FreeWallUI = () => {
  const { language } = useLanguage();
  const navigation = useNavigation();
  const { daysExpired } = useSubscription();

  const [visible, setVisible] = useState(true);

  const floatAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -3,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  if (!visible) return null;

  const expiredMessage = daysExpired === 0
    ? localizationStrings.SubscriptionExpiredToday
    : formatStr(localizationStrings.SubscriptionExpiredDays, daysExpired);

  const daysSuffix = daysExpired === 1
    ? (language === 'French' ? 'Jour' : 'Day')
    : (language === 'French' ? 'Jours' : 'Days');

  const trialExpiredDetail = language === 'French'
    ? "Votre période d'essai gratuit de 7 jours est terminée. Veuillez activer l'un de nos abonnements pour continuer à ajouter des joueurs, démarrer des sessions et accéder à l'ensemble des fonctionnalités."
    : 'Your 7-day free trial has ended. Please activate one of our subscription plans to unlock full access to add players, start sessions, and view performance reports.';

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
        <Text style={styles.badge}>{localizationStrings.Expired}</Text>
        <View style={styles.daysBadge}>
          <Text style={styles.daysBadgeText}>
            {daysExpired} {daysSuffix}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {expiredMessage}
      </Text>

      <Text style={styles.trialEndedDetail}>
        {trialExpiredDetail}
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={() =>
          navigation.navigate(ScreenNameEnum.SubscriptionPlansScreen)
        }
      >
        <Text style={styles.buttonText}>{localizationStrings.ViewSubscriptionPlans}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FreeWallUI;

const RED_TEXT = '#EF4444';
const RED_BG = '#FFF5F5';
const RED_BORDER = 'rgba(239, 68, 68, 0.35)';

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    marginVertical: 10,
    backgroundColor: RED_BG,
    borderWidth: 1,
    borderColor: RED_BORDER,
    marginHorizontal: 15,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  daysBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  daysBadgeText: {
    color: RED_TEXT,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: RED_TEXT,
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    letterSpacing: 0.5,
  },
  description: {
    marginTop: 2,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  trialEndedDetail: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 14,
  },
  button: {
    marginTop: 4,
    backgroundColor: RED_TEXT,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
