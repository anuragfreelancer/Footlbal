import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';


const usePlayerDetails = () => {
    const route: any = useRoute();
    const { item } = route.params || ""; // Provide a fallback if route.params is undefined
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);


    return {
        isLoading,
        navigation,
        item
    };
};

export default usePlayerDetails;
