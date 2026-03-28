import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, Dimensions, Alert } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import styles from "./style";
import ChartComponent from "../../../compoent/ChartComponent";
import useHome from "./useHome";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import SubscriptionCard from "../../../compoent/subscription/SubscriptionCard";
import { useFocusEffect } from "@react-navigation/native";
import { useSubscription } from "../../../compoent/subscription/useSubscription";
import ScreenNameEnum from "../../../routes/screenName.enum";
import moment from "moment";
import ChartComponent1 from "../../../compoent/ChartComponent1";
import { useSelector } from "react-redux";

const DashboardScreen = () => {
  useLanguage();
  const {
    getLogin,
    imgloading,
    setImgloading,
    navigation,
    chatMess,
    getUser1,
    getCoach_session,
    getUser,
    isLogin,
    filteredMessages
  } = useHome();
  const { showSubscriptionCard } = useSubscription();
  const userGetData = useSelector((state: any) => state?.feature?.userGetData);
  // Build coach chart from players' coach_session (API returns players with coach_session array)
  const coachChartData = React.useMemo(() => {
    const playersList: any[] = Array.isArray(getCoach_session) ? getCoach_session : [];
    const totalPlayers = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
    const looksLikeDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || "").trim());
    const getDateStr = (item: any) => {
      const dateVal = item?.session_start_date ?? "";
      const timeVal = item?.session_start_time ?? "";
      const a = typeof dateVal === "string" ? dateVal.trim().split(" ")[0] : "";
      const b = typeof timeVal === "string" ? timeVal.trim().split(" ")[0] : "";
      if (looksLikeDate(a)) return a;
      if (looksLikeDate(b)) return b;
      return "";
    };

    const countByDate: Record<string, number> = {};
    playersList.forEach((item: any) => {
      const sessions = Array.isArray(item?.coach_session)
        ? item.coach_session
        : item?.session_start_date
          ? [item]
          : [];
      sessions.forEach((s: any) => {
        const dateStr = getDateStr(s);
        if (looksLikeDate(dateStr)) {
          countByDate[dateStr] = (countByDate[dateStr] || 0) + 1;
        }
      });
    });
    const last7Days: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = moment().subtract(i, "days").format("YYYY-MM-DD");
      last7Days.push(countByDate[d] || 0);
    }
    const last6Weeks: number[] = [];
    for (let i = 5; i >= 0; i--) {
      let count = 0;
      if (i === 0) {
        const weekStart = moment().startOf("week");
        Object.keys(countByDate).forEach((dateStr) => {
          const m = moment(dateStr);
          if (m.isSameOrAfter(weekStart) && m.isSameOrBefore(moment())) {
            count += countByDate[dateStr] || 0;
          }
        });
      } else {
        const start = moment().subtract(i + 1, "weeks").startOf("week");
        const end = moment().subtract(i, "weeks").startOf("week");
        Object.keys(countByDate).forEach((dateStr) => {
          const m = moment(dateStr);
          if (m.isSameOrAfter(start) && m.isBefore(end)) count += countByDate[dateStr] || 0;
        });
      }
      last6Weeks.push(count);
    }
    return {
      weekly: { data: last7Days },
      monthly: { data: last6Weeks },
      totalPlayers,
    };
  }, [getCoach_session, filteredMessages]);
  const chartDataScreen1 = {
    weekly: { data: [1400, 2800, 100, 1600, 100, 800, 200] },
    monthly: { data: [70, 200, 150] },
    yearly: { data: [180, 222, 111] },
  };
  // // Handle background notifications
  // useEffect(() => {
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     navigateToNotification();
  //   });

  //   // Handle initial notification when the app is opened from a notification
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         navigateToNotification();
  //       }
  //     });
  // }, []);

  // API returns session_start_date as time (HH:mm:ss) and session_start_time as date (YYYY-MM-DD)
  const getSessionDisplay = (item: any) => {
    const looksLikeDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || "").trim());
    const looksLikeTime = (s: string) => /^\d{1,2}:\d{2}(:\d{2})?$/.test(String(s || "").trim());
    const dateStr = looksLikeDate(item?.session_start_time)
      ? item.session_start_time
      : looksLikeDate(item?.session_start_date)
        ? item.session_start_date
        : item?.session_start_time || item?.session_start_date || "";
    const startTimeStr = looksLikeTime(item?.session_start_date)
      ? item.session_start_date
      : looksLikeTime(item?.session_start_time)
        ? item.session_start_time
        : item?.session_start_date || item?.session_start_time || "";
    const endTimeStr = item?.session_end_time || "";
    const endDateStr = item?.session_end_date || dateStr;
    const formattedDate = dateStr ? moment(dateStr).format("DD MMM YYYY") : "—";
    const formattedStartTime = startTimeStr
      ? moment(startTimeStr, ["HH:mm:ss", "H:mm:ss"]).format("h:mm A")
      : "—";
    const formattedEndTime = endTimeStr
      ? moment(endTimeStr, ["HH:mm:ss", "H:mm:ss"]).format("h:mm A")
      : null;

    // Full "Started at" / "Ended at" strings: date + time
    const startedAt = dateStr && startTimeStr
      ? `${moment(dateStr).format("DD MMM YYYY")}, ${moment(startTimeStr, ["HH:mm:ss", "H:mm:ss"]).format("h:mm A")}`
      : dateStr
        ? moment(dateStr).format("DD MMM YYYY")
        : "—";
    const endedAt = endTimeStr && endDateStr
      ? `${moment(endDateStr).format("DD MMM YYYY")}, ${moment(endTimeStr, ["HH:mm:ss", "H:mm:ss"]).format("h:mm A")}`
      : formattedEndTime === null
        ? (localizationStrings?.Ongoing ?? "Ongoing")
        : "—";
    return {
      formattedDate,
      formattedStartTime,
      formattedEndTime: formattedEndTime ?? (localizationStrings?.Ongoing ?? "Ongoing"),
      startedAt,
      endedAt,
      isOngoing: !endTimeStr,
    };
  };

  const renderItem = ({ item }: { item: any }) => {
     const isOngoing = item?.status === "Start";
    const { startedAt, endedAt } = getSessionDisplay(item);
    return (
      <View style={[styles.sessionCard, isOngoing && styles.sessionCardActive]}>
        <View style={styles.sessionCardHeader}>
          <Text style={styles.sessionDate}>{getSessionDisplay(item).formattedDate}</Text>
          <View style={[styles.sessionBadge, isOngoing ? styles.sessionBadgeOngoing : styles.sessionBadgeEnded]}>
            <Text style={[styles.sessionBadgeText, !isOngoing && styles.sessionBadgeTextEnded]}>
              {isOngoing ? localizationStrings?.Ongoing : localizationStrings?.Ended}
            </Text>
          </View>
        </View>
        <View style={(styles as any).sessionDetailRow}>
          <Text style={(styles as any).sessionDetailLabel}>Started at</Text>
          <Text style={(styles as any).sessionDetailValue}>{startedAt}</Text>
        </View>
        <View style={[(styles as any).sessionDetailRow, (styles as any).sessionDetailRowLast]}>
          <Text style={(styles as any).sessionDetailLabel}>Ended at</Text>
          <Text style={[(styles as any).sessionDetailValue, isOngoing && styles.sessionTimeOngoing]}>{endedAt}</Text>
        </View>
        {item?.question_details?.length > 0 && (
          <Text>Antes del entrenamiento </Text>

        )}
        {item?.question_details?.length > 0 && (
          <View
            style={{
              marginTop: 8,
              paddingLeft: 6,
            }}
          >
            {item?.question_details.map((q, index) => {
              return (
                <View key={index}>
                  <Text style={{
                    color: "black",
                    fontSize: 12
                  }}>
                 Question: {q?.question_french}
                  </Text>

                  <Text style={{
                    color: "black",
                    fontSize: 12
                  }}>
                    Répondre: {q?.answer_french}
                  </Text>
                </View>
              )
            })}
          </View>
        )}
      </View>
    );
  };
  useFocusEffect(
    useCallback(() => {
      return () => { };
    }, [getLogin])
  );
  console.log("getUser1", getUser1)
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />
      <View style={styles.header}>

        <View style={{ marginTop: 12 }}>
          {getLogin?.userGetData?.image ? <Image
            source={getLogin?.userGetData?.image || isLogin?.userData?.image ? { uri: getLogin?.userGetData?.image || isLogin?.userData?.image } : imageIndex.prfEdit}
            style={styles.avatar}
            onLoad={() => setImgloading(false)}
            onError={() => setImgloading(false)}
          /> :

            (
              <Image
                source={imageIndex.prfEdit}
                style={styles.avatar}
                onLoad={() => setImgloading(false)}
                onError={() => setImgloading(false)}
              />
            )
          }

          {imgloading && (
            <View style={styles.avatarLoader}>
              <ActivityIndicator size="small" color="#9CA3AF" />
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{getLogin?.userGetData?.user_name || isLogin?.userData?.user_name || ""}</Text>
          <Text style={styles.userEmail}>{getLogin?.userGetData?.email || isLogin?.userData?.email || ""}</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* <ChartComponent data={chartDataScreen1} statusText={localizationStrings.Safe} statusColor="rgba(160, 216, 3, 1)" /> */}
        {isLogin?.userData?.type == "Coach" ? null : <ChartComponent data={chartDataScreen1} statusText={localizationStrings.Safe} statusColor="rgba(160, 216, 3, 1)" />
        }
        {isLogin?.userData?.type !== "Coach" ? null : (() => {
          const coachChartProps = {
            data: { weekly: coachChartData.weekly, monthly: coachChartData.monthly },
            statusText: localizationStrings?.Safe,
            statusColor: "rgba(160, 216, 3, 1)",
            totalPlayers: coachChartData.totalPlayers,
          };
          return <ChartComponent1 {...coachChartProps} />;
        })()}


        {isLogin?.userData?.type == "Coach" ? (
          <>
            <View style={{
              marginHorizontal: 10
            }}>

              {userGetData?.subscription_status == "false" ? <SubscriptionCard /> : null}
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredMessages}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={<EmptyListComponent message={localizationStrings.Nochat} />}
              keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  style={(styles as any).chatCard}
                  onPress={() =>
                    (navigation as any).navigate(ScreenNameEnum.ChatScreen, { item })
                  }
                  activeOpacity={0.7}
                >
                  {item?.image ? (
                    <Image source={{ uri: item.image }} style={(styles as any).chatCardAvatar} />
                  ) : (
                    <Image source={imageIndex.prfEdit} style={(styles as any).chatCardAvatar} />
                  )}
                  <View style={(styles as any).chatCardTextContainer}>
                    <Text style={(styles as any).chatCardName} numberOfLines={1}>
                      {item?.user_name ?? ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />



          </>
        ) : (
          <>
            {/* <TouchableOpacity
               onPress={() => (navigation as any).navigate(ScreenNameEnum.Calendar)}
              activeOpacity={0.7}
            >
              <Text style={[styles.sectionTitle, { color: "#047857" }]}>{localizationStrings?.Schedule}</Text>
              <Text style={{ fontSize: 13, color: "#065F46", marginTop: 4 }}>{localizationStrings?.SessionTraining} • {localizationStrings?.SessionMatch} • {localizationStrings?.SessionBreak}</Text>
            </TouchableOpacity> */}

            <View style={styles.sectionWrap}>
              <Text style={styles.sectionTitle}>{localizationStrings.StartSection}</Text>
            </View>
            <FlatList
              data={getUser1}
              keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
              renderItem={renderItem}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={<EmptyListComponent message={localizationStrings.Nochat} />}
            />
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};
export default DashboardScreen;
