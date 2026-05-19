import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import localizationStrings from '../../compoent/Localization/Localization';
import { useLanguage } from '../../compoent/Localization/LanguageContext';
import { createCheckoutSession, GetProfile } from '../../redux/Api/AuthApi';
import { successToast } from '../../utils/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../../redux/feature/authSlice';

const { width } = Dimensions.get('window');

/**
 * ✅ API
 * POST https://kmmps.store/api/Football/activate_subscription
 * body: { user_id, subscription_status, subscription_expiry_date }
 */
export const base_url = 'https://kmmps.store/api/';

const plan = {
  nameKey: 'TeamProPlan',
  basePrice: 15.99,
  freeTrialDays: 7,
  maxPlayers: 20,
  additionalPlayerPrice: 2,
  featureKeys: [
    'SubPlanFeature1',
    'SubPlanFeature2',
    'SubPlanFeature3',
    'SubPlanFeature4',
    'SubPlanFeature5',
    'SubPlanFeature6',
    'SubPlanFeature7',
    'SubPlanFeature8',
  ],
  accentColor: '#4F46E5',
  gradientColors: ['#4F46E5', '#7C73FF'],
};

// ✅ helper: add days to today and return YYYY-MM-DD
const addDaysISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const formatStr = (str: string, ...args: (string | number)[]) => {
  return args.reduce((s, v, i) => s.replace(`{${i}}`, String(v)), str);
};

