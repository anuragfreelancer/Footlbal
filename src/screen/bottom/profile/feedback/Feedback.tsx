import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import useFeedback from "./useFeedback";
import LoadingModal from "../../../../utils/Loader";

const Feedback = () => {
  const {
    isLoading,
    navigation,
    feedbackText,
    setfeedbackText,
    SendFeedback,
    errorMessage,
  } = useFeedback();

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <CustomHeader
        imageSource={imageIndex.backNav}
        label="Send your feedback"
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Tell us what you think</Text>
          <Text style={styles.subheading}>
            Help us improve by sharing your experience.
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Write your feedback here..."
              placeholderTextColor="#aaa"
              style={styles.textInput}
              multiline
              numberOfLines={6}
              value={feedbackText}
              onChangeText={setfeedbackText}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CustomButton title="Submit" onPress={SendFeedback} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop:28
  },
  subheading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop:15
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    minHeight: 120,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#f9f9f9",
  },
});

export default Feedback;
