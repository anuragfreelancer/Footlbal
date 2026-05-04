import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator } from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import styles from "./style";
import useMyTeam from "./useMyTeam";
import EmptyListComponent from "../../../../compoent/EmptyListComponent";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import ScreenNameEnum from "../../../../routes/screenName.enum";

const MyTeam = () => {
  useLanguage();
  const {
    MyTeam,
    isLoading,
    navigation,
    getLogin,
    isLogin
  } = useMyTeam();

  return (
    <View style={styles.container}>
      <StatusBarComponent />

      {/* Curved Top Background */}
      <View style={styles.topBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <CustomHeader
            imageSource={imageIndex.backNav}
            label={localizationStrings.MyTeam}
            textStyle={{
              color: "white"

            }}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={
                  (getLogin?.userGetData?.image || isLogin?.userData?.image) &&
                    !(getLogin?.userGetData?.image || isLogin?.userData?.image).endsWith("/users/")
                    ? { uri: getLogin?.userGetData?.image || isLogin?.userData?.image }
                    : imageIndex.prfEdit
                }
                style={styles.avatar}
              />

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{getLogin?.userGetData?.user_name || isLogin?.userData?.user_name}</Text>
                <Text style={styles.profileLink}>{localizationStrings?.StrengthTraining}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            {localizationStrings?.Players} ({MyTeam?.userGetData?.length || 0})
          </Text>

          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              <ActivityIndicator size={30} color="#A0D803" />
            </View>
          ) : (
            <FlatList
              data={MyTeam?.userGetData}
              scrollEnabled={false} // Since we are inside a ScrollView
              ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.9}
                  onPress={() => (navigation as any).navigate(ScreenNameEnum.PlayerDetails, {
                    item: item
                  })}
                >
                  <Image
                    source={
                      item?.image &&
                        item.image.trim() !== "" &&
                        !item.image.endsWith("/users/")
                        ? { uri: item.image }
                        : imageIndex.prfEdit
                    }
                    style={styles.playerAvatar}
                    resizeMode="cover"
                  />

                  <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item?.user_name}</Text>
                    <Text style={styles.position}>{localizationStrings.ForwardPosition || "Forward"}</Text>

                    <View style={styles.actionContainer}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        activeOpacity={0.7}
                        onPress={() => (navigation as any).navigate(ScreenNameEnum.PlayerDetails, {
                          item: item
                        })}
                      >
                        <Image source={imageIndex.edit} style={[styles.actionIcon, styles.editIcon]} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen, {
                          item: item
                        })}
                      >
                        <Image source={imageIndex.bubbleChat} style={[styles.actionIcon, styles.msgIcon]} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.detailContainer}>
                    <Text style={styles.label}>{localizationStrings.IntensityLabel || "Intensity"}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MyTeam;