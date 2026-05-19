import React, { useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, Alert
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import SearchBar from "../../../../compoent/SearchBar";
import LoadingModal from "../../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import useAllPlayer from "./useAllPlayer";
import styles from "./style";
import localizationStrings from "../../../../compoent/Localization/Localization";
import SubscriptionCard from "../../../../compoent/subscription/SubscriptionCard";
import { useSubscription } from "../../../../compoent/subscription/useSubscription";
import { useSelector } from "react-redux";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";

interface CommonCardProps {
  item: any;
  onPress: () => void;
  isSelected: boolean;
}


interface ReviewCardProps {
  item: any;
}

const SEGMENT_COLORS = [
  '#22C55E', '#4ADE80', '#84CC16', '#A3E635', '#EAB308',
  '#F59E0B', '#F97316', '#EF4444', '#DC2626', '#B91C1C'
];

const StaticScoreSlider = ({ score }: { score: number }) => {
  const [trackWidth, setTrackWidth] = useState(0);

  const onTrackLayout = (e: any) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  // Position thumb relative to track width (0-10 scale)
  const thumbLeft = trackWidth > 0 ? (score / 10) * trackWidth - 12 : -12;

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrackBase} onLayout={onTrackLayout}>
        {SEGMENT_COLORS.map((color, i) => (
          <View
            key={i}
            style={[styles.sliderSegment, { backgroundColor: color }]}
          />
        ))}
      </View>
      {trackWidth > 0 && (
        <View
          style={[
            styles.sliderThumbOuter,
            {
              left: Math.max(-4, Math.min(thumbLeft, trackWidth - 20)),
              borderColor: SEGMENT_COLORS[Math.min(9, Math.max(0, Math.floor(score)))]
            }
          ]}
        >
          <View
            style={[
              styles.sliderThumbInner,
              { backgroundColor: SEGMENT_COLORS[Math.min(9, Math.max(0, Math.floor(score)))] }
            ]}
          />
        </View>
      )}
    </View>
  );
};

