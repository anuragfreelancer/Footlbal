
import {   StyleSheet } from 'react-native';
import ResponsiveSize from '../../../../utils/ResponsiveSize';
     
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#000',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    sectionContainer: {
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#A0D803',
        padding: 4,
        textAlign: 'center',
        borderRadius: 20,
    },
    sectionText: {
        fontSize: 14,
        color: '#9796A1',
        marginTop: 10,
        lineHeight: 22,
    },
});
export default styles;
