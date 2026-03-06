import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AttendanceApi, SumitRpfFrom, GetTraining } from '../../../redux/Api/AuthApi';
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
    const [effort, setEffort] = useState(1);
    const [pan] = useState(() => new Animated.Value(THUMB_STEP * 1));
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [formattedTime, setFormattedTime] = useState(localizationStrings.SelectTime);
    const [time, setTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [questionnaires, setQuestionnaires] = useState<any[]>([]);
    const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoadingQuestionnaires(true);
            const result = await GetTraining('before_training');
            setQuestionnaires(Array.isArray(result) ? result : []);
            setLoadingQuestionnaires(false);
        };
        load();
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
        if (value <= 3) return '#A0D803';
        if (value <= 6) return '#A0D803';
        if (value <= 9) return '#A0D803';
        return '#A0D803';
    };

    const validateForm = (): boolean => {
        const formErrors: Record<string, string> = {};
        if (!session.trim()) formErrors.session = localizationStrings.Sessionrequired;
        if (!date.trim()) formErrors.date = localizationStrings.Daterequired;
        if (!comments.trim()) formErrors.comments = localizationStrings.Commentsbeempty;
        if (effort === undefined || effort === null || isNaN(Number(effort)) || effort < 1 || effort > 10) {
            formErrors.effort = localizationStrings?.Effort;
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (selectedTrainingId?: number | null) => {
        if (!validateForm()) return;
        if (formattedTime === localizationStrings.SelectTime || !formattedTime) {
            Alert.alert(localizationStrings.SelectTime || "Validation", localizationStrings.SelectTime || "Please select a time.");
            return;
        }

        setisLoading(true);
        try {
            const params: any = {
                userId: isLogin?.userData?.id,
                navigation,
                session,
                date,
                comments,
                effort,
                Starttime: formattedTime,
            };
            if (selectedTrainingId != null && selectedTrainingId !== undefined) {
                params.training_id = selectedTrainingId;
            }
            const response = await SumitRpfFrom(params, setisLoading);
              setSession("");
                setDate("");
                setComments("");
            if (response) {
                setSession("");
                setDate("");
                setComments("");
                            setisLoading(false);

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
        const v = Math.min(SLIDER_MAX, Math.max(1, Math.round(value)));
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
