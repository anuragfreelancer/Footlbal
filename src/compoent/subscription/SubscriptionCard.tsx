import React from 'react';
import PremiumUI from './PremiumUI';
import FreeUI from './FreeUI';
import ExpiredUI from './ExpiredUI';
import { useSubscription } from './useSubscription';
 
const SubscriptionCard = () => {
  const { isActive, isFree, isExpired, expiry } = useSubscription();

  if (isActive) return <PremiumUI expiry={expiry} />;
  if (isFree) return <FreeUI />;
  if (isExpired) return <ExpiredUI />;

  return null;
};

export default SubscriptionCard;
