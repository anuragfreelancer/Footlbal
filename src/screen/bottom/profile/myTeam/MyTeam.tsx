import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import styles from "./style";

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
      <View style={{marginHorizontal:8,marginTop:12}}>
      <CustomHeader imageSource={imageIndex.backNav} label="My Team" />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Image source={imageIndex.image} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Team Soccer</Text>
              <TouchableOpacity  >
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





export default MyTeam;