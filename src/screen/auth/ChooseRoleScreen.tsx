import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveSize from '../../utils/ResponsiveSize';

const { width } = Dimensions.get('window');

/**
 * ChooseRoleScreen Component
 * Allows users to select their role (Coach or Player) with a premium UI.
 */
const ChooseRoleScreen = ({ navigation }: any) => {
    const [selectedRole, setSelectedRole] = useState('');

    const handleRoleSelection = async (role: string) => {
        try {
            setSelectedRole(role);
            await AsyncStorage.setItem('userRole', role);
            // Small delay for visual feedback before navigation
            setTimeout(() => {
                navigation.navigate(ScreenNameEnum.LoginScreen);
            }, 300);
        } catch (error) {
            console.error('Failed to save user role:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            
            {/* Header Section */}
            <View style={styles.header}>
                <Image source={imageIndex.app} style={styles.logo} resizeMode="contain" />
                <Text style={styles.heading}>Choose Your Role</Text>
                <Text style={styles.subHeading}>Select how you want to use Footlball</Text>
            </View>

            {/* Illustration Section */}
            <View style={styles.illustrationContainer}>
                <Image 
                    source={imageIndex.selectionbag} 
                    style={styles.illustration} 
                    resizeMode="contain" 
                />
            </View>

            {/* Role Cards Section */}
            <View style={styles.cardContainer}>
                {/* Coach Card */}
                <TouchableOpacity 
                    style={[
                        styles.roleCard, 
                        selectedRole === 'Coach' && styles.selectedCard
                    ]}
                    onPress={() => handleRoleSelection('Coach')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconWrapper, selectedRole === 'Coach' && styles.selectedIconWrapper]}>
                        <Image 
                            source={imageIndex.coach} 
                            style={[styles.roleIcon, selectedRole === 'Coach' && { tintColor: '#fff' }]} 
                            resizeMode="contain" 
                        />
                    </View>
                    <Text style={styles.roleTitle}>Coach</Text>
                    <Text style={styles.roleDesc}>Manage teams & sessions</Text>
                </TouchableOpacity>

                {/* Player Card */}
                <TouchableOpacity 
                    style={[
                        styles.roleCard, 
                        selectedRole === 'Player' && styles.selectedCard
                    ]}
                    onPress={() => handleRoleSelection('Player')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconWrapper, selectedRole === 'Player' && styles.selectedIconWrapper]}>
                        <Image 
                            source={imageIndex.playersP} 
                            style={[styles.roleIcon, selectedRole === 'Player' && { tintColor: '#fff' }]} 
                            resizeMode="contain" 
                        />
                    </View>
                    <Text style={styles.roleTitle}>Player</Text>
                    <Text style={styles.roleDesc}>Track your performance</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: ResponsiveSize.height(40),
    },
    logo: {
        height: ResponsiveSize.height(70),
        width: ResponsiveSize.width(70),
        marginBottom: 16,
    },
    heading: {
        fontSize: 28,
        fontWeight: '800',
        color: "#111827",
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subHeading: {
        fontSize: 15,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center',
        fontWeight: '500',
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        height: ResponsiveSize.height(240),
        width: width * 0.85,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: ResponsiveSize.height(50),
        gap: 16,
    },
    roleCard: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
    },
    selectedCard: {
        borderColor: "#A0D803",
        backgroundColor: "#FFFFFF",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
    },
    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    selectedIconWrapper: {
        backgroundColor: '#A0D803',
        borderColor: '#A0D803',
    },
    roleIcon: {
        height: 36,
        width: 36,
    },
    roleTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
    },
    roleDesc: {
        fontSize: 11,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '600',
        lineHeight: 14,
    },
});

export default ChooseRoleScreen;
