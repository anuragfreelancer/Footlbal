import React, { useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../redux/Api/AuthApi';
import { successToast } from './customToast';

const PAYMENT_SUCCESS_SCHEME = 'kmmprpe';
const PAYMENT_SUCCESS_HOST = 'payment-success';

/** Backend success page should redirect to this URL or show a "Go back to app" link with it. */
export const PAYMENT_SUCCESS_DEEP_LINK = `${PAYMENT_SUCCESS_SCHEME}://${PAYMENT_SUCCESS_HOST}`;

function isPaymentSuccessUrl(url: string | null): boolean {
  if (!url) return false;
  return (url.startsWith(`${PAYMENT_SUCCESS_SCHEME}://`) && url.includes('payment-success')) || url.includes('payment-success');
}

/**
 * Handles deep link kmmprpe://payment-success when user taps "Go back to app"
 * on the payment success web page. Shows success toast and refetches profile.
 */
export default function PaymentDeepLinkHandler() {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.auth?.userData?.id || state.auth?.user_id || state.auth?.id);

  const handlePaymentSuccessUrl = useCallback(() => {
    successToast('Payment successful! Your subscription is now active.');
    if (userId) {
      GetProfile(userId, dispatch);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (isPaymentSuccessUrl(url)) {
        handlePaymentSuccessUrl();
      }
    });

    const subscription = Linking.addEventListener('url', (event: { url: string }) => {
      if (isPaymentSuccessUrl(event?.url)) {
        handlePaymentSuccessUrl();
      }
    });
    return () => subscription.remove();
  }, [handlePaymentSuccessUrl]);

  return null;
}
