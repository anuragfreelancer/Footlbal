
import {   StyleSheet } from 'react-native';
import ResponsiveSize from '../../../../utils/ResponsiveSize';
     
const styles = StyleSheet.create({
    hederView:{
        marginTop: 5, marginHorizontal: 15
    },
    mainView:{
        flex: 1,
        backgroundColor:"white"
    },
     profileContainer: { alignItems: "center", marginTop: 40, },
    name: { fontSize: 19, fontWeight: "700", color: "rgba(174, 133, 44, 1)", marginTop: 9 },
    car: { fontSize: 12, color: "rgba(255, 255, 255, 1)", marginTop: 5, fontWeight: "400" },
    buttView:{ justifyContent: 'flex-start', marginHorizontal: 12, marginBottom: 11 },
    iamgeView :{
        height: ResponsiveSize.height(108), width: ResponsiveSize.width(108),   

    }

})
export default styles;
