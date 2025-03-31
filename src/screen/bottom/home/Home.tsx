import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import imageIndex from "../../../assets/imageIndex";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import ChartComponent from "../../../compoent/ChartComponent";
import styles from "./style";
import useHome from "./useHome";
import CommonCard from "../../../compoent/CommonCard";


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
  } = useHome()
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

      <View
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
        </View>

        {/* <ChartComponent /> */}
        <Text
          style={{ color: "rgba(25, 33, 38, 1)", fontSize: 18, fontWeight: "700", marginTop: 15 }}
        >Players Attending Session</Text>
        <FlatList
          style={{ marginTop: 10, }}
          data={players}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CommonCard
              item={item}
            />
          )}
        />
        {/* <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medium</Text>
            <TouchableOpacity style={styles.weeklyButton}>
              <Text style={styles.weeklyText}>Weekly ▼</Text>
            </TouchableOpacity>
          </View>

        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default DashboardScreen;
