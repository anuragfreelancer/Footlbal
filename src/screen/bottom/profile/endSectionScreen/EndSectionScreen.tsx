import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, Alert
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import LoadingModal from "../../../../utils/Loader";
import usePlayers from "../../players/playe/usePlayers";
import CustomHeader from "../../../../compoent/CustomHeader";
import styles from "./style";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import { base_url } from "../../../SubscriptionPlans/SubscriptionPlansScreen";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import { EndSection } from "../../../../redux/Api/AuthApi";

const EndSectionScreen = () => {
  useLanguage();
  const {

    isLoading,
    navigation,
    isLogin,
    searchPlaylist, setSearchPlaylist,
    filterData, setFilterData
  } = usePlayers();
  const [is, setIsLoading] = useState(false)
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const getCoachSession = async () => {
    try {
      setIsLoading(true); // Using 'is' state for both list fetch and submit
      const response = await fetch(
        `${base_url}${'get_coach_session'}?user_id=${isLogin?.userData?.id}`
      );

      const json = await response.json();
      console.log('API Response:', json);
      setData(json.result || []);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoachSession();
  }, []);

  const togglePlayerSelect = (id: any) => {
    const playerId = String(id); // ensure string

    if (selectedPlayerIds.includes(playerId)) {
      setSelectedPlayerIds(selectedPlayerIds.filter(pid => pid !== playerId));
    } else {
      setSelectedPlayerIds([...selectedPlayerIds, playerId]);
    }
  };
  const handleEndSection = () => {
    if (selectedPlayerIds.length === 0) {
      Alert.alert(localizationStrings.pleaseS);
      return;
    }

    Alert.alert(
      localizationStrings?.endSection,
      localizationStrings.AreYouSureEndSelected || "Are you sure you want to end the selected sessions?",
      [
        {
          text: localizationStrings.Cancel || "Cancel",
          style: "cancel"
        },
        {
          text: localizationStrings.End || "End",
          onPress: async () => {
            try {
              setIsLoading(true);
              const now = new Date();
              const formattedDate = now.toISOString().split('T')[0];
              const formattedTime = now.toTimeString().split(' ')[0];

              const params = {
                players: selectedPlayerIds.join(','),
                date: formattedDate,
                time: formattedTime,
                navigation: navigation,
                question_id: '0'
              };

              const response = await EndSection(params, setIsLoading);
              if (response?.status === '1') {
                setSelectedPlayerIds([]);
                getCoachSession();
              }
            } catch (error) {
              console.log('End Section Error:', error);
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };


  const CommonCard = React.memo(({ item, onPress, isSelected }: any) => {


    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.card}
      >
        <View style={styles.contentContainer}>
          <Image
            source={
              item?.user_details?.image &&
                item?.user_details?.image !== "https://kmmps.store/public/uploads/users/"
                ? { uri: item?.user_details?.image }
                : imageIndex.prfEdit
            }
            style={styles.avatar}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item?.user_details?.user_name || (localizationStrings.UnknownPlayer || "Unknown Player")}</Text>
            <Text style={styles.position}>{item?.type || (localizationStrings.TrainingSession || "Training Session")}</Text>
          </View>

          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>}
          </View>
        </View>

        {item?.question_details?.length > 0 && (
          <View style={styles.questionSection}>

            <Text style={[styles.questionLabel, { marginBottom: 10 }]}>
              {localizationStrings.QuestionnaireResponses || "Questionnaire Responses"}
            </Text>

            {item?.question_details.map((questionItem: any, index: number) => (
              <View key={index} style={styles.questionItem}>

                {/* Question */}
                <Text style={styles.questionLabel}>{localizationStrings.Question || "Question"}</Text>
                <Text style={styles.questionText}>
                  {questionItem?.question_french || "N/A"}
                </Text>

                {/* Answers */}
                {questionItem?.answers?.length > 0 ? (
                  questionItem.answers.map((answerItem: any, i: number) => (
                    <View key={i} style={{ marginTop: 6 }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "500",
                          color: "#4B5563",
                          lineHeight: 18,
                        }}
                      >
                        {localizationStrings.Answer || "Answer"}: {answerItem?.answer || (localizationStrings.NoAnswerProvided || "No Answer")}
                      </Text>

                      {/* Optional: show user name */}
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        {localizationStrings.ByLabel || "By: "}{answerItem?.user_name || (localizationStrings.Unknown || "Unknown")}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#9CA3AF",
                      marginTop: 5,
                    }}
                  >
                    {localizationStrings.NoAnswersAvailable || "No Answers Available"}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  });

  const filteredData = data?.filter(
    (item) => item?.session_end_date === "" && item?.session_end_time === ""
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />

      {is ? <LoadingModal /> : null}
      <CustomHeader mainView={{
        left: 11
      }} imageSource={imageIndex.backNav} label={localizationStrings.MyTeam} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {is && data.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#EF4444" />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            style={{ marginTop: 20, marginBottom: 11 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />}
            keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => (
              <CommonCard
                item={item}
                onPress={() => togglePlayerSelect(item.id)}
                isSelected={selectedPlayerIds.includes(String(item.id))}
              />
            )}
          />
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={selectedPlayerIds.length === 0}
          style={[styles.endButton, selectedPlayerIds.length === 0 && { backgroundColor: '#E5E7EB', shadowOpacity: 0 }]}
          onPress={handleEndSection}
        >
          <Text style={[styles.endButtonText, selectedPlayerIds.length === 0 && { color: '#9CA3AF' }]}>
            {localizationStrings?.endSection} ({selectedPlayerIds.length})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EndSectionScreen;