export default function SubscriptionPlansScreen() {
  useLanguage();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const isLogin = useSelector((state: any) => state.auth);
  const token = isLogin?.token;
  const userId = isLogin?.userData?.id || isLogin?.user_id || isLogin?.id;
  const userEmail = isLogin?.userData?.email || '';
  const [teamPlayers, setTeamPlayers] = useState('20');
  const [playerInput, setPlayerInput] = useState('20');
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNameEnum.SPLASH_SCREEN }],
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) GetProfile(userId, dispatch);
    }, [userId, dispatch])
  );

  const calculatePrice = (players: string) => {
    const playerCount = parseInt(players) || 0;
    if (playerCount <= plan.maxPlayers) return plan.basePrice;
    const extraPlayers = playerCount - plan.maxPlayers;
    return plan.basePrice + extraPlayers * plan.additionalPlayerPrice;
  };

  const handlePlayerChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPlayerInput(numericText);
    if (numericText) setTeamPlayers(numericText);
  };

  const totalPrice = useMemo(() => calculatePrice(teamPlayers), [teamPlayers]);
  const playerCount = useMemo(() => parseInt(teamPlayers) || 20, [teamPlayers]);
  const hasExtraPlayers = playerCount > plan.maxPlayers;

  // ✅ API call
  const activateSubscriptionApi = async ({
    user_id,
    subscription_status,
    subscription_expiry_date,
  }: {
    user_id: string | number;
    subscription_status: 'Active' | 'Free' | 'Deactive';
    subscription_expiry_date: string; // YYYY-MM-DD
  }) => {


    const url = `${base_url}/activate_subscription`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // keep if your backend expects it
      },
      body: JSON.stringify({
        user_id,
        subscription_status,
        subscription_expiry_date,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || data?.error || 'Subscription activation failed';
      throw new Error(msg);
    }
    return data;
  };

  const handleSubscribe = () => {
    if (!userId) {
      Alert.alert(localizationStrings.LoginRequired, localizationStrings.LoginRequiredMessage);
      return;
    }
    if (!userEmail) {
      Alert.alert(localizationStrings.Emailrequired, localizationStrings.EmailRequiredMessage);
      return;
    }
    if (!token) {
      Alert.alert(localizationStrings.SessionExpired, localizationStrings.SessionExpiredMessage);
      return;
    }

    const expiryDate = addDaysISO(plan.freeTrialDays); // ✅ free trial expiry

    Alert.alert(
      localizationStrings.ConfirmSubscription,
      formatStr(
        localizationStrings.SubscribeConfirmMessage,
        localizationStrings[plan.nameKey],
        playerCount,
        totalPrice.toFixed(2),
        plan.freeTrialDays,
        expiryDate
      ),
      [
        { text: localizationStrings.Cancel, style: 'cancel' },
        {
          text: localizationStrings.Subscribe,
          style: 'default',
          onPress: async () => {
            try {
              setSubmitting(true);

              // ✅ Call createCheckoutSession (email, price, user_id, token for 401)
              const checkoutPayload = {
                email: userEmail,
                price: totalPrice,
                user_id: userId,
                token: token,
              };

              const checkoutRes = await createCheckoutSession(checkoutPayload, setSubmitting);
              if (!checkoutRes) return;

              const checkoutUrl =
                checkoutRes?.data?.url ??
                checkoutRes?.url;

              console.log("asssss", checkoutUrl)
              if (checkoutUrl && typeof checkoutUrl === 'string') {
                setSubmitting(false);
                successToast(localizationStrings.OpeningPayment);
                navigation.navigate(ScreenNameEnum.PaymentWebViewScreen, { url: checkoutUrl });
                return;
              }

              Alert.alert(localizationStrings.Success, localizationStrings.SubscriptionActivated);
            } catch (e: any) {
              Alert.alert(localizationStrings.Error, e?.message || localizationStrings.SomethingWentWrong);
            } finally {
              setSubmitting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.headerContainer}>
        {navigation.canGoBack() ? (
          <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings.SubscriptionPlans} />
        ) : (
          <View style={styles.simpleHeaderContainer}>
            <Text style={styles.simpleHeaderTitle}>{localizationStrings.SubscriptionPlans}</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        {/* Plan Card */}
        <View style={styles.card}>
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.currency}>€</Text>
              <Text style={styles.price}>{totalPrice.toFixed(2)}</Text>
              {/* <Text style={styles.pricePeriod}>{localizationStrings.PerMonth}</Text> */}
            </View>

            {/* <Text style={styles.priceSubtitle}>
              {hasExtraPlayers ? (
                <Text>
                  <Text style={styles.basePrice}>€{plan.basePrice.toFixed(2)}</Text>{' '}
                  {formatStr(localizationStrings.BasePlusExtra, plan.additionalPlayerPrice, playerCount - plan.maxPlayers)}
                </Text>
              ) : (
                formatStr(localizationStrings.ForUpToPlayers, plan.maxPlayers)
              )}
            </Text> */}
          </View>

          {/* Player Input */}
          {/* <View style={styles.playerInputSection}>
            <Text style={styles.sectionTitle}>{localizationStrings.CustomizeTeamSize}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabelText}>{localizationStrings.NumberOfPlayers}</Text>
              <TextInput
                value={playerInput}
                onChangeText={handlePlayerChange}
                keyboardType="number-pad"
                style={styles.input}
                maxLength={3}
              />
              <View style={styles.inputHelper}>
                <Text style={styles.inputHelperText}>{formatStr(localizationStrings.BasePlayers, plan.maxPlayers)}</Text>
                <Text style={styles.inputHelperText}>
                  {formatStr(localizationStrings.ExtraPerPlayer, plan.additionalPlayerPrice)}
                </Text>
              </View>
            </View>

            {hasExtraPlayers && (
              <View style={styles.priceBreakdown}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>
                    {formatStr(localizationStrings.BasePriceLabel, plan.maxPlayers)}
                  </Text>
                  <Text style={styles.breakdownValue}>€{plan.basePrice.toFixed(2)}</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>
                    {formatStr(
                      localizationStrings.ExtraPlayersLabel,
                      playerCount - plan.maxPlayers,
                      plan.additionalPlayerPrice
                    )}
                  </Text>
                  <Text style={styles.breakdownValue}>
                    €{((playerCount - plan.maxPlayers) * plan.additionalPlayerPrice).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.divider} />
                <View style={[styles.breakdownRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>{localizationStrings.MonthlyTotal}</Text>
                  <Text style={styles.totalValue}>€{totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            )}
          </View> */}

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>{localizationStrings.EverythingIncluded}</Text>
            {plan.featureKeys.map((key, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: 'rgba(160, 216, 3, 1)' + '20' }]}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>✓</Text>
                </View>
                <Text style={styles.featureText}>{localizationStrings[key]}</Text>
              </View>
            ))}
          </View>

          {/* Subscribe Button */}
          <TouchableOpacity
            style={[styles.subscribeButton, { backgroundColor: 'rgba(160, 216, 3, 1)' }]}
            onPress={handleSubscribe}
            activeOpacity={0.9}
            disabled={submitting}
          >
            {submitting ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <ActivityIndicator color="#000000ff" />
                <Text style={styles.buttonText}>{localizationStrings.Activating}</Text>
              </View>
            ) : (
              <>
                <Text style={styles.buttonText}>{localizationStrings.StartFreeTrial}</Text>

              </>
            )}
          </TouchableOpacity>

          {/* Guarantee */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  headerContainer: { marginHorizontal: 16, marginTop: 8 },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  heroSection: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 12 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#1F2937', textAlign: 'center', marginBottom: 6 },
  heroSubtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22, maxWidth: width * 0.8 },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  planHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  planTitleContainer: { flex: 1 },
  planName: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  trialBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  trialBadgeText: { fontSize: 12, fontWeight: '600' },
  priceSection: { backgroundColor: '#F3F4F6', borderRadius: 16, padding: 20, marginBottom: 20, alignItems: 'center' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 6 },
  currency: { fontSize: 20, fontWeight: '600', marginRight: 2, color: '#1F2937' },
  price: { fontSize: 44, fontWeight: '800', color: '#1F2937' },
  pricePeriod: { fontSize: 14, color: '#6B7280', fontWeight: '500', marginLeft: 4 },
  priceSubtitle: { fontSize: 13, color: '#6B7280', textAlign: 'center' },
  basePrice: { textDecorationLine: 'line-through', color: '#9CA3AF', marginRight: 4 },
  playerInputSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  inputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputLabelText: { fontSize: 14, color: 'rgba(160, 216, 3, 1)', fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 14,
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  inputHelper: { flexDirection: 'row', justifyContent: 'space-between' },
  inputHelperText: { fontSize: 12, color: '#6B7280' },
  priceBreakdown: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 12, marginTop: 12 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  breakdownLabel: { fontSize: 13, color: '#6B7280', flex: 1, paddingRight: 12 },
  breakdownValue: { fontSize: 13, color: '#1F2937', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 10 },
  totalRow: { marginBottom: 0 },
  totalLabel: { fontSize: 15, color: '#1F2937', fontWeight: '600' },
  totalValue: { fontSize: 18, color: 'rgba(160, 216, 3, 1)', fontWeight: '700' },
  featuresSection: { marginBottom: 20 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  featureIcon: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  featureText: { fontSize: 14, color: '#374151', flex: 1, lineHeight: 20 },
  subscribeButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: { color: '#000000ff', fontSize: 17, fontWeight: '700' },
  buttonSubtext: { color: '#000000ff', fontSize: 13, marginTop: 4 },
  guarantee: { paddingVertical: 10, alignItems: 'center' },
  guaranteeText: { fontSize: 12, color: 'rgba(160, 216, 3, 1)', textAlign: 'center' },
  customHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
    height: 46,
  },
  customHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'left',
    flex: 1,
  },
  logoutHeaderButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  simpleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    height: 46,
  },
  simpleHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
});
