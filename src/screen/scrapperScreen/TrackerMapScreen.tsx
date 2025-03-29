
import React, {  useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import CustomButton from '../../compoent/CustomButton';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
 import { useNavigation, useRoute } from '@react-navigation/native';
import { AcceptScrapperApi } from '../../Api/apiRequest';
import { errorToast } from '../../utils/customToast';
import Loading from '../../utils/Loader';

const TrackerMapScreen = () => {
    const mapRef = useRef(null);
    const route: any = useRoute();
    const [isLoading, setLoading] = useState(false)
    const { AcceptData,item } = route?.params || "";
    const navigation = useNavigation()
    const routeCoordinates = [
        { latitude: 22.7196, longitude: 75.8577 }, // Indore
  
    ];
    const [carPositionIndex, setCarPositionIndex] = useState(0);

    const completedRoute = routeCoordinates.slice(0, carPositionIndex + 1);
    const remainingRoute = routeCoordinates.slice(carPositionIndex);
     const AcceptApicall = async (typeParam: any) => {
        try {
          let data = {
            postId: item?.id,
            navigation: navigation,
            type: typeParam,
            scraperid:item?.scraper_ids || AcceptData?.scraper_ids
          }
           const response = await AcceptScrapperApi(data, setLoading, item);
        } catch (error) {
            errorToast(error)        }
      }
      

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent backgroundColor={"black"} barStyle={"light-content"} />
            {isLoading ? <Loading /> : null}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 22.7196,
                    longitude: 75.8577,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* Completed (Red) Polyline */}
                <Polyline
                    coordinates={completedRoute}
                    strokeWidth={5}
                    strokeColor="rgba(251, 91, 43, 1)"  // Red color
                />

                <Polyline
                    coordinates={remainingRoute}
                    strokeWidth={5}
                    strokeColor="rgba(168, 168, 168, 1)"  // Gray color
                />
                {/* Start Marker */}
                <Marker coordinate={routeCoordinates[0]}>
                <Image
                        source={imageIndex.redMarker}
                        style={{ height: 35, width: 35 }}
                        resizeMode="contain"
                    />
                </Marker>

                 <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
                    <View style={{
                        borderWidth: 5,
                        borderColor: "white",
                        borderRadius: 20,
                        elevation: 20
                    }} >
                        <View style={{
                            borderWidth: 6,
                            borderColor: "rgba(251, 91, 43, 1)",
                            borderRadius: 20
                        }} >
                        </View>
                    </View>
                </Marker>
                {/* Moving Car Marker */}
                {/* <Marker coordinate={carPosition}>
                    <Image
                        source={imageIndex.car}
                        style={{ height: 33, width: 33 }}
                        resizeMode="contain"
                    />
                </Marker> */}
            </MapView>
            {/* Bottom Info Card */}
            <View style={styles.bottomCard}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileDetails}>
                        <Text style={styles.name}>Lindsey Saris</Text>
                        <Text style={styles.address}>{AcceptData?.address || item?.address}</Text>
                     </View>
                </View>
                {/* Item Info */}
                <View style={styles.itemRow}>
                     <Image
                        source={{ uri: AcceptData?.image  || item?.image}}
                        style={styles.profileImage}
                        resizeMode='cover'
                    />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{AcceptData?.title ||item?.title}</Text>
                        <Text style={styles.itemCategory}>{AcceptData?.category_name ||item?.category_name}</Text>
                    </View>
                </View>
            </View>
             <View style={styles.buttonContainer}>
                <CustomButton
                    title={'Cancel'}
                     onPress={() => {
                      AcceptApicall('Cancel')
          
                      }}
                    buttonStyle={styles.declineButton}
                />
                <CustomButton
                    title={'Pickup'}
                    onPress={() => {
                      AcceptApicall('Pickup')
          
                      }}
                     buttonStyle={styles.acceptButton}
                />
            </View>
        </SafeAreaView>
    );
};

