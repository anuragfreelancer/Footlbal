import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imageIndex from '../../../assets/imageIndex';
import CustomHeader from '../../../compoent/CustomHeader';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

const PlayerDetails = () => {
    const navigation = useNavigation();

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
                <TouchableOpacity style={[styles.button,{
                    borderColor: '#A0D803',
                    borderWidth:1
                }]}>
                    <Text style={[styles.buttonText,{
                        color:"#A0D803"
                    }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{
                    backgroundColor: '#A0D803',
                }]}
                
                onPress={()=>navigation.navigate(ScreenNameEnum.Messages)}
                >
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    backIcon: { width: 24, height: 24, tintColor: '#000' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#000' },
    profileContainer: { alignItems: 'center', marginVertical: 20 },
    profileImage: { width: 80, height: 80, borderRadius: 40 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, },
    detailLabel: { fontSize: 16, fontWeight: '700', color: '#000',marginLeft:5 },
    detailValue: { fontSize: 14, color: '#5A6565', right: 18,fontWeight:"700" },
    notesContainer: { borderRadius: 10, margin: 20 },
    notesTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: "#000000" },
    notesText: { fontSize: 16, color: '#9DB2BF', marginBottom: 5, lineHeight: 25 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
    button: {height:55,alignItems:"center",justifyContent:"center",  paddingVertical: 12, paddingHorizontal: 20, borderRadius: 40,width:"40%" },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

    buttCol: {  backgroundColor: "#A0D803", padding: 10, borderTopRightRadius: 20, borderBottomRightRadius: 20 }
});

export default PlayerDetails;