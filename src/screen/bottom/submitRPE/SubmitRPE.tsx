import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, SafeAreaView, ScrollView, Animated, PanResponder } from "react-native";
import { Calendar } from "react-native-calendars";
import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../compoent/CustomButton";

const SubmitRPE = () => {
    const [session, setSession] = useState("training");
    const [date, setDate] = useState("");
    const [comments, setComments] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [effort, setEffort] = useState(6);
    const pan = useState(new Animated.Value(0))[0];

    const getEffortColor = (value: any) => {
        if (value <= 3) return '#A0D803'; // Light effort (Yellow)
        if (value <= 6) return '#A0D803'; // Moderate effort (Light Green)
        if (value <= 9) return '#A0D803'; // Hard effort (Dark Green)
        return '#A0D803'; // Maximum effort (Black)
    };

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
            <View style={styles.container}>
                <Text style={styles.header}>Submit RPE</Text>
                <ScrollView>

                    <Text style={styles.label}>Select Session:</Text>
                    <View style={styles.radioGroup}>
                        {["training", "biketech"].map((item) => (
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

                </ScrollView>
                <View style={styles.buttView}>
                    <CustomButton
                        title={'Submit'}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    label: { fontSize: 16, marginTop: 10, fontWeight: "600" },
    radioGroup: { flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 15 },
    radioItem: { flexDirection: "row", alignItems: "center", marginRight: 20 },
    radioIcon: { height: 22, width: 22, marginRight: 5 },
    radioText: { color: "black", fontSize: 16, fontWeight: "600" },
    datePicker: { borderColor: "#0000000D", padding: 10, borderWidth: 1, flexDirection: "row", borderRadius: 5, marginTop: 15, backgroundColor: "#f9f9f9", justifyContent: "space-between" },
    input: { backgroundColor: "#F3F3F3", borderRadius: 20, padding: 10, marginTop: 20, height: 160, },
    submitButton: { backgroundColor: "#A8EB12", padding: 15, alignItems: "center", borderRadius: 5, marginTop: 20 },
    submitText: { color: "#000", fontWeight: "bold", fontSize: 16 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    calendarContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 320 },
    closeButton: { marginTop: 10, padding: 10, backgroundColor: "#A8EB12", borderRadius: 25, alignItems: "center" },
    closeButtonText: { fontSize: 14, fontWeight: "bold", color: "white" },
    buttView: { justifyContent: 'flex-start', marginBottom: 15 },

});

export default SubmitRPE;
