import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VersionCheck from "react-native-version-check";

const IOS_APP_STORE_URL =
  "https://apps.apple.com/in/app/kmmp-rpe-football/id6748689173";
const IOS_APP_ID = "6748689173";

const UpdateModal = () => {
  const [visible, setVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState(IOS_APP_STORE_URL);
  const [loading, setLoading] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const [latestVersion, setLatestVersion] = useState("");

  const isMounted = useRef(true);

  const checkAppVersion = useCallback(async () => {
    try {
      if (Platform.OS !== "ios") return;

      const current = VersionCheck.getCurrentVersion();

      if (isMounted.current) {
        setCurrentVersion(current);
      }

      const updateInfo = await VersionCheck.needUpdate({
        provider: "appStore",
        appID: IOS_APP_ID,
        country: "in",
      });



      if (updateInfo?.isNeeded && isMounted.current) {
        setLatestVersion(updateInfo.latestVersion || "");
        setStoreUrl(updateInfo.storeUrl || IOS_APP_STORE_URL);
        setVisible(true);
      }
    } catch (error: any) {
      console.warn(
        "[UpdateModal] Version check failed:",
        error?.message || error
      );
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;

    const timer = setTimeout(() => {
      checkAppVersion();
    }, 1500);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, [checkAppVersion]);

  const openAppStore = async () => {
    if (loading) return;

    setLoading(true);

    const primaryUrl = `itms-apps://apps.apple.com/in/app/id${IOS_APP_ID}`;
    const fallbackUrl = storeUrl || IOS_APP_STORE_URL;

    try {
      await Linking.openURL(primaryUrl);
    } catch (primaryError) {
      try {
        await Linking.openURL(fallbackUrl);
      } catch (fallbackError: any) {
        console.warn(
          "[UpdateModal] Failed to open App Store:",
          fallbackError?.message || fallbackError
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  if (Platform.OS !== "ios") return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Update Available</Text>

            {!!latestVersion && (
              <Text style={styles.versionText}>
                Version {latestVersion} is now available
                {!!currentVersion ? ` (you have ${currentVersion})` : ""}
              </Text>
            )}

            <Text style={styles.message}>
              A new version of the app is available. Please update for the best
              experience.
            </Text>

            <TouchableOpacity
              style={[
                styles.updateButton,
                loading && styles.updateButtonDisabled,
              ]}
              onPress={openAppStore}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.updateButtonText}>Update on App Store</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.laterButton} onPress={closeModal}>
              <Text style={styles.laterButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "red",
    fontWeight: "700",
  },
  appIconWrapper: {
    marginTop: 18,
    marginBottom: 16,
  },
  appIconBg: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  appIconEmoji: {
    fontSize: 34,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  versionText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 22,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    minHeight: 52,
  },
  updateButtonDisabled: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  laterButton: {
    marginTop: 14,
    paddingVertical: 8,
  },
  laterButtonText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
});