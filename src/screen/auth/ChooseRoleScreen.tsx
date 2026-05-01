import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveSize from '../../utils/ResponsiveSize';
import CustomButton from '../../compoent/CustomButton';

const { width, height } = Dimensions.get('window');

/**
 * ChooseRoleScreen Component
 * Allows users to select their role (Coach or Player) with premium animations and a clean UI.
 */
const ChooseRoleScreen = ({ navigation }: any) => {
    const [selectedRole, setSelectedRole] = useState('');

    // Animation Values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const coachScale = useRef(new Animated.Value(1)).current;
    const playerScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Entry Animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const animateSelection = (role: string) => {
        setSelectedRole(role);
        // Reset both
        Animated.spring(coachScale, { toValue: role === 'Coach' ? 1.03 : 1, useNativeDriver: true }).start();
        Animated.spring(playerScale, { toValue: role === 'Player' ? 1.03 : 1, useNativeDriver: true }).start();
    };

    const handleContinue = async () => {
        if (!selectedRole) return;
        try {
            await AsyncStorage.setItem('userRole', selectedRole);
            navigation.navigate(ScreenNameEnum.LoginScreen);
        } catch (error) {
            console.error('Failed to save user role:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            
            {/* Background Decorative Element */}
            <View style={styles.bgCircle} />

            <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
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
                    <Animated.View style={{ flex: 1, transform: [{ scale: coachScale }] }}>
                        <TouchableOpacity 
                            style={[
                                styles.roleCard, 
                                selectedRole === 'Coach' && styles.selectedCard
                            ]}
                            onPress={() => animateSelection('Coach')}
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
                            {selectedRole === 'Coach' && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Player Card */}
                    <Animated.View style={{ flex: 1, transform: [{ scale: playerScale }] }}>
                        <TouchableOpacity 
                            style={[
                                styles.roleCard, 
                                selectedRole === 'Player' && styles.selectedCard
                            ]}
                            onPress={() => animateSelection('Player')}
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
                            {selectedRole === 'Player' && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>

            {/* Bottom Action Section */}
            <View style={styles.bottomSection}>
                <CustomButton 
                    title="Continue" 
                    onPress={handleContinue}
                    disabled={!selectedRole}
                    buttonStyle={!selectedRole ? styles.disabledBtn : {}}
                />
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
    bgCircle: {
        position: 'absolute',
        top: -height * 0.1,
        right: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: '#F8FAFC',
        zIndex: -1,
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
        color: '#64748B',
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
        height: ResponsiveSize.height(200),
        width: width * 0.8,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: ResponsiveSize.height(30),
        gap: 16,
    
    },
    roleCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 28,
        paddingVertical: 24,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
        position: 'relative',
        minHeight: 180,
    },
    selectedCard: {
        borderColor: "#A0D803",
        backgroundColor: "#FFFFFF",
        shadowColor: "#A0D803",
        shadowOpacity: 0.15,
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
        color: '#94A3B8',
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '600',
        lineHeight: 14,
    },
    checkMark: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#A0D803',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    bottomSection: {
        marginBottom: ResponsiveSize.height(30),
    },
    disabledBtn: {
        backgroundColor: '#F1F5F9',
        shadowOpacity: 0,
        elevation: 0,
    },
});

export default ChooseRoleScreen;
