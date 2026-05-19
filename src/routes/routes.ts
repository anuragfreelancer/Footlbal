import TabNavigator from "../navigators/TabNavigator";
import CreateNewPassword from "../screen/auth/createNewPassword/CreateNewPassword";
import Login from "../screen/auth/login/Login";
import OnboardingScreen from "../screen/auth/Onboarding";
import OtpScreen from "../screen/auth/otpScreen/OtpScreen";
import PasswordReset from "../screen/auth/passwordReset/PasswordReset";
import SignUp from "../screen/auth/signUp/SignUp";
import Splash from "../screen/auth/splash/Splash";
import Calendar from "../screen/bottom/calendar/Calendar";
import ChatScreen from "../screen/bottom/chat/ChatScreen";
import Home from "../screen/bottom/home/Home";
import Messages from "../screen/bottom/messages/Messages";
import PlayerDetails from "../screen/bottom/playerDetails/playerDetail/PlayerDetails";
import AddPlayer from "../screen/bottom/playerDetails/addFiledPlayes/AddPlayer";
import Players from "../screen/bottom/players/playe/Players";
import AboutFootb from "../screen/bottom/profile/about/AboutFootb";
import ChangePassword from "../screen/bottom/profile/changePassword/ChangePassword";
import EditProfile from "../screen/bottom/profile/editProfile/EditProfile";
import Feedback from "../screen/bottom/profile/feedback/Feedback";
import Legalinfor from "../screen/bottom/profile/legal/Legalinfor";
import MyTeam from "../screen/bottom/profile/myTeam/MyTeam";
import Ourplatform from "../screen/bottom/profile/ourplatform/Ourplatform";
import Profile from "../screen/bottom/profile/profileScreen/Profile";
import Reports from "../screen/bottom/reports/Reports";
import ScreenNameEnum from "./screenName.enum";
import PlayerEdit from "../screen/bottom/playerDetails/playerEdit/PlayerEdit";
import SubmitRPE from "../screen/bottom/submitRPE/SubmitRPE";
import { useDispatch, useSelector } from "react-redux";
import imageIndex from "../assets/imageIndex";
import ChooseRoleScreen from "../screen/auth/ChooseRoleScreen";
import Notifications from "../screen/bottom/notifications/Notifications";
import TrainingFedBack from "../screen/bottom/trainingFedBack/TrainingFedBack";
import StartTrainingFed from "../screen/bottom/startTrainingFed/StartTrainingFed";
import EndSectionScreen from "../screen/bottom/profile/endSectionScreen/EndSectionScreen";
import AllPlayer from "../screen/bottom/playerDetails/allPlayer/AllPlayer";
import SubscriptionPlansScreen from "../screen/SubscriptionPlans/SubscriptionPlansScreen";
import PaymentWebViewScreen from "../screen/SubscriptionPlans/PaymentWebViewScreen";
import localizationStrings from "../compoent/Localization/Localization";
import ProfilePlayer from "../screen/bottom/profile/profilePlayer/ProfilePlayer";
import StartSectionScreen from "../screen/bottom/profile/startSectionScreen/StartSectionScreen";
import AddQuestion from "../screen/bottom/profile/addQuestion/AddQuestion";
import SummaryTable from "../screen/bottom/playerDetails/summaryTable/SummaryTable";
import CommonWebView from "../screen/CommonWebView";
import { useEffect } from "react";
import { GetProfile } from "../redux/Api/AuthApi";

const useAuth = () => {
  return useSelector((state: any) => state?.auth);
};

