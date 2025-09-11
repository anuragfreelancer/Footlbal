// DeleteConfirmModal.jsx
import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AccessibilityInfo,
} from 'react-native';

const DeleteConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Delete item?',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  destructive = true, // makes confirm button red if true
}) => {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      AccessibilityInfo.isScreenReaderEnabled().then((srEnabled) => {
        if (srEnabled) AccessibilityInfo.announceForAccessibility(title);
      });
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
          tension: 120,
        }),
      ]).start();
    } else {
      // reset values so animation plays next open
      opacity.setValue(0);
      scale.setValue(0.8);
    }
  }, [visible, opacity, scale, title]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
      statusBarTranslucent
      accessible
      accessibilityViewIsModal
    >
      <TouchableWithoutFeedback onPress={onCancel} accessible={false}>
        <Animated.View style={[styles.backdrop, { opacity }]} />
      </TouchableWithoutFeedback>

      <View style={styles.centered}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale }], opacity },
          ]}
          accessible
          accessibilityRole="alert"
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel={cancelText}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmBtn,
                destructive ? styles.confirmDestructive : styles.confirmPrimary,
                loading && styles.disabled,
              ]}
              onPress={onConfirm}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel={confirmText}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.confirmText}>{confirmText}</Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  header: {
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  message: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F2F3F5',
    marginRight: 10,
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 15,
  },
  confirmBtn: {
    paddingHorizontal: 14,
  },
  confirmPrimary: {
    backgroundColor: '#2B7DF5',
  },
  confirmDestructive: {
    backgroundColor: '#E53935',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  disabled: {
    opacity: 0.7,
  },
});

export default DeleteConfirmModal;
