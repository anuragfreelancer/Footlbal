import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import CustomButton from '../../../../compoent/CustomButton';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import styles from './style';
import useAddPlayer from './useAddPlayer';
import DatePicker from "react-native-date-picker";
import ImagePickerModal from '../../../../compoent/ImagePickerModal';
import DropdownModal from '../../../../compoent/DropdownModal';
import LoadingModal from '../../../../utils/Loader';


const AddPlayer = () => {
  const {
    fullName, setFullName,
    dob, setDob,
    playerId, setPlayerId,
    errors,
    injuryHistory, setInjuryHistory,
    handleSubmit,
    open, setOpen,
    imagePrfile,
    isModalVisible, setIsModalVisible,
    takePhotoFromCamera,
    pickImageFromGallery,
    dropOpen, setDropOpen,
    selectedOption, setSelectedOption,
    isLoading,
    notes, setNotes,
    teamData,
    postionModal, setPostionModal,
    tariningModal, setTariningModal,
    selectedPosition, setSelectedPosition,
    selectedTraining, setSelectedTraining,
    trainingData,
    postionData,
    email, setEmail ,
    password, setPassword
  } = useAddPlayer()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? <LoadingModal /> : null}
      <StatusBarComponent />
      <View style={{
        marginHorizontal: 12,
        marginTop: 15
      }}>
        <CustomHeader imageSource={imageIndex.backNavs} label="Add Player" />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Image
            resizeMode='cover'
            source={imagePrfile ? { uri: imagePrfile.path } : imageIndex.prfEdit} style={styles.profileImage} />
          <TouchableOpacity style={{
            bottom: 20,
            left: 12
          }} onPress={() => setIsModalVisible(true)}>
            <Image source={imageIndex.floter} style={{
              height: 33,
              width: 33
            }} />
          </TouchableOpacity>
        </View>
        {errors.imagePrfile && <Text style={[styles.redText, {
          textAlign: "center"
        }]}>{errors.imagePrfile}</Text>}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.input} >
          <TextInput placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
          />
        </View>
        {errors.fullName && <Text style={styles.redText}>{errors.fullName}</Text>}
        <View style={styles.input} >
          <TextInput placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
          />
        </View>
        {errors.email && <Text style={styles.redText}>{errors.email}</Text>}

        <View style={styles.input} >
          <TextInput placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
          />
        </View>
        {errors.password && <Text style={styles.redText}>{errors.password}</Text>}

        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[styles.input, {
            height: 55,
            justifyContent: "center",
            marginBottom: 12,
          }]}
        >
          <Text style={styles.dobText}>
            {dob ? dob?.toDateString() : "Date of Birth"}
          </Text>
        </TouchableOpacity>
        {errors.dob && <Text style={styles.redText}>{errors.dob}</Text>}
        <View style={styles.input} >
          <TextInput placeholder="Player ID"
            value={playerId}
            onChangeText={setPlayerId}
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
          />
        </View>
        {errors?.playerId && <Text style={styles.redText}>{errors?.playerId}</Text>}
        <TouchableOpacity
          onPress={() => setDropOpen(true)}
          style={styles.rowView}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 9 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: '#2D2D2D',
                fontSize: 14,
              }}>{selectedOption?.name || "Team"}
              </Text>
            </View>
          </View>
          <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
        </TouchableOpacity>
        {errors?.selectedOption && <Text style={styles.redText}>{errors?.selectedOption}</Text>}
        <TouchableOpacity
          onPress={() => setPostionModal(true)}
          style={styles.rowView}>
          <View style={styles.dropView}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: '#2D2D2D',
                fontSize: 14,
                marginLeft: 8
              }}>
                {selectedPosition?.position_name || "Position"}
              </Text>
            </View>
          </View>
          <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
        </TouchableOpacity>
        {errors.selectedPosition && <Text style={styles.redText}>{errors.selectedPosition}</Text>}
        <Text style={styles.sectionTitle}>Training & Performance</Text>
        <TouchableOpacity
          onPress={() => setTariningModal(true)}
          style={styles.rowView}>
          <View style={styles.dropView}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{
                color: '#2D2D2D',
                fontSize: 14,
              }}>{selectedTraining?.load_type || "Default Training Load Type"}
              </Text>
            </View>
          </View>
          <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
        </TouchableOpacity>
        {errors.selectedTraining && <Text style={styles.redText}>{errors.selectedTraining}</Text>}
        <Text style={styles.sectionTitle}>Injury History</Text>
        <TouchableOpacity onPress={() => setInjuryHistory('no-injury')}
          style={[styles.radioButton, {
            justifyContent: "space-between"
          }]}>
          <Text style={styles.radioText}>No Injury</Text>
          <Image source={injuryHistory != 'no-injury' ? imageIndex.radio : imageIndex.radioSlied}
            style={styles.img}
            resizeMode='contain'
            tintColor={"#A0D803"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInjuryHistory('previous-injury')} style={[styles.radioButton, {
          justifyContent: "space-between"
        }]}>
          <Text style={styles.radioText}>Select Previous Injuries</Text>
          <Image
            source={injuryHistory != 'previous-injury' ? imageIndex.radio : imageIndex.radioSlied} style={styles.img}
            resizeMode='contain'
            tintColor={"#A0D803"}
          />
        </TouchableOpacity>
        {errors.injuryHistory && <Text style={[styles.redText, {
          marginTop: 5
        }]}>{errors.injuryHistory}</Text>}
        <Text style={styles.sectionTitle}>Additional Player Details</Text>
        <View style={styles.input} >
          <TextInput placeholder="Performance Notes"
            placeholderTextColor={"rgba(45, 45, 45, 1)"}
            style={styles.textInupt}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
        {errors?.notes && <Text style={[styles.redText, {
          marginTop: 5
        }]}>{errors?.notes}</Text>}
      </ScrollView>
      <View style={styles.butt}>
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
        onConfirm={(date: any) => {
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
      <DropdownModal
        visible={dropOpen}
        options={teamData}
        onClose={() => setDropOpen(false)}
        onSelect={(option: any) => setSelectedOption(option)}
      />
      <DropdownModal
        visible={postionModal}
        options={postionData}
        onClose={() => setPostionModal(false)}
        onSelect={(option: any) => setSelectedPosition(option)}
      />
      <DropdownModal
        visible={tariningModal}
        options={trainingData}
        onClose={() => setTariningModal(false)}
        onSelect={(option: any) => setSelectedTraining(option)}
      />
    </SafeAreaView>
  );
};
export default AddPlayer;