export default TrackerMapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    bottomCard: {
        position: 'absolute',
        bottom: 130,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 12,
        elevation: 5,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    profileDetails: {
        marginLeft: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        lineHeight: 18
    },
    address: {
        fontSize: 12,
        color: 'rgba(31, 29, 26, 1)',
        marginVertical: 2,
        marginTop: 9,
        fontWeight: "500"
    },
    state: {
        fontSize: 12,
        color: '#888',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(236, 236, 236, 1)',
        paddingTop: 8,
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    itemDetails: {
        marginLeft: 12,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    itemCategory: {
        fontSize: 10,
        color: 'rgba(31, 29, 26, 1)',
        marginTop: 1
    },
    driverAvatarContainer: {
        position: 'absolute',
        top: -25,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 2,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    driverAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    declineButton: {
        height: 50,
        width: '45%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    acceptButton: {
        height: 50,
        width: '45%',
        backgroundColor: 'rgba(251, 91, 43, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});





// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
//  import MapViewDirections from 'react-native-maps-directions';
//  import { MapApiKey } from '../../redux/Api';
// import imageIndex from '../../assets/imageIndex';
// import Loading from '../../utils/Loader';
// import { getCurrentLocation, locationPermission } from '../../helper/helperFunction';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const TrackerMapScreen = ({ navigation }) => {
//     const mapRef = useRef()
//     const markerRef = useRef()

//     const [state, setState] = useState({
//         curLoc: {
//             latitude: 30.7046,
//             longitude: 77.1025,
//         },
//         destinationCords: {},
//         isLoading: false,
//         coordinate: new AnimatedRegion({
//             latitude: 30.7046,
//             longitude: 77.1025,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         }),
//         time: 0,
//         distance: 0,
//         heading: 0

//     })

//     const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
//     const updateState = (data) => setState((state) => ({ ...state, ...data }));


//     useEffect(() => {
//         getLiveLocation()
//     }, [])

//     const getLiveLocation = async () => {
//         const locPermissionDenied = await locationPermission()
//         if (locPermissionDenied) {
//             const { latitude, longitude, heading } = await getCurrentLocation()
//             console.log("get live location after 4 second",heading)
//             animate(latitude, longitude);
//             updateState({
//                 heading: heading,
//                 curLoc: { latitude, longitude },
//                 coordinate: new AnimatedRegion({
//                     latitude: latitude,
//                     longitude: longitude,
//                     latitudeDelta: LATITUDE_DELTA,
//                     longitudeDelta: LONGITUDE_DELTA
//                 })
//             })
//         }
//     }

//     useEffect(() => {
//         const interval = setInterval(() => {
//             getLiveLocation()
//         }, 6000);
//         return () => clearInterval(interval)
//     }, [])

//     const onPressLocation = () => {
//         navigation.navigate('chooseLocation', { getCordinates: fetchValue })
//     }
//     const fetchValue = (data) => {
//         console.log("this is data", data)
//         updateState({
//             destinationCords: {
//                 latitude: data.destinationCords.latitude,
//                 longitude: data.destinationCords.longitude,
//             }
//         })
//     }

//     const animate = (latitude, longitude) => {
//         const newCoordinate = { latitude, longitude };
//         if (Platform.OS == 'android') {
//             if (markerRef.current) {
//                 markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
//             }
//         } else {
//             coordinate.timing(newCoordinate).start();
//         }
//     }

//     const onCenter = () => {
//         mapRef.current.animateToRegion({
//             latitude: curLoc.latitude,
//             longitude: curLoc.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         })
//     }

//     const fetchTime = (d, t) => {
//         updateState({
//             distance: d,
//             time: t
//         })
//     }

//     return (
//         <View style={styles.container}>

//             {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
//                 <Text>Time left: {time.toFixed(0)} </Text>
//                 <Text>Distance left: {distance.toFixed(0)}</Text>
//             </View>)}
//             <View style={{ flex: 1 }}>
//                 <MapView
//                     ref={mapRef}
//                     style={StyleSheet.absoluteFill}
//                     initialRegion={{
//                         ...curLoc,
//                         latitudeDelta: LATITUDE_DELTA,
//                         longitudeDelta: LONGITUDE_DELTA,
//                     }}
//                 >

//                     <Marker.Animated
//                         ref={markerRef}
//                         coordinate={coordinate}
//                     >
//                         <Image
//                             source={imageIndex.car}
//                             style={{
//                                 width: 40,
//                                 height: 40,
//                                 transform: [{rotate: `${heading}deg`}]
//                             }}
//                             resizeMode="contain"
//                         />
//                     </Marker.Animated>

//                     {Object.keys(destinationCords).length > 0 && (<Marker
//                         coordinate={destinationCords}
//                         image={imageIndex.appLogo}
//                     />)}

//                     {Object.keys(destinationCords).length > 0 && (<MapViewDirections
//                         origin={curLoc}
//                         destination={destinationCords}
//                         apikey={MapApiKey}
//                         strokeWidth={6}
//                         strokeColor="red"
//                         optimizeWaypoints={true}
//                         onStart={(params) => {
//                             console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//                         }}
//                         onReady={result => {
//                             console.log(`Distance: ${result.distance} km`)
//                             console.log(`Duration: ${result.duration} min.`)
//                             fetchTime(result.distance, result.duration),
//                                 mapRef.current.fitToCoordinates(result.coordinates, {
//                                     edgePadding: {
//                                         // right: 30,
//                                         // bottom: 300,
//                                         // left: 30,
//                                         // top: 100,
//                                     },
//                                 });
//                         }}
//                         onError={(errorMessage) => {
//                             // console.log('GOT AN ERROR');
//                         }}
//                     />)}
//                 </MapView>
//                 <TouchableOpacity
//                     style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         right: 0
//                     }}
//                     onPress={onCenter}
//                 >
//                     <Image source={imageIndex.Menunotification} />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.bottomCard}>
//                 <Text>Where are you going..?</Text>
//                 <TouchableOpacity
//                     onPress={onPressLocation}
//                     style={styles.inpuStyle}
//                 >
//                     <Text>Choose your location</Text>
//                 </TouchableOpacity>
//             </View>
//             {isLoading ? <Loading /> : null}

//          </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     bottomCard: {
//         backgroundColor: 'white',
//         width: '100%',
//         padding: 30,
//         borderTopEndRadius: 24,
//         borderTopStartRadius: 24
//     },
//     inpuStyle: {
//         backgroundColor: 'white',
//         borderRadius: 4,
//         borderWidth: 1,
//         alignItems: 'center',
//         height: 48,
//         justifyContent: 'center',
//         marginTop: 16
//     }
// });

// export default TrackerMapScreen;
