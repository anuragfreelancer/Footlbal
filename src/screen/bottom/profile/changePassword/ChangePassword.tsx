import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import ResponsiveSize from "../../../../utils/ResponsiveSize";
import TextInputField from "../../../../utils/TextInputField";
import { hp } from "../../../../utils/Constant";

const menuItems = [
  { title: "My Team", icon: imageIndex.myteam, screen: "MyTeam" },
  { title: "Change Password", icon: imageIndex.changePass, screen: "ChangePassword" },
  { title: "About Football", icon: imageIndex.about, screen: "AboutFootball" },
  { title: "Legal Information", icon: imageIndex.document, screen: "LegalInfo" },
  { title: "Our Platform", icon: "web", screen: "PlatformInfo" },
  { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
  { title: "Send Feedback", icon: "feedback", screen: "Feedback" },
];

const ChangePassword = () => {
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
      <CustomHeader imageSource={imageIndex.backNav} label="Change Password" />
      <ScrollView style={styles.container}>
      <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2),  }}>
            <TextInputField
              lable={"Current Password"}
             
              placeholder={'Current Password'}
              firstLogo={true}
              img={imageIndex.lock}
            />
             <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"New Password"}
               
                placeholder={'New Password'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.lock}
                />
            </View>
             <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"Confirm Password"}
               
                placeholder={'Confirm Password'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.lock}
                />
            </View>
        
          </View>
       
      </ScrollView>
      <View style={{
          justifyContent: 'flex-start', marginBottom: 11,
          marginHorizontal:12
        }}>
          <CustomButton
            title={'Save'}
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
    marginHorizontal:15
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

export default ChangePassword;