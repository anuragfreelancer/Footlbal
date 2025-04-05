import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, ActivityIndicator, Dimensions, Alert } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import styles from "./style";
import useHome from "./useHome";
import CommonCard from "../../../compoent/CommonCard";
import ChartComponent from "../../../compoent/ChartComponent";
 import EmptyListComponent from "../../../compoent/EmptyListComponent";
import ScreenNameEnum from "../../../routes/screenName.enum";
 import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
 

const DashboardScreen = () => {
  
  const {
    getLogin,
    imgloading,
    setImgloading,
    navigation
  } = useHome();
  const chartDataScreen1 = {
    weekly: { data: [5, 10, 30, 45, 5] },
    monthly: { data: [100, 200, 150] },
    yearly: { data: [500, 700, 800] },
  };

  const chartDataScreen2 = {
    weekly: { data: [15, 25, 35] },
    monthly: { data: [120, 180] },
    yearly: { data: [600, 750, 900] },
  };


  const screenWidth = Dimensions.get("window").width;
 
  const [notificationReceived, setNotificationReceived] = useState(false);

  useEffect(() => {
    // This handles foreground push notifications
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      // Create a channel for push notifications
      PushNotification.createChannel(
        {
          channelId: 'SportAppFootlball', // Unique channel ID
            channelName: 'App Sport Notifications', // Channel name shown in system settings
            channelDescription: 'Notifications for FootlbalApp App', // Optional description
            importance: 4, // High importance for heads-up notifications
            vibrate: true, // Enable vibration
        },
        (created) => console.log(`Channel created: ${created}`), // Debugging callback
      );

      // Cancel any previous local notifications
      PushNotification.cancelAllLocalNotifications();

      // Display the local notification with the message from Firebase
      PushNotification.localNotification({
        channelId: 'SportAppFootlball',
          title: remoteMessage?.notification?.title,
          message: remoteMessage?.notification?.body,
      });


    });

    return () => unsubscribe();

  }, []);

  // Handle background notifications
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      navigateToNotification();
    });

    // Handle initial notification when the app is opened from a notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          navigateToNotification();
        }
      });
  }, []);

   
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
          <Text style={styles.userSubtitle}>Breach of the peace</Text>
        </View>
         
        <TouchableOpacity style={styles.notificationIcon} 
        onPress={()=>navigation.navigate(ScreenNameEnum.Notifications)}
        >
          <Image source={notificationReceived ? imageIndex.Notification2 :imageIndex.Shape}
            style={{
              height: notificationReceived ?44:22,
              width:notificationReceived ? 44 :22
            }}
            resizeMode="contain"
           />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ChartComponent data={chartDataScreen1} statusText="Safe" statusColor="green" />
        {/* <ChartComponent data={chartDataScreen2} statusText="Medium" statusColor="#FFF100" />
        <ChartComponent data={chartDataScreen2} statusText="High Risk" statusColor="#E81224" /> */}
        <Text
          style={{ color: "rgba(25, 33, 38, 1)", fontSize: 18, fontWeight: "700", marginTop: 15 }}
        >Players Attending Session</Text>
        <FlatList
          style={{ marginTop: 10, }}
          data={[]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent message="No playlist available" />} // Common Empty Component

          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CommonCard
              item={item}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default DashboardScreen;
{/* <View
          style={{
            backgroundColor: "white",
            borderRadius: 10, // Smooth corners
            shadowColor: "#000",
            shadowOpacity: 0.2,
            marginVertical: 2,
            marginHorizontal: 3,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 3 }, // iOS shadow
            elevation: 1.1,
            overflow: "hidden",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Image
            source={imageIndex.workFirst}
            style={{
              width: "100%", // Ensures the image takes up full width of parent
              height: undefined, // Allows dynamic height based on aspect ratio
              aspectRatio: 384 / 263, // Maintains the correct aspect ratio
              resizeMode: "contain", // Ensures full visibility without cropping
            }}
          />
        </View> */}


    //     <View style={{ alignItems: "center", padding: 10 }}>
    //     <View style={{ flexDirection: "row", alignItems: "center" }}>
            
    //          <LineChart
    //             data={{
    //                 labels: data.map((item) => item.day), // ✅ Days displayed correctly
    //                 datasets: [{ data: data.map((item) => item.value) }],
    //             }}
    //             width={screenWidth - 80} // Adjust width
    //             height={220}
    //             yAxisSuffix="%"
    //             withHorizontalLabels={false} // Hide Y-axis numbers
    //             chartConfig={{
    //                 backgroundGradientFrom: "#fff",
    //                 backgroundGradientTo: "#fff",
    //                 color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
    //                 labelColor: () => "#000",
    //                 propsForDots: { r: "5", strokeWidth: "2", stroke: "#FF6347" }
    //             }}
    //             style={{ marginVertical: 10, borderRadius: 10 }}
    //         />

    //          <View style={{ marginLeft: 10, alignItems: "flex-start" }}>
    //             {data.map((item, index) => (
    //                 <Text key={index} style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12, color: "#FF6347" }}>
    //                     {item.value}%
    //                 </Text>
    //             ))}
    //         </View>
    //     </View>
    // </View>