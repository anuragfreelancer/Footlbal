import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import useLegalinfor from './useLegalinfor';
import HTML from 'react-native-render-html';
import LoadingModal from '../../../../utils/Loader';
import localizationStrings from '../../../../compoent/Localization/Localization';

const Legalinfor = () => {
    const {
        privacyData,
        isLoading,
        navigation
    } = useLegalinfor();
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.safeArea}>
            {isLoading && <LoadingModal />}
            <StatusBarComponent />
            <View style={styles.headerWrapper}>
                <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings.LegalInformation} />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.logoContainer}>
                    <Image source={imageIndex.app} style={styles.logo} />
                </View>
                <View style={styles.contentWrapper}>
                    {privacyData ? (
                        <HTML
                            source={{ html: privacyData.description || '<p>No content available</p>' }}
                            contentWidth={width}
                            tagsStyles={styles.htmlStyles}
                        />
                    ) : (
                        <Text style={styles.noContentText}>No content available</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    contentWrapper: {
        marginBottom: 24,
    },
    noContentText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
    },
    htmlStyles: {
        p: {
            fontSize: 16,
            color: '#333',
            lineHeight: 24,
            marginBottom: 12,
        },
        h1: {
            fontSize: 24,
            fontWeight: '600',
            color: '#000',
            marginBottom: 12,
        },
        h2: {
            fontSize: 20,
            fontWeight: '500',
            color: '#222',
            marginBottom: 10,
        },
        a: {
            color: '#007bff',
            textDecorationLine: 'underline',
        },
    },
});

export default Legalinfor;
