import React, { useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import localizationStrings from '../../compoent/Localization/Localization';
import { useLanguage } from '../../compoent/Localization/LanguageContext';
import { GetProfile } from '../../redux/Api/AuthApi';
import { successToast } from '../../utils/customToast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from '../../utils/Constant';

const SUCCESS_URL_MARKERS = [
  'handle-checkout-success',
  'payment-success',
  'payment_success',
  'checkout-success',
  'session_id=cs_',
];

/**
 * Detects success when backend page shows JSON like:
 * {
 *   "message": "Payment successful",
 *   "session": {
 *     "payment_status": "paid",
 *     "status": "complete"
 *   }
 * }
 */
const INJECTED_SCRIPT = `
(function() {
  function getPageContent() {
    var body = document.body;
    var doc = document.documentElement;
    var text = (body && (body.innerText || body.textContent)) || '';
    var html = (body && body.innerHTML) || '';
    var full = (text + ' ' + html).toLowerCase();
    return full;
  }

  function postSuccess(payload) {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(payload || { type: 'PAYMENT_SUCCESS' }));
    }
  }

  function checkSuccess() {
    try {
      var content = getPageContent();

      var hasSuccessMessage =
        content.indexOf('payment successful') !== -1 ||
        content.indexOf('payment successful and saved') !== -1;

      var hasPaidStatus =
        content.indexOf('"payment_status":"paid"') !== -1 ||
        content.indexOf('"payment_status": "paid"') !== -1 ||
        content.indexOf('"payment_status":"paid"'.toLowerCase()) !== -1;

      var hasCompleteStatus =
        content.indexOf('"status":"complete"') !== -1 ||
        content.indexOf('"status": "complete"') !== -1;

      var hasSessionId =
        content.indexOf('"id":"cs_') !== -1 ||
        content.indexOf('"id": "cs_') !== -1 ||
        content.indexOf('session_id=cs_') !== -1;

      if (hasSuccessMessage && (hasPaidStatus || hasCompleteStatus || hasSessionId)) {
        postSuccess({ type: 'PAYMENT_SUCCESS' });
        return true;
      }
    } catch (e) {}

    return false;
  }

  var delays = [0, 200, 500, 1000, 2000, 3000];
  delays.forEach(function(delay) {
    setTimeout(checkSuccess, delay);
  });

  if (document.readyState === 'complete') {
    checkSuccess();
  } else {
    document.addEventListener('DOMContentLoaded', checkSuccess);
    window.addEventListener('load', checkSuccess);
  }
})();
true;
`;

type PaymentWebViewRouteParams = {
  PaymentWebViewScreen: { url: string };
};

export default function PaymentWebViewScreen() {
  useLanguage();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<PaymentWebViewRouteParams, 'PaymentWebViewScreen'>>();
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: any) => state.auth?.userData?.id || state.auth?.user_id || state.auth?.id
  );

  const paymentUrl = route.params?.url ?? '';
  const handledSuccessRef = useRef(false);
  const webViewRef = useRef<WebView>(null);

  const handlePaymentSuccess = useCallback(() => {
    if (handledSuccessRef.current) return;

    handledSuccessRef.current = true;

    successToast(localizationStrings.SubscriptionActivated);

    if (userId) {
      GetProfile(userId, dispatch);
    }

    navigation.goBack();
  }, [navigation, userId, dispatch]);

  const onLoadEnd = useCallback(() => {
    if (handledSuccessRef.current) return;
    webViewRef.current?.injectJavaScript(INJECTED_SCRIPT);
  }, []);

  const onNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      const url = (navState?.url || '').toLowerCase();
      console.log('WebView URL =>', navState);

      const isSuccessUrl = SUCCESS_URL_MARKERS.some(marker =>
        url.includes(marker.toLowerCase())
      );

      // if (isSuccessUrl) {
      //   handlePaymentSuccess();
      // }
    },
    []
  );

  const onMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      console.log('nativeEvent', event.nativeEvent);

      try {
        const data = JSON.parse(event.nativeEvent.data);
        console.log('data', data);

        if (data?.type === 'PAYMENT_SUCCESS') {
          
          handlePaymentSuccess();
        }
      } catch (error) {
        if (event.nativeEvent.data === 'PAYMENT_SUCCESS') {
          handlePaymentSuccess();
        }
      }
    },
    [handlePaymentSuccess]
  );

  if (!paymentUrl) {
    navigation.goBack();
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        label={localizationStrings.CompletePayment}
        imageSource={imageIndex.backNav}
      />

      <View style={styles.webWrap}>
        <WebView
          ref={webViewRef}
          source={{ uri: paymentUrl }}
          style={styles.webview}
          onNavigationStateChange={onNavigationStateChange}
          onLoadEnd={onLoadEnd}
          onMessage={onMessage}
          injectedJavaScript={INJECTED_SCRIPT}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="rgba(160, 216, 3, 1)" />
            </View>
          )}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          originWhitelist={['https://*', 'http://*']}
          mixedContentMode="compatibility"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webWrap: {
    flex: 1,
    marginHorizontal: 0,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});