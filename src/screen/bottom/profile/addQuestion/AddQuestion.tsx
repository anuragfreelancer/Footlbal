import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import imageIndex from '../../../../assets/imageIndex';
import localizationStrings from '../../../../compoent/Localization/Localization';
import { AddQuestionApi } from '../../../../redux/Api/AuthApi';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';
import styles from './style';

const AddQuestion = ({ navigation, route }: any) => {
  useLanguage();
  const isLogin = useSelector((state: any) => state?.auth);
  const coachId = isLogin?.userData?.coach_id || isLogin?.userData?.id;

  const [questionText, setQuestionText] = useState('');
  const [selectionType, setSelectionType] = useState('before'); // 'before' or 'after'
  const [loading, setLoading] = useState(false);

  const handleAddQuestion = async () => {
    if (!questionText.trim()) {
      Alert.alert(localizationStrings.Validation || "Validation", localizationStrings.PleaseEnterQuestion || "Please enter a question.");
      return;
    }

    if (!coachId) {
      Alert.alert(localizationStrings.Error, localizationStrings.SomethingWentWrong);
      return;
    }

    try {
      setLoading(true);
      const params = {
        coach_id: route.params?.coachId,
        session_id: '0',
        question: questionText.trim(),
        question_type: selectionType === 'before' ? 'before_training' : 'after_training'
      };

      const response = await AddQuestionApi(params, setLoading);
      if (response && response.status === '1') {
        Alert.alert(
          localizationStrings.Success || "Success",
          localizationStrings.QuestionAddedSuccess || "Question added successfully!",
          [
            {
              text: localizationStrings.Ok || "OK",
              onPress: () => {
                if (route.params?.onSuccess) {
                  route.params.onSuccess();
                }
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert(localizationStrings.Error, response?.message || localizationStrings.SomethingWentWrong);
      }
    } catch (error) {
      console.error('Error adding custom question:', error);
      Alert.alert(localizationStrings.Error, localizationStrings.SomethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <StatusBarComponent />
      <CustomHeader
        imageSource={imageIndex.backNavs}
        label={localizationStrings.AddNewQuestion || "Add New Question"}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Step 1: Select Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.inputLabel}>{localizationStrings.SelectSection || "Select Section"}</Text>
              <View style={styles.segmentControl}>
                <TouchableOpacity
                  style={[styles.segmentItem, selectionType === 'before' && styles.segmentActive]}
                  onPress={() => setSelectionType('before')}
                >
                  <Text style={[styles.segmentTxt, selectionType === 'before' && styles.segmentTxtActive]}>
                    {localizationStrings.BeforeSessionHeader || "Before Session"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.segmentItem, selectionType === 'after' && styles.segmentActive]}
                  onPress={() => setSelectionType('after')}
                >
                  <Text style={[styles.segmentTxt, selectionType === 'after' && styles.segmentTxtActive]}>
                    {localizationStrings.AfterSessionHeader || "After Session"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Step 2: Question Input */}
            <View style={styles.sectionCard}>
              <Text style={styles.inputLabel}>{localizationStrings.QuestionTextLabel || "Question Text"}</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder={localizationStrings.ExHowHeavy || "Exemple : À quel point tes jambes étaient-elles lourdes aujourd'hui ?"}
                  placeholderTextColor="#94A3B8"
                  multiline
                  value={questionText}
                  onChangeText={setQuestionText}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitBtn, (!questionText.trim() || loading) && styles.submitBtnDisabled]}
          onPress={handleAddQuestion}
          disabled={!questionText.trim() || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitBtnTxt}>{localizationStrings.AddQuestion || "Add Question"}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddQuestion;
