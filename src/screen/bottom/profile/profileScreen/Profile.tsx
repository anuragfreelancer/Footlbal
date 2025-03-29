import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import ScreenNameEnum from "../../../../routes/screenName.enum";

const menuItems = [
  { title: "My Team", icon: imageIndex.myteam, screen:ScreenNameEnum.MyTeam},
  { title: "Change Password", icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
  { title: "About Football", icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb},
  { title: "Legal Information", icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor},
  { title: "Our Platform", icon: imageIndex.about, screen: ScreenNameEnum.Ourplatform },
  { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
  { title: "Send Feedback", icon:imageIndex.feedback, screen: "Feedback" },
];

const Profile = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      <Text style={styles.header}>Profile</Text>

      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Image source={imageIndex.name} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Dulce Lubin</Text>
              <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                <Text style={styles.profileLink}>View my profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={imageIndex.arroRight} style={{
            height: 23,
            width: 23
          }}
            resizeMode="contain"
          />
        </View>
        <View style={{
          height: 15,
          backgroundColor: "rgba(237, 243, 243, 1)"
        }} />
        <View style={{ marginTop: 22, }}>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.screen}
            renderItem={({ item }) => <MenuItem title={item.title} icon={item.icon} screen={item.screen} />}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, icon, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(screen)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={icon} style={{
          height: 26,
          width: 26
        }}
          resizeMode="contain"
        />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Image source={imageIndex.arroRight} style={{
        height: 23,
        width: 23
      }}
        resizeMode="contain"
      />

    </TouchableOpacity>
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
    padding: 15,

    backgroundColor: "white",
    justifyContent: "space-between"
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
  },
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

export default Profile;