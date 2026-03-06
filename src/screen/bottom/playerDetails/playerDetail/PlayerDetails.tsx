import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,   } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomHeader from '../../../../compoent/CustomHeader';
 import ScreenNameEnum from '../../../../routes/screenName.enum';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import usePlayerDetails from './usePlayerDetails';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../../compoent/Localization/Localization';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';


const PlayerDetails = () => {
    useLanguage();
    const {
        navigation,
        item,
        isLogin,
        loading,
        downloadVideo
    } = usePlayerDetails();
  const formatDate = (dob: any): string => {
    if (!dob || typeof dob !== 'string') return 'Invalid Date'; 

    // Trim spaces and split by '/'
    const parts = dob.trim().split('/');
    
    if (parts.length !== 3) return 'Invalid Date'; 

    const [day, month, year] = parts.map(part => parseInt(part, 10));

    // Validate extracted values
    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
        return 'Invalid Date'; 
    }

    // Create date object (JS months are 0-based)
    const date = new Date(year, month - 1, day);

    // Ensure created date matches input values
    if (
        date.getDate() !== day ||
        date.getMonth() + 1 !== month ||
        date.getFullYear() !== year
    ) {
        return 'Invalid Date';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

// Example usage
const formattedDate = formatDate(item?.dob);

 
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.headerContainer}>
                <CustomHeader imageSource={imageIndex.backNavs} label={localizationStrings?.PlayerDetails} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileContainer}>
                    {item?.image ?                     <Image source={{ uri: item.image }} style={styles.profileImage} />
 : (
                        <Image source={imageIndex.prfEdit} style={styles.profileImage} />

 )}
                </View>
                <View >
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>{localizationStrings?.PlayerDetails}</Text>
                        </View>
                        <Text style={styles.detailValue}>{item?.user_name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>{localizationStrings?.Position}</Text>
                        </View>
                        <Text style={styles.detailValue}>{item?.position_id}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={styles.buttCol}>
                            <Text style={styles.detailLabel}>{localizationStrings?.MyTeam}</Text>
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
                    <Text style={styles.notesTitle}>{localizationStrings?.CoachNotes}</Text>
                    <Text style={styles.notesText}>{item?.player_details}</Text>
                </View>
              
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ScreenNameEnum.PlayerEdit, {
                        item: item
                    })}
                    style={[styles.button, {
                        borderColor: '#A0D803',
                        borderWidth: 1 ,
                        justifyContent:"center" ,
                        alignItems:"center"
                    }]}>
                    <Text style={[styles.buttonText, {
                        color: "#A0D803" ,
                        textAlign:"center"
                    }]}>{localizationStrings?.Edit}</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.button, {
                    backgroundColor: '#A0D803',
                }]}
                    onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen,{
                        item:item
                    })}
                    // onPress={() => navigation.navigate(ScreenNameEnum.Messages)}
                >
                    <Text style={styles.buttonText}>{localizationStrings?.ChatMessages}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



export default PlayerDetails;