import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AttendanceApi, AddQuestionAnsApi } from '../../../redux/Api/AuthApi';
import { Alert, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import localizationStrings from '../../../compoent/Localization/Localization';

const { width: screenWidth } = Dimensions.get('window');
const SLIDER_HORIZONTAL_PADDING = 20;
const SLIDER_MAX = 10;
const SLIDER_WIDTH = screenWidth - (SLIDER_HORIZONTAL_PADDING * 2) - 36; // account for card padding
const THUMB_STEP = SLIDER_WIDTH / SLIDER_MAX;

export interface QuestionAnswer {
    score: number;
    text: string;
}

const useSubmitRPE = () => {
    const navigation = useNavigation();
    const isLogin = useSelector((state: any) => state?.auth);
    const [isLoading, setisLoading] = useState(false);
    const [session, setSession] = useState("Training");
    const [date, setDate] = useState("");
    const [comments, setComments] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [formattedTime, setFormattedTime] = useState(localizationStrings.SelectTime);
    const [time, setTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [questionnaires, setQuestionnaires] = useState<any[]>([]);
    const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(true);
    const [coachId, setCoachId] = useState("");

    // Per-question answers: { [questionId]: { score, text } }
    const [questionAnswers, setQuestionAnswers] = useState<Record<string, QuestionAnswer>>({});
    const route = useRoute() as any;
    const params1 = route?.params;

    useEffect(() => {
        const item = params1?.item;
        if (item) {
            if (item.type) setSession(item.type);
            if (item.session_start_date) setDate(item.session_start_date);
            if (item.session_start_time) setFormattedTime(item.session_start_time);
            if (item.coach_id) setCoachId(item.coach_id);

            if (item.question_details && Array.isArray(item.question_details)) {
                setQuestionnaires(item.question_details);
                // Initialize question answers
                const initialAnswers: Record<string, QuestionAnswer> = {};
                item.question_details.forEach((q: any) => {
                    initialAnswers[String(q.id)] = { score: 5, text: '' };
                });
                setQuestionAnswers(initialAnswers);
            }
            setLoadingQuestionnaires(false);
        } else {
            setLoadingQuestionnaires(false);
        }
    }, [params1]);

    const setQuestionScore = useCallback((questionId: string, score: number) => {
        setQuestionAnswers(prev => ({
            ...prev,
            [questionId]: { ...prev[questionId], score },
        }));
    }, []);

    const setQuestionText = useCallback((questionId: string, text: string) => {
        setQuestionAnswers(prev => ({
            ...prev,
            [questionId]: { ...prev[questionId], text },
        }));
    }, []);

    const handleConfirm = async (type: string) => {
        try {
            const params = {
                userId: isLogin?.userData?.id,
                navigation,
                type,
            };
            const response = await AttendanceApi(params, setisLoading);
            if (response) {
                setModalVisible(false);
                setSession("");
                setDate("");
                setComments("");
            }
        } catch (error) {
            setModalVisible(false);
            console.error("API Call Failed:", error);
        } finally {
            setisLoading(false);
            setModalVisible(false);
        }
    };

    const getEffortColor = (value: number) => {
        if (value <= 2) return '#22C55E';   // Green
        if (value <= 4) return '#84CC16';   // Lime
        if (value <= 6) return '#F59E0B';   // Amber/Orange
        if (value <= 8) return '#EF4444';   // Red
        return '#DC2626';                    // Dark Red
    };

    const getTrackGradientColors = () => [
        '#22C55E', // 0-1 green
        '#22C55E', // 1-2 green
        '#84CC16', // 2-3 lime
        '#84CC16', // 3-4 lime
        '#F59E0B', // 4-5 amber
        '#F59E0B', // 5-6 amber
        '#EF4444', // 6-7 red
        '#EF4444', // 7-8 red
        '#DC2626', // 8-9 dark red
        '#DC2626', // 9-10 dark red
    ];



    const handleSubmit = async () => {
        const answerEntries = Object.entries(questionAnswers);
        const avgScore = answerEntries.length > 0
            ? Math.round(answerEntries.reduce((sum, [, a]) => sum + a.score, 0) / answerEntries.length)
            : 0;

        setisLoading(true);
        try {
            // 1. Submit Question Answers
            for (const q of questionnaires) {
                const answer = questionAnswers[String(q.id)];
                if (answer) {
                    await AddQuestionAnsApi({
                        user_id: isLogin?.userData?.id,
                        question_id: q.id,
                        question_ans_point: avgScore,
                        answer: answer.text || "",
                        navigat: navigation
                    });
                }
            }

            // 2. Submit Main Review
            // const reviewParams: any = {
            //     user_id: isLogin?.userData?.id,
            //     section_type: session || params1?.item?.type || "Training",
            //     date: date || params1?.item?.session_start_date,
            //     note: comments || "Session Feedback",
            //     number_rate: avgScore,
            //     time: formattedTime === localizationStrings.SelectTime ? (params1?.item?.session_start_time || "00:00") : formattedTime,
            //     coach_id: coachId || params1?.item?.coach_id,
            //     rate_from: avgScore,
            //     coach_session_id: params1?.item?.id,
            // };

            // const response = await AddReviewApi(reviewParams, setisLoading);



        } catch (error) {
            console.error("API Call Failed:", error);
        } finally {
            setisLoading(false);
        }
    };

    const onChangeTime = (_event: any, selectedTime?: Date) => {
        if (Platform.OS === 'android') setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
            setFormattedTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
    };

    return {
        isLoading,
        setisLoading,
        navigation,
        isLogin,
        handleSubmit,
        getEffortColor,
        getTrackGradientColors,
        session,
        setSession,
        date,
        setDate,
        comments,
        setComments,
        showCalendar,
        setShowCalendar,
        errors,
        setErrors,
        showTimePicker,
        setShowTimePicker,
        formattedTime,
        setFormattedTime,
        time,
        setTime,
        onChangeTime,
        modalVisible,
        setModalVisible,
        handleConfirm,
        questionnaires,
        loadingQuestionnaires,
        questionAnswers,
        setQuestionScore,
        setQuestionText,
        SLIDER_WIDTH,
        THUMB_STEP,
        SLIDER_MAX,
    };
};

export default useSubmitRPE;
