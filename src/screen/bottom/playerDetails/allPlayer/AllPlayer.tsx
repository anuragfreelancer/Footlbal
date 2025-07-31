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
 import { StartSection } from "../../../../redux/Api/AuthApi";
import LoadingModal from "../../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import useAllPlayer from "./useAllPlayer";
import styles from "./style";

const AllPlayer = () => {
  const {
 
    isLoading,  
    navigation,
    isLogin,
    searchPlaylist, setSearchPlaylist,
    filterData, setFilterData
  } = useAllPlayer();
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
      Alert.alert('Please select at least one player.');
      return;
    }

    const players = filterData.filter(p => selectedPlayerIds.includes(p.id));
    setSelectedPlayers(players);
    setModalVisible(true);
  };
  const handleStartAPI = async ({ date, time }) => {
    if (!(time instanceof Date) || !(date instanceof Date)) {
      Alert.alert('Invalid Input', 'Date or Time is not valid.');
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
  
      console.log('📤 Sending to API:', params);
  
      const response = await StartSection(params, setIsLoading);
  
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
          

        </View>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
            {is ? <LoadingModal /> : null}

      <StatusBarComponent />
      <View style={[styles.container, { padding: 15 }]}>
        <Text style={styles.header}>Players</Text>
        <SearchBar
          value={searchPlaylist}
          onSearchChange={setSearchPlaylist}
        />
 

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            data={filterData}
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message="No players found" />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CommonCard
                item={item}
                 onPress={() => navigation.navigate(ScreenNameEnum.PlayerDetails,{
                    item:item
                 })}

                isSelected={selectedPlayerIds.includes(item.id)}
              />
            )}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate(ScreenNameEnum.AddPlayer)}
        >
          <Image source={imageIndex.floter} style={{ height: 74, width: 74 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

export default AllPlayer;