const SessionDetailCard = React.memo(({ item }: { item: any }) => {
  useLanguage();
  const userDetails = item?.user_details;
  const sessionType = item?.type || (localizationStrings.General || "General");
  const sessionStatus = item?.status || (localizationStrings.Unknown || "Unknown");
  const questions = item?.question_details || [];

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'start': return { bg: '#F0FDF4', text: '#15803D' };
      case 'end': return { bg: '#FEF2F2', text: '#B91C1C' };
      default: return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'match': return '⚽';
      case 'training': return '🏃';
      case 'break': return '🧘';
      default: return '📋';
    }
  };

  const statusStyle = getStatusStyle(sessionStatus);

  return (
    <View style={styles.reviewCard}>
      {/* Session Header */}
      <View style={styles.sessionHeaderRow}>
        <View style={styles.sessionTypeContainer}>
          <Text style={styles.sessionTypeLabel}>{sessionType}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>{sessionStatus}</Text>
        </View>
      </View>

      {/* Player Info Section */}
      {/* <View style={styles.playerInfoContainer}>
        <Image
          source={userDetails?.image ? { uri: userDetails.image } : imageIndex.user}
          style={styles.playerAvatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.playerName}>{userDetails?.user_name || (localizationStrings.UnknownPlayer || "Unknown Player")}</Text>
          <Text style={styles.playerSubText}>
            {userDetails?.position_id ? `${localizationStrings.Position || "Pos"}: ${userDetails.position_id}` : (localizationStrings.Player || "Player")} • {userDetails?.team_id ? `${localizationStrings.MyTeam || "Team"} ${userDetails.team_id}` : ""}
          </Text>
        </View>
      </View> */}

      {/* Questionnaire Section */}
      {questions.length > 0 ? (
        <View style={styles.questionnaireContainer}>
          <Text style={styles.sectionTitle}>{localizationStrings.QuestionnaireBeforeAfter || "Questionnaire Details"}</Text>
          {questions.map((q: any, qIndex: number) => (
            <View key={q.id || qIndex} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionText}>Q: {q.question_french || q.question}</Text>
              </View>

              {q.answers && q.answers.length > 0 ? (
                q.answers.map((ans: any, ansIndex: number) => {
                  const scoreValue = Number(ans.question_ans_point) || 0;
                  return (
                    <View key={ans.id || ansIndex} style={[styles.answerContainer, ansIndex > 0 && { marginTop: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 }]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}>

                          <Image
                            source={
                              ans?.image && ans.image !== "https://kmmps.store/public/uploads/users/"
                                ? { uri: ans.image }
                                : imageIndex.prfEdit // default image
                            }
                            style={styles.playerAvatar}
                          />
                          <Text style={[styles.playerName, { fontSize: 13 }]}>{ans.user_name || (localizationStrings.Unknown || "Unknown")}</Text>

                        </View>
                        <View style={styles.scoreBadge}>
                          <Text style={styles.scoreText}>{scoreValue} Pts</Text>
                        </View>
                      </View>

                      {/* Score Visual Slider for this player */}
                      <StaticScoreSlider score={scoreValue} />

                      <View style={{ marginTop: 8 }}>
                        <Text style={styles.answerLabel}>{localizationStrings.Response || "Response"}</Text>
                        <Text style={styles.answerText}>{ans.answer}</Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={{ marginTop: 8 }}>
                  <Text style={[styles.answerText, { fontStyle: 'italic', color: '#94A3B8' }]}>{localizationStrings.NoAnswerProvided || "No answer provided"}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={[styles.reviewInnerContent, { alignItems: 'center', paddingVertical: 20 }]}>
          <Text style={{ color: '#94A3B8', fontSize: 13, fontWeight: '600' }}>{localizationStrings.NoQuestionnaireData || "No questionnaire data available"}</Text>
        </View>
      )}

      {/* Footer Info */}
      <View style={styles.dateTimeContainer}>
        <Image source={imageIndex.clocks} style={[styles.reviewLabelIcon, { width: 12, height: 12 }]} />
        <Text style={styles.dateTimeText}>
          {item?.session_start_date} {item?.session_start_time}
          {item?.session_end_time ? ` - ${item.session_end_time}` : ""}
        </Text>
      </View>
    </View>
  );
});

const AllPlayer = () => {
  const {
    navigation,
    viewType,
    allPlay,
    searchPlaylist,
    setSearchPlaylist,
    filterData,
    isLoading
  } = useAllPlayer();
  useLanguage();
  const getLogin = useSelector((state: any) => state?.feature);
  const { isSubscribed } = useSubscription();

  const [is] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {is ? <LoadingModal /> : null}
      <StatusBarComponent />
      <View style={[styles.container, { padding: 15 }]}>
        {getLogin?.userGetData?.subscription_status == "false" ? <SubscriptionCard /> : null}


        {/* Search Bar */}
        <View style={{ marginBottom: 15 }}>
          <SearchBar
            value={searchPlaylist}
            onSearchChange={setSearchPlaylist}
          />
        </View>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            data={filterData}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message={viewType === 'Players' ? (localizationStrings?.noplayers || "No players found") : (localizationStrings?.NoReviewsFound || "No reviews found")} />}
            keyExtractor={(item, index) => (item.id || item.user_id || index).toString()}
            renderItem={({ item }) => (
              <SessionDetailCard item={item} />
            )}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            // Check if profile is still loading (or if userGetData is empty)
            if (isLoading || !getLogin?.userGetData) {
              Alert.alert(
                localizationStrings.Validation || "Loading",
                "Please wait while checking your subscription status..."
              );
              return;
            }

            if (!isSubscribed) {
              Alert.alert(
                localizationStrings.ConfirmSubscription || "Subscription Required",
                localizationStrings.SubRequiredToAddPlayers || "Please subscribe to a plan first to add players.",
                [
                  { text: localizationStrings.Cancel || "Cancel", style: 'cancel' },
                  {
                    text: localizationStrings.ViewSubscriptionPlans || "View Plans",
                    onPress: () => (navigation as any).navigate(ScreenNameEnum.SubscriptionPlansScreen)
                  }
                ]
              );
            } else {
              (navigation as any).navigate(ScreenNameEnum.AddPlayer);
            }
          }}
        >
          <Image source={imageIndex.floter} style={{ height: 74, width: 74 }} resizeMode="contain" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default AllPlayer;
