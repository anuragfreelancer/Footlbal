import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  useSelector } from 'react-redux';
import { SumitRpfFrom } from '../../../redux/Api/AuthApi';
import { Animated } from 'react-native';

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

    const getEffortColor = (value: any) => {
        if (value <= 3) return '#A0D803'; // Light effort (Yellow)
        if (value <= 6) return '#A0D803'; // Moderate effort (Light Green)
        if (value <= 9) return '#A0D803'; // Hard effort (Dark Green)
        return '#A0D803'; // Maximum effort (Black)
    };
    const validateForm = (): boolean => {
        let formErrors: Record<string, string> = {};
    
        if (!session.trim()) formErrors.session = "Session is required.";
        if (!date.trim()) formErrors.date = "Date is required.";
        if (!comments.trim()) formErrors.comments = "Comments cannot be empty.";
        if (effort === undefined || effort === null || isNaN(Number(effort))) {
            formErrors.effort = "Effort must be a valid number.";
        }
    
        setErrors(formErrors);
    
        return Object.keys(formErrors).length === 0;
    };
    
    const handleSubmit = async () => {
        if (!validateForm()) return;
    
        setisLoading(true); // Start loading before API call
    
        try {
            const params = {
                userId: isLogin?.userData?.id,
                navigation: navigation,
                session: session,
                date: date,
                comments: comments,
                effort: effort
            };
            const response = await SumitRpfFrom(params,setisLoading);
            if(response){
                setSession("") ;
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
        pan ,
        errors, setErrors
    };
};

export default useSubmitRPE;
