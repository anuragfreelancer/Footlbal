import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  PanResponder,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  LayoutChangeEvent,
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
import CustomHeader from "../../../compoent/CustomHeader";



// Gradient colors for each segment (10 segments for 0–10)
const SEGMENT_COLORS = [
  '#22C55E', // 0–1 green
  '#4ADE80', // 1–2 lighter green
  '#84CC16', // 2–3 lime
  '#BEF264', // 3–4 yellow-lime
  '#FACC15', // 4–5 yellow
  '#F59E0B', // 5–6 amber
  '#F97316', // 6–7 orange
  '#EF4444', // 7–8 red
  '#DC2626', // 8–9 dark red
  '#B91C1C', // 9–10 deep red
];

// Accent marker positions (as 0–10 values) to mimic the vertical colored lines
const ACCENT_POSITIONS = [
  { value: 5, color: '#F97316' },  // Orange marker at 5
  { value: 7, color: '#EF4444' },  // Red marker at 7
];

// ─── Question Slider Card ──────────────────────────────────────────────────────
interface QuestionSliderCardProps {
  questionId: string;
  title: string;
  score: number;
  text: string;
  onScoreChange: (id: string, score: number) => void;
  onTextChange: (id: string, text: string) => void;
}

const QuestionSliderCard: React.FC<QuestionSliderCardProps> = React.memo(({
  questionId,
  title,
  score,
  text,
  onScoreChange,
  onTextChange,
}) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const trackRef = useRef<View>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackX, setTrackX] = useState(0);

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setTrackWidth(width);
    // Measure absolute position for gesture handling
    trackRef.current?.measureInWindow((x) => {
      setTrackX(x);
    });
  }, []);

  const getScoreFromX = useCallback((pageX: number): number => {
    if (trackWidth === 0) return score;
    const relativeX = pageX - trackX;
    const ratio = relativeX / trackWidth;
    const rawScore = ratio * 10;
    return Math.min(10, Math.max(0, Math.round(rawScore)));
  }, [trackWidth, trackX, score]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const newScore = getScoreFromX(evt.nativeEvent.pageX);
          onScoreChange(questionId, newScore);
        },
        onPanResponderMove: (evt) => {
          const newScore = getScoreFromX(evt.nativeEvent.pageX);
          onScoreChange(questionId, newScore);
        },
      }),
    [getScoreFromX, questionId, onScoreChange]
  );

  const thumbLeft = trackWidth > 0 ? (score / 10) * trackWidth - 14 : -14;

  const getScoreColor = (val: number) => {
    if (val <= 2) return '#22C55E';
    if (val <= 4) return '#84CC16';
    if (val <= 6) return '#F59E0B';
    if (val <= 8) return '#EF4444';
    return '#DC2626';
  };

  return (
    <View style={styles.questionCard}>
      {/* Question Title */}
      <Text style={styles.questionTitle}>{title}</Text>

      {/* Score Value */}
      <Text style={[styles.scoreValue, { color: getScoreColor(score) }]}>{score}</Text>

      {/* Slider */}
      <View
        style={styles.sliderContainer}
        {...panResponder.panHandlers}
      >
        {/* Gradient Track */}
        <View
          ref={trackRef}
          style={styles.sliderTrackBase}
          onLayout={onTrackLayout}
        >
          {SEGMENT_COLORS.map((color, i) => (
            <View
              key={i}
              style={[styles.sliderSegment, { backgroundColor: color }]}
            />
          ))}
        </View>

        {/* Accent vertical markers */}
        {trackWidth > 0 && ACCENT_POSITIONS.map((marker, i) => (
          <View
            key={`marker-${i}`}
            style={[
              styles.accentMarker,
              {
                backgroundColor: marker.color,
                left: (marker.value / 10) * trackWidth - 1.5,
              },
            ]}
          />
        ))}

        {/* Thumb */}
        {trackWidth > 0 && (
          <View style={[styles.sliderThumbOuter, { left: Math.max(-4, Math.min(thumbLeft, trackWidth - 24)) }]}>
            <View style={styles.sliderThumbInner} />
          </View>
        )}
      </View>

      {/* Tick Labels: 0.0, 1.0, ... 10.0 */}
      <View style={styles.tickContainer}>
        {Array.from({ length: 11 }, (_, i) => (
          <Text key={i} style={styles.tickLabel}>
            {i.toFixed(1)}
          </Text>
        ))}
      </View>

      {/* Text Toggle */}
      <TouchableOpacity
        style={styles.textToggleBtn}
        onPress={() => setShowTextInput(!showTextInput)}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 14 }}>✎</Text>
        <Text style={styles.textToggleBtnText}>
          {showTextInput
            ? (localizationStrings?.HideComment || "Hide comment")
            : (localizationStrings?.AddComment || "Add comment")}
        </Text>
      </TouchableOpacity>

      {/* Text Input (collapsed by default) */}
      {showTextInput && (
        <TextInput
          style={styles.questionTextInput}
          placeholder={localizationStrings?.TypeHere || "Type here..."}
          placeholderTextColor="#94A3B8"
          value={text}
          onChangeText={(t) => onTextChange(questionId, t)}
          multiline
        />
      )}
    </View>
  );
});

// ─── Main SubmitRPE Screen ──────────────────────────────────────────────────────
const SubmitRPE = () => {
  useLanguage();
  const {
    isLoading,
    handleSubmit,

    showTimePicker,
    setShowTimePicker,
    setFormattedTime,
    time,
    setTime,
    modalVisible,
    setModalVisible,
    handleConfirm,
    questionnaires,
    loadingQuestionnaires,
    questionAnswers,
    setQuestionScore,
    setQuestionText,
  } = useSubmitRPE();

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
        <View style={{ marginHorizontal: 12, marginTop: 5 }}>
          <CustomHeader
            imageSource={imageIndex.backNav}
            label={"HMMP RPE"}
          />
        </View>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{ paddingBottom: 120 }}
          >

            {/* ─── Per-Question Sliders ───────────────────────────── */}
            {questionnaires.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.questionnaireSectionHeader}>
                  Détails de la séance
                </Text>
                {questionnaires.map((item) => {
                  const qId = String(item.id);
                  const qTitle = item.question_french || item.question || "Question";
                  const answer = questionAnswers[qId] || { score: 5, text: '' };
                  return (
                    <QuestionSliderCard
                      key={qId}
                      questionId={qId}
                      title={qTitle}
                      score={answer.score}
                      text={answer.text}
                      onScoreChange={setQuestionScore}
                      onTextChange={setQuestionText}
                    />
                  );
                })}
              </View>
            )}

            {/* General Comments */}

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
            title={"Submit Feedback"}
            onPress={() => handleSubmit()}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Calendar modal */}

    </SafeAreaView>
  );
};

export default SubmitRPE;
