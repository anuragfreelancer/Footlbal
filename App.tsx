import React, { FunctionComponent, useEffect } from 'react';
import { LogBox, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigators/AppNavigator';
import FirebaseMessagingService from './src/services/FirebaseMessagingService';
import {
  useStallionUpdate,
  restart,
  withStallion,
  useStallionModal,
} from 'react-native-stallion';

LogBox.ignoreAllLogs();

const App: FunctionComponent<any> = () => {
  const { isRestartRequired } = useStallionUpdate();
  const { showModal } = useStallionModal();

  useEffect(() => {
    const unsubscribe = FirebaseMessagingService.initialize();
    FirebaseMessagingService.requestPermission();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />

      {/* <TouchableOpacity 
        style={styles.floatingQA} 
        onPress={showModal} 
        activeOpacity={0.8}
      >
        <Text style={styles.floatingQAText}>⚙️ Stallion</Text>
      </TouchableOpacity>

       <Modal
        visible={isRestartRequired}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconEmoji}>🚀</Text>
            </View>
            <Text style={styles.title}>Update Available!</Text>
            <Text style={styles.message}>
              A new update has been downloaded and is ready to install. Restart your app now to enjoy the latest features.
            </Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => restart()} 
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Restart App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  floatingQA: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 9999,
  },
  floatingQAText: {
    color: '#A0D803',
    fontWeight: '700',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(160, 216, 3, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#A0D803',
    width: '100%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A0D803',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default withStallion(App);
