import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, Dimensions, Alert, Modal } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import styles from "./style";
import useHome from "./useHome";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import ScreenNameEnum from "../../../routes/screenName.enum";
import moment from "moment";
const DashboardScreen = () => {
  useLanguage();
  const {
    getLogin,
    imgloading,
    setImgloading,
    navigation,
    getUser1,
    isLogin,
    showEndModal,
    setShowEndModal,
    setSelectedSession,
    handleEndSession
  } = useHome();



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
    const { startedAt, endedAt, formattedDate } = getSessionDisplay(item);


    return (
      <View style={[styles.sessionCard, isOngoing && styles.sessionCardActive]}>
        <View style={styles.sessionCardHeader}>
          <Text style={styles.sessionDate}>{formattedDate}</Text>
          <View style={[styles.sessionBadge, isOngoing ? styles.sessionBadgeOngoing : styles.sessionBadgeEnded]}>
            <Text style={[styles.sessionBadgeText, !isOngoing && styles.sessionBadgeTextEnded]}>
              {isOngoing ? (localizationStrings?.Ongoing || "Ongoing") : (localizationStrings?.Ended || "Ended")}
            </Text>
          </View>
        </View>

        <View style={styles.sessionCardInner}>
          {/* Start Time Row */}
          <View style={(styles as any).sessionInfoRow}>
            <Image source={imageIndex.calender} style={(styles as any).sessionIcon} resizeMode="contain" />
            <View style={(styles as any).sessionInfoContent}>
              <Text style={(styles as any).sessionInfoLabel}>{localizationStrings.StartedAt || "Started at"}</Text>
              <Text style={(styles as any).sessionInfoValue}>{startedAt}</Text>
            </View>
          </View>

          {/* End Time Row */}
          <View style={(styles as any).sessionInfoRow}>
            <Image source={imageIndex.clocks} style={(styles as any).sessionIcon} resizeMode="contain" />
            <View style={(styles as any).sessionInfoContent}>
              <Text style={(styles as any).sessionInfoLabel}>{localizationStrings.EndedAt || "Ended at"}</Text>
              <Text style={[
                (styles as any).sessionInfoValue,
                isOngoing && (styles as any).sessionTimeOngoing
              ]}>
                {endedAt}
              </Text>
            </View>
          </View>

          {/* Questionnaire Section */}
          {item?.question_details?.length > 0 && (
            <View style={(styles as any).questionSectionHome}>
              <View style={(styles as any).questionHeaderHome}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: 0.5 }}>{localizationStrings.SessionDetails || "Session Details"}</Text>
              </View>

              {item?.question_details?.map((q: any, index: number) => {
                return (
                  <View key={index} style={styles.questionItemHome}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                      <View
                        style={{
                          width: 4,
                          height: 16,
                          backgroundColor: 'rgba(160, 216, 3, 1)',
                          borderRadius: 2,
                          marginRight: 8,
                          marginTop: 2,
                        }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={styles.questionLabelHome}>{localizationStrings.Question || "Question"}</Text>

                        <Text style={styles.questionTextHome}>
                          {q?.question_french || q?.question}
                        </Text>
                        {q?.answers && q.answers.length > 0 ? (
                          q.answers.map((s: any, i: number) => (
                            <Text key={i} style={styles.answerTextHome}>
                              {localizationStrings.Answer || "Answer"} :   {s?.answer}
                            </Text>
                          ))
                        ) : (
                          item?.status == "Start" && isLogin?.userData?.type === "Player" && (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={styles.rateButton}
                              onPress={() => {
                                (navigation as any).navigate(ScreenNameEnum.SubmitRPE, {
                                  item: item
                                });
                              }}
                            >
                              <Text style={[styles.rateButtonText, { color: "white" }]}>
                                {localizationStrings?.RateDifficulty || "Rate Difficulty"}
                              </Text>
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>


      </View>
    );
  };

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

        <FlatList
          data={[...getUser1].reverse()}

          keyExtractor={(item: any) => item?.id?.toString() ?? String(Math.random())}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent} />

      </ScrollView>
      <Modal
        visible={showEndModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEndModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalOverlayDismiss} 
            activeOpacity={1} 
            onPress={() => setShowEndModal(false)} 
          />
          <View style={styles.modalContentPremium}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitlePremium}>{localizationStrings?.Confirmation || "Confirmation"}</Text>
            <Text style={styles.modalMessagePremium}>
              {localizationStrings?.AreYouSureEndSession || "Are you sure you want to end this session now?"}
            </Text>

            <View style={styles.modalButtonsPremium}>
              <TouchableOpacity
                style={[styles.modalButtonPremium, styles.cancelBtnPremium]}
                onPress={() => setShowEndModal(false)}
              >
                <Text style={[styles.buttonTextPremium, { color: '#6B7280' }]}>{localizationStrings?.Cancel || "Cancel"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButtonPremium, styles.endBtnPremium]}
                onPress={handleEndSession}
              >
                <Text style={[styles.buttonTextPremium, { color: '#fff' }]}>{localizationStrings?.Confirm || "Confirm"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default DashboardScreen;
