import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AttendanceApi, SumitRpfFrom, GetTraining, AddReviewApi } from '../../../redux/Api/AuthApi';
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
useEffect(() => {
  const load = async () => {
    try {
      setLoadingQuestionnaires(true);

      const response = await fetch("https://kmmps.store/api/get_question");
      const json = await response.json();

      if (json?.status === "1" && Array.isArray(json?.result)) {
        const items = json.result;

        // Set questions list
        setQuestionnaires(items);

      
      } else {
        setQuestionnaires([]);
        setQuestionAnswers({});
      }

    } catch (error) {
      console.log("API Error:", error);
      setQuestionnaires([]);
      setQuestionAnswers({});
    } finally {
      setLoadingQuestionnaires(false);
    }
  };

  load();
}, []);

    const route = useRoute() as any;
    const params1 = route?.params;

    useEffect(() => {
        const params = route?.params;
        if (params) {
            if (params.session) setSession(params.session);
            if (params.date) setDate(params.date);
            if (params.time) {
                setFormattedTime(params.time);
                const t = new Date();
                const [hours, minutes] = params.time.split(/[:\s]/);
                if (hours && minutes) {
                    t.setHours(parseInt(hours, 10));
                    t.setMinutes(parseInt(minutes, 10));
                    setTime(t);
                }
            }
            if (params.coach_id) setCoachId(params.coach_id);
        }
    }, [route?.params]);

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

    const validateForm = (): boolean => {
        const formErrors: Record<string, string> = {};
        if (!session.trim()) formErrors.session = localizationStrings.Sessionrequired;
        if (!date.trim()) formErrors.date = localizationStrings.Daterequired;
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        if (formattedTime === localizationStrings.SelectTime || !formattedTime) {
            Alert.alert(localizationStrings.Validation, localizationStrings.PleaseSelectTime);
            return;
        }

        // Calculate average score across all questions
        const answerEntries = Object.entries(questionAnswers);
        const avgScore = answerEntries.length > 0
            ? Math.round(answerEntries.reduce((sum, [, a]) => sum + a.score, 0) / answerEntries.length)
            : 0;

        // Build per-question data for the API
        const questionsData = questionnaires.map(q => {
            const answer = questionAnswers[String(q.id)] || { score: 0, text: '' };
            return {
                question_id: q.id,
                title: q.training_title_french || q.training_title,
                score: answer.score,
                comment: answer.text,
            };
        });

        setisLoading(true);
        try {
            const params: any = {
                user_id: isLogin?.userData?.id,
                navigation,
                section_type: session,
                date,
                note: comments || JSON.stringify(questionsData),
                number_rate: avgScore,
                time: formattedTime,
                coach_id: coachId,
                rate_from: avgScore,
                training_section_question: questionsData.map(q => q.title).join(', '),
                coach_session_id: params1?.coach_session_id,
                questions_answers: JSON.stringify(questionsData),
            };
            console.log("Rating  ---- ", params);
            const response = await AddReviewApi(params, setisLoading);
            if (response) {
                setSession("");
                setDate("");
                setComments("");
                // Reset all question answers
                const reset: Record<string, QuestionAnswer> = {};
                questionnaires.forEach((q: any) => {
                    reset[String(q.id)] = { score: 5, text: '' };
                });
                setQuestionAnswers(reset);
            }
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
