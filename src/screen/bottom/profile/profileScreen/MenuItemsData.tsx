// import imageIndex from "../../../../assets/imageIndex";
// import ScreenNameEnum from "../../../../routes/screenName.enum";

// const MenuItems = [
//     { title: "My Team", icon: imageIndex.myteam, screen: ScreenNameEnum.MyTeam },
//     { title: "Change Password", icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
//     { title: "About Football", icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
//     { title: "Legal Information", icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
//     // { title: "Our Platform", icon: imageIndex.about, screen: ScreenNameEnum.Ourplatform },
//     // { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
//     { title: "Send Feedback", icon: imageIndex.feedback, screen: ScreenNameEnum.Feedback },
//     { title: "Logout", icon: imageIndex.logut, screen: "Feedback" },
//     { title: "Language", icon: imageIndex.circleleft, screen: "Language" },
//   ];

//   const PlayData = [
//      { title: "Change Password", icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
//    //   { title: "Achieve Training", icon: imageIndex.feedback, screen: ScreenNameEnum.TrainingFedBack },
//      { title: "About Football", icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
//      { title: "Legal Information", icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
//      { title: "Chat Messages", icon: imageIndex.bubbleChat,  screen: ScreenNameEnum.Messages  },
//      { title: "Logout", icon: imageIndex.logut, screen: "Feedback" },
//      { title: "Language", icon: imageIndex.circleleft, screen: "Language" },

//   ];



//   export default { MenuItems, PlayData };
import imageIndex from "../../../../assets/imageIndex";
import localizationStrings from "../../../../compoent/Localization/Localization";
import ScreenNameEnum from "../../../../routes/screenName.enum";

const MenuItems = [
    { title: localizationStrings.MyTeam, icon: imageIndex.myteam, screen: ScreenNameEnum.MyTeam },
    { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
    { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
    { title: localizationStrings.LegalInformation, icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
         { title:  localizationStrings.ChatMessages, icon: imageIndex.bubbleChat,  screen: ScreenNameEnum.Messages  },

    // { title: "Our Platform", icon: imageIndex.about, screen: ScreenNameEnum.Ourplatform },
    // { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
    { title: localizationStrings.SendFeedback, icon: imageIndex.feedback, screen: ScreenNameEnum.Feedback },
    { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Feedback" },
    { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },
  ];

  const PlayData = [
     { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
   //   { title: "Achieve Training", icon: imageIndex.feedback, screen: ScreenNameEnum.TrainingFedBack },
     { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
     { title:  localizationStrings.LegalInformation, icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
     { title:  localizationStrings.ChatMessages, icon: imageIndex.bubbleChat,  screen: ScreenNameEnum.Messages  },
     { title:  localizationStrings.Logout, icon: imageIndex.logut, screen: "Feedback" },
     { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },

  ];



  export default { MenuItems, PlayData };