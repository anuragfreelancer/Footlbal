import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import styles from './style';
import localizationStrings from '../../../../compoent/Localization/Localization';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';

const Ourplatform = ({ navigation }:any) => {
    useLanguage();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBarComponent />
            <View style={{ marginHorizontal: 12, marginTop: 12 }}>
                <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings?.OurPlatform} />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image source={imageIndex.app} style={styles.logo} />
                </View>

                {/* App About Details Section */}
                {/* <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>What is Our Platform?</Text>
                    <Text style={styles.sectionText}>
                        Our platform is a cutting-edge football management system designed for coaches, players, and teams. It provides real-time tracking, analytics, and insights to optimize training and performance.
                    </Text>
                </View> */}

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



export default Ourplatform;
