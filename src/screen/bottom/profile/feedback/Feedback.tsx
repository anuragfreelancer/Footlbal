import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../../compoent/CustomHeader";
import CustomButton from "../../../../compoent/CustomButton";
import useFeedback from "./useFeedback";
import LoadingModal from "../../../../utils/Loader";
import { Text } from "react-native";

const Feedback = () => {
  const {
   
  
  
    isLoading,
    navigation,
     feedbackText, setfeedbackText ,
     SendFeedback ,
     errorMessage, setErrorMessage
  } = useFeedback()
  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? <LoadingModal /> : null}

      <StatusBarComponent />
      <View style={styles.headerContainer}>
        <CustomHeader imageSource={imageIndex.backNav} label="Send your feedback" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your feedback here..."
            style={styles.textInput}
            multiline
            numberOfLines={5} 
            value={feedbackText}
            onChangeText={setfeedbackText}
          />
        </View> 
        <Text style ={{color:"red",marginTop:10}}>{errorMessage}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={'Submit'}
          onPress={SendFeedback}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#9796A1",
    height: 120
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    textAlignVertical: 'top',
    marginLeft: 10,
    marginTop: 4
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default Feedback;
