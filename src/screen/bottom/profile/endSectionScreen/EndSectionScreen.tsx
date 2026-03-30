import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, Alert
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import StartSectionModal from "../../../../compoent/StartSectionModal";
import { EndSection, StartSection } from "../../../../redux/Api/AuthApi";
import LoadingModal from "../../../../utils/Loader";
import usePlayers from "../../players/playe/usePlayers";
import CustomHeader from "../../../../compoent/CustomHeader";
import styles from "./style";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import { base_url } from "../../../SubscriptionPlans/SubscriptionPlansScreen";

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
  const [modalVisible, setModalVisible] = useState(false);
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
  const handleOpenModal = () => {
    if (selectedPlayerIds.length === 0) {
      Alert.alert(localizationStrings.pleaseS);
      return;
    }

    const players = filterData.filter((p: any) => selectedPlayerIds.includes(p.id));
    setSelectedPlayers(players);
    setModalVisible(true);
  };

  const handleStartAPI = async ({ date, time, questionnaire, questionnaire1 }: any) => {
    if (!(time instanceof Date) || !(date instanceof Date)) {
      Alert.alert(localizationStrings?.date);
      return;
    }

    try {
      setIsLoading(true);

      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = time.toTimeString().split(' ')[0]; // HH:mm:ss
      const ids = selectedPlayers?.map(item => Number(item.id));


      // console.log("coachSessionIds", ids);
      const params = {
        players: selectedPlayerIds,
        date: formattedDate,
        time: formattedTime,
        coach_id: isLogin?.userData?.id,
        question_id: questionnaire1.join(","),
        training_id: questionnaire.join(","),
        // training_id: questionnaire1.join(","),
        // question_id: questionnaire.join(","),
        navigation, // ✅ make sure to pass it if needed
      };
      console.log("end section ", params)
      const response = await EndSection(params, setIsLoading);
      console.log(" ---response", response)

      if (response?.status === '1') {
        Alert.alert(localizationStrings.InvalidInput || 'Success', localizationStrings.SectionStartedSuccess);
        setSelectedPlayers([])
      }
    } catch (error) {
      console.error('StartSection error:', error);
      Alert.alert(localizationStrings.InvalidInput || 'Error', localizationStrings.SomethingWentWrong);
    } finally {
      setIsLoading(false);
    }
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
            source={item?.user_details?.image ? { uri: item?.user_details?.image } : imageIndex.prfEdit}
            style={styles.avatar}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item?.user_details?.user_name || "Unknown Player"}</Text>
            <Text style={styles.position}>{item?.type || "Training Session"}</Text>
          </View>

          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>}
          </View>
        </View>

        {item?.question_details?.length > 0 && (
          <View style={styles.questionSection}>
            <Text style={[styles.questionLabel, { marginBottom: 8 }]}>Questionnaire Responses</Text>
            {item?.question_details.map((s: any, index: number) => (
              <View key={index} style={styles.questionItem}>
                <Text style={styles.questionLabel}>Question</Text>
                <Text style={styles.questionText}>{s?.question_french}</Text>
                <Text style={[styles.questionLabel, { marginTop: 6 }]}>Answer</Text>
                <Text style={styles.answerText}>{s?.answer_french}</Text>
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
            style={{ marginTop: 12 }}
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
          onPress={handleOpenModal}
        >
          <Text style={[styles.endButtonText, selectedPlayerIds.length === 0 && { color: '#9CA3AF' }]}>
            {localizationStrings?.endSection} ({selectedPlayerIds.length})
          </Text>
        </TouchableOpacity>
      </View>
      <StartSectionModal
        visible={modalVisible}
        title={localizationStrings.QuestionnaireBeforeAfter}
        onClose={() => setModalVisible(false)}
        Before={localizationStrings.BeforeTrainingQuestionnaire}
        Training={localizationStrings.AfterTrainingQuestionnaire}
        onStart={handleStartAPI}
        buttTitle={localizationStrings?.endSection}
      />
    </SafeAreaView>
  );
};

export default EndSectionScreen;
