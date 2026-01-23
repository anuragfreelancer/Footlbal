import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import localizationStrings from '../../compoent/Localization/Localization';

const { width } = Dimensions.get('window');

const plans = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 'Coming Soon', 
    subtitle: 'For individuals getting started',
    features: [
      '✓ Limited questionnaires',
      '✓ Basic templates',
      '✓ Standard support',
      '✓ Monthly reports',
      '✗ No custom branding',
      '✗ No advanced analytics'
    ],
    popular: false,
    accentColor: '#4CAF50'
  },
  { 
    id: 'pro', 
    name: 'Professional', 
    price: 'Coming Soon', 
    subtitle: 'Perfect for growing businesses',
    features: [
      '✓ Unlimited questionnaires',
      '✓ Advanced analytics',
      '✓ Priority support',
      '✓ Custom branding',
      '✓ Weekly reports',
      '✓ Export capabilities'
    ],
    popular: true,
    accentColor: '#2196F3'
  },
  { 
    id: 'elite', 
    name: 'Elite', 
    price: 'Coming Soon', 
    subtitle: 'For enterprise teams',
    features: [
      '✓ Team collaboration',
      '✓ Advanced reports',
      '✓ API access',
      '✓ White-label solution',
      '✓ Dedicated account manager',
      '✓ Custom integrations'
    ],
    popular: false,
    accentColor: '#9C27B0'
  },
];

export default function SubscriptionPlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const PlanCard = ({ plan }) => {
    const isSelected = selectedPlan === plan.id;
    const isPopular = plan.popular;

    return (
      <View style={[
        styles.card,
        isSelected && styles.selectedCard,
        isPopular && styles.popularCardBorder
      ]}>
        {isPopular && (
          <View style={[styles.popularBadge, { backgroundColor: plan.accentColor }]}>
            <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
          </View>
        )}
        
        <View style={styles.cardHeader}>
          <View style={styles.planNameRow}>
            <View style={[styles.planIcon, { backgroundColor: plan.accentColor + '20' }]}>
              <Text style={[styles.planIconText, { color: plan.accentColor }]}>
                {plan.name.charAt(0)}
              </Text>
            </View>
            <View>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: plan.accentColor }]}>{plan.price}</Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => {
            const isIncluded = feature.includes('✓');
            return (
              <View key={index} style={styles.featureRow}>
                <Text style={[
                  styles.featureIcon,
                  { color: isIncluded ? plan.accentColor : '#999' }
                ]}>
                  {isIncluded ? '✓' : '✗'}
                </Text>
                <Text style={[
                  styles.featureText,
                  { color: isIncluded ? '#333' : '#999' }
                ]}>
                  {feature.substring(2)}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            isSelected 
              ? { backgroundColor: plan.accentColor }
              : styles.unselectedButton
          ]}
          onPress={() => setSelectedPlan(plan.id)}
        >
          <Text style={[
            styles.buttonText,
            isSelected ? styles.selectedButtonText : styles.unselectedButtonText
          ]}>
            {isSelected ? 'Selected' : 'Select Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
       <View style={{ marginHorizontal: 12, marginTop: 5 }}>
                <CustomHeader
                  imageSource={imageIndex.backNav}
                  label={localizationStrings.SubscriptionPlans}
                />
              </View>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Select the perfect subscription plan tailored for your needs
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All plans include our core features. Cancel or upgrade anytime.
          </Text>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>View Complete Feature Comparison</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: width * 0.8,
  },
  plansContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    shadowColor: 'rgba(160, 216, 3, 1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderColor: '#2196F3',
    transform: [{ scale: 1.02 }],
  },
  popularCardBorder: {
    borderColor: '#2196F3',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardHeader: {
    marginBottom: 24,
  },
  planNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planIconText: {
    fontSize: 20,
    fontWeight: '800',
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  planSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceContainer: {
    marginTop: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: '800',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  unselectedButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  selectedButtonText: {
    color: '#fff',
  },
  unselectedButtonText: {
    color: '#666',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  footerButton: {
    paddingVertical: 12,
  },
  footerButtonText: {
    color: '#2196F3',
    fontSize: 15,
    fontWeight: '600',
  },
});