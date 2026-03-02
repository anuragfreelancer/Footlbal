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
import { GetProfile } from '../../redux/Api/AuthApi';
import { successToast } from '../../utils/customToast';
import { SafeAreaView } from 'react-native-safe-area-context';

const SUCCESS_URL_MARKERS = ['handle-checkout-success', 'payment-success', 'payment_success'];

/** Detects backend success response in page: "Payment successful and saved" + payment_status "paid" */
const INJECTED_SCRIPT = `
(function() {
  function checkSuccess() {
    var text = (document.body && document.body.innerText) || (document.documentElement && document.documentElement.innerText) || '';
    var html = (document.body && document.body.innerHTML) || (document.documentElement && document.documentElement.innerHTML) || '';
    var combined = (text + ' ' + html);
    var hasPaymentSuccessMessage = combined.indexOf('Payment successful and saved') !== -1 ||
      combined.indexOf('"message": "Payment successful and saved"') !== -1;
    var hasPaidStatus = combined.indexOf('"payment_status":"paid"') !== -1 ||
      combined.indexOf('"payment_status": "paid"') !== -1 ||
      (combined.indexOf('payment_status') !== -1 && combined.indexOf('"paid"') !== -1);
    var hasStripeData = combined.indexOf('stripe_session_id') !== -1 || combined.indexOf('stripe_payment_intent') !== -1;
    if ((hasPaymentSuccessMessage || hasPaidStatus) && (hasPaidStatus || hasStripeData)) {
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'PAYMENT_SUCCESS' }));
      }
      return true;
    }
    return false;
  }
  function run() {
    if (checkSuccess()) return;
    if (document.readyState === 'complete') {
      setTimeout(checkSuccess, 600);
      setTimeout(checkSuccess, 1500);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(checkSuccess, 400);
        setTimeout(checkSuccess, 1200);
      });
      window.addEventListener('load', function() {
        setTimeout(checkSuccess, 600);
        setTimeout(checkSuccess, 1500);
      });
    }
  }
  run();
})();
true;
`;

type PaymentWebViewRouteParams = {
  PaymentWebViewScreen: { url: string };
};

export default function PaymentWebViewScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PaymentWebViewRouteParams, 'PaymentWebViewScreen'>>();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.auth?.userData?.id || state.auth?.user_id || state.auth?.id);
  const paymentUrl = route.params?.url ?? '';
  const handledSuccessRef = useRef(false);
  const webViewRef = useRef<WebView>(null);

  const handlePaymentSuccess = useCallback(() => {
    console.log("handledSuccessRef.current",handledSuccessRef.current)
    if (handledSuccessRef.current) return;
    handledSuccessRef.current = true;
    successToast('Payment successful and saved. Your subscription is now active.');
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
          console.log("navState.current",navState)

      const url = (navState?.url || '').toLowerCase();
      const isSuccessUrl = SUCCESS_URL_MARKERS.some((m) => url.includes(m.toLowerCase()));
      if (isSuccessUrl) {
        handlePaymentSuccess();
      }
    },
    [handlePaymentSuccess]
  );

  const onMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        if (data && data.type === 'PAYMENT_SUCCESS') {
          handlePaymentSuccess();
        }
      } catch {
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
      <CustomHeader label="Complete Payment" imageSource={imageIndex.backNav} />
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
