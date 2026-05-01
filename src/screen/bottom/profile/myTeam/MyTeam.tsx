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

  } = useMyTeam()

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      <View style={{ marginHorizontal: 8, marginTop: 12 }}>
        <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings.MyTeam} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

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
              <TouchableOpacity  >
                <Text style={styles.profileLink}>{localizationStrings?.StrengthTraining}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 18,
            color: "#192126",
            fontWeight: "700"
          }}
        >
          {localizationStrings?.Players} ({MyTeam?.userGetData?.length || 0})
        </Text>
        {
          isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              <ActivityIndicator size={30} color="#A0D803" />
            </View>
          ) : (
            <FlatList
              data={MyTeam?.userGetData}
              style={{
                marginTop: 15
              }}
              ListEmptyComponent={<EmptyListComponent message={localizationStrings?.noplayers} />} // Common Empty Component
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                console.log("item --- ", item),
                <TouchableOpacity style={styles.card}
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
                        onPress={() => (navigation as any).navigate(ScreenNameEnum.PlayerDetails, {
                          item: item
                        })}
                      >
                        <Image source={imageIndex.edit} style={[styles.actionIcon, styles.editIcon]} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen, {
                          item: item
                        })}
                      >
                        <Image source={imageIndex.bubbleChat} style={[styles.actionIcon, styles.msgIcon]} />
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => console.log("Delete player", item?.id)}
                      >
                        <Image source={imageIndex.delete} style={[styles.actionIcon, styles.deleteIcon]} />
                      </TouchableOpacity> */}
                    </View>
                  </View>

                  <View style={styles.detailContainer}>
                    <Text style={styles.label}>{localizationStrings.IntensityLabel || "Intensity"}</Text>
                    {/* <Text style={styles.value}>{item?.injury || "No Injury"}</Text> */}
                  </View>
                </TouchableOpacity>
              )}
            />
          )
        }


      </ScrollView>
      {/* <View style={{
        justifyContent: 'flex-start', marginBottom: 11,
        marginHorizontal: 12
      }}>
        <CustomButton
          title={localizationStrings.Edit}
          onPress={() =>
            navigation.goBack()
          }
        />
      </View> */}
    </SafeAreaView>
  );
};





export default MyTeam;