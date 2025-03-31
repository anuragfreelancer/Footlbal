import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import imageIndex from '../../../assets/imageIndex';
import CustomHeader from '../../../compoent/CustomHeader';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import styles from './style';
import usePlayerDetails from './usePlayerDetails';

const PlayerDetails = () => {
    const {
        isLoading,
        navigation,
        item
    } = usePlayerDetails()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.headerContainer}>
                <CustomHeader imageSource={imageIndex.backNavs} label="Player Details" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileContainer}>
                    <Image source={imageIndex.prfEdit} style={styles.profileImage} />
                </View>
                <View >
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Player Details</Text>
                        </View>
                        <Text style={styles.detailValue}>John Doe</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Age</Text>
                        </View>
                        <Text style={styles.detailValue}>24</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Position</Text>
                        </View>
                        <Text style={styles.detailValue}>Midfielder</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Team</Text>
                        </View>
                        <Text style={styles.detailValue}>FC Elite</Text>
                    </View>
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.notesTitle}>Coach Notes</Text>
                    <Text style={styles.notesText}>John reported muscle fatigue, focus intensity next session.</Text>
                    <Text style={styles.notesText}>High API. Needs better recovery management.</Text>
                </View>
                <View style={{
                    justifyContent: 'flex-start', marginBottom: 11,
                    marginHorizontal: 15
                }}>
                    <CustomButton
                        title={'Export Report'}
                        onPress={() => navigation.navigate(ScreenNameEnum.TabNavigator)
                        }
                        buttonStyle={{ width: "100%", marginTop: 28 }}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, {
                    borderColor: '#A0D803',
                    borderWidth: 1
                }]}>
                    <Text style={[styles.buttonText, {
                        color: "#A0D803"
                    }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {
                    backgroundColor: '#A0D803',
                }]}
                    onPress={() => navigation.navigate(ScreenNameEnum.Messages)}
                >
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



export default PlayerDetails;