 import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const usePlayerDetails = () => {
    const route: any = useRoute();
    const { item } = route.params || ""; // Provide a fallback if route.params is undefined
    const navigation = useNavigation();
 
    const isLogin = useSelector((state: any) => state?.auth);

    return {
         navigation,
        item,
        isLogin
    };
};

export default usePlayerDetails;
