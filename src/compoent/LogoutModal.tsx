import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import imageIndex from "../assets/imageIndex";

const LogoutModal = ({isVisible,close,onSumbit}:any) => {
 
  return (
    <View style={styles.container}>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onRequestClose={close}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity onPress={close} style={styles.closeButton}>
 
              <Image source={imageIndex.closeImg} style={{ height: 30, width: 30 }} />

            </TouchableOpacity>

             <Text style={styles.title}>Log Out?</Text>
            <Text style={styles.subtitle}>Are you sure you want to log out?</Text>

             <TouchableOpacity style={styles.logoutButton} onPress={onSumbit}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  openButton: {
    backgroundColor: "#EAB308",
    padding: 10,
    borderRadius: 10,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 28,
    width: 300,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#FF3B30",
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
     color:"rgba(0, 0, 0, 1)",
    lineHeight:36,
   },
  subtitle: {
    fontSize: 16,
    color: "rgba(157, 178, 191, 1)",
    marginBottom: 20,
    lineHeight:24,
    marginTop:8
  },
  logoutButton: {
    backgroundColor: "#A0D803",
    paddingVertical: 12,
    paddingHorizontal: 55,
    borderRadius: 10,
    marginBottom:30,
    marginTop:16
  },
  logoutText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 13,
    fontWeight:"600",
    lineHeight:18
  },
});

export default LogoutModal;
