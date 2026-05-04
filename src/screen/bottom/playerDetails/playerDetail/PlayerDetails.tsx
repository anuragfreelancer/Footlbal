import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import usePlayerDetails from './usePlayerDetails';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../../compoent/Localization/Localization';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';


const PlayerDetails = () => {
    useLanguage();
    const {
        navigation,
        item,
        isLogin,
        loading,
        downloadVideo
    } = usePlayerDetails();
    const formatDate = (dob: any): string => {
        if (!dob || typeof dob !== 'string') return 'Invalid Date';

        // Trim spaces and split by '/'
        const parts = dob.trim().split('/');

        if (parts.length !== 3) return 'Invalid Date';

        const [day, month, year] = parts.map(part => parseInt(part, 10));

        // Validate extracted values
        if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
            return 'Invalid Date';
        }

        // Create date object (JS months are 0-based)
        const date = new Date(year, month - 1, day);

        // Ensure created date matches input values
        if (
            date.getDate() !== day ||
            date.getMonth() + 1 !== month ||
            date.getFullYear() !== year
        ) {
            return 'Invalid Date';
        }

        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    // Example usage
    const formattedDate = formatDate(item?.dob);


    return (
        <View style={styles.container}>
            <StatusBarComponent />

            {/* Curved Top Background */}
            <View style={styles.topBackground} />

            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <CustomHeader
                        imageSource={imageIndex.backNav}
                        label={localizationStrings?.PlayerDetails}
                        textStyle={{ color: 'white' }}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Player Image Section */}
                    <View style={styles.profileContainer}>
                        <View style={styles.imageRing}>
                            <Image
                                source={
                                    item?.image &&
                                        item.image.trim() !== "" &&
                                        !item.image.endsWith("/users/")
                                        ? { uri: item.image }
                                        : imageIndex.prfEdit
                                }
                                style={styles.profileImage}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Information Card */}
                    <View style={styles.infoCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{localizationStrings?.PlayerDetails}</Text>
                            <Text style={styles.detailValue}>{item?.user_name}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{localizationStrings?.Position}</Text>
                            <Text style={styles.detailValue}>{item?.position_id}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{localizationStrings?.MyTeam}</Text>
                            <Text style={styles.detailValue}>{item?.team_id}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>DOB</Text>
                            <Text style={styles.detailValue}>{formattedDate}</Text>
                        </View>

                        {isLogin?.userData?.type === "Coach" && (
                            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                                <Text style={styles.detailLabel}>{localizationStrings?.Performance || "Performance"}</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => navigation.navigate(ScreenNameEnum.Reports, {
                                        playerUserId: item?.id,
                                        playerName: item?.user_name
                                    })}
                                    style={styles.reportButton}
                                >
                                    <Text style={styles.reportButtonText}>
                                        {localizationStrings?.PerformanceReports || "View Reports"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Coach Notes Section */}
                    <View style={styles.notesCard}>
                        <Text style={styles.notesTitle}>{localizationStrings?.CoachNotes}</Text>
                        <Text style={styles.notesText}>{item?.player_details || "No notes available for this player."}</Text>
                    </View>

                    {/* Spacing for bottom buttons */}
                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Fixed Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate(ScreenNameEnum.PlayerEdit, {
                            item: item
                        })}
                        style={[styles.button, {
                            borderColor: '#A0D803',
                            borderWidth: 1.5,
                            backgroundColor: 'white',
                        }]}
                    >
                        <Text style={[styles.buttonText, { color: "#A0D803" }]}>
                            {localizationStrings?.Edit}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.button, { backgroundColor: '#A0D803' }]}
                        onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen, {
                            item: item
                        })}
                    >
                        <Text style={[styles.buttonText, { color: 'white' }]}>
                            {localizationStrings?.ChatMessages}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );

};



export default PlayerDetails;