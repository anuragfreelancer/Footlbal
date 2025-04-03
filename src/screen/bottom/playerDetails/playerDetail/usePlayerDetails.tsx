 import { useNavigation, useRoute } from '@react-navigation/native';


const usePlayerDetails = () => {
    const route: any = useRoute();
    const { item } = route.params || ""; // Provide a fallback if route.params is undefined
    const navigation = useNavigation();
 

    return {
         navigation,
        item
    };
};

export default usePlayerDetails;
