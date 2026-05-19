import React from 'react';
import PremiumUI from './PremiumUI';
import FreeUI from './FreeUI';
import ExpiredUI from './ExpiredUI';
import { useSubscription } from './useSubscription';
import { useSelector } from 'react-redux';

const SubscriptionCard = () => {
  const { isActive, isFree, isExpired, expiry, showSubscriptionCard, daysRemaining, isTrialActive } = useSubscription();



  const isLogin = useSelector((state: any) => state?.auth);
  console.log(isLogin, "isLogin");

  if (!showSubscriptionCard) return null;
  if (isTrialActive) return <FreeUI daysRemaining={daysRemaining} />;
  if (isActive) return <PremiumUI expiry={expiry} />;
  if (isFree) return <FreeUI daysRemaining={daysRemaining} />;
  if (isExpired) return <ExpiredUI />;

  return null;
};

export default SubscriptionCard;
