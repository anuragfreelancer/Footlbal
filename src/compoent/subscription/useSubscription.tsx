
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSubscription = () => {
 
      const user = useSelector((state: any) => state?.feature);

   return useMemo(() => {
    const status = user?.subscription_status; // Free | Active | Deactive
    const expiry = user?.subscription_expiry_date;

    const isExpired =
      !expiry || new Date(expiry).getTime() < Date.now();

    const isActive = status === 'Active' && !isExpired;

    return {
      status,
      expiry,
      isActive,
      isExpired,
      isFree: status === 'Free',
    };
  }, [user]);
};
