import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../routes/screenName.enum';

const { width, height } = Dimensions.get('window');

interface Slide {
    id: string;
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: '1',
        title: 'Welcome to Scrapapp',
        description: 'Join a community of passionate athletes and sports enthusiasts.',
        image: imageIndex.bagePng,
    },
    {
        id: '2',
        title: 'Easy Scrap Management',
        description: 'Join a community of passionate athletes and sports enthusiasts.',
        image: imageIndex.bagePng,
    },
    
];

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);

    const updateCurrentIndex = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

 

    const renderSlide = ({ item }: { item: Slide }) => (
        <View style={styles.slide}>
            <ImageBackground source={item.image} style={styles.image} resizeMode='cover'  >
                
            </ImageBackground>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:15}}>
            <Text style={styles.title}>Welcome to </Text>
            <Text style={[styles.title,{
                color:"rgba(160, 216, 3, 1)"
            }]}>Football</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
    const { width, height } = Dimensions.get('window');

    return (
        <SafeAreaView style={styles.container}>
              <StatusBarComponent backgroundColor="black" barStyle="default"/>
              <FlatList
                    data={slides}
                    horizontal
                    pagingEnabled
                    ref={flatListRef}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderSlide}
                    onScroll={updateCurrentIndex}
                    scrollEventThrottle={16}
                />
                <View style={{
                    position: 'absolute',
                    bottom: 122,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
                 <CustomButton
                secoundImg={imageIndex.nextArrow}
                    title={'Next'}
                    onPress={() => navigation.replace(ScreenNameEnum.LoginScreen)}
                     buttonStyle={{ marginHorizontal: 120, marginBottom: 20 }}
                />
                <View style={{
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"row",
                    marginBottom: 15 
                }}>
                    <Text 
                    
                    style={{
                        fontSize:16,
                        color:"black",
                        fontWeight:"400"
                    }}
                    >Alrady have an account?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate(ScreenNameEnum.LoginScreen)}>
                    <Text style={{
                          fontSize:16,
                          fontWeight:"400"
,
                        color:"rgba(237, 126, 98, 1)"
                    }}>{" "}Login</Text>
                    </TouchableOpacity>
                </View>
         </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slide: {
        width,
     
     },
    image: {
        width: "100%",
        height: 551,
          
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
     },
    description: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
         paddingHorizontal: 16,
        lineHeight: 21,
        marginTop:10
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 80,
        backgroundColor: "red"
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10,
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: 'rgba(160, 216, 3, 1)',
        width: 18,
        height: 8,
    },
    inactiveDot: {
        backgroundColor: 'rgba(160, 216, 3, 1)',
        height: 9,
        width: 9,
    },
     
});
