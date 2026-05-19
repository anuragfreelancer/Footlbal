import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../Localization/LanguageContext';

interface FreeUIProps {
  daysRemaining?: number;
}

const FreeUI = ({ daysRemaining = 7 }: FreeUIProps) => {
  const { language } = useLanguage();

  const trialTitle = language === 'French'
    ? 'Essai Gratuit Actif'
    : 'Active Free Trial';

  const trialDesc = language === 'French'
    ? "L'entraîneur dispose d'un accès complet pendant la période d'essai gratuit de 7 jours pour ajouter autant de joueurs qu'il le souhaite et démarrer des sessions. Une fois l'essai de 7 jours terminé, l'activation d'un abonnement est requise pour continuer."
    : 'The coach has full access during the 7-day free trial period to add unlimited players and start sessions. Once the 7-day trial ends, subscription activation is required to continue using the application.';

  const daysLabel = language === 'French'
    ? `${daysRemaining} ${daysRemaining === 1 ? 'jour restant' : 'jours restants'}`
    : `${daysRemaining} ${daysRemaining === 1 ? 'day remaining' : 'days remaining'}`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{trialTitle}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{daysLabel}</Text>
        </View>
      </View>
      <Text style={styles.desc}>{trialDesc}</Text>
    </View>
  );
};

export default FreeUI;

const GREEN_TEXT = '#16A34A';
const GREEN_BG = '#F0FDF4';
const GREEN_BORDER = 'rgba(22, 163, 74, 0.2)';

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    marginVertical: 10,
    backgroundColor: GREEN_BG,
    borderWidth: 1,
    borderColor: GREEN_BORDER,
    marginHorizontal: 15,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#15803D',
  },
  badge: {
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: GREEN_TEXT,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  desc: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 18,
    fontWeight: '600',
  },
});
