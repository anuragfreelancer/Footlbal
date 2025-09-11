import React,{useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import LogoutModal from "../../../../compoent/LogoutModal";
import styles from "./style";
import MenuItemsData from "./MenuItemsData";
const { MenuItems, PlayData } = MenuItemsData;
import useProfileScreen from "./useProfileScreen";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import { SafeAreaView } from "react-native-safe-area-context"; 
import LanguageModal from "../../../../compoent/LanguageModal";
import localizationStrings from "../../../../compoent/Localization/Localization";
import DeleteConfirmModal from "../../../../compoent/DeleteConfirmModal";
import { DelliteApi, UpdateProfile_Api } from "../../../../redux/Api/AuthApi";
import LoadingModal from "../../../../utils/Loader";

const Profile = () => {

  const {
    modal, setModal,
    handleLogout, navigation,
    getLogin,
    isLogin
  } = useProfileScreen();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLoading, setisLoading] = useState(false);

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    // Yahan par language set logic add karo (e.g., i18n.changeLanguage(lang))
  };

   const MenuItem = ({ title, icon, screen }: any) => {
    const navigation = useNavigation();
     return (
      <TouchableOpacity style={styles.menuItem}
        onPress={() => {
          if (title == "Logout") {
            setModal(true)
          } 
          
          else if (screen == "Language"){
            setModalVisible(true)
          } 
          else if (screen =="delete"){
            setShowDelete(true)
          }
          else {
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
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    handleSubmit()
    // simulate API call
    
  };
  const handleSubmit = async () => {
     
    try {
      const params = {
      
        userId: getLogin?.userGetData.id,
      
         navigation: navigation
      };
      const response = await DelliteApi(params, setisLoading);
      if(response){
        setShowDelete(false)
        handleLogout()
      }

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      {isLoading ? <LoadingModal /> : null}

      <Text style={styles.header}>{localizationStrings?.Profile}</Text>
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
                <Text style={styles.profileLink}>{localizationStrings?.myprofile}</Text>
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
         <LanguageModal
       
       visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectLanguage={handleLanguageSelect}
      />
       <DeleteConfirmModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleConfirmDelete}
        title={localizationStrings?.DeleteAccount}
        message={localizationStrings?.Are}
        confirmText={localizationStrings?.YesDelete}
        cancelText={localizationStrings.No}
        // loading={loading}
        destructive={true}
      />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;