const _routes = () => {




  const isLogin = useAuth(); // Hook function inside component/function
  console.log("isLogin", isLogin)

  const dispatch = useDispatch();

  useEffect(() => {
    GetProfile(isLogin?.userData?.id, dispatch);

  }, [])
  return {
    REGISTRATION_ROUTE: [
      { name: ScreenNameEnum.SPLASH_SCREEN, Component: Splash },
      { name: ScreenNameEnum.SignUpScreen, Component: SignUp },
      { name: ScreenNameEnum.LoginScreen, Component: Login },
      { name: ScreenNameEnum.OnboardingScreen, Component: OnboardingScreen },
      { name: ScreenNameEnum.EditProfile, Component: EditProfile },
      { name: ScreenNameEnum.SubmitRPE, Component: SubmitRPE },
      { name: ScreenNameEnum.PasswordReset, Component: PasswordReset },
      { name: ScreenNameEnum.OtpScreen, Component: OtpScreen },
      { name: ScreenNameEnum.CreatePassword, Component: CreateNewPassword },
      { name: ScreenNameEnum.TabNavigator, Component: TabNavigator },
      { name: ScreenNameEnum.MyTeam, Component: MyTeam },
      { name: ScreenNameEnum.ChangePassword, Component: ChangePassword },
      { name: ScreenNameEnum.AddPlayer, Component: AddPlayer },
      { name: ScreenNameEnum.Feedback, Component: Feedback },
      { name: ScreenNameEnum.PlayerDetails, Component: PlayerDetails },
      { name: ScreenNameEnum.PlayerEdit, Component: PlayerEdit },
      { name: ScreenNameEnum.AboutFootb, Component: AboutFootb },
      { name: ScreenNameEnum.Ourplatform, Component: Ourplatform },
      { name: ScreenNameEnum.Legalinfor, Component: Legalinfor },
      { name: ScreenNameEnum.Messages, Component: Messages },
      { name: ScreenNameEnum.ChatScreen, Component: ChatScreen },
      { name: ScreenNameEnum.ChooseRoleScreen, Component: ChooseRoleScreen },
      { name: ScreenNameEnum.Calendar, Component: Calendar },
      { name: ScreenNameEnum.Notifications, Component: Notifications },
      { name: ScreenNameEnum.TrainingFedBack, Component: TrainingFedBack },
      { name: ScreenNameEnum.StartTrainingFed, Component: StartTrainingFed },
      { name: ScreenNameEnum.EndSectionScreen, Component: EndSectionScreen },
      { name: ScreenNameEnum.SubscriptionPlansScreen, Component: SubscriptionPlansScreen },
      { name: ScreenNameEnum.PaymentWebViewScreen, Component: PaymentWebViewScreen },
      { name: ScreenNameEnum.StartSectionScreen, Component: StartSectionScreen },
      { name: ScreenNameEnum.AddQuestion, Component: AddQuestion },
      { name: ScreenNameEnum.SummaryTable, Component: SummaryTable },
      { name: ScreenNameEnum.CommonWebView, Component: CommonWebView },
    ],

    BOTTOMTAB_ROUTE: isLogin?.userData?.type === "Coach" ? [

      {
        name: ScreenNameEnum.Calendar,
        Component: Calendar,
        label: localizationStrings.Calendar,
        logo: imageIndex.calendar,
        logo1: imageIndex.calendar
      },
      {
        name: ScreenNameEnum.SummaryTable,
        Component: SummaryTable,
        label: "Tableau récapitulatif",
        logo: imageIndex.profileUser,
        logo1: imageIndex.profileUser
      },
      {
        name: ScreenNameEnum.Players,
        Component: Players,
        label: localizationStrings.Players,
        logo: imageIndex.players,
        logo1: imageIndex.playersActive
      },
      {
        name: ScreenNameEnum.Reports,
        Component: AllPlayer,
        label: localizationStrings.Reports,
        logo: imageIndex.reports,
        logo1: imageIndex.reportsActivE,
      },

      {
        name: ScreenNameEnum.Profile,
        Component: Profile,
        label: localizationStrings.Profile,
        logo: imageIndex.profile,
        logo1: imageIndex.profileUser,
      },
    ] : [
      {
        name: ScreenNameEnum.HOME_SCREEN,
        Component: Home,
        label: localizationStrings.Home,
        logo: imageIndex.home,
        logo1: imageIndex.homeActive,
      },
      // {
      //   name: ScreenNameEnum.Messages,
      //   Component: Messages,
      //   label: localizationStrings.Messages,
      //   logo: imageIndex.bubbleChat,
      //   logo1: imageIndex.bubbleChat
      // },

      {
        name: ScreenNameEnum.Reports,
        Component: Reports,
        label: localizationStrings.Performance,
        logo: imageIndex.reports,
        logo1: imageIndex.reportsActivE,
      },
      {
        name: ScreenNameEnum.Profile,
        Component: ProfilePlayer,
        label: localizationStrings.Profile,
        logo: imageIndex.profile,
        logo1: imageIndex.profileUser,
      },
    ],
  };
};

export default _routes;
