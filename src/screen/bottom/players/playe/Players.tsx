import React, { useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, ScrollView, Alert
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import styles from "./style";
import usePlayers from "./usePlayers";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import SearchBar from "../../../../compoent/SearchBar";
import LoadingModal from "../../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import { errorToast } from "../../../../utils/customToast";
import { useSubscription } from "../../../../compoent/subscription/useSubscription";

const Players = () => {
  useLanguage();
  const {
    isLogin,
    isLoading,
    navigation,
    searchPlaylist, setSearchPlaylist,
    filterData,
  } = usePlayers();

  const [selectedPlayerIds, setSelectedPlayerIds] = useState<any[]>([]);
  const { isSubscribed } = useSubscription();

  const togglePlayerSelect = (id: any) => {
    if (selectedPlayerIds.includes(id)) {
      setSelectedPlayerIds(selectedPlayerIds.filter(pid => pid !== id));
    } else {
      setSelectedPlayerIds([...selectedPlayerIds, id]);
    }
  };

  const handleStartSection = () => {
    if (!isSubscribed) {
      Alert.alert(
        localizationStrings.ConfirmSubscription || "Subscription Required",
        localizationStrings.SubRequiredToStartSessions || "Please subscribe to a plan first to start sessions.",
        [
          { text: localizationStrings.Cancel || "Cancel", style: 'cancel' },
          {
            text: localizationStrings.ViewSubscriptionPlans || "View Plans",
            onPress: () => (navigation as any).navigate(ScreenNameEnum.SubscriptionPlansScreen)
          }
        ]
      );
      return;
    }

    if (selectedPlayerIds.length === 0) {
      errorToast(localizationStrings?.Pleaseselectleastone || "Please select at least one player")
      return;
    }

    navigation.navigate(ScreenNameEnum.StartSectionScreen, {
      title: localizationStrings.QuestionnaireBeforeAfter,
      Before: localizationStrings.BeforeTrainingQuestionnaire,
      Training: localizationStrings.AfterTrainingQuestionnaire,
      buttTitle: localizationStrings?.StartSection,
      playerIds: selectedPlayerIds,
      coachId: isLogin?.userData?.id,
      mode: 'start',
      onSuccess: () => {
        setSelectedPlayerIds([]);
      }
    });
  };

  const CommonCard = React.memo(({ item, onPress, isSelected }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={
              item?.image &&
                item.image.trim() !== "" &&
                !item.image.endsWith("/users/")
                ? { uri: item.image }
                : imageIndex.prfEdit
            }
            style={styles.avatar}
          />
          {isSelected && (
            <View style={{
              position: 'absolute',
              bottom: 0,
              right: 12,
              backgroundColor: '#A0D803',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#fff',
              padding: 2
            }}>
              <Text style={{ color: '#fff', fontSize: 8, fontWeight: 'bold' }}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.name} numberOfLines={1}>{item?.user_name}</Text>
          <Text style={styles.position}>{localizationStrings?.Player || "Player"}</Text>
        </View>
        <View style={[
          styles.checkboxContainer,
          isSelected ? styles.checkboxSelected : styles.checkboxUnselected
        ]}>
          {isSelected && <Text style={styles.checkIcon}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.mainContainer}>
      <StatusBarComponent />

      {/* Curved Top Background */}
      <View style={styles.topBackground} />

      {isLoading && <LoadingModal />}

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[1]}
        >
          {/* Header Title */}
          <View style={styles.headerTitleSection}>
            <Text style={styles.mainHeaderTitle}>{localizationStrings.Players}</Text>
          </View>

          {/* Sticky Controls Panel */}
          <View style={{ backgroundColor: 'transparent', paddingBottom: 10 }}>
            {/* Search Bar Wrapper */}
            <View style={styles.searchContainer}>
              <SearchBar
                value={searchPlaylist}
                onSearchChange={setSearchPlaylist}
              />
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#A0D803' }]}
                onPress={handleStartSection}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>
                  {localizationStrings?.StartSection} ({selectedPlayerIds.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#F44336' }]}
                onPress={() => navigation.navigate(ScreenNameEnum.EndSectionScreen as any)}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>
                  {localizationStrings?.endSection}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Players List Container */}
          <View style={styles.contentContainer}>
            {isLoading ? (
              <View style={{ paddingVertical: 40, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#A0D803" />
              </View>
            ) : (
              <FlatList
                data={filterData}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />}
                keyExtractor={(item: any) => item.id.toString()}
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
        </ScrollView>


        <TouchableOpacity
          style={styles.fab}
          onPress={handleStartSection}
          activeOpacity={0.9}
        >
          <Text style={styles.fabText}>
            {localizationStrings.StartSectionTitle} ({selectedPlayerIds.length}) {" "}
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );

};

export default Players;
