import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import imageIndex from '../../../../../assets/imageIndex';
import CustomButton from '../../../../../compoent/CustomButton';
import StatusBarComponent from '../../../../../compoent/StatusBarCompoent';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../../../compoent/CustomHeader';
import ResponsiveSize from '../../../../../utils/ResponsiveSize';


const AddPlayer = () => {
  const [injuryHistory, setInjuryHistory] = useState(null);
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <View style={{
        marginHorizontal: 15
      }}>
        <CustomHeader imageSource={imageIndex.backNavs} label="Add Player" />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Image source={imageIndex.prfEdit} style={styles.profileImage} />
          <TouchableOpacity style={{
            bottom: 15,
            left: 8
          }}>
            <Image source={imageIndex.floter} style={{
              height: 33,
              width: 33
            }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.input} >
          <TextInput placeholder="Full Name"
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={{
              color: "#2D2D2D",
              fontSize: 14,
              fontWeight: "400"
            }}
          />
        </View>
        <View style={styles.input} >
          <TextInput placeholder="Date of Birth"
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={{
              color: "#2D2D2D",
              fontSize: 14,
              fontWeight: "400"
            }}
          />
        </View>


        <View style={styles.input} >
          <TextInput placeholder="Player ID"
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={{
              color: "#2D2D2D",
              fontSize: 14,
              fontWeight: "400"
            }}
          />
        </View>
        <TouchableOpacity

          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8',
          }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 9 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: '#2D2D2D',
                fontSize: 14,
              }}>{"Team"}
              </Text>
            </View>
          </View>
          <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
        </TouchableOpacity>
        <TouchableOpacity

          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8',
          }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 9 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: '#2D2D2D',
                fontSize: 14,
              }}>{"Position"}
              </Text>
            </View>
          </View>
          <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
        </TouchableOpacity>



        <Text style={styles.sectionTitle}>Training & Performance</Text>
        <TouchableOpacity

          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8',
          }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 9 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: '#2D2D2D',
                fontSize: 14,
              }}>{"Default Training Load Type"}
              </Text>
            </View>
          </View>
          <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Injury History</Text>
        <TouchableOpacity onPress={() => setInjuryHistory('no-injury')}
          style={[styles.radioButton, {
            justifyContent: "space-between"
          }]}>

          <Text style={styles.radioText}>No Injury</Text>
          <Image source={imageIndex.radio} style={{
            height: 22,
            width: 22
          }}

            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInjuryHistory('previous-injury')} style={[styles.radioButton, {
          justifyContent: "space-between"
        }]}>
          {/* <Ionicons name={injuryHistory === 'previous-injury' ? 'radio-button-on' : 'radio-button-off'} size={20} color="green" /> */}
          <Text style={styles.radioText}>Select Previous Injuries</Text>
          <Image source={imageIndex.radio} style={{
            height: 22,
            width: 22
          }}

            resizeMode='contain'
          />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Additional Player Details</Text>
        <View style={styles.input} >
          <TextInput placeholder="Performance Notes"
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={{
              color: "#2D2D2D",
              fontSize: 14,
              fontWeight: "400"
            }}
          />
        </View>
      </ScrollView>
      <View style={{
        justifyContent: 'flex-start', marginBottom: 11,
        marginHorizontal: 15
      }}>
        <CustomButton
          title={'Save'}
          onPress={() =>
            navigation.goBack()
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: { flex: 1, backgroundColor: '#fff', padding: 15, marginBottom: 20, },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  profileContainer: { alignItems: 'center', marginTop: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 18, marginBottom: 10, color: "#000000" },
  input: { borderWidth: 1, borderColor: '#F7F8F8', padding: 7, borderRadius: 10, marginBottom: 10, backgroundColor: '#F7F8F8', },
  dropdownContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10, backgroundColor: '#f8f8f8' },
  picker: { height: 50, width: '100%' },
  radioButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, },
  radioText: { marginLeft: 10, fontSize: 14, color: "#ADA4A5" },
  saveButton: { backgroundColor: '#BFFF00', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 20 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
};

export default AddPlayer;
