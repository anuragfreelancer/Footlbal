


//   export default { MenuItems, PlayData };
import imageIndex from "../../../../assets/imageIndex";
import localizationStrings from "../../../../compoent/Localization/Localization";
import ScreenNameEnum from "../../../../routes/screenName.enum";

const MenuItems = [
  { title: localizationStrings.MyTeam, icon: imageIndex.myteam, screen: ScreenNameEnum.MyTeam },
  { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
  { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
  // { title: localizationStrings.LegalInformation, icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
  { title: localizationStrings.ChatMessages, icon: imageIndex.bubbleChat, screen: ScreenNameEnum.Messages },

  // { title: "Our Platform", icon: imageIndex.about, screen: ScreenNameEnum.Ourplatform },
  // { title: "Help Centre", icon: imageIndex.helpp, screen: "HelpCentre" },
  { title: localizationStrings.SendFeedback, icon: imageIndex.feedback, screen: ScreenNameEnum.Feedback },
  { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },
  { title: localizationStrings.Language, icon: imageIndex.translating, screen: ScreenNameEnum.SubscriptionPlansScreen },


  { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Feedback" },
  // { title:  localizationStrings.delete, icon: imageIndex.delete, screen: "delete" },

];

const PlayData = [
  { title: localizationStrings.ChangePassword, icon: imageIndex.changePass, screen: ScreenNameEnum.ChangePassword },
  //   { title: "Achieve Training", icon: imageIndex.feedback, screen: ScreenNameEnum.TrainingFedBack },
  { title: localizationStrings.Schedule, icon: imageIndex.calendar, screen: ScreenNameEnum.Calendar },
  { title: localizationStrings.AboutFootball, icon: imageIndex.about, screen: ScreenNameEnum.AboutFootb },
  // { title: localizationStrings.LegalInformation, icon: imageIndex.document, screen: ScreenNameEnum.Legalinfor },
  { title: localizationStrings.ChatMessages, icon: imageIndex.bubbleChat, screen: ScreenNameEnum.Messages },
  { title: localizationStrings.Language, icon: imageIndex.translating, screen: ScreenNameEnum.SubscriptionPlansScreen },
  { title: localizationStrings.Language, icon: imageIndex.translating, screen: ScreenNameEnum.SubscriptionPlansScreen },

  { title: localizationStrings.Language, icon: imageIndex.translating, screen: "Language" },
  { title: localizationStrings.Logout, icon: imageIndex.logut, screen: "Feedback" },
  //  { title:  localizationStrings.delete, icon: imageIndex.delete, screen: "delete" },

];



export default { MenuItems, PlayData };