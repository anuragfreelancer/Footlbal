import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, LayoutAnimation, UIManager, Platform, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native';
import CustomHeader from '../../../compoent/CustomHeader';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../../compoent/CustomButton';
import { EndRpfFrom } from '../../../redux/Api/AuthApi';
import { useSelector } from 'react-redux';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from "@react-native-community/datetimepicker";
import LoadingModal from '../../../utils/Loader';
import localizationStrings from '../../../compoent/Localization/Localization';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true); // for animation on Android
}

const TrainingFedBack = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const route: any = useRoute();
  const [date, setDate] = useState("");
  const [time, setTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formattedTime, setFormattedTime] = useState(localizationStrings.SelectTime);
  const [sumitLoder, setSumitLoder] = useState(false);

  const { item } = route.params || "";

  const onChangeTime = (event, selectedTime) => {
    if (Platform.OS !== "ios") setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      const formatted = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setFormattedTime(formatted);
    }
  };


  const getTrainingData = async () => {
    try {
      const response = await axios.get('https://server-php-8-3.technorizen.com/Football/api/get_training?type=after_training');
      if (response.data.status === "1") {
        setTrainingData(response.data.result);
      }
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  const handlePress = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItemId(prevId => (prevId === id ? null : id));
  };
  const navgation = useNavigation()
  const handleSubmit = async () => {
    // Check if date and time are selected
    if (!date || date === localizationStrings.SelectDate) {
      Alert.alert(localizationStrings.Validation, localizationStrings.PleaseSelectDate);
      return;
    }
    if (formattedTime === localizationStrings.SelectTime || !formattedTime) {
      Alert.alert(localizationStrings.Validation, localizationStrings.PleaseSelectTime);
      return;
    }

    try {
      const params = {
        userId: item?.id,
        date: date,
        time: formattedTime,
        navgation: navgation

      };

      const response = await EndRpfFrom(params, setSumitLoder);
      if (response) {
        Alert.alert(localizationStrings.Success || "Success", localizationStrings.SubmittedSuccess);
      }
    } catch (error) {
      console.error("API Call Failed:", error);
      Alert.alert(localizationStrings.Error || "Error", localizationStrings.SomethingWentWrongTryAgain);
    }
  };


  const renderItem = ({ item }) => {
    const isExpanded = expandedItemId === item.id;
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)} activeOpacity={0.7}>
          <Text style={styles.title}>{item.type}</Text>
          <Image
            source={imageIndex.arroRight}
            style={[
              styles.arrowIcon,
              { transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] },
            ]}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedSection}>
            <Text style={styles.datetime}>{item.training_title}</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="##A0D803" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <StatusBarComponent />
      <View style={{
        marginTop: 30
      }}>
        <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings.Session} />
      </View>
      {sumitLoder ? <LoadingModal /> : null}
      <ScrollView>
        <View style={styles.card1}>
          <TouchableOpacity style={styles.row}  >
            <View>
              <Text style={styles.boldText}>Date - {item?.rpf_date}</Text>
              <Text style={styles.lightText}>{item.rpf_session}</Text>
            </View>
            <View style={styles.scoreSection}>
              <Text style={styles.boldText}>RPE Score</Text>
              <Text style={styles.scoreText}>{item.rate_efforts}</Text>
            </View>
            <View style={styles.scoreSection}>
              <Image
                source={item.rate_efforts > 6 ? imageIndex.greenGrap : imageIndex.redGrap}
                style={{ height: 24, width: 24 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 29 }}>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowCalendar(true)}
            activeOpacity={0.7}
          >
            <Text>Date - {date}</Text>
            <Image
              source={imageIndex.calender}
              style={{ height: 22, width: 22 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowTimePicker(true)}
            activeOpacity={0.7}
          >
            <Text>Time - {formattedTime}</Text>
            <Image
              source={imageIndex.clocks}
              style={{ height: 22, width: 22 }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={trainingData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 18 }}
        />
      </ScrollView>
      <View style={{
        marginBottom: 20,
        marginHorizontal: 15
      }}>
        <CustomButton title={localizationStrings.EndSession} onPress={() => { handleSubmit() }} />
      </View>
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                setDate(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{}} // Ensure no date is selected
              renderArrow={(direction) => (
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                  <Image
                    source={direction === "left" ? imageIndex.circleBak : imageIndex.circleleft}
                    style={{ height: 22, width: 22 }}
                  />
                </View>
              )}
              theme={{
                textMonthFontSize: 20,
                textMonthFontWeight: "bold",
                monthTextColor: "#000",
                arrowStyle: { alignSelf: "center" }, // Center arrows
              }}
              hideExtraDays={true}
              hideDayNames={true}
              renderHeader={(date) => {
                const monthName = date.toString('MMMM'); // Get only month name
                return <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>{monthName}</Text>;
              }}
            />
          </View>
        </View>
      </Modal>

      {showTimePicker && (
        <DateTimePicker
          value={time} // ✅ time is a Date object now
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeTime}
        />
      )}

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  card1: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "column",
    marginHorizontal: 15,
    marginTop: 20
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  calendarContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 320 },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: "#A8EB12", borderRadius: 25, alignItems: "center" },
  closeButtonText: { fontSize: 14, fontWeight: "bold", color: "white" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  lightText: {
    fontSize: 12,
    color: "gray",
  },
  scoreSection: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flexDirection: "row"
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  arrowIcon: {
    height: 16,
    width: 16,
    tintColor: '#2c3e50',
  },
  datePicker: { borderColor: "#0000000D", padding: 10, borderWidth: 1, flexDirection: "row", borderRadius: 5, marginTop: 15, backgroundColor: "#f9f9f9", justifyContent: "space-between" },

  expandedSection: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  datetime: {
    fontSize: 14,
    color: 'balck',
    fontWeight: "500"
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrainingFedBack;
