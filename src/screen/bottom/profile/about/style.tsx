
import {   StyleSheet } from 'react-native';     
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
        backgroundColor: '#A0D803',
         textAlign: 'center',
        borderRadius: 15,
        height:55,
        justifyContent:"center" ,
        marginHorizontal:15 ,
        alignItems:"center"
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
   
    },
    sectionText: {
        fontSize: 14,
        color: '#9796A1',
        marginTop: 10,
        lineHeight: 22,
    },
    htmlStyles: {
        p: {
            fontSize: 14,
            color: 'black',
            lineHeight: 24,
            fontWeight: "500",
            marginTop: 8,
            marginLeft: 15

        },
        h1: {
            fontSize: 22,
            fontWeight: '500',
            color: '#000',
            marginBottom: 10,
        },
        h2: {
            fontSize: 18,
            fontWeight: '500',
            color: '#222',
            marginBottom: 8,
        },
        a: {
            color: '#007bff',
            // textDecorationLine: 'underline',
        },
    },
});
export default styles;
