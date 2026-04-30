import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase
import FirebaseMessaging

@main
class AppDelegate: RCTAppDelegate, MessagingDelegate, UNUserNotificationCenterDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    
    // ✅ Initialize Firebase
    FirebaseApp.configure()
    
    self.moduleName = "Footlbal"
    self.dependencyProvider = RCTAppDependencyProvider()

    // 🔔 Messaging Delegate
    Messaging.messaging().delegate = self
    
    // 🔔 Request Notification Permission
    UNUserNotificationCenter.current().delegate = self
    let authOptions: UNAuthorizationOptions = [.alert, .badge, .sound]
    UNUserNotificationCenter.current().requestAuthorization(options: authOptions) { _, _ in }
    application.registerForRemoteNotifications()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  // ✅ Manual Token Handling (Since proxy is disabled)
  override func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Messaging.messaging().apnsToken = deviceToken
    // Removed super call to prevent "unrecognized selector" crash in RN 0.78
  }

  override func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    print("❌ Notification registration failed: \(error)")
  }

  // ✅ Required for Firebase Messaging when Proxy is disabled
  override func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    Messaging.messaging().appDidReceiveMessage(userInfo)
    completionHandler(.newData)
  }

  // MARK: - MessagingDelegate
  func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
    print("✅ FCM Token: \(String(describing: fcmToken))")
  }

  // MARK: - UNUserNotificationCenterDelegate
  func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    completionHandler([[.banner, .list, .sound]])
  }

  func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    completionHandler()
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    return self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    let url = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    if url == nil {
      return URL(string: "http://localhost:8081/index.bundle?platform=ios&dev=true")
    }
    return url
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
