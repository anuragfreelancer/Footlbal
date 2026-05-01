import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, Linking } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import imageIndex from "../../../../assets/imageIndex";
import localizationStrings from "../../../../compoent/Localization/Localization";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import LogoutModal from "../../../../compoent/LogoutModal";
import LanguageModal from "../../../../compoent/LanguageModal";
import DeleteConfirmModal from "../../../../compoent/DeleteConfirmModal";
import LoadingModal from "../../../../utils/Loader";
import { DelliteApi } from "../../../../redux/Api/AuthApi";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/feature/authSlice";
import SubscriptionCard from "../../../../compoent/subscription/SubscriptionCard";

const Profile = () => {
  const navigation = useNavigation();
  const { language } = useLanguage();

  const getLogin = useSelector((state: any) => state?.feature);
  const isLogin = useSelector((state: any) => state?.auth);
  const [modal, setModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  // mock login/profile data, replace with your actual hook or redux data



  // menu data
  const MenuItems = [
    { title: localizationStrings.MyTeam, icon: imageIndex.myteam, screen: ScreenNameEnum.MyTeam },
    { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
    // { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
    { title: localizationStrings.PrivacyPolicy, icon: imageIndex.document, screen: "https://kmmps.store/kmmp-privacy-policy.html" },
    { title: localizationStrings.ChatMessages, icon: imageIndex.bubbleChat, screen: ScreenNameEnum.Messages },
    // { title: localizationStrings.SendFeedback, icon: imageIndex.feedback, screen: ScreenNameEnum.Feedback },
    { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },
    { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Logout" },
    // { title: localizationStrings.delete, icon: imageIndex.delete, screen: "delete" }
  ];

  const PlayData = [
    { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
    { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
    { title: localizationStrings.PrivacyPolicy, icon: imageIndex.document, screen: "https://kmmps.store/kmmp-privacy-policy.html" },
    // { title: localizationStrings.ChatMessages, icon: imageIndex.bubbleChat, screen: ScreenNameEnum.Messages },
    // { title: localizationStrings.SubscriptionPlans, icon: imageIndex.players, screen: ScreenNameEnum.SubscriptionPlansScreen },
    { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },
    { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Logout" },
    // { title: localizationStrings.delete, icon: imageIndex.delete, screen: "delete" }
  ];

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    // add your i18n language change logic here
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      const params = {
        userId: getLogin?.userGetData?.id,
        navigation
      };
      const response = await DelliteApi(params, setIsLoading);
      if (response) {
        setShowDelete(false);
        setModal(false); // or handleLogout()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const MenuItem = ({ title, icon, screen }: any) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (title === localizationStrings.Logout) setModal(true);
        else if (screen === "Language") setModalVisible(true);
        else if (screen === "delete") setShowDelete(true);
        else if (typeof screen === 'string' && screen.startsWith('http')) {
          Linking.openURL(screen).catch((err) => console.error("An error occurred", err));
        }
        else navigation.navigate(screen);

      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={icon} style={{ height: 26, width: 26 }} resizeMode="contain" />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Image source={imageIndex.arroRight} style={{ height: 23, width: 23 }} resizeMode="contain" />
    </TouchableOpacity>
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    navigation.navigate(ScreenNameEnum.SPLASH_SCREEN);
  };
  const imageUrl =
    getLogin?.userGetData?.image || isLogin?.userData?.image;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />


      {/* {status === 'Free' && <FreeUI />}

{(!isValid || status === 'Deactive') && <ExpiredUI />} */}

      {isLoading && <LoadingModal />}
      <Text style={styles.header}>{localizationStrings.Profile}</Text>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.profileHeader}
          onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={
                imageUrl &&
                  imageUrl.trim() !== "" &&
                  !imageUrl.endsWith("/users/")
                  ? { uri: imageUrl }
                  : imageIndex.prfEdit
              }
              defaultSource={imageIndex.prfEdit}
              onError={() => console.log("Image load failed")}
              style={styles.avatar}
            />

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{getLogin?.userGetData?.user_name || isLogin?.userData?.user_name}</Text>
              <Text style={styles.profileLink}>{getLogin?.userGetData?.email || isLogin?.userData?.email}</Text>
            </View>
          </View>
          <Image source={imageIndex.arroRight} style={{ height: 23, width: 23 }} resizeMode="contain" />
        </TouchableOpacity>


        <FlatList
          data={MenuItems}
          keyExtractor={(item) => item?.screen}
          renderItem={({ item }) => <MenuItem title={item?.title} icon={item?.icon} screen={item?.screen} />}
        />



        <LogoutModal isVisible={modal} close={() => setModal(false)} onSumbit={() => {
          handleLogout();
          setModal(false);
        }} />
        <LanguageModal visible={isModalVisible} onClose={() => setModalVisible(false)} onSelectLanguage={handleLanguageSelect} />
        <DeleteConfirmModal
          visible={showDelete}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
          title={localizationStrings.DeleteAccount}
          message={localizationStrings.Are}
          confirmText={localizationStrings.YesDelete}
          cancelText={localizationStrings.No}
          destructive
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
