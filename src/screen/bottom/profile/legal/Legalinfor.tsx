import React from 'react';
import { View, Text, Image, ScrollView,   StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import useLegalinfor from './useLegalinfor';
import HTML from 'react-native-render-html';
import LoadingModal from '../../../../utils/Loader';

const Legalinfor = () => {
    const {
        privacyData,
        isLoading,
        navigation
    } = useLegalinfor()
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading ? <LoadingModal /> : null}
            <StatusBarComponent />
            <View style={{ marginHorizontal: 12, marginTop: 12 }}>
                <CustomHeader imageSource={imageIndex.backNav} label="Legal information" />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={imageIndex.app} style={styles.logo} />
                </View>
                {privacyData?.length != 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Policies</Text>

                    </View>
                )}
 
                {privacyData &&
                    <HTML
                        source={{ html: privacyData?.description || '<p>No content available</p>' }}
                        contentWidth={width}
                        tagsStyles={styles.htmlStyles}
                    />
                }
                {/* App Usage Section */}

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
