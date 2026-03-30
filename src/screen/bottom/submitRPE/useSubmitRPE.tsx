import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AttendanceApi, SumitRpfFrom, GetTraining, AddReviewApi } from '../../../redux/Api/AuthApi';
import { Alert, Animated } from 'react-native';
import { Platform } from 'react-native';
import localizationStrings from '../../../compoent/Localization/Localization';

const SLIDER_MAX = 10;
const SLIDER_WIDTH = 300;
const THUMB_STEP = SLIDER_WIDTH / SLIDER_MAX;

const useSubmitRPE = () => {
    const navigation = useNavigation();
    const isLogin = useSelector((state: any) => state?.auth);
    const [isLoading, setisLoading] = useState(false);
    const [session, setSession] = useState("Training");
    const [date, setDate] = useState("");
    const [comments, setComments] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [effort, setEffort] = useState(0);
    const [pan] = useState(() => new Animated.Value(0));
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [formattedTime, setFormattedTime] = useState(localizationStrings.SelectTime);
    const [time, setTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [questionnaires, setQuestionnaires] = useState<any[]>([]);
    const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(true);
    const [coachId, setCoachId] = useState("");
    useEffect(() => {
        const load = async () => {
            setLoadingQuestionnaires(true);
            const result = await GetTraining('before_training');
            setQuestionnaires(Array.isArray(result) ? result : []);
            setLoadingQuestionnaires(false);
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
                // Attempt to parse time if it's a valid date string or just HH:mm
                const t = new Date();
                const [hours, minutes] = params.time.split(/[:\s]/);
                if (hours && minutes) {
                    t.setHours(parseInt(hours, 10));
                    t.setMinutes(parseInt(minutes, 10));
                    setTime(t);
                }
            }
            if (params.trainingId) {
                // We'll handle selecting the questionnaire in the component or here
            }
            if (params.coach_id) setCoachId(params.coach_id);
        }
    }, [route?.params]);

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
        if (value <= 3) return '#10B981'; // Green
        if (value <= 6) return '#F59E0B'; // Yellow/Orange
        if (value <= 9) return '#EF4444'; // Red
        return '#000000'; // Black for 10
    };

    const validateForm = (): boolean => {
        const formErrors: Record<string, string> = {};
        if (!session.trim()) formErrors.session = localizationStrings.Sessionrequired;
        if (!date.trim()) formErrors.date = localizationStrings.Daterequired;
        if (!comments.trim()) formErrors.comments = localizationStrings.Commentsbeempty;
        if (effort === undefined || effort === null || isNaN(Number(effort)) || effort < 0 || effort > 10) {
            formErrors.effort = localizationStrings?.Effort;
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (selectedTrainingTitle?: string) => {
        if (!validateForm()) return;
        if (formattedTime === localizationStrings.SelectTime || !formattedTime) {
            Alert.alert(localizationStrings.Validation, localizationStrings.PleaseSelectTime);
            return;
        }

        setisLoading(true);
        try {
            const params: any = {
                user_id: isLogin?.userData?.id,
                navigation,
                section_type: session,
                date,
                note: comments,
                number_rate: effort,
                time: formattedTime,
                coach_id: coachId,
                rate_from: effort || 0, // Assuming "User" as default
                training_section_question: selectedTrainingTitle || "",
                coach_session_id: params1.coach_session_id
            };
            console.log("Rating  ---- ", params)
            const response = await AddReviewApi(params, setisLoading);
            if (response) {
                setSession("");
                setDate("");
                setComments("");
                setEffort(0);
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

    const setEffortAndPan = (value: number) => {
        const v = Math.min(SLIDER_MAX, Math.max(0, Math.round(value)));
        setEffort(v);
        pan.setValue(v * THUMB_STEP);
    };

    return {
        isLoading,
        setisLoading,
        navigation,
        isLogin,
        handleSubmit,
        getEffortColor,
        session,
        setSession,
        date,
        setDate,
        comments,
        setComments,
        showCalendar,
        setShowCalendar,
        effort,
        setEffort: setEffortAndPan,
        pan,
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
        SLIDER_WIDTH,
        THUMB_STEP,
    };
};

export default useSubmitRPE;
