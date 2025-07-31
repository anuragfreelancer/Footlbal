import React, { useEffect, useState } from "react";
import { View, Text, FlatList, LayoutAnimation, TextInput, TouchableOpacity, Image, Modal,   ScrollView, Animated, PanResponder, ActivityIndicator, Platform } from "react-native";
import { Calendar } from "react-native-calendars";
import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../compoent/CustomButton";
import styles from "./style";
import useSubmitRPE from "./useSubmitRPE";
import LoadingModal from "../../../utils/Loader";
import axios from "axios";
 import { SafeAreaView } from "react-native-safe-area-context";
import TimePickerModal from "../../../compoent/TimePickerModal";
import AddAttendanceModal from "../../../compoent/AddAttendanceModal";
import localizationStrings from "../../../compoent/Localization/Localization";

const SubmitRPE = () => {
    const {
        isLoading, setisLoading,
 
        isLogin,
        handleSubmit,
        getEffortColor,
        session, setSession,
        date, setDate,
        comments, setComments,
        showCalendar, setShowCalendar,
        effort, setEffort,
        pan,
        errors, setErrors,
        showTimePicker, setShowTimePicker,
        formattedTime, setFormattedTime,
        time, setTime,
        onChangeTime ,
        modalVisible, setModalVisible ,
        handleConfirm
    } = useSubmitRPE()

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            let newEffort = Math.min(10, Math.max(1, Math.round(gesture.moveX / 30)));
            setEffort(newEffort);
            pan.setValue(newEffort * 30);
        },
    });
    const [trainingData, setTrainingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedItemId, setExpandedItemId] = useState(null);

    const getTrainingData = async () => {
        try {
            const response = await axios.get('https://server-php-8-3.technorizen.com/Football/api/get_training?type=before_training');
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
    const handlePress = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedItemId(prevId => (prevId === id ? null : id));
    };
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
            {isLoading ? <LoadingModal /> : null}

            <View style={styles.container}>
                <Text style={styles.header}>{localizationStrings?.SubmitRPE}</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.label}>{localizationStrings?.SelectSession}:</Text>
                    <View style={styles.radioGroup}>
                        {["Training", "Match"].map((item) => (
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
                                <Text style={styles.radioText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {errors.session && <Text style={{ color: "red", marginTop: 10, }}>{errors.session}</Text>}
                    {/* Date Picker */}
                    <Text style={styles.label}>{localizationStrings?.Daterequired}:</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <TouchableOpacity
                            style={styles.datePicker}
                            onPress={() => setShowCalendar(true)}
                            activeOpacity={0.7}
                        >
                            <Text>{date|| localizationStrings.SelectTime}</Text>
                            <Image
                                source={imageIndex.calender}
                                style={{ height: 22, width: 22 ,marginLeft: 8}}
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
                                style={{ height: 22, width: 22, marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity
                        style={styles.datePicker}
                        onPress={() => setShowCalendar(true)}
                        activeOpacity={0.7}
                    >
                        <Text>Date - {date}</Text>
                        <Image
                            source={imageIndex.calender}
                            style={{ height: 22, width: 22 }}
                        />
                    </TouchableOpacity> */}
                    {errors?.date && <Text style={{ color: "red", marginTop: 10 }}>{errors?.date}</Text>}
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
                    {/* Comments */}
                    <View style={{
                        width: '92%',
                        height: 8,
                        backgroundColor: '#D3D3D3',
                        borderRadius: 4,
                        position: 'relative',
                        marginVertical: 20,
                        marginLeft: 5,
                        marginTop: 20

                    }}>
                        <Animated.View
                            style={[{
                                height: 8,
                                borderRadius: 4,
                                position: 'absolute',
                                left: 0,

                            }, { width: pan, backgroundColor: getEffortColor(effort) }]} />
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={[{
                                width: 18,
                                height: 18,
                                borderRadius: 10,
                                backgroundColor: '#000',
                                position: 'absolute',
                                top: -6,

                            }, { left: pan }]} />
                    </View>
                    <Text style={[{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        color: "black"

                    },]}>Effort : {effort}</Text>
                    {/* <Text style={[{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        color:"black"

                    }, { color: getEffortColor(effort) }]}>Effort: {effort}</Text> */}

                    {errors.effort && <Text style={{ color: "red", }}>{errors.effort}</Text>}

                    <Text style={[styles.label, {
                        marginTop: 20
                    }]}>{localizationStrings?.AddComments}</Text>
                    <View style={{
                        backgroundColor: "#F3F3F3", borderRadius: 20, padding: 10, marginTop: 20, height: 160,
                    }}>
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={"#888585"}
                            value={comments}
                            onChangeText={setComments}
                            multiline
                            style={{
                                fontSize: 14,
                                color: "black"
                            }}
                        />

                    </View>
                    {errors.comments && <Text style={{ color: "red", marginTop: 10 }}>{errors.comments}</Text>}
                    <Text style={{ color: "black", fontSize: 20, fontWeight: "700" }}>{localizationStrings?.TrainingSession}</Text>
                    <FlatList
                        data={trainingData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{
                            marginTop: 11,
                            marginVertical: 5,
                            marginHorizontal: 1
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>
              
             
            </View>
              <View style={styles.buttView}>
                    <CustomButton
                        title={localizationStrings.Submit}
                        onPress={() => handleSubmit()}
                    />
                </View>
                <TimePickerModal
  time={time}
  setTime={(t) => {
    setTime(t);
    setFormattedTime(t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }}
  visible={showTimePicker}
  onClose={() => setShowTimePicker(false)}
/>
<AddAttendanceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
      />
        </SafeAreaView>
    );
};



export default SubmitRPE;
