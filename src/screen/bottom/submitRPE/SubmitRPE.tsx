import React, { useEffect, useState } from "react";
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
  LayoutAnimation,
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
import styles from "./style";

const SubmitRPE = () => {
  const {
    isLoading,
    setisLoading,
    isLogin,
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
    setErrors,
    showTimePicker,
    setShowTimePicker,
    formattedTime,
    setFormattedTime,
    time,
    setTime,
    onChangeTime,
    modalVisible,
    setModalVisible,
    handleConfirm,
  } = useSubmitRPE();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newEffort = Math.min(10, Math.max(1, Math.round(gesture.moveX / 30)));
      setEffort(newEffort);
      pan.setValue(newEffort * 30);
    },
  });

  const [expandedItemId, setExpandedItemId] = useState(null);
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Dropdown state
  const [showQuestionnaireDropdown, setShowQuestionnaireDropdown] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<any>(null);

  const fetchQuestionnaires = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://kmmps.store/api/get_training?type=before_training");
      const json = await res.json();
      if (json?.result) {
        setQuestionnaires(json.result);
      }
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const handlePress = (id: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItemId(prevId => (prevId === id ? null : id));
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#A0D803" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading && <LoadingModal />}
      <View style={styles.container}>
        <Text style={styles.header}>{localizationStrings?.SubmitRPE}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Session Selection */}
          <Text style={styles.label}>{localizationStrings?.SelectSession}:</Text>
          <View style={styles.radioGroup}>
            {["Training", "Match"].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setSession(item)}
                style={styles.radioItem}
                activeOpacity={0.7}
              >
                <Image
                  source={session === item ? imageIndex.radioSlied : imageIndex.radio}
                  style={styles.radioIcon}
                  resizeMode="contain"
                  tintColor={"#A0D803"}
                />
                <Text style={styles.radioText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.session && <Text style={{ color: "red", marginTop: 10 }}>{errors.session}</Text>}

          {/* Date & Time */}
          <Text style={styles.label}>{localizationStrings?.Daterequired}:</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setShowCalendar(true)}
              activeOpacity={0.7}
            >
              <Text>{date || localizationStrings.SelectTime}</Text>
              <Image source={imageIndex.calender} style={{ height: 22, width: 22, marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}
            >
              <Text>Time - {formattedTime}</Text>
              <Image source={imageIndex.clocks} style={{ height: 22, width: 22, marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
          {errors?.date && <Text style={{ color: "red", marginTop: 10 }}>{errors?.date}</Text>}

          {/* Calendar Modal */}
          <Modal visible={showCalendar} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={day => {
                    setDate(day.dateString);
                    setShowCalendar(false);
                  }}
                  hideExtraDays={true}
                  hideDayNames={true}
                  renderArrow={direction => (
                    <Image
                      source={direction === "left" ? imageIndex.circleBak : imageIndex.circleleft}
                      style={{ height: 22, width: 22 }}
                    />
                  )}
                  theme={{
                    textMonthFontSize: 20,
                    textMonthFontWeight: "bold",
                    monthTextColor: "#000",
                    arrowStyle: { alignSelf: "center" },
                  }}
                />
              </View>
            </View>
          </Modal>

          {/* Effort Slider */}
          <View
            style={{
              width: "92%",
              height: 8,
              backgroundColor: "#D3D3D3",
              borderRadius: 4,
              marginVertical: 20,
              marginLeft: 5,
              marginTop: 20,
            }}
          >
            <Animated.View
              style={[
                {
                  height: 8,
                  borderRadius: 4,
                  position: "absolute",
                  left: 0,
                  backgroundColor: getEffortColor(effort),
                },
                { width: pan },
              ]}
            />
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                {
                  width: 18,
                  height: 18,
                  borderRadius: 10,
                  backgroundColor: "#000",
                  position: "absolute",
                  top: -6,
                },
                { left: pan },
              ]}
            />
          </View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "black" }}>
            Effort : {effort}
          </Text>
          {errors.effort && <Text style={{ color: "red" }}>{errors.effort}</Text>}

          {/* Comments */}
          <Text style={[styles.label, { marginTop: 20 }]}>{localizationStrings?.AddComments}</Text>
          <View
            style={{
              backgroundColor: "#F3F3F3",
              borderRadius: 20,
              padding: 10,
              marginTop: 20,
              height: 160,
            }}
          >
            <TextInput
              placeholder="Type here..."
              placeholderTextColor={"#888585"}
              value={comments}
              onChangeText={setComments}
              multiline
              style={{ fontSize: 14, color: "black" }}
            />
          </View>
          {errors.comments && <Text style={{ color: "red", marginTop: 10 }}>{errors.comments}</Text>}

          {/* Questionnaire Dropdown */}
          <Text style={[styles.label, { marginTop: 20 }]}>{localizationStrings?.TrainingSession}</Text>
          <TouchableOpacity
            style={[
              styles.datePicker,
              { flexDirection: "row", height:60, justifyContent: "space-between", alignItems: "center" },
            ]}
            onPress={() => setShowQuestionnaireDropdown(prev => !prev)}
          >
            <Text>
              {selectedQuestionnaire
                ? questionnaires.find(q => q.id === selectedQuestionnaire)?.training_title
                : localizationStrings?.SelectSession}
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

          {showQuestionnaireDropdown && (
            <View
              style={{
                maxHeight: 200,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                marginTop: 5,
                backgroundColor: "white",
               }}
            >
              <ScrollView>
                {questionnaires.map(item => (
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
          )}
        </ScrollView>

        {/* Submit Button */}


        {/* Time Picker & Attendance Modals */}
        <TimePickerModal
          time={time}
          setTime={t => {
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
          <CustomButton title={localizationStrings.Submit} onPress={() => handleSubmit()} />
        </View>
    </SafeAreaView>
  );
};

export default SubmitRPE;
