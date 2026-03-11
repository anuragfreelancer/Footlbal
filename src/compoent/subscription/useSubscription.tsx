import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSubscription = () => {
  const userGetData = useSelector((state: any) => state?.feature?.userGetData);

  console.log("userGetData", userGetData?.subscription_status);

  return useMemo(() => {
    const status = userGetData?.subscription_status;
    const expiry = userGetData?.subscription_expiry_date;

    const paymentsStatus =
      userGetData?.payments_status ?? userGetData?.payment_status;

    const isExpired = !expiry || new Date(expiry).getTime() < Date.now();
    const isActive = status === 'Active' && !isExpired;
    const isFree = status === 'Free';

    const isPaid =
      paymentsStatus === true ||
      paymentsStatus === 'true' ||
      paymentsStatus === 1 ||
      paymentsStatus === '1';

    // 👇 subscription_status true ho to UI hide
    const showSubscriptionCard = !(isPaid || status === true);

    return {
      status,
      expiry,
      isActive,
      isExpired,
      isFree,
      paymentsStatus,
      showSubscriptionCard,
    };
  }, [userGetData]);
};