import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';

const Ourplatform = ({ navigation }:any) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBarComponent />
            <View style={{ marginHorizontal: 12, marginTop: 12 }}>
                <CustomHeader imageSource={imageIndex.backNav} label="Our platform" />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={imageIndex.app} style={styles.logo} />
                </View>

                {/* App About Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>What is Our Platform?</Text>
                    <Text style={styles.sectionText}>
                        Our platform is a cutting-edge football management system designed for coaches, players, and teams. It provides real-time tracking, analytics, and insights to optimize training and performance.
                    </Text>
                </View>

                {/* App Usage Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Player RPE Tracking</Text>
                    <Text style={styles.sectionText}>
                        Monitor workload to prevent injuries.
                    </Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Why Choose Us?</Text>
                    <Text style={styles.sectionText}>
                        Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisqu 
                       
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

export default Ourplatform;
