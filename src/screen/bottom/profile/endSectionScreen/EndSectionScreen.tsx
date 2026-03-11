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
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
console.log("filterData",filterData)
  const [data, setData] = useState([]);

  const getCoachSession = async () => {
    try {
      const response = await fetch(
         `${base_url}${'get_coach_session'}?user_id=${isLogin?.userData?.id}`
      );

      const json = await response.json();
      console.log('API Response:', json);

      setData(json.result); // change according to API key
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  useEffect(() => {
    getCoachSession();
  }, []);

const togglePlayerSelect = (id) => {
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

    const players = filterData.filter(p => selectedPlayerIds.includes(p.id));
    setSelectedPlayers(players);
    setModalVisible(true);
  };
  console.log("selectedPlayerIds", selectedPlayerIds);

  const handleStartAPI = async ({ date, time }) => {
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
        players:selectedPlayerIds,
        date: formattedDate,
        time: formattedTime,
                coach_id: isLogin?.userData?.id,
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
          <Image source={{ uri: item?.user_details?.image }} style={styles.avatar} />
          <View style={styles.contentContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item?.user_details?.user_name}</Text>
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
      <StatusBarComponent />

      {is ? <LoadingModal /> : null}
      <CustomHeader mainView={{
        left: 11
      }} imageSource={imageIndex.backNav} label={localizationStrings.MyTeam} />
      <View style={[styles.container, { padding: 15 }]}>
        {/* <SearchBar
          value={searchPlaylist}
          onSearchChange={setSearchPlaylist}
        /> */}
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            padding: 12,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 15,
            height: 55,
            justifyContent: "center",
            marginTop: 15
          }}
          onPress={handleOpenModal}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>
            {localizationStrings?.endSection}  ({selectedPlayerIds.length})
          </Text>
        </TouchableOpacity>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            data={data}
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>  {
              console.log("item",item)
              return(
                 <CommonCard
                item={item}
                onPress={() => togglePlayerSelect(item.id)}
                isSelected={selectedPlayerIds.includes(item.id)}
              />
              )
            }}
          />
        )}


      </View>
      <StartSectionModal
        visible={modalVisible}
        title={localizationStrings.QuestionnaireBeforeAfter}
        onClose={() => setModalVisible(false)}
        Before={localizationStrings.BeforeTrainingQuestionnaire}
        Training={localizationStrings.AfterTrainingQuestionnaire}
        selectedPlayers={selectedPlayers}
        onStart={handleStartAPI}
        buttTitle={localizationStrings?.endSection}
      />
    </SafeAreaView>
  );
};

export default EndSectionScreen;
