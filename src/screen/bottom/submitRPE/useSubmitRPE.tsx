import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AttendanceApi, SumitRpfFrom } from '../../../redux/Api/AuthApi';
import { Alert, Animated } from 'react-native';
import { Platform } from 'react-native';
import localizationStrings from '../../../compoent/Localization/Localization';

const useSubmitRPE = () => {
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false)
    const isLogin = useSelector((state: any) => state?.auth);
    const [session, setSession] = useState("");
    const [date, setDate] = useState("");
    const [comments, setComments] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [effort, setEffort] = useState();
    const pan = useState(new Animated.Value(0))[0];
    const [errors, setErrors] = useState({});
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [formattedTime, setFormattedTime] = useState(localizationStrings.SelectTime);
    const [time, setTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(true);

  

    const handleConfirm = async (type:any) => {
        try {
            const params = {
                userId: isLogin?.userData?.id,
                navigation: navigation,
                type: type,
                

            };
            const response = await AttendanceApi(params, setisLoading);
            if (response) {
                setModalVisible(false);

                setSession("");
                setDate("");
                setComments("")
            }
        } catch (error) {
            setModalVisible(false);

            console.error("API Call Failed:", error);
            // Show an error message to the user
        } finally {
            setisLoading(false); // Stop loading after API response/error
            setModalVisible(false);

        }
    };
 
    const getEffortColor = (value: any) => {
        if (value <= 3) return '#A0D803'; // Light effort (Yellow)
        if (value <= 6) return '#A0D803'; // Moderate effort (Light Green)
        if (value <= 9) return '#A0D803'; // Hard effort (Dark Green)
        return '#A0D803'; // Maximum effort (Black)
    };
    const validateForm = (): boolean => {
        let formErrors: Record<string, string> = {};

        if (!session.trim()) formErrors.session = localizationStrings.Sessionrequired;
        if (!date.trim()) formErrors.date = localizationStrings.Daterequired;
        if (!comments.trim()) formErrors.comments =localizationStrings.Commentsbeempty;
        if (effort === undefined || effort === null || isNaN(Number(effort))) {
            formErrors.effort = localizationStrings?.Effort;
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async () => {
         if (!validateForm()) return;
        if (!time || time === "Select Time") {
             Alert.alert("Validation", "Please select a time.");
             return;
           }

        setisLoading(true); // Start loading before API call

        try {
            const params = {
                userId: isLogin?.userData?.id,
                navigation: navigation,
                session: session,
                date: date,
                comments: comments,
                effort: effort,
                Starttime: formattedTime

            };
            const response = await SumitRpfFrom(params, setisLoading);
            if (response) {
                setSession("");
                setDate("");
                setComments("")
            }
        } catch (error) {
            console.error("API Call Failed:", error);
            // Show an error message to the user
        } finally {
            setisLoading(false); // Stop loading after API response/error
        }
    };
    const onChangeTime = (event, selectedTime) => {
        if (Platform.OS === 'android') {
          setShowTimePicker(false);
        }
        if (selectedTime) {
          setTime(selectedTime);
          setFormattedTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      };
   

    return {
        isLoading, setisLoading,
        navigation,
        isLogin,
        handleSubmit,
        getEffortColor,
        session, setSession,
        date, setDate,
        comments, setComments,
        showCalendar, setShowCalendar,
        effort, setEffort,
        pan,
        errors, setErrors,
        showTimePicker, setShowTimePicker,
        formattedTime, setFormattedTime,
        time, setTime,
        onChangeTime ,
        modalVisible, setModalVisible ,
        handleConfirm
    };
};

export default useSubmitRPE;
