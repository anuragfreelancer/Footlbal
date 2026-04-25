
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { base_url } from '../../../SubscriptionPlans/SubscriptionPlansScreen';

const useSummaryTable = () => {
    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const isLogin = useSelector((state: any) => state?.auth);
    const [sessions, setSessions] = useState<any[]>([]);
    const [detailedData, setDetailedData] = useState<any[]>([]);
    const [matrixData, setMatrixData] = useState<any[]>([]);
    const [questions, setQuestions] = useState<string[]>([]);

    useFocusEffect(
        useCallback(() => {
            getCoachSession();
        }, [])
    );

    const getCoachSession = async () => {
        setisLoading(true);
        try {
            const response = await fetch(
                `${base_url}${'get_coach_session'}?user_id=${isLogin?.userData?.id}`
            );

            const json = await response.json();
            if (json.result) {
                const data = json.result;
                setSessions(data);
                console.log("aaa", data)
                processTableData(data);
            }
        } catch (error) {
            console.log('API Error:', error);
        } finally {
            setisLoading(false);
        }
    };

    const processTableData = (data: any[]) => {
        const uniqueQuestions = new Set<string>();
        const playersMap: { [key: string]: any } = {};
        const flattened: any[] = [];

        data.forEach(session => {
            session.question_details?.forEach((q: any) => {
                const questionText = q.question_french || q.question;
                uniqueQuestions.add(questionText);

                q.answers?.forEach((ans: any) => {
                    const playerName = ans.user_name || 'Unknown';

                    // Flattened for Detailed Table
                    flattened.push({
                        id: `${session.id}_${q.id}_${ans.id}`,
                        playerName,
                        playerImage: ans.image,
                        question: questionText,
                        answer: ans.answer || '-',
                        score: Number(ans.question_ans_point) || 0,
                    });

                    // Build Matrix Data
                    if (!playersMap[playerName]) {
                        playersMap[playerName] = {
                            playerName,
                            playerImage: ans.image,
                            responses: {}
                        };
                    }
                    playersMap[playerName].responses[questionText] = {
                        score: Number(ans.question_ans_point) || 0,
                        answer: ans.answer || '-'
                    };
                });
            });
        });

        const questionsArray = Array.from(uniqueQuestions);
        setQuestions(questionsArray);
        setDetailedData(flattened);
        setMatrixData(Object.values(playersMap));
    };

    const stats = {
        totalResponses: detailedData.length,
        averageScore: detailedData.length > 0
            ? (detailedData.reduce((acc, curr) => acc + curr.score, 0) / detailedData.length).toFixed(1)
            : '0',
        alerts: detailedData.filter(item => item.score <= 3).length
    };

    const [selectedItem, setSelectedItem] = useState<{ player: any; question: string; response: any } | null>(null);

    const handleCellPress = (player: any, question: string) => {
        const response = player.responses[question];
        if (response) {
            setSelectedItem({ player, question, response });
        }
    };

    return {
        isLoading,
        navigation,
        detailedData,
        matrixData,
        questions,
        stats,
        selectedItem,
        setSelectedItem,
        handleCellPress,
        getCoachSession
    };
};

export default useSummaryTable;
