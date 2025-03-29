import React  from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomButton from '../../../../compoent/CustomButton';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import styles from './style';
import useAddPlayer from './useAddPlayer';
import DatePicker from "react-native-date-picker";
import ImagePickerModal from '../../../../compoent/ImagePickerModal';


const AddPlayer = () => {
  const {
    fullName, setFullName,
    dob, setDob,
    playerId, setPlayerId,
    errors,
    navigation,
    injuryHistory, setInjuryHistory,
    handleSubmit,
    open, setOpen,
    imagePrfile,
    isModalVisible, setIsModalVisible,
    takePhotoFromCamera,
    pickImageFromGallery
  } = useAddPlayer()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <View style={{
        marginHorizontal: 12,
        marginTop: 15
      }}>
        <CustomHeader imageSource={imageIndex.backNavs} label="Add Player" />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Image source={imagePrfile ? { uri: imagePrfile.path } : imageIndex.prfEdit} style={styles.profileImage} />
          <TouchableOpacity style={{
            bottom: 15,
            left: 8
          }} onPress={() => setIsModalVisible(true)}>
            <Image source={imageIndex.floter} style={{
              height: 33,
              width: 33
            }} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.input} >
          <TextInput placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
          />
        </View>
        {errors.fullName && <Text style={{ color: "red", bottom: 5 }}>{errors.fullName}</Text>}
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[styles.input, {
            height: 55,
            justifyContent: "center",
            marginBottom: 12,
          }]}
        >
          <Text style={{
            color: "#2D2D2D",
            fontSize: 14,
            fontWeight: "400",
            marginLeft: 5
          }}>
            {dob ? dob.toDateString() : "Date of Birth"}
          </Text>
        </TouchableOpacity>
        {errors.dob && <Text style={{ color: "red", bottom: 5 }}>{errors.dob}</Text>}
        <View style={styles.input} >
          <TextInput placeholder="Player ID"
            value={playerId}
            onChangeText={setPlayerId}
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
       
          />
        </View>
        {errors.playerId && <Text style={{ color: "red", bottom: 5 }}>{errors.playerId}</Text>}
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
          <Image source={injuryHistory != 'no-injury' ? imageIndex.radio : imageIndex.radioSlied} style={{
            height: 22,
            width: 22
          }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInjuryHistory('previous-injury')} style={[styles.radioButton, {
          justifyContent: "space-between"
        }]}>
          <Text style={styles.radioText}>Select Previous Injuries</Text>
          <Image 
          source={injuryHistory != 'previous-injury' ? imageIndex.radio : imageIndex.radioSlied} style={{
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
            style={styles.textInupt}
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
            handleSubmit()
          }
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={dob || new Date()}
        mode="date"
        onConfirm={(date) => {
          setDob(date);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
      <ImagePickerModal
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        pickImageFromGallery={pickImageFromGallery}
        takePhotoFromCamera={takePhotoFromCamera}
      />
    </SafeAreaView>
  );
};



export default AddPlayer;
