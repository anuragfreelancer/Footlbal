import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Platform } from "react-native";
import imageIndex from "../assets/imageIndex";
import localizationStrings from "./Localization/Localization";
import { useLanguage } from "./Localization/LanguageContext";

const LogoutModal = ({ isVisible, close, onSumbit }: any) => {
  useLanguage();
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={close}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={close}
        />
        <View style={styles.modalContent}>
          <View style={styles.iconContainerMain}>
            <View style={styles.iconCircle}>
              <Image
                source={imageIndex.logut}
                style={{ height: 32, width: 32, tintColor: '#A0D803' }}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{localizationStrings?.LogOut}?</Text>
            <Text style={styles.subtitle}>{localizationStrings.sure}?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={close} activeOpacity={0.7}>
              <Text style={styles.cancelText}>{localizationStrings.No}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={onSumbit} activeOpacity={0.8}>
              <Text style={styles.logoutText}>{localizationStrings?.Logout}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Darker for more focus
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 32,
    width: "85%",
    maxWidth: 340,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 25,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  iconContainerMain: {
    marginTop: -10,
    marginBottom: 20,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(160, 216, 3, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(160, 216, 3, 0.2)',
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    gap: 12,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "#A0D803",
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: "#A0D803",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  cancelButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelText: {
    color: "#1C1C1E",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default LogoutModal;



