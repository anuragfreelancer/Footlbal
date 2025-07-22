import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import LogoutModal from "../../../../compoent/LogoutModal";
import styles from "./style";
import MenuItemsData from "./MenuItemsData";
const { MenuItems, PlayData } = MenuItemsData;
import useProfileScreen from "./useProfileScreen";
import ScreenNameEnum from "../../../../routes/screenName.enum";
const Profile = () => {

  const {
    modal, setModal,
    handleLogout, navigation,
    getLogin,
    isLogin
  } = useProfileScreen();
  console.log("dddd",isLogin)
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
        <TouchableOpacity style={styles.profileHeader}
          onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Image source={getLogin?.userGetData?.image ? { uri: getLogin?.userGetData?.image } : imageIndex?.ProfielImge} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{getLogin?.userGetData?.user_name}</Text>
              <TouchableOpacity >
                <Text style={styles.profileLink}>View my profile</Text>
                <Text style={styles.profileLink}>{getLogin?.userGetData?.email}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={imageIndex.arroRight} style={{
            height: 23,
            width: 23
          }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{
          height: 15,
          backgroundColor: "rgba(237, 243, 243, 1)"
        }} />
        <View style={{ marginTop: 22, }}>
          {isLogin?.userData?.type === "Coach" ? (
            <FlatList
              data={MenuItems}
              keyExtractor={(item) => item.screen}
              renderItem={({ item }) => (
                <MenuItem title={item.title} icon={item.icon} screen={item.screen} />
              )}
            />
          ) : (
            <FlatList
              data={PlayData}
              keyExtractor={(item) => item.screen}
              renderItem={({ item }) => (
                <MenuItem title={item.title} icon={item.icon} screen={item.screen} />
              )}
            />
          )}

        </View>
        <LogoutModal isVisible={modal} close={() => setModal(false)}
          onSumbit={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;