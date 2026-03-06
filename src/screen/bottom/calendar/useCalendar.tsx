import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Getplayer, GetCoachSession } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';
import type { MarkedDateConfig } from '../../../compoent/CalendarComponent';

const TRAINING_COLOR = '#2563EB';
const MATCH_COLOR = '#DC2626';
const BREAK_COLOR = '#F59E0B';

const getSessionDateStr = (session: any): string => {
  const d = session?.session_start_time ?? session?.session_start_date ?? '';
  if (typeof d !== 'string') return '';
  const parts = d.split(' ');
  return parts[0] || d;
};

const looksLikeDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || '').trim());

const useCalendar = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState<string>(() =>
    new Date().toISOString().split('T')[0]
  );
  const [players, setPlayers] = useState<any>({ userGetData: [] });
  const [sessions, setSessions] = useState<any[]>([]);
  const isLogin = useSelector((state: any) => state?.auth);

  useEffect(() => {
    fetchData();
  }, [isLogin?.userData?.id]);

  useFocusEffect(
    useCallback(() => {
      if (isLogin?.userData?.id) fetchData();
    }, [isLogin?.userData?.id])
  );

  const fetchData = async () => {
    const userId = isLogin?.userData?.id;
    if (!userId) return;

    try {
      setisLoading(true);
      const [playerRes, sessionRes] = await Promise.all([
        Getplayer(userId, setisLoading),
        GetCoachSession(setisLoading, userId),
      ]);

      if (playerRes?.userGetData) {
        setPlayers(playerRes);
      }
      if (sessionRes?.userGetData && Array.isArray(sessionRes.userGetData)) {
        setSessions(sessionRes.userGetData);
      } else {
        setSessions([]);
      }
    } catch (error) {
      setSessions([]);
    } finally {
      setisLoading(false);
    }
  };

  const markedDates = useMemo((): Record<string, MarkedDateConfig> => {
    const marked: Record<string, MarkedDateConfig> = {};
    const typeToColor: Record<string, string> = {
      MATCH: MATCH_COLOR,
      BREAK: BREAK_COLOR,
      TRAINING: TRAINING_COLOR,
    };
    const priority: Record<string, number> = { MATCH: 3, BREAK: 2, TRAINING: 1 };
    sessions.forEach((s: any) => {
      const dateStr = getSessionDateStr(s);
      if (!looksLikeDate(dateStr)) return;
      const sessionType = String(s?.session_type || 'TRAINING').toUpperCase();
      const color = typeToColor[sessionType] || TRAINING_COLOR;
      const p = priority[sessionType] || 1;
      const existingP = marked[dateStr]?.dotColor === MATCH_COLOR ? 3
        : marked[dateStr]?.dotColor === BREAK_COLOR ? 2 : 1;
      if (!marked[dateStr] || p > existingP) {
        marked[dateStr] = { dotColor: color };
      }
    });
    return marked;
  }, [sessions]);

  const filteredPlayers = useMemo(() => {
    const list = players?.userGetData ?? [];
    return list.filter((player: any) => {
      const coachSessions = player?.coach_session ?? [];
      return coachSessions.some((s: any) => {
        const dateStr = getSessionDateStr(s);
        return looksLikeDate(dateStr) && dateStr === selectedDates;
      });
    });
  }, [players, selectedDates]);

  const getSessionTimeStr = (s: any): string => {
    const looksLikeDate = (x: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(x || '').trim());
    const looksLikeTime = (x: string) => /^\d{1,2}:\d{2}(:\d{2})?$/.test(String(x || '').trim());
    const timeStr = looksLikeTime(s?.session_start_date)
      ? s.session_start_date
      : looksLikeTime(s?.session_start_time)
        ? s.session_start_time
        : '';
    return timeStr;
  };

  const getSessionTypeLabel = (s: any): string => {
    const t = String(s?.session_type || 'TRAINING').toUpperCase();
    return t === 'MATCH' ? 'Match' : t === 'BREAK' ? 'Break' : 'Training';
  };

  const eventsForSelectedDate = useMemo(() => {
    return sessions.filter((s: any) => {
      const dateStr = getSessionDateStr(s);
      return looksLikeDate(dateStr) && dateStr === selectedDates;
    });
  }, [sessions, selectedDates]);

  const isCoach = isLogin?.userData?.type === 'Coach';

  return {
    players,
    sessions,
    isLoading,
    navigation,
    selectedDates,
    setSelectedDates,
    markedDates,
    filteredPlayers,
    eventsForSelectedDate,
    getSessionTimeStr,
    getSessionTypeLabel,
    fetchData,
    isCoach,
  };
};

export default useCalendar;
