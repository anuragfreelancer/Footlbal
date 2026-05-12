import React from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Pressable, Dimensions } from "react-native";
import EmptyListComponent from "./EmptyListComponent";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const { height } = Dimensions.get('window');

interface DropdownModalProps {
  visible: boolean;
  options: any[];
  onClose: () => void;
  onSelect: (item: any) => void;
}

const DropdownModal: React.FC<DropdownModalProps> = ({ visible, options, onClose, onSelect }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.handle} />
          
          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={options}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<EmptyListComponent message="Not Found Data" />}
              contentContainerStyle={{ paddingBottom: hp(2) }}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  style={styles.option}
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={styles.optionText}>
                    {item?.team_name || item?.name || item?.position_name || item?.load_type || item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.8}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.75)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    paddingHorizontal: wp(6),
    paddingBottom: hp(4),
    maxHeight: height * 0.8, // Fix for large data
  },
  handle: {
    width: wp(12),
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: hp(1.5),
  },
  listContainer: {
    maxHeight: height * 0.6, // Ensure list is scrollable
  },
  option: {
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: hp(1.8),
    color: "#0F172A",
    fontWeight: "700",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  closeButton: {
    marginTop: hp(2),
    paddingVertical: hp(2),
    backgroundColor: "#A0D803",
    borderRadius: wp(5),
    alignItems: "center",
    shadowColor: "#A0D803",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "800",
    fontSize: hp(2),
  },
});

export default DropdownModal;
