import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, PanResponder } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomButton from '../../compoent/CustomButton';
 import imageIndex from '../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../compoent/StatusBarCompoent';

const { width } = Dimensions.get('window');

const MapTracking = () => {
    const [speed, setSpeed] = useState(20); // Default speed
    const navigation = useNavigation()
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const newX = Math.min(Math.max(gestureState.moveX - 20, 0), width - 80);
            const newSpeed = Math.round((newX / (width - 80)) * 100);
            setSpeed(newSpeed);
        },
    });
    const steps = [
        { completed: true },
        { completed: true },
        { completed: true },
        { completed: false },
        { completed: false }
    ];

    return (
        <View style={styles.container}>
            <StatusBarComponent />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 22.7196,
                    longitude: 75.8577,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{ latitude: 22.3072, longitude: 73.1812 }}
                    title={"Scraper Location"}
                    description={"Current Position"}
                />
            </MapView>

            {/* Bottom Card */}
            <View style={styles.bottomCard}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <Image source={imageIndex.circle} style={{ height: 55, width: 55 }} />
                        <View style={{ flexDirection: "column", }}>
                            <Text style={styles.vehicleTitle}>Scraper</Text>
                            <Text style={styles.dateRange}>23 June - 24 June</Text>
                        </View>
                    </View>

                    <Image source={imageIndex.arrowright} style={{ height: 18, width: 18 }} />

                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 6,
                    marginBottom: 5
                }}>
                    {steps.map((step, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center",
                        }}>
                            {/* Circle */}
                            <View style={[
                                {
                                    width: 29,
                                    height: 29,
                                    borderRadius: 29,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#FF5722',
                                },
                                step.completed ? {
                                    backgroundColor: '#FF5722',
                                    borderColor: '#FF5722',
                                } : {
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#FF5722'
                                }
                            ]}>
                                {step.completed && <Image source={imageIndex.right} style={{ height: 13, width: 13 }} />}
                            </View>

                            {/* Line between circles (but not after the last circle) */}
                            {index < steps.length - 1 && (
                                <View style={[
                                    {
                                        width: 40,
                                        height: 1,
                                    },
                                    steps[index].completed && steps[index + 1].completed ? {
                                        backgroundColor: '#FF5722'
                                    } : {
                                        borderWidth: 1,
                                        borderColor: '#FF5722',
                                        borderStyle: 'dashed'
                                    }
                                ]} />
                            )}


                        </View>
                    ))}
                </View>

                {/* Location Row */}
                <View style={styles.locationRow}>
                    <Text style={[styles.locationText, { color: "rgba(251, 91, 43, 1)" }]}>From</Text>
                    <Text style={[styles.locationText, { color: "rgba(251, 91, 43, 1)" }]}>To</Text>
                </View>
                <View style={styles.locationRow}>
                    <Text style={styles.locationText}>Delhi, India</Text>
                    <Text style={styles.locationText}>Mumbai, India</Text>
                </View>
            </View>
            <CustomButton
                title={'End Tracking'}
                onPress={() => navigation.goBack()}
                buttonStyle={{
                    marginHorizontal: 20,   borderRadius: 40,
                    bottom:20
                }}
            />
            <TouchableOpacity style={{
                position: "absolute",
                left: 15,
                top:18
            }}
                onPress={() => navigation.goBack()}
            >
                <Image source={imageIndex.backorange} style={{ marginTop: 12, height: 35, width: 35 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        flex: 1,
    },
    bottomCard: {
        position: 'absolute',
        bottom: 110,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,

    },
    vehicleTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
        color: "rgba(53, 53, 53, 1)",
        marginTop: 5
    },
    dateRange: {
        fontSize: 12,
        color: 'rgba(171, 171, 171, 1)',
        marginVertical: 4,
        marginLeft: 12,

    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
        marginTop: 5
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    dottedLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'orange',
        marginHorizontal: 8,
    },
    speedLabel: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginBottom: 6,
    },
    sliderContainer: {
        width: '100%',
        height: 24,
        justifyContent: 'center',
        marginBottom: 4,
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
    },
    sliderThumb: {
        width: 20,
        height: 20,
        backgroundColor: 'orange',
        borderRadius: 10,
        position: 'absolute',
        top: -8,
    },
    speedLabelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    speedLabelText: {
        fontSize: 12,
        color: 'gray',
    },
    endTrackingButton: {
        marginTop: 16,
        backgroundColor: 'orange',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    endTrackingButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
});

export default MapTracking;
