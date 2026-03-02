import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, Dimensions, Alert } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import styles from "./style";
import ChartComponent from "../../../compoent/ChartComponent";
import useHome from "./useHome";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import SubscriptionCard from "../../../compoent/subscription/SubscriptionCard";
import { useFocusEffect } from "@react-navigation/native";
import { useSubscription } from "../../../compoent/subscription/useSubscription";

const DashboardScreen = () => {
  const { language } = useLanguage();
  const {
    getLogin,
    imgloading,
    setImgloading,
    navigation,
    chatMess,
    getCoach_session,
    getUser,
    isLogin
  } = useHome();
  const { showSubscriptionCard } = useSubscription();
  const chartDataScreen1 = {
    weekly: { data: [1400, 2800, 100, 1600, 100, 800, 200] },
    monthly: { data: [70, 200, 150] },
    yearly: { data: [180, 222, 111] },
  };




  // // Handle background notifications
  // useEffect(() => {
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     navigateToNotification();
  //   });

  //   // Handle initial notification when the app is opened from a notification
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         navigateToNotification();
  //       }
  //     });
  // }, []);

  const renderItem = ({ item }: { item: any }) => {
    const isOngoing = item.status === "Start";
    return (
      <View style={[styles.sessionCard, isOngoing && styles.sessionCardActive]}>
        <View style={styles.sessionCardHeader}>
          <Text style={styles.sessionDate}>{item.session_start_date}</Text>
          <View style={[styles.sessionBadge, isOngoing ? styles.sessionBadgeOngoing : styles.sessionBadgeEnded]}>
            <Text style={[styles.sessionBadgeText, !isOngoing && styles.sessionBadgeTextEnded]}>{isOngoing ? localizationStrings.Ongoing : localizationStrings.Ended}</Text>
          </View>
        </View>
        <View style={styles.sessionTimeRow}>
          <View style={styles.sessionTimeBlock}>
            <Text style={styles.sessionTimeLabel}>{localizationStrings?.Startq}</Text>
            <Text style={styles.sessionTimeValue}>{item.session_start_time}</Text>
          </View>
          <Text style={styles.sessionTimeSeparator}>–</Text>
          <View style={styles.sessionTimeBlock}>
            <Text style={styles.sessionTimeLabel}>{localizationStrings?.EndTime}</Text>
            <Text style={[styles.sessionTimeValue, !item.session_end_time && styles.sessionTimeOngoing]}>
              {item.session_end_time || localizationStrings.Ongoing}
            </Text>
          </View>
        </View>
      </View>
    );
  };
 useFocusEffect(
   useCallback(() => {
     return () => {};
   }, [getLogin])
 );
   return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />
      <View style={styles.header}>

        <View style={{ marginTop: 12 }}>
          <Image
            source={getLogin?.userGetData?.image || isLogin?.userData?.image ? { uri: getLogin?.userGetData?.image || isLogin?.userData?.image } : imageIndex.prfEdit}
            style={styles.avatar}
            onLoad={() => setImgloading(false)}
            onError={() => setImgloading(false)}
          />
          {imgloading && (
            <View style={styles.avatarLoader}>
              <ActivityIndicator size="small" color="#9CA3AF" />
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{getLogin?.userGetData?.user_name || isLogin?.userData?.user_name || ""}</Text>
          <Text style={styles.userEmail}>{getLogin?.userGetData?.email || isLogin?.userData?.email || ""}</Text>
         </View>
 
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
       
       {isLogin?.userData?.type == "Coach" ?  null :         <ChartComponent data={chartDataScreen1} statusText={localizationStrings.Safe} statusColor="rgba(160, 216, 3, 1)" />
 }
       
       {isLogin?.userData?.type == "Coach" ?  (
<>
           <View style={{
            marginHorizontal:10
           }}>

          {showSubscriptionCard && <SubscriptionCard />}
          </View>

           <FlatList
          showsVerticalScrollIndicator={false}
          data={chatMess}
          ListEmptyComponent={<EmptyListComponent message={localizationStrings.Nochat} />}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.card}
              onPress={() =>
                navigation.navigate(ScreenNameEnum.StartTrainingFed, {
                  item: item
                })
              }
            >
              <Image source={{
                uri: item.image
              }}
                style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.user_name}</Text>
 
              </View>

            </TouchableOpacity>
          )}
        />  

        

</>
       ) : (
        <>
        
                <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>{localizationStrings.StartSection}</Text>
        </View>
        <FlatList
          data={getUser}

          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyListComponent message={localizationStrings.Nochat} />}
        />
        </>
       )}

       </ScrollView>
    </SafeAreaView>
  );
};
export default DashboardScreen;
