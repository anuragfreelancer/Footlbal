 import imageIndex from "../assets/imageIndex";
import TabNavigator from "../navigators/TabNavigator";
import CreateNewPassword from "../screen/auth/CreateNewPassword";
import Login from "../screen/auth/Login";
import OnboardingScreen from "../screen/auth/Onboarding";
import OtpScreen from "../screen/auth/OtpScreen";
import PasswordReset from "../screen/auth/PasswordReset";
import ReadyScreen from "../screen/auth/ReadyScreen";
import SignUp from "../screen/auth/SignUp";
import Splash from "../screen/auth/Splash";
import Calendar from "../screen/bottom/calendar/Calendar";
import ChatScreen from "../screen/bottom/chat/ChatScreen";
import Home from "../screen/bottom/home/Home";
import Messages from "../screen/bottom/messages/Messages";
import PlayerDetails from "../screen/bottom/playerDetails/PlayerDetails";
import AddPlayer from "../screen/bottom/players/playe/addPlayer/AddPlayer";
import Players from "../screen/bottom/players/playe/Players";
import AboutFootb from "../screen/bottom/profile/about/AboutFootb";
import ChangePassword from "../screen/bottom/profile/changePassword/ChangePassword";
import Legalinfor from "../screen/bottom/profile/legal/Legalinfor";
import MyTeam from "../screen/bottom/profile/myTeam/MyTeam";
import Ourplatform from "../screen/bottom/profile/ourplatform/Ourplatform";
import Profile from "../screen/bottom/profile/profileScreen/Profile";
import Reports from "../screen/bottom/reports/Reports";
    import ScreenNameEnum from "./screenName.enum";

const _routes:any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
  
    {
      name: ScreenNameEnum.SignUpScreen,
      Component: SignUp,
    },

    {
      name: ScreenNameEnum.LoginScreen,
      Component: Login,
    },
  
    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },
 
 
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
   
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },
 
    {
      name: ScreenNameEnum.CreatePassword,
      Component:CreateNewPassword,
    },
    {
      name: ScreenNameEnum.TabNavigator,
      Component:TabNavigator,
    },
    
    {
      name: ScreenNameEnum.MyTeam,
      Component:MyTeam,
    },
    {
      name: ScreenNameEnum.ChangePassword,
      Component:ChangePassword,
    },
    
 
    {
      name: ScreenNameEnum.AddPlayer,
      Component:AddPlayer,
    },
    
 
 
    {
      name: ScreenNameEnum.PlayerDetails,
      Component:PlayerDetails,
    },
    
    {
      name: ScreenNameEnum.AboutFootb,
      Component:AboutFootb,
    },
    
    {
      name: ScreenNameEnum.Ourplatform,
      Component:Ourplatform,
    },
    
 
    {
      name: ScreenNameEnum.Legalinfor,
      Component:Legalinfor,
    },
    
    {
      name: ScreenNameEnum.Messages,
      Component:Messages,
    },
    
    
    {
      name: ScreenNameEnum.ChatScreen,
      Component:ChatScreen,
    },
    
 
  
 
   
 
  ],

  BOTTOMTAB_ROUTE: [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component: Home,
      label: 'Home',
      logo: imageIndex.home,
      logo1: imageIndex.homeActive
    },
    
    {
      name: ScreenNameEnum.Calendar,
      Component: Calendar,
      label: 'Calendar',
      logo: imageIndex.calendar,
      logo1: imageIndex.calendaractive
    },
 
    {
      name: ScreenNameEnum.Players,
      Component: Players,
      label: 'Players',
      logo: imageIndex.players,
      logo1: imageIndex.playersActive
    },
    {
      name: ScreenNameEnum.Reports,
      Component: Reports,
      label: 'Reports',
      logo: imageIndex.reports,
      logo1: imageIndex.reportsActivE
    },
    {
      name: ScreenNameEnum.Profile,
      Component: Profile,
      label: 'Profile',
      logo: imageIndex.profile,
      logo1: imageIndex.profileUser
    },
  ],
};

export default _routes;
