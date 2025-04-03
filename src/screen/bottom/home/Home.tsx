import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, ActivityIndicator, Dimensions } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import styles from "./style";
import useHome from "./useHome";
import CommonCard from "../../../compoent/CommonCard";
import ChartComponent from "../../../compoent/ChartComponent";

import { LineChart, BarChart } from "react-native-chart-kit";
import EmptyListComponent from "../../../compoent/EmptyListComponent";

const DashboardScreen = () => {
  const players = Array(1).fill({
    name: "Animes S.",
    position: "Forward",
    trainingType: "Chest",
    intensity: "Beginner",
    image: imageIndex.bagePng, // Replace with actual image URL
  });
  const {
    getLogin,
    imgloading,
    setImgloading
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

  const data = [
      { day: "Sun", value: 30 },
      { day: "Mon", value: 50 },
      { day: "Tue", value: 90 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 70 },
      { day: "Fri", value: 40 },
      { day: "Sat", value: 80 },
  ];
  
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
        <TouchableOpacity style={styles.notificationIcon}>
          <Image source={imageIndex.Notification2}
            style={{
              height: 53,
              width: 53
            }}
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