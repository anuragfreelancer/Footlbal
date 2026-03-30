import React, { useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator
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
 
interface CommonCardProps {
  item: any;
  onPress: () => void;
  isSelected: boolean;
}

const CommonCard = React.memo(({ item, onPress }: CommonCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item?.image ? <Image source={{ uri: item?.image }} style={styles.avatar} /> : <Image source={imageIndex.user} style={styles.avatar} />}
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

interface ReviewCardProps {
  item: any;
}

const ReviewCard = React.memo(({ item }: ReviewCardProps) => {
  const userDetails = item?.['user-details'];
  const ratingValue = Number(item?.number_rate) || 0;
  
  const getRatingColor = (value: number) => {
    if (value <= 3) return '#EF4444'; // Vibrant Red
    if (value <= 7) return 'rgba(160, 216, 3, 1)'; // Vibrant Orange
    return 'rgba(160, 216, 3, 1)'; // Theme Green
  };

  const ratingColor = getRatingColor(ratingValue);

  return (
    <View style={styles.reviewCard}>
      {/* Header with Avatar and Score */}
      <View style={styles.reviewHeader}>
      
        <Image 
          source={userDetails?.image ? { uri: userDetails.image } : imageIndex.user} 
          style={styles.reviewAvatar} 
        />
        <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewDate}>  
                  Source de l'évaluation : Joueur
             </Text>
          <Text style={styles.reviewerName}>{userDetails?.user_name || "Unknown Player"}</Text>
          <Text style={styles.reviewDate}>{item?.date || "No date"}</Text>
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={[styles.ratingValueText, { color: ratingColor }]}>{ratingValue}</Text>
          <Text style={styles.ratingMaxText}>0/10 Score</Text>
        </View>
      </View>
      
      {/* Dynamic Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${(ratingValue / 10) * 100}%`, backgroundColor: ratingColor }]} />
        </View>
      </View>

      {/* Focus Area (Proper display of training_section_question) */}
      {item?.training_section_question && (
        <View style={styles.reviewFocusContainer}>
          <Text style={styles.reviewFocusLabel}>Objectif de la séance :</Text>
          <Text style={styles.reviewFocusValue} numberOfLines={2}>
            {item.training_section_question}
           </Text>
        </View>
      )}

      {/* Player Note Section */}
      <Text  style={[styles.reviewFocusLabel,{
        marginBottom:11 ,
        left:1
      }]} >
     commentaire :  {item?.note ? item?.note : "No comments provided."}
      </Text>

      {/* Footer Badges */}
      <View style={styles.reviewFooter}>
        <View style={styles.reviewBadge}>
          <Text style={[styles.reviewBadgeText, { color: "black" }]}>
            {item?.section_type ? item.section_type.toUpperCase() : "GENERAL"}
          </Text>
        </View>
      
      </View>
    </View>
  );
});

const AllPlayer = () => {
  const {
    isLoading,
    navigation,
    searchPlaylist, setSearchPlaylist,
    filterData,
    viewType, setViewType,
    reviews
  } = useAllPlayer();
  
  const [is] = useState(false);
  const [selectedPlayerIds] = useState<number[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      {is ? <LoadingModal /> : null}
      <StatusBarComponent />
      <View style={[styles.container, { padding: 15 }]}>
        
        {/* Toggle Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, viewType === 'Players' && styles.activeTabButton]}
            onPress={() => setViewType('Players')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, viewType === 'Players' && styles.activeTabText]}>
              {(localizationStrings as any).AllPlayer || "All Player"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, viewType === 'Rate' && styles.activeTabButton]}
            onPress={() => setViewType('Rate')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, viewType === 'Rate' && styles.activeTabText]}>
              {/* {(localizationStrings as any).Rate || "Raaa ate"} */}
            Évaluations des utilisateurs
            </Text>
          </TouchableOpacity>
        </View>

        {viewType === 'Players' && (
          <SearchBar
            value={searchPlaylist}
            onSearchChange={setSearchPlaylist}
          />
        )}

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            data={viewType === 'Players' ? filterData : reviews}
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent message={viewType === 'Players' ? localizationStrings?.noplayers : "No reviews found"} />}
            keyExtractor={(item, index) => (item.id || item.user_id || index).toString()}
            renderItem={({ item }) => (
              viewType === 'Players' ? (
                <CommonCard
                  item={item}
                  onPress={() => (navigation as any).navigate(ScreenNameEnum.PlayerDetails, {
                    item: item
                  })}
                  isSelected={selectedPlayerIds.includes(item.id)}
                />
              ) : (
                <ReviewCard item={item} />
              )
            )}
          />
        )}

        {viewType === 'Players' && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => (navigation as any).navigate(ScreenNameEnum.AddPlayer)}
          >
            <Image source={imageIndex.floter} style={{ height: 74, width: 74 }} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllPlayer;
