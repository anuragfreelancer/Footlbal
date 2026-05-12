import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useSelector } from 'react-redux';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import imageIndex from '../../../../assets/imageIndex';
import localizationStrings from '../../../../compoent/Localization/Localization';
import { AddQuestionApi } from '../../../../redux/Api/AuthApi';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';
import styles from './style';
import { errorToast } from '../../../../utils/customToast';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddQuestion = ({ navigation, route }: any) => {
  useLanguage();
  const isLogin = useSelector((state: any) => state?.auth);
  const coachId = isLogin?.userData?.coach_id || isLogin?.userData?.id;

  const [questionText, setQuestionText] = useState('');
  const [selectionType, setSelectionType] = useState('before'); // 'before' or 'after'
  const [loading, setLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scrollX, {
      toValue: selectionType === 'before' ? 0 : 1,
      useNativeDriver: false,
      tension: 60,
      friction: 12,
    }).start();
  }, [selectionType]);

  const onSegmentPress = (type: string) => {
    setSelectionType(type);
    ReactNativeHapticFeedback.trigger("impactLight");
  };

  const sliderWidth = (containerWidth - 8) / 2;
  const translateX = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sliderWidth],
  });

  const handleAddQuestion = async () => {
    if (!questionText.trim()) {
      errorToast(localizationStrings.PleaseEnterQuestion || "Please enter a question.")

      return;
    }

    if (!coachId) {
      errorToast(localizationStrings.Error || localizationStrings.SomethingWentWrong)

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
        if (route.params?.onSuccess) {
          route.params.onSuccess();
        }
        navigation.goBack();
      } else {
        errorToast(response?.message || localizationStrings.SomethingWentWrong)
      }
    } catch (error) {
      errorToast(localizationStrings.Error || localizationStrings.SomethingWentWrong)

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
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
              <View
                style={styles.segmentControlContainer}
                onLayout={(e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width)}
              >
                <Animated.View
                  style={[
                    styles.segmentSlider,
                    {
                      width: sliderWidth,
                      transform: [{ translateX }]
                    }
                  ]}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.segmentItem}
                  onPress={() => onSegmentPress('before')}
                >
                  <Text style={[styles.segmentTxt, selectionType === 'before' && styles.segmentTxtActive]}>
                    {localizationStrings.BeforeSessionHeader || "Before Session"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.segmentItem}
                  onPress={() => onSegmentPress('after')}
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
    </SafeAreaView>
  );
};

export default AddQuestion;
