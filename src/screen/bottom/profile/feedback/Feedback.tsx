import React from "react";
import {
  View,
  ScrollView,
   TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import useFeedback from "./useFeedback";
import LoadingModal from "../../../../utils/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import localizationStrings from "../../../../compoent/Localization/Localization";
import { useLanguage } from "../../../../compoent/Localization/LanguageContext";

const Feedback = () => {
  useLanguage();
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
      {isLoading && <LoadingModal />}
      <StatusBarComponent />

      <CustomHeader
        imageSource={imageIndex.backNav}
        label="Send Feedback"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>{localizationStrings?.Wed}</Text>
            <Text style={styles.subtitle}>
             {localizationStrings?.let}
            </Text>

            <View style={styles.inputBox}>
              <TextInput
                placeholder={localizationStrings?.Writeyour}
                placeholderTextColor="#999"
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
        </TouchableWithoutFeedback>

        <View style={styles.buttonWrapper}>
          <CustomButton title={localizationStrings?.sumit} onPress={SendFeedback} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
  },
  inputBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    minHeight: 120,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 8,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
  },
});

export default Feedback;
