import React, { useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, Alert
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import styles from "./style";
import usePlayers from "./usePlayers";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import SearchBar from "../../../../compoent/SearchBar";
import StartSectionModal from "../../../../compoent/StartSectionModal";
import { StartSection } from "../../../../redux/Api/AuthApi";
import LoadingModal from "../../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import { errorToast } from "../../../../utils/customToast";

const Players = () => {
  useLanguage();
  const {
    isLogin,
    isLoading,
    navigation,

    searchPlaylist, setSearchPlaylist,
    filterData,
  } = usePlayers();
  const [is, setIsLoading] = useState(false)
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const togglePlayerSelect = (id) => {
    if (selectedPlayerIds.includes(id)) {
      setSelectedPlayerIds(selectedPlayerIds.filter(pid => pid !== id));
    } else {
      setSelectedPlayerIds([...selectedPlayerIds, id]);
    }
  };
  const handleOpenModal = () => {
    if (selectedPlayerIds.length === 0) {
      errorToast(localizationStrings?.Pleaseselectleastone || "")
      return;
    }

    const players = filterData.filter(p => selectedPlayerIds.includes(p.id));
    setSelectedPlayers(players);
    setModalVisible(true);
  };
  const handleStartAPI = async ({ date, time, type, questionnaire, questionnaire1 }) => {


    // console.log("questionnaire,questionnaire1",questionnaire,questionnaire1)
    // console.log("questionnaire1 --- ",questionnaire1)


    if (!(time instanceof Date) || !(date instanceof Date)) {
      Alert.alert(localizationStrings.InvalidInput, localizationStrings.date);
      return;
    }

    try {
      setIsLoading(true);

      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = time.toTimeString().split(' ')[0]; // HH:mm:ss
      const ids = selectedPlayers?.map(item => Number(item.id));

      const params = {
        players: ids,
        date: formattedDate,
        question_id: questionnaire1.join(","),
        training_id: questionnaire.join(","),
        // training_id: questionnaire1.join(","),
        // question_id: questionnaire.join(","),
        time: formattedTime,
        coach_id: isLogin?.userData?.id,
        session_type: type,
        navigation: navigation
      };

      console.log('📤 Sending to API:', params);

      const response = await StartSection(params, setIsLoading);

      if (response?.status === '1') {
        setSelectedPlayers([])
      }
    } catch (error) {
      Alert.alert(localizationStrings.InvalidInput || 'Error', localizationStrings.SomethingWentWrong);
    } finally {
      setIsLoading(false);
    }
  };





  const CommonCard = React.memo(({ item, onPress, isSelected }) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && {
            borderColor: '#A0D803',
            borderWidth: 2,
            backgroundColor: '#F2FFE2'
          }
        ]}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Checkbox */}

          {/* Player Info */}
          <Image source={{ uri: item?.image }} style={styles.avatar} />
          <View style={styles.contentContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item?.user_name}</Text>
              <Text style={styles.position}>Forward</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onPress}
            style={{
              height: 22,
              width: 22,
              borderWidth: 2,
              borderColor: isSelected ? '#A0D803' : '#ccc',
              backgroundColor: isSelected ? '#A0D803' : '#fff',
              borderRadius: 4,
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isSelected && (
              <Text style={{ color: 'white', fontSize: 16 }}>✓</Text>
            )}
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    );
  });


  return (
    <SafeAreaView style={styles.container}>
      {is ? <LoadingModal /> : null}
      <StatusBarComponent />

      <View style={[styles.container, { padding: 15 }]}>

        <Text style={styles.header}>{localizationStrings.Players}</Text>
        <SearchBar
          value={searchPlaylist}
          onSearchChange={setSearchPlaylist}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(160, 216, 3, 1)', // greenish tone for "Start"
              padding: 12,
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 15,
              height: 50,
              justifyContent: 'center',
            }}
            onPress={handleOpenModal}
          >
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>
              {localizationStrings?.StartSection}({selectedPlayerIds.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#F44336', // reddish tone for "End"
              padding: 12,
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 15,
              height: 50,
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate(ScreenNameEnum.EndSectionScreen)
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>
              {localizationStrings?.endSection}
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            data={filterData}
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CommonCard
                item={item}
                onPress={() => togglePlayerSelect(item.id)}
                isSelected={selectedPlayerIds.includes(item.id)}
              />
            )}
          />
        )}

        {/* <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate(ScreenNameEnum.AddPlayer)}
        >
          <Image source={imageIndex.floter} style={{ height: 74, width: 74 }} resizeMode="contain" />
        </TouchableOpacity> */}
      </View>
      <StartSectionModal
        visible={modalVisible}
        title={localizationStrings.QuestionnaireBeforeAfter}
        onClose={() => setModalVisible(false)}
        Before={localizationStrings.BeforeTrainingQuestionnaire}
        Training={localizationStrings.AfterTrainingQuestionnaire}
        selectedPlayers={selectedPlayers}
        onStart={handleStartAPI}
        buttTitle={localizationStrings?.StartSection}

      />
    </SafeAreaView>
  );
};

export default Players;
