
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
    buttView:{ justifyContent: 'flex-start', marginHorizontal: 12, marginBottom: 15 },
    iamgeView: {
        height: ResponsiveSize.height(120),
        width: ResponsiveSize.height(120),
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        height: ResponsiveSize.height(120),
        width: ResponsiveSize.height(120),
        borderRadius: ResponsiveSize.height(60),
        borderWidth: 3,
        borderColor: "#A0D803", // Use brand lime green
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cameraIcon: {
        height: 28,
        width: 28,
    },
    errorText: {
        color: "red",
        marginTop: 10,
        fontSize: 12,
    },
})
export default styles;
