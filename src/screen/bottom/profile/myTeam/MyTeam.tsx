import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";

const menuItems = [
  { title: "My Team", icon: imageIndex.myteam, screen: "MyTeam" },
  { title: "Change Password", icon: imageIndex.changePass, screen: "ChangePassword" },
  { title: "About Football", icon: imageIndex.about, screen: "AboutFootball" },
  { title: "Legal Information", icon: imageIndex.document, screen: "LegalInfo" },
  { title: "Our Platform", icon: "web", screen: "PlatformInfo" },
  { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
  { title: "Send Feedback", icon: "feedback", screen: "Feedback" },
];

const MyTeam = () => {
  const navigation = useNavigation();

  const players = Array(2).fill({
    name: "Animes S.",
    position: "Forward",
    trainingType: "Chest",
    intensity: "Beginner",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  });

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      <View style={{marginHorizontal:8}}>
      <CustomHeader imageSource={imageIndex.backNav} label="My Team" />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Image source={imageIndex.image} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Team Soccer</Text>
              <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                <Text style={styles.profileLink}>Lorem ipsum dolor sit amet</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <Text style={{
          marginLeft:15,
          fontSize:18,
          color:"#192126",
          fontWeight:"700"
        }}>Players ( 11 )</Text>

        <FlatList
          data={players}
          style={{
            marginTop:15
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={imageIndex.foodBagImg} style={{
                height:44,
                width:44
              }}  
              
              resizeMode="contain"
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.position}>{item.position}</Text>
              </View>
              
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Intensity</Text>
                <Text style={styles.value}>{item.intensity}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View style={{
          justifyContent: 'flex-start', marginBottom: 11,
          marginHorizontal:12
        }}>
          <CustomButton
            title={'Edit'}
            onPress={()=>
              navigation.goBack()
            }
          />
        </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: { fontSize: 24, color: "black", fontWeight: "700", textAlign: "center", marginVertical: 10 },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,

    backgroundColor: "white",
    justifyContent: "space-between",
    marginTop: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  // avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  infoContainer: { flex: 1 ,marginLeft:15},
  name: { fontSize: 12, fontWeight: "600", color: "black" },
  position: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600", color: "black" },
  value: { fontSize: 12, fontWeight: "600", color: "rgba(153, 153, 153, 1)" },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 1)"
  },
  profileLink: {
    fontSize: 12,
    color: "rgba(157, 178, 191, 1)",
    fontWeight: "400"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    justifyContent: "space-between",
  },
  menuText: {
    fontSize: 14,
    marginLeft: 10,
    color: "rgba(53, 44, 72, 1)",
    fontWeight: "500"
  },
});

export default MyTeam;