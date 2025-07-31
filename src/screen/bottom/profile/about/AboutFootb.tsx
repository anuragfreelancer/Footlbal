import React from 'react';
import { View, Text, Image, ScrollView,   useWindowDimensions } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import styles from './style';
import useAboutFootb from './useAboutFootb';
import HTML from 'react-native-render-html';
import LoadingModal from '../../../../utils/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../../compoent/Localization/Localization';

const AboutFootb = () => {

    const {
        AboutData,
        isLoading,
        navigation
    } = useAboutFootb()
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {isLoading ? <LoadingModal /> : null}
            <StatusBarComponent />
            <View style={{ marginHorizontal: 12,  }}>
                <CustomHeader imageSource={imageIndex.backNav} label= {localizationStrings?.AboutFootball} />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                 {/* <View style={styles.logoContainer}>
                    <Image source={imageIndex.app} style={styles.logo} />
                </View>

                 <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>App About Details</Text>

                </View> */}
                <View style={{
                    marginHorizontal:18
                }}>
                {AboutData &&
                    <HTML
                        source={{ html: AboutData?.description || '<p>No content available</p>' }}
                        contentWidth={width}
                        tagsStyles={styles.htmlStyles}
                    />
                }
</View>
            </ScrollView>
        </SafeAreaView>

    );
};



export default AboutFootb;
