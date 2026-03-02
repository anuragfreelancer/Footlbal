import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../compoent/CustomButton";
import useSubmitRPE from "./useSubmitRPE";
import LoadingModal from "../../../utils/Loader";
import TimePickerModal from "../../../compoent/TimePickerModal";
import AddAttendanceModal from "../../../compoent/AddAttendanceModal";
import localizationStrings from "../../../compoent/Localization/Localization";
import { useLanguage } from "../../../compoent/Localization/LanguageContext";
import styles from "./style";

const SESSION_OPTIONS = [
  { key: "Training", labelKey: "SessionTraining" },
  { key: "Match", labelKey: "SessionMatch" },
] as const;

const SubmitRPE = () => {
  useLanguage();
  const {
    isLoading,
    handleSubmit,
    getEffortColor,
    session,
    setSession,
    date,
    setDate,
    comments,
    setComments,
    showCalendar,
    setShowCalendar,
    effort,
    setEffort,
    pan,
    errors,
    showTimePicker,
    setShowTimePicker,
    formattedTime,
    setFormattedTime,
    time,
    setTime,
    modalVisible,
    setModalVisible,
    handleConfirm,
    questionnaires,
    loadingQuestionnaires,
    SLIDER_WIDTH,
    THUMB_STEP,
  } = useSubmitRPE();

  const [showQuestionnaireDropdown, setShowQuestionnaireDropdown] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<number | null>(null);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
          const newEffort = Math.min(10, Math.max(1, Math.round(gesture.moveX / THUMB_STEP)));
          setEffort(newEffort);
        },
      }),
    [THUMB_STEP, setEffort]
  );

  if (loadingQuestionnaires) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#A0D803" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} edges={["top"]}>
      {isLoading && <LoadingModal />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <View style={styles.container}>
          <Text style={styles.header}>{localizationStrings?.SubmitRPE}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
          {/* Session type */}
          <View style={styles.section}>
            <Text style={styles.label}>{localizationStrings?.SelectSession}</Text>
            <View style={styles.radioGroup}>
              {SESSION_OPTIONS.map(({ key, labelKey }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSession(key)}
                  style={styles.radioItem}
                  activeOpacity={0.7}
                >
                  <Image
                    source={session === key ? imageIndex.radioSlied : imageIndex.radio}
                    style={styles.radioIcon}
                    resizeMode="contain"
                    tintColor="#A0D803"
                  />
                  <Text style={styles.radioText}>{localizationStrings[labelKey] ?? key}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.session ? <Text style={styles.errorText}>{errors.session}</Text> : null}
          </View>

          {/* Date & time */}
          <View style={styles.section}>
            <Text style={styles.label}>{localizationStrings?.DateAndTime || "Date & Time"}</Text>
            <View style={styles.dateTimeRow}>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowCalendar(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.datePickerText} numberOfLines={1}>
                  {date || (localizationStrings?.SelectDate ?? "Select Date")}
                </Text>
                <Image source={imageIndex.calender} style={{ height: 22, width: 22, marginLeft: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowTimePicker(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.datePickerText} numberOfLines={1}>
                  {formattedTime}
                </Text>
                <Image source={imageIndex.clocks} style={{ height: 22, width: 22, marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
            {errors?.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
          </View>

          {/* Effort slider */}
          <View style={styles.section}>
            <Text style={styles.label}>{localizationStrings?.EffortLabel}</Text>
            <View style={[styles.sliderTrack, { width: SLIDER_WIDTH }]}>
              <Animated.View
                style={[
                  styles.sliderFill,
                  {
                    width: pan,
                    backgroundColor: getEffortColor(effort),
                  },
                ]}
              />
              <Animated.View
                {...panResponder.panHandlers}
                style={[
                  styles.sliderThumb,
                  {
                    left: Animated.subtract(pan, 16),
                  },
                ]}
              >
                <Text style={styles.sliderThumbText}>{effort}</Text>
              </Animated.View>
            </View>
            <Text style={styles.effortLabel}>
              {localizationStrings?.EffortLabel}: {effort}/10
            </Text>
            {errors.effort ? <Text style={styles.errorText}>{errors.effort}</Text> : null}
          </View>

          {/* Comments */}
          <View style={styles.section}>
            <Text style={styles.label}>{localizationStrings?.AddComments}</Text>
            <TextInput
              placeholder={localizationStrings?.TypeHere}
              placeholderTextColor="#94A3B8"
              value={comments}
              onChangeText={setComments}
              multiline
              style={[styles.commentsInput, styles.commentsInputText]}
            />
            {errors.comments ? <Text style={styles.errorText}>{errors.comments}</Text> : null}
          </View>

          {/* Questionnaire */}
          <View style={styles.section}>
            <Text style={styles.label}>{localizationStrings?.TrainingSession}</Text>
            <TouchableOpacity
              style={[styles.datePicker, styles.dropdownTrigger]}
              onPress={() => setShowQuestionnaireDropdown((prev) => !prev)}
            >
              <Text style={styles.datePickerText} numberOfLines={1}>
                {selectedQuestionnaire != null
                  ? questionnaires.find((q) => q.id === selectedQuestionnaire)?.training_title ??
                    localizationStrings?.Select
                  : localizationStrings?.Select}
              </Text>
              <Image
                source={imageIndex.arroRight}
                style={{
                  width: 16,
                  height: 16,
                  transform: [{ rotate: showQuestionnaireDropdown ? "90deg" : "0deg" }],
                }}
              />
            </TouchableOpacity>
            {showQuestionnaireDropdown && questionnaires.length > 0 ? (
              <View style={styles.dropdown}>
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                  {questionnaires.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedQuestionnaire(item.id);
                        setShowQuestionnaireDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{item.training_title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>
        </ScrollView>

        <TimePickerModal
          time={time}
          setTime={(t: Date) => {
            setTime(t);
            setFormattedTime(t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
          }}
          visible={showTimePicker}
          onClose={() => setShowTimePicker(false)}
        />
        <AddAttendanceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirm}
        />
      </View>

      <View style={styles.buttView}>
        <CustomButton
          title={localizationStrings.Submit}
          onPress={() => handleSubmit(selectedQuestionnaire)}
        />
      </View>
      </KeyboardAvoidingView>

      {/* Calendar modal */}
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                setDate(day.dateString);
                setShowCalendar(false);
              }}
              hideExtraDays
              hideDayNames
              renderArrow={(direction) => (
                <Image
                  source={direction === "left" ? imageIndex.circleBak : imageIndex.translatingcircleleft}
                  style={{ height: 22, width: 22 }}
                />
              )}
              theme={{
                textMonthFontSize: 20,
                textMonthFontWeight: "bold",
                monthTextColor: "#0f172a",
                arrowStyle: { alignSelf: "center" },
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>{localizationStrings?.Close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubmitRPE;
