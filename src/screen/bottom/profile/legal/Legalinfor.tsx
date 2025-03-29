import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';

const Legalinfor = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBarComponent />
            <View style={{ marginHorizontal: 12, marginTop: 12 }}>
                <CustomHeader imageSource={imageIndex.backNav} label="Legal information" />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={imageIndex.app} style={styles.logo} />
                </View>

                {/* App About Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Policies</Text>
                    <Text style={styles.sectionText}>
                    This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the
                     </Text>
                </View>

                {/* App Usage Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>App Usage</Text>
                    <Text style={styles.sectionText}>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural
                     </Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

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

export default Legalinfor;
