import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VersionCheck from "react-native-version-check";
import imageIndex from "./assets/imageIndex";

const IOS_APP_ID = "6748689173";
const ANDROID_PACKAGE_NAME = "com.KMMPRPE";

/**
 * UpdateModal Component
 * Checks for app updates on iOS (App Store) and Android (Play Store)
 * and displays a premium modal if a new version is available.
 */
const UpdateModal = () => {
  const [visible, setVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");

  const checkAppVersion = useCallback(async () => {
    try {
      // Check if update is needed based on the platform
      const updateInfo = await VersionCheck.needUpdate({
        provider: Platform.OS === "ios" ? "appStore" : "playStore",
        packageName: Platform.OS === "android" ? ANDROID_PACKAGE_NAME : undefined,
        appID: Platform.OS === "ios" ? IOS_APP_ID : undefined,
      });

      if (updateInfo?.isNeeded) {
        setLatestVersion(updateInfo.latestVersion || "");
        setStoreUrl(updateInfo.storeUrl || "");
        setVisible(true);
      }
    } catch (error: any) {
      console.warn("[UpdateModal] Version check failed:", error?.message || error);
    }
  }, []);

  useEffect(() => {
    // Run the check after a short delay to ensure app is ready
    const timer = setTimeout(() => {
      checkAppVersion();
    }, 2000);
    return () => clearTimeout(timer);
  }, [checkAppVersion]);

  const openStore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (storeUrl) {
        await Linking.openURL(storeUrl);
      } else {
        // Fallback deep links if storeUrl is missing
        const url = Platform.OS === "ios" 
          ? `itms-apps://apps.apple.com/app/id${IOS_APP_ID}`
          : `market://details?id=${ANDROID_PACKAGE_NAME}`;
        await Linking.openURL(url);
      }
    } catch (err) {
      // Fallback to browser URL if deep link fails
      const fallbackUrl = Platform.OS === "ios"
        ? `https://apps.apple.com/app/id${IOS_APP_ID}`
        : `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
      Linking.openURL(fallbackUrl);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            {/* Logo / Icon Container */}
            <View style={styles.iconContainer}>
               <Image source={imageIndex.appLogo} style={styles.logo} resizeMode="contain" />
            </View>

            <Text style={styles.title}>New Update Available</Text>
            
            {latestVersion ? (
              <Text style={styles.versionText}>Version {latestVersion} is now ready</Text>
            ) : null}

            <Text style={styles.message}>
              A newer version of the app is available with improved performance and new features. Please update now for the best experience.
            </Text>

            {/* Primary Action Button */}
            <TouchableOpacity 
              style={[styles.updateButton, loading && styles.updateButtonDisabled]} 
              onPress={openStore} 
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.updateButtonText}>Update Now</Text>
              )}
            </TouchableOpacity>

            {/* Secondary Action Button */}
            <TouchableOpacity style={styles.laterButton} onPress={() => setVisible(false)}>
              <Text style={styles.laterButtonText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)", // Slightly darker overlay for focus
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 28, // More rounded corners for premium feel
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  iconContainer: {
    width: 88,
    height: 88,
    backgroundColor: "#F9FAFB",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  logo: {
    width: 64,
    height: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  versionText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 16,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  message: {
    fontSize: 15,
    lineHeight: 23,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 32,
  },
  updateButton: {
    backgroundColor: "#111827", // Dark Slate / Black
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  laterButton: {
    marginTop: 18,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  laterButtonText: {
    fontSize: 15,
    color: "#9CA3AF",
    fontWeight: "600",
  },
});

export default UpdateModal;