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
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VersionCheck from "react-native-version-check";
import imageIndex from "./assets/imageIndex";
import { color } from "./constant";


// Update parameters
const IOS_APP_ID = "6748689173";
const ANDROID_PACKAGE_NAME = "com.KMMPRPE";

// ==========================================
// 🛠️ DEBUG FLAG FOR TESTING THE MODAL
// Set this to true to force show the update modal during local development!
// ==========================================
const DEBUG_FORCE_SHOW = false;

/**
 * Robust semantic version comparison helper.
 * Returns true if the latest version is higher than the current version.
 */
const isVersionNewer = (current: string, latest: string): boolean => {
  if (!current || !latest) return false;

  // Clean version strings from any non-numeric characters like "v1.2.3" -> "1.2.3"
  const cleanCurrent = current.replace(/[^0-9.]/g, "");
  const cleanLatest = latest.replace(/[^0-9.]/g, "");

  const currentParts = cleanCurrent.split(".").map(Number);
  const latestParts = cleanLatest.split(".").map(Number);

  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
    const cur = currentParts[i] || 0;
    const lat = latestParts[i] || 0;
    if (lat > cur) return true;
    if (cur > lat) return false;
  }
  return false;
};

/**
 * UpdateModal Component
 * Checks for app updates on iOS (App Store) and Android (Play Store)
 * and displays a premium football-themed modal if a new version is available.
 */
