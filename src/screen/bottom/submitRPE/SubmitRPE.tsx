import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal, SafeAreaView, ScrollView, Animated, PanResponder } from "react-native";
import { Calendar } from "react-native-calendars";
import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../compoent/CustomButton";
import styles from "./style";
import useSubmitRPE from "./useSubmitRPE";
import LoadingModal from "../../../utils/Loader";

const SubmitRPE = () => {
    const {
        isLoading, setisLoading,
        navigation,
        isLogin,
        handleSubmit,
        getEffortColor,
        session, setSession,
        date, setDate,
        comments, setComments,
        showCalendar, setShowCalendar,
        effort, setEffort,
        pan,
        errors, setErrors
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


    return (
        <SafeAreaView style={{ flex: 1, }}>
                        {isLoading ? <LoadingModal /> : null}

            <View style={styles.container}>
                <Text style={styles.header}>Submit RPE</Text>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.label}>Select Session:</Text>
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
                    {errors.session && <Text style={{ color: "red" ,marginTop:10 , }}>{errors.session}</Text>}
                    {/* Date Picker */}
                    <Text style={styles.label}>Select Date:</Text>
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
                    {errors.date && <Text style={{ color: "red" ,marginTop:10 }}>{errors.date}</Text>}

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
                        width: '100%',
                        height: 8,
                        backgroundColor: '#D3D3D3',
                        borderRadius: 4,
                        position: 'relative',
                        marginVertical: 20,

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
                                width: 20,
                                height: 20,
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

                    }, { color: getEffortColor(effort) }]}>Effort: {effort}</Text>

                    {errors.effort && <Text style={{ color: "red" ,marginTop:10 }}>{errors.effort}</Text>}

                    <Text style={[styles.label, {
                        marginTop: 20
                    }]}>Add Comments (Optional):</Text>
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
                    {errors.comments && <Text style={{ color: "red" ,marginTop:10 }}>{errors.comments}</Text>}

                </ScrollView>
                <View style={styles.buttView}>
                    <CustomButton
                        title={'Submit'}
                        onPress={()=>handleSubmit()}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};



export default SubmitRPE;
