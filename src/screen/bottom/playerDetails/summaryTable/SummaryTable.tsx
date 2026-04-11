
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    Animated,
    Easing
} from 'react-native';
import useSummaryTable from './useSummaryTable';
import styles, {
    FIXED_COL_WIDTH,
    QUESTION_COL_WIDTH,
    ANSWER_COL_WIDTH,
    SCORE_COL_WIDTH
} from './style';
import imageIndex from '../../../../assets/imageIndex';
import localizationStrings from '../../../../compoent/Localization/Localization';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';

const SCORE_COLORS = [
    '#BE123C', '#BE123C', '#E11D48', '#F43F5E',
    '#F97316', '#F59E0B', '#EAB308', '#84CC16',
    '#65A30D', '#16A34A', '#15803D'
];

const SummaryTable = () => {
    const {
        isLoading,
        detailedData,
        stats
    } = useSummaryTable();
    useLanguage();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const hintAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isLoading) {
            // Main Entrance
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();

            // Scroll Hint Animation
            if (detailedData.length > 0) {
                Animated.sequence([
                    Animated.delay(1000),
                    Animated.timing(hintAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.delay(2000),
                    Animated.timing(hintAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        }
    }, [isLoading, detailedData.length]);

    const getScoreColor = (score: number) => {
        const index = Math.min(10, Math.max(0, Math.floor(score)));
        return SCORE_COLORS[index];
    };

    const renderDashboard = () => (
        <View style={styles.dashboardContainer}>
            <View style={styles.statItem}>
                <Image source={imageIndex.profileUser} style={styles.statIcon} />
                <Text style={styles.statValue}>{stats.totalResponses}</Text>
                <Text style={styles.statLabel}>{localizationStrings.totalResponses || 'Total'}</Text>
            </View>
            <View style={styles.statItem}>
                <Image source={imageIndex.greenGrap} style={styles.statIcon} />
                <Text style={styles.statValue}>{stats.averageScore}</Text>
                <Text style={styles.statLabel}>{localizationStrings.avgScore || 'Avg'}</Text>
            </View>
            <View style={[styles.statItem, { borderColor: '#FEE2E2' }]}>
                <Image source={imageIndex.redGrap} style={[styles.statIcon, { tintColor: '#EF4444' }]} />
                <Text style={[styles.statValue, { color: '#EF4444' }]}>{stats.alerts}</Text>
                <Text style={styles.statLabel}>{localizationStrings.alerts || 'Alerts'}</Text>
            </View>
        </View>
    );

    const renderTable = () => (
        <View style={styles.tableContainer}>
            {/* Scroll Hint Overlay */}
            <Animated.View style={[styles.scrollHintBadge, { opacity: hintAnim }]}>
                <Text style={{ fontSize: 16 }}>↔️</Text>
                <Text style={styles.scrollHintText}>Swipe for details</Text>
            </Animated.View>

            {/* FIXED PLAYER COLUMN */}
            <View style={styles.fixedColumnWrapper}>
                <View style={styles.fixedHeaderCell}>
                    <Text style={styles.headerText}>{localizationStrings.Player || 'Player'}</Text>
                </View>
                {detailedData.map((item, index) => (
                    <View key={`fixed-${item.id}-${index}`} style={[styles.fixedDataCell, index % 2 === 1 && styles.zebraRow]}>
                        <Image
                            source={item.playerImage ? { uri: item.playerImage } : imageIndex.user}
                            style={styles.playerAvatar}
                        />
                        <Text style={styles.playerNameText} numberOfLines={2}>{item.playerName}</Text>
                    </View>
                ))}
            </View>

            {/* SCROLLABLE DATA GRID */}
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.scrollableArea}>
                <View>
                    <View style={styles.gridHeaderRow}>
                        <View style={[styles.cell, { width: QUESTION_COL_WIDTH }]}>
                            <Text style={styles.headerText}>{localizationStrings.Question || 'Question'}</Text>
                        </View>
                        <View style={[styles.cell, { width: ANSWER_COL_WIDTH }]}>
                            <Text style={styles.headerText}>{localizationStrings.Response || 'Response'}</Text>
                        </View>
                        <View style={[styles.cell, { width: SCORE_COL_WIDTH, borderRightWidth: 0 }]}>
                            <Text style={styles.headerText}>{localizationStrings.Score || 'Score'}</Text>
                        </View>
                    </View>

                    {detailedData.map((item, index) => (
                        <View key={`grid-${item.id}-${index}`} style={[styles.gridRow, index % 2 === 1 && styles.zebraRow]}>
                            <View style={[styles.cell, { width: QUESTION_COL_WIDTH }]}>
                                <Text style={styles.questionText}>{item.question}</Text>
                            </View>
                            <View style={[styles.cell, { width: ANSWER_COL_WIDTH }]}>
                                <Text style={styles.answerText}>"{item.answer}"</Text>
                            </View>
                            <View style={[styles.cell, { width: SCORE_COL_WIDTH, borderRightWidth: 0, alignItems: 'center' }]}>
                                <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(item.score) }]}>
                                    <Text style={styles.scoreValue}>{item.score}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    {detailedData.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>{localizationStrings.NoReviewsFound || 'No data found'}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent barStyle="dark-content" />

            <View style={[styles.headerRowTab, {
                marginBottom: 11
            }]}>
                <Text style={styles.headerTitleTab}>Global Overview Dashboard</Text>
            </View>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={30} color="#6AD005" />
                </View>
            ) : (
                <Animated.View style={{ flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                        {renderTable()}
                    </ScrollView>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

export default SummaryTable;
