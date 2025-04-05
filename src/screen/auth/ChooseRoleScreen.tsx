import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChooseRoleScreen = ({ navigation }: any) => {
    const [selectedRole, setSelectedRole] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Image source={imageIndex.app} style={styles.logo} resizeMode="contain" />
                </View>
            </View>
            <Text style={styles.heading}>Choose Your Role</Text>
            <Text style={styles.subHeading}>Select how you want to use Footlball</Text>
            <Image source={imageIndex.selectionbag} style={{
                height: 200,
                width: 300,
                marginTop: 44
            }} resizeMode="cover" />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.bottomButton, {
                    borderColor: selectedRole === 'Coach' ? "#A0D803" : "#9DB2BF"
                }]}
                onPress={async () => {
                    try {
                         setSelectedRole('Coach');
                        await AsyncStorage.setItem('userRole', 'Coach'); // Save to AsyncStorage
                   navigation.navigate(ScreenNameEnum.LoginScreen); // Navigate to ReadyScreen
                    } catch (error) {
                        console.error('Failed to save user role:', error);
                    }
                }}
                >
                    <Image source={imageIndex.cocah2} style={{
                        height: 60,
                        width: 60,
                    }} resizeMode="contain" />

                    <Text style={[styles.buttonText,]}>Coach</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, {
                    borderColor: selectedRole === 'Player' ? "#A0D803" : "#9DB2BF"
                }]}
                onPress={() => {
                     setSelectedRole('Player');
                      AsyncStorage.setItem('userRole', "Player");  // AsyncStorage में save
                navigation.navigate(ScreenNameEnum.LoginScreen);
                }}
                >
                    <Image source={imageIndex.playersP} style={{
                           height: 60,
                           width: 60,
                    }} resizeMode="contain" />
                    <Text style={styles.buttonText}>Player</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 100
    },
    logo: {
        height: 150,
        width: 150,
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 55,
        lineHeight: 28,
        color: "black"
    },
    subHeading: {
        fontSize: 14,
        color: 'black',
         lineHeight: 21,
         fontWeight:"400"
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    radioButtonSelected: {
        backgroundColor: '#e6f7ff',
        borderColor: 'green',
    },
    radioInner: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'green',
        marginRight: 8,
    },
    radioText: {
        fontSize: 16,
    },
    illustration: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 20,
     },
    bottomButton: {
        flex: 1,
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        lineHeight: 24,
        marginTop:4
    },
});

export default ChooseRoleScreen;
