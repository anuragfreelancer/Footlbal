import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Platform-independent robust date parser to avoid NaN / Invalid Date on strict JS engines (e.g. Hermes)
function parseDateRobust(dateStr: any): Date | null {
  if (!dateStr) return null;
  const cleanStr = String(dateStr).trim();
  
  // Try direct parsing first
  let parsed = new Date(cleanStr);
  if (!isNaN(parsed.getTime())) return parsed;

  // Try replacing dash with slash
  parsed = new Date(cleanStr.replace(/-/g, '/'));
  if (!isNaN(parsed.getTime())) return parsed;

  // Fallback manual parser: YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
  const parts = cleanStr.split(/[\sT]+/);
  if (parts.length > 0) {
    const dateParts = parts[0].split(/[-/]/);
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // 0-indexed
      const day = parseInt(dateParts[2], 10);
      
      let hours = 0, minutes = 0, seconds = 0;
      if (parts.length > 1) {
        const timeParts = parts[1].split(':');
        if (timeParts.length >= 2) {
          hours = parseInt(timeParts[0], 10);
          minutes = parseInt(timeParts[1], 10);
          if (timeParts.length >= 3) {
            seconds = parseInt(timeParts[2], 10);
          }
        }
      }
      const date = new Date(year, month, day, hours, minutes, seconds);
      if (!isNaN(date.getTime())) return date;
    }
  }
  return null;
}

export const useSubscription = () => {
  const userGetData = useSelector((state: any) => state?.feature?.userGetData);

  console.log("userGetData", userGetData?.subscription_status);

  return useMemo(() => {
    const status = userGetData?.subscription_status;
    const expiry = userGetData?.subscription_expiry_date;
    const createdAt = userGetData?.created_at;
    console.log("createdAt", createdAt);

    const paymentsStatus =
      userGetData?.payments_status ?? userGetData?.payment_status;

    const expiryDate = parseDateRobust(expiry);
    const isExpired = !expiryDate || expiryDate.getTime() < Date.now();
    const isActive = status === 'Active' && !isExpired;
    const isFree = status === 'Free';

    const isPaid =
      paymentsStatus === true ||
      paymentsStatus === 'true' ||
      paymentsStatus === 1 ||
      paymentsStatus === '1';

    // Calculate 7-day trial from created_at
    let isTrialActive = false;
    let daysRemaining = 0;
    const createdDate = parseDateRobust(createdAt);
    if (createdDate) {
      const currentDate = new Date();
      const diffTime = currentDate.getTime() - createdDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      // Active if within 7 days of creation
      isTrialActive = diffDays < 7 && diffDays >= 0;
      daysRemaining = Math.max(0, Math.ceil(7 - diffDays));
    }

    const isCoach = userGetData?.type === 'Coach';

    // Check if subscription_status is explicitly true as boolean/string or Active
    const isStatusActive = status === true || status === 'true' || status === 'Active';

    // User has access if they paid, have active status, or are within the 7-day trial
    const isSubscribed = isPaid || isStatusActive || isActive || isFree || isTrialActive;

    // 👇 subscription_status true ho to UI hide (Coach only)
    const showSubscriptionCard = isCoach && !(isPaid || isStatusActive || isActive || isFree);

    let daysExpired = 0;
    if (isExpired) {
      const currentDate = new Date();
      if (expiryDate) {
        const diffTime = currentDate.getTime() - expiryDate.getTime();
        daysExpired = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
      } else if (createdDate) {
        const trialExpiryDate = new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const diffTime = currentDate.getTime() - trialExpiryDate.getTime();
        daysExpired = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
      }
    }

    return {
      status,
      expiry,
      isActive,
      isExpired,
      isFree,
      isTrialActive,
      daysRemaining,
      daysExpired,
      isSubscribed,
      paymentsStatus,
      showSubscriptionCard,
    };
  }, [userGetData]);
};