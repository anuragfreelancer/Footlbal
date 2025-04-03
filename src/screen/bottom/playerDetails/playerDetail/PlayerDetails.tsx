import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import usePlayerDetails from './usePlayerDetails';
import styles from './style';
  

const PlayerDetails = () => {
    const {
        navigation,
        item
    } = usePlayerDetails();
    const formatDate = (dob: any) => {
        if (!dob || typeof dob !== 'string') return 'Invalid Date'; // Handle empty or incorrect data
        const parts = dob.split('/');
        if (parts.length !== 3) return 'Invalid Date'; // Ensure the format is correct
        const [day, month, year] = parts.map(Number); // Convert to numbers
        if (isNaN(day) || isNaN(month) || isNaN(year)) return 'Invalid Date'; // Ensure numbers are valid
        const date = new Date(year, month - 1, day); // Month is 0-based in JS Date
        if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid dates
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };
    const formattedDate = formatDate(item?.dob);
     
     
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.headerContainer}>
                <CustomHeader imageSource={imageIndex.backNavs} label="Player Details" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: item.image }} style={styles.profileImage} />
                </View>
                <View >
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Player Details</Text>
                        </View>
                        <Text style={styles.detailValue}>{item?.player_name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Position</Text>
                        </View>
                        <Text style={styles.detailValue}>{item?.position_id}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Team</Text>
                        </View>
                        <Text style={styles.detailValue}>{item?.team_id}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>Dob</Text>
                        </View>
                        {/* <Text style={styles.detailValue}>{item?.dob}</Text> */}
                        <Text style={styles.detailValue}>{formattedDate}</Text>  
                    </View>
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.notesTitle}>Coach Notes</Text>
                    <Text style={styles.notesText}>{item?.player_details}</Text>
                </View>
                {/* <View style={styles.butt}>
                    <CustomButton
                        title={'Export Report'}
                        onPress={() => navigation.navigate(ScreenNameEnum.TabNavigator)
                        }
                        buttonStyle={{ width: "100%", marginTop: 28 }}
                    />
                </View> */}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity

                    onPress={() => navigation.navigate(ScreenNameEnum.PlayerEdit,{
                        item:item
                    })}
                    style={[styles.button, {
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