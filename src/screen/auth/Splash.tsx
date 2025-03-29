import React, { useEffect } from 'react';
import { View, Image, StyleSheet,   SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
 import ScreenNameEnum from '../../routes/screenName.enum';
import { useSelector } from 'react-redux';
 import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';

// Define the navigation type
type RootStackParamList = {
    Home: undefined; // Change 'Home' to your actual destination screen name
};

const Splash: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
     // console.log("isLogOut",isLogOut)
    const isLogin = useSelector((state) => state.auth);
    const isFocus = useIsFocused();
    const checkLogout = () => {
      if (isLogin?.isLogin) {
        navigation.navigate(ScreenNameEnum.TabNavigator);
      } else {
         navigation.navigate(ScreenNameEnum.LoginScreen);
       }
    };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        checkLogout();
      }, 2000); // 2 सेकंड बाद checkLogout() कॉल होगा
      return () => clearTimeout(timer); // क्लीनअप के लिए
    }, [isFocus, navigation]);


    return (
        <View style={styles.container}>
            <SafeAreaView>
              <StatusBarComponent backgroundColor="black" barStyle="default"/>
                 <Image source={imageIndex.appLogo} style={styles.logo} resizeMode="contain" />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 224,
        width: 264,
    },
});

export default Splash;
