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
    { title: localizationStrings.ChatMessages, icon: imageIndex.bubbleChat, screen: ScreenNameEnum.Messages },
    { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },

    { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
    // { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
    { title: localizationStrings.PrivacyPolicy, icon: imageIndex.document, screen: "https://bomiappadmin.jensgetfitgroup.com/privacy-policies.php" },
    // { title: localizationStrings.SendFeedback, icon: imageIndex.feedback, screen: ScreenNameEnum.Feedback },
    { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Logout" },
    { title: localizationStrings.delete, icon: imageIndex.delete, screen: "delete" }
  ];

  const PlayData = [
    { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
    { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
    { title: localizationStrings.PrivacyPolicy, icon: imageIndex.document, screen: "https://bomiappadmin.jensgetfitgroup.com/privacy-policies.php" },
    // { title: localizationStrings.ChatMessages, icon: imageIndex.bubbleChat, screen: ScreenNameEnum.Messages },
    // { title: localizationStrings.SubscriptionPlans, icon: imageIndex.players, screen: ScreenNameEnum.SubscriptionPlansScreen },
    { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },
    { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Logout" },
    { title: localizationStrings.delete, icon: imageIndex.delete, screen: "delete" }
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
      activeOpacity={0.7}
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
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View style={styles.iconWrapper}>
          <Image source={icon} style={{ height: 22, width: 22, tintColor: '#A0D803' }} resizeMode="contain" />
        </View>
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Image
        source={imageIndex.arroRight}
        style={{ height: 18, width: 18, tintColor: '#C7C7CC' }}
        resizeMode="contain"
      />
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
    <View style={styles.container}>
      <StatusBarComponent />

      {/* Curved Top Background */}
      <View style={styles.topBackground} />

      {isLoading && <LoadingModal />}

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{localizationStrings.Profile}</Text>
          </View>

          <TouchableOpacity
            style={styles.profileHeader}
            activeOpacity={0.9}
            onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View style={styles.avatarContainer}>
                <Image
                  source={
                    imageUrl !== "https://kmmps.store/public/uploads/users/"
                      ? { uri: imageUrl }
                      : imageIndex.prfEdit
                  }
                  style={styles.avatar}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.profileInfo}>
                <Text numberOfLines={1} style={styles.profileName}>
                  {getLogin?.userGetData?.user_name || isLogin?.userData?.user_name}
                </Text>
                <Text numberOfLines={1} style={styles.profileLink}>
                  {getLogin?.userGetData?.email || isLogin?.userData?.email}
                </Text>
              </View>
            </View>
            <Image
              source={imageIndex.arroRight}
              style={{ height: 20, width: 20, tintColor: '#A0D803' }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.menuContainer}>
            {MenuItems.map((item, index) => (
              <React.Fragment key={item.screen + index}>
                <MenuItem title={item.title} icon={item.icon} screen={item.screen} />
                {index < MenuItems.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          <LogoutModal
            isVisible={modal}
            close={() => setModal(false)}
            onSumbit={() => {
              handleLogout();
              setModal(false);
            }}
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
            title={localizationStrings.DeleteAccount}
            message={localizationStrings.Are}
            confirmText={localizationStrings.YesDelete}
            cancelText={localizationStrings.No}
            destructive
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );


};

export default Profile;
