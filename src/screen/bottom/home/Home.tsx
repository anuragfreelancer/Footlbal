import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity,   FlatList, ImageBackground, ActivityIndicator, Dimensions, Alert } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import styles from "./style";
import ChartComponent from "../../../compoent/ChartComponent";
import ScreenNameEnum from "../../../routes/screenName.enum";
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import useHome from "./useHome";
import EmptyListComponent from "../../../compoent/EmptyListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../compoent/Localization/Localization";


const DashboardScreen = () => {
  const {
    getLogin,
    imgloading,
    setImgloading,
    navigation,
    chatMess,

  } = useHome();
  const chartDataScreen1 = {
    weekly: { data: [1400, 2800, 100, 1600, 100, 800, 200] },
    monthly: { data: [70, 200, 150] },
    yearly: { data: [180, 222, 111] },
  };

  const screenWidth = Dimensions.get("window").width;
  const [notificationReceived, setNotificationReceived] = useState(false);
 

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


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <View style={styles.header}>
        <View style={{ position: 'relative' }}>
          <Image
            source={getLogin?.userGetData?.image ? { uri: getLogin?.userGetData?.image } : imageIndex.prfEdit}
            style={{
              height: 53,
              width: 53,
              borderRadius: 53,
              borderWidth: 1,
              borderColor: "#9DB2BF"
            }}
            onLoad={() => setImgloading(false)}
            onError={() => setImgloading(false)}
          />
          {imgloading && (
            <View style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: [{ translateX: -10 }, { translateY: -10 }],
            }}>
              <ActivityIndicator size="small" color="white" />
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{getLogin?.userGetData?.user_name || ""}</Text>
          <Text style={styles.userName}>{getLogin?.userGetData?.email || ""}</Text>
          {/* <Text style={styles.userSubtitle}>Breach of the peace</Text> */}
        </View>

        {/* <TouchableOpacity style={styles.notificationIcon}
          onPress={() => navigation.navigate(ScreenNameEnum.Notifications)}
        >
          <Image source={imageIndex.ProfielImge}
            style={{
              height:44,
              width:44
            }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ChartComponent data={chartDataScreen1} statusText="Safe" statusColor="green" />
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default DashboardScreen;
