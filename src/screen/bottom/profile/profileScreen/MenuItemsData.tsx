import imageIndex from "../../../../assets/imageIndex";
import ScreenNameEnum from "../../../../routes/screenName.enum";

const MenuItems = [
    { title: "My Team", icon: imageIndex.myteam, screen: ScreenNameEnum.MyTeam },
    { title: "Change Password", icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
    { title: "About Football", icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
    { title: "Legal Information", icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
    { title: "Our Platform", icon: imageIndex.about, screen: ScreenNameEnum.Ourplatform },
    { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
    { title: "Send Feedback", icon: imageIndex.feedback, screen: "Feedback" },
    { title: "Logout", icon: imageIndex.logut, screen: "Feedback" },
  ];


  export default MenuItems