import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import imageIndex from '../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import LogoutModal from './LogoutModal';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/feature/authSlice';
import ScreenNameEnum from '../routes/screenName.enum';
import { successToast } from '../utils/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const menuItems = [
  { id: '1', title: 'Profile', icon: imageIndex.subscription, onClike: "UserDetailsScreen" },  // स्क्रीन नाम add करो
  { id: '2', title: 'Subscription', icon: imageIndex.subscription, onClike: "SubscriptionScreen" },  // स्क्रीन नाम add करो
  { id: '3', title: 'Change Password', icon: imageIndex.ChangePassword, onClike: "ChangePasswordScreen" },
  { id: '4', title: 'Notification', icon: imageIndex.Menunotification, onClike: "NotificationsSetting" },
  { id: '5', title: 'Legal and Policies', icon: imageIndex.legal, onClike: "LegalPoliciesScreen" },
  { id: '6', title: 'Help & Support', icon: imageIndex.help, onClike: "HelpSupportScreen" },
];


const CustomDrawerContent = (props:any) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleNavigation = (screenName:any) => {
    if (screenName) {
      navigation.navigate(screenName);
    } else {
     }
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.menuItem}        onPress={() => handleNavigation(item?.onClike)}
>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {item.icon && <Image source={item.icon} style={styles.icon} />}
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Image source={imageIndex.arrowright} style={{
        height: 24, width: 24
      }} />

    </TouchableOpacity>
  );
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setModalVisible(false);
    AsyncStorage.removeItem('userRole');  // AsyncStorage में save
    navigation.replace(ScreenNameEnum.ChooseRoleScreen);
    successToast('Logout Successful');
};
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={imageIndex.appLogo} style={styles.logoImage} />
      </View>
      <View style={{ marginTop: 20,   
 }}>
        {/* FlatList for menu items */}
        <FlatList
          data={menuItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false} // क्योंकि DrawerContentScrollView पहले से स्क्रॉल है
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={()=> setModalVisible(true)}>
        <Image source={imageIndex.LogOut2} style={{
          height: 35, width: 35,
        }} resizeMode='cover' />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      <LogoutModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          handleLogout()
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  logoImage: {
    width: 94,
    height: 94,
    resizeMode: 'contain',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "space-between"
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    fontWeight: "500"
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoutButton: {
    position: "relative",
    top: 120,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 14,
  
  },
  logoutText: {
    fontSize: 14,
    marginLeft: 10,
    color: 'rgba(53, 44, 72, 1)',
    fontWeight: "500",
    lineHeight:100,
    
  },
});

export default CustomDrawerContent;