const UpdateModal = () => {
  const [visible, setVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestVersion, setLatestVersion] = useState("");
  const [currentVersion, setCurrentVersion] = useState("");

  const checkAppVersion = useCallback(async () => {
    // If debug mode is active, mock a newer version and show modal
    if (DEBUG_FORCE_SHOW) {
      console.log("[UpdateModal] Debug Force Show is enabled");
      setCurrentVersion("1.0.0");
      setLatestVersion("2.1.0");
      setStoreUrl(
        Platform.OS === "ios"
          ? `https://apps.apple.com/in/app/kmmp-rpe-football/id${IOS_APP_ID}`
          : `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`
      );
      setVisible(true);
      return;
    }

    try {
      // 1. Get current local version
      const localVersion = VersionCheck.getCurrentVersion();
      setCurrentVersion(localVersion || "1.0.0");

      let gotUpdateNeeded = false;
      let fetchedLatestVersion = "";
      let fetchedStoreUrl = "";

      // 2. Fetch using react-native-version-check
      try {
        const updateInfo = await VersionCheck.needUpdate({
          provider: Platform.OS === "ios" ? "appStore" : "playStore",
          packageName: Platform.OS === "android" ? ANDROID_PACKAGE_NAME : undefined,
          appID: Platform.OS === "ios" ? IOS_APP_ID : undefined,
        });

        if (updateInfo) {
          gotUpdateNeeded = !!updateInfo.isNeeded;
          fetchedLatestVersion = updateInfo.latestVersion || "";
          fetchedStoreUrl = updateInfo.storeUrl || "";
        }
      } catch (err) {
        console.warn("[UpdateModal] Primary needUpdate check failed, attempting fallback:", err);
      }

      // 3. Robust fallback lookup (especially for iOS / custom stores)
      if (!gotUpdateNeeded) {
        if (Platform.OS === "ios") {
          // Fallback iOS lookup using iTunes API directly
          const response = await fetch(
            `https://itunes.apple.com/lookup?id=${IOS_APP_ID}&country=in&timestamp=${Date.now()}`
          );
          const data = await response.json();
          if (data && data.results && data.results.length > 0) {
            const storeVer = data.results[0].version;
            fetchedStoreUrl =
              data.results[0].trackViewUrl ||
              `https://apps.apple.com/in/app/kmmp-rpe-football/id${IOS_APP_ID}`;

            if (isVersionNewer(localVersion, storeVer)) {
              gotUpdateNeeded = true;
              fetchedLatestVersion = storeVer;
            }
          }
        } else {
          // Play Store fallback logic
          const storeVer = await VersionCheck.getLatestVersion({
            provider: "playStore",
            packageName: ANDROID_PACKAGE_NAME,
          });
          fetchedStoreUrl = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;

          if (storeVer && isVersionNewer(localVersion, storeVer)) {
            gotUpdateNeeded = true;
            fetchedLatestVersion = storeVer;
          }
        }
      }

      // 4. Show the modal if an update is needed
      if (gotUpdateNeeded) {
        setLatestVersion(fetchedLatestVersion);
        setStoreUrl(fetchedStoreUrl);
        setVisible(true);
      }
    } catch (error: any) {
      console.warn("[UpdateModal] All version checks failed:", error?.message || error);
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
      let urlToOpen = storeUrl;

      // iOS Simulator doesn't support the itms-apps:// scheme and throws "invalid address".
      // Converting itms-apps:// to https:// ensures it opens in Safari on Simulator,
      // and on physical devices Safari will automatically redirect the user to the native App Store.
      if (Platform.OS === "ios") {
        if (urlToOpen && urlToOpen.startsWith("itms-apps://")) {
          urlToOpen = urlToOpen.replace("itms-apps://", "https://");
        } else if (!urlToOpen) {
          urlToOpen = `https://apps.apple.com/in/app/kmmp-rpe-football/id${IOS_APP_ID}`;
        }
      } else {
        // Android package name link fallback
        if (urlToOpen && urlToOpen.startsWith("market://")) {
          urlToOpen = urlToOpen.replace("market://", "https://play.google.com/store/apps/");
        } else if (!urlToOpen) {
          urlToOpen = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
        }
      }

      console.log("[UpdateModal] Directing to store URL:", urlToOpen);
      await Linking.openURL(urlToOpen);
    } catch (err) {
      console.warn("[UpdateModal] Failed to open URL, trying absolute fallback:", err);
      const fallbackUrl =
        Platform.OS === "ios"
          ? `https://apps.apple.com/in/app/kmmp-rpe-football/id${IOS_APP_ID}`
          : `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
      try {
        await Linking.openURL(fallbackUrl);
      } catch (innerErr) {
        console.error("[UpdateModal] Absolute fallback also failed:", innerErr);
      }
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
            {/* Top Premium Gradient/Accent Bar */}
            <View style={styles.accentBar} />
            <TouchableOpacity style={styles.laterButton} onPress={() => setVisible(false)}>
              <Text style={styles.laterButtonText}>X</Text>
            </TouchableOpacity>
            {/* Logo / Icon Container with Glow */}
            <View style={styles.logoOuterGlow}>
              <View style={styles.iconContainer}>
                {imageIndex.appLogo ? (
                  <Image source={imageIndex.appLogo} style={styles.logo} resizeMode="contain" />
                ) : (
                  <View style={styles.fallbackLogoPlaceholder}>
                    <Text style={styles.fallbackLogoText}>⚽</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Update Available</Text>

            {/* Version Badges */}
            <View style={styles.versionBadgeContainer}>
              <View style={styles.versionBadge}>
                <Text style={styles.versionBadgeLabel}>Current</Text>
                <Text style={styles.versionBadgeValue}>v{currentVersion || "1.0.0"}</Text>
              </View>
              <Text style={styles.arrowSeparator}>➔</Text>
              <View style={[styles.versionBadge, styles.latestBadge]}>
                <Text style={styles.versionBadgeLabel}>Latest</Text>
                <Text style={[styles.versionBadgeValue, styles.latestValue]}>
                  v{latestVersion || "1.0"}
                </Text>
              </View>
            </View>

            {/* Message Description */}
            <Text style={styles.message}>
              A newer, faster, and more stable version of KMMP RPE FOOTBALL is ready for you. Update now to enjoy the latest workouts, features, and optimal performance!
            </Text>

            {/* Primary Action Button - Premium Football Theme (Orange) */}
            <TouchableOpacity
              style={[styles.updateButton, loading && styles.updateButtonDisabled]}
              onPress={openStore}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.updateButtonText}>UPDATE NOW</Text>
              )}
            </TouchableOpacity>

            {/* Secondary Action Button - Maybe Later */}

          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(8, 16, 65, 0.82)", // Premium dark Navy blue overlay with high opacity
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
    borderRadius: 30, // Beautifully rounded corners
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 20,
    overflow: "hidden",
  },
  accentBar: {
    height: 6,
    width: "100%",
    backgroundColor: "rgba(160, 216, 3, 1)", // Orange accent bar at top
    position: "absolute",
    top: 0,
  },
  logoOuterGlow: {
    marginTop: 32,
    marginBottom: 20,
    borderRadius: 28,
    padding: 3,
    backgroundColor: "rgba(254, 212, 40, 0.15)", // Subtle gold border/glow around the logo container
  },
  iconContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#081041", // Dark navy circle background
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",

  },
  logo: {
    width: 68,
    height: 68,
  },
  fallbackLogoPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackLogoText: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#081041", // Premium Dark Navy
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  versionBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  versionBadge: {
    alignItems: "center",
  },
  versionBadgeLabel: {
    fontSize: 10,
    color: "rgba(115, 125, 140, 0.8)",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  versionBadgeValue: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "800",
  },
  arrowSeparator: {
    fontSize: 14,
    color: "#A5A5A5",
    marginHorizontal: 12,
    fontWeight: "bold",
  },
  latestBadge: {
    backgroundColor: "rgba(251, 91, 43, 0.08)", // Light orange tint
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  latestValue: {
    color: "rgba(160, 216, 3, 1)", // Orange font for latest version
  },
  message: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 6,
    fontWeight: "500",
  },
  updateButton: {
    backgroundColor: "rgba(160, 216, 3, 1)", // Vibrant Orange
    width: "100%",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  laterButton: {
    marginTop: 16,
    paddingVertical: 10,
    width: "100%",
    alignItems: "flex-end",
  },
  laterButtonText: {
    fontSize: 20,
    color: "black", // Premium Muted Gray
    fontWeight: "700",
  },
});

export default UpdateModal;
