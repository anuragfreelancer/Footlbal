import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import LogoutModal from "../../../../compoent/LogoutModal";
import styles from "./style";
import MenuItems from "./MenuItemsData";
import useProfileScreen from "./useProfileScreen";
import ScreenNameEnum from "../../../../routes/screenName.enum";
const Profile = () => {

  const {
    modal, setModal,
    handleLogout, navigation
  } = useProfileScreen()
  const MenuItem = ({ title, icon, screen }: any) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity style={styles.menuItem}
        onPress={() => {
          if (title == "Logout") {
            setModal(true)
          } else {
            navigation.navigate(screen);
          }
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icon} style={{
            height: 26,
            width: 26
          }} 
          tintColor={"#5A6565"}
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
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      <Text style={styles.header}>Profile</Text>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <TouchableOpacity  
          onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Image source={imageIndex.name} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Dulce Lubin</Text>
              <TouchableOpacity >
                <Text style={styles.profileLink}>View my profile</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
            data={MenuItems}
            keyExtractor={(item) => item.screen}
            renderItem={({ item }) => <MenuItem title={item.title} icon={item.icon} screen={item.screen} />}
          />
        </View>
        <LogoutModal isVisible={modal} close={() => setModal(false)}
          onSumbit={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;