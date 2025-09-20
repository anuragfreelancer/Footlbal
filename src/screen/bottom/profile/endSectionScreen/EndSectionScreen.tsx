import React, { useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
 ActivityIndicator, Alert
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
   import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import SearchBar from "../../../../compoent/SearchBar";
import StartSectionModal from "../../../../compoent/StartSectionModal";
import { EndSection, StartSection } from "../../../../redux/Api/AuthApi";
import LoadingModal from "../../../../utils/Loader";
import usePlayers from "../../players/playe/usePlayers";
import CustomHeader from "../../../../compoent/CustomHeader";
import styles from "./style";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";

const EndSectionScreen = () => {
  const {
 
    isLoading,  
    navigation,
    isLogin,
    searchPlaylist, setSearchPlaylist,
    filterData, setFilterData
  } = usePlayers();
const [is,setIsLoading]= useState(false)
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
      Alert.alert(localizationStrings.pleaseS);
      return;
    }

    const players = filterData.filter(p => selectedPlayerIds.includes(p.id));
    setSelectedPlayers(players);
    setModalVisible(true);
  };
  const handleStartAPI = async ({ date, time }) => {
    if (!(time instanceof Date) || !(date instanceof Date)) {
      Alert.alert(localizationStrings?.date);
      return;
    }
  
    try {
      setIsLoading(true);
  
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = time.toTimeString().split(' ')[0]; // HH:mm:ss
  
      const params = {
        players: selectedPlayers,
        date: formattedDate,
        time: formattedTime,
        navigation, // ✅ make sure to pass it if needed
      };
  
   
      const response = await EndSection(params, setIsLoading);
  
      if (response?.status === '1') {
         Alert.alert('✅ Success', 'Section started successfully!');
        setSelectedPlayers([])
       }
    } catch (error) {
      console.error('StartSection error:', error);
      Alert.alert('Error', 'Something went wrong.');
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
          <Image source={{ uri: item?.image}} style={styles.avatar} />
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
            <StatusBarComponent />

            {is ? <LoadingModal /> : null}
            <CustomHeader  mainView={{
              left:11
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
            marginBottom: 15 ,
            height:55 ,
            justifyContent:"center",
            marginTop:15
          }}
          onPress={handleOpenModal}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff',fontSize:20 }}>
          {localizationStrings?.endSection}  ({selectedPlayerIds.length})
          </Text>
        </TouchableOpacity>

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            data={filterData}
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message= {localizationStrings?.noplayers} />}
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

        
      </View>
      <StartSectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedPlayers={selectedPlayers}
        onStart={handleStartAPI}
      />
    </SafeAreaView>
  );
};

export default EndSectionScreen;
