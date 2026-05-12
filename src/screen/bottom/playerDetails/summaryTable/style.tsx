
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FIXED_COL_WIDTH = 135;
const QUESTION_COL_WIDTH = 230;
const ANSWER_COL_WIDTH = 280;
const SCORE_COL_WIDTH = 95;
const CELL_HEIGHT = 90;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    // Header Style
    headerRowTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 5,
    },
    headerTitleTab: {
        fontSize: 24,
        color: '#0F172A',
        fontWeight: '800',
        textAlign: "center"
    },
    subHeader: {
        fontSize: 13,
        color: "#64748B",
        fontWeight: '600',
        paddingHorizontal: 15,
        textAlign: 'center',
        marginBottom: 15,
    },

    // Dashboard (Proper App Style with Icons)
    dashboardContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 4,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        // Soft SaaS shadow
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    statIcon: {
        width: 24,
        height: 24,
        marginBottom: 8,
        tintColor: '#6AD005',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: '#94A3B8',
        marginTop: 2,
        letterSpacing: 0.5,
    },

    // Scroll Hint Badge
    scrollHintBadge: {
        position: 'absolute',
        top: 200,
        right: 20,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
    },
    scrollHintText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
        marginLeft: 6,
    },

    // Proper Table Structure (Fixed Column layout)
    tableContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    // Fixed Column (Player) with Shadow Edge
    fixedColumnWrapper: {
        width: FIXED_COL_WIDTH,
        backgroundColor: '#FFFFFF',
        zIndex: 10,
        // Edge Shadow to indicate scrollability
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        marginLeft: 5,
        borderRightWidth: 0, // Removed solid border for shadow edge
    },
    fixedHeaderCell: {
        height: 54,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderTopLeftRadius: 12,
    },
    fixedDataCell: {
        height: CELL_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: '#FFFFFF',
    },

    // Scrollable Grid
    scrollableArea: {
        flex: 1,
    },
    gridHeaderRow: {
        flexDirection: 'row',
        height: 54,
        backgroundColor: '#1E293B',
        borderTopRightRadius: 12,
    },
    gridRow: {
        flexDirection: 'row',
        height: CELL_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    zebraRow: {
        backgroundColor: '#FBFCFE',
    },

    // Common Cell Styles
    cell: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRightWidth: 1,
        borderRightColor: '#F1F5F9',
    },
    headerText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1,

    },

    // Data Styles
    playerAvatar: {
        width: 38,
        height: 38,
        borderRadius: 12,
        marginRight: 10,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    playerNameText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
        flex: 1,
    },
    questionText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
        lineHeight: 18,
    },
    answerText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
        lineHeight: 18,
    },

    // Score Strength
    scoreBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        minWidth: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    scoreValue: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    // Loading & Empty
    emptyContainer: {
        padding: 60,
        alignItems: 'center',
        width: width - FIXED_COL_WIDTH,
    },
    emptyText: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '600',
    },
});

export default styles;
export { FIXED_COL_WIDTH, QUESTION_COL_WIDTH, ANSWER_COL_WIDTH, SCORE_COL_WIDTH, CELL_HEIGHT };
