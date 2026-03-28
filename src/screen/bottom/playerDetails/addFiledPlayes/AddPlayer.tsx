import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Platform } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import localizationStrings from '../../../../compoent/Localization/Localization';
import { useLanguage } from '../../../../compoent/Localization/LanguageContext';


const AddPlayer = () => {
  useLanguage();
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
    email, setEmail,
    password, setPassword
  } = useAddPlayer()
  const injuryOptions = [
    { id: '1', label: 'No Injury' },
    { id: '2', label: 'Select Previous Injuries' },
    { id: '3', label: 'Beginner' }
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => setInjuryHistory(item?.label)}
      style={[styles.radioButton, { justifyContent: 'space-between' }]}
    >
      <Text style={styles.radioText}>{item?.label}</Text>
      <Image
        source={injuryHistory !== item?.label ? imageIndex?.radio : imageIndex?.radioSlied}
        style={styles.img}
        resizeMode='contain'
        tintColor="#A0D803"
      />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <LoadingModal  visible={isLoading} />   */}

      <StatusBarComponent />
      <View style={{
        marginHorizontal: 12,

      }}>
        <CustomHeader imageSource={imageIndex.backNavs} label={localizationStrings?.AddPlayer} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0} // Adjust offset as needed
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled" // important to allow taps inside inputs
            contentContainerStyle={{ flexGrow: 1, marginHorizontal: 15 }}
          >

            <View style={styles.profileContainer}>
              <Image
                resizeMode='cover'
                source={imagePrfile ? { uri: imagePrfile } : imageIndex.prfEdit} style={styles.profileImage} />
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
            <Text style={styles.sectionTitle}>{localizationStrings?.BasicInformation}</Text>
            <View style={styles.input} >
              <TextInput placeholder={localizationStrings?.full}
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor={"rgba(45, 45, 45, 1)"}
                style={styles.textInupt}
              />
            </View>
            {errors.fullName && <Text style={styles.redText}>{errors.fullName}</Text>}
            <View style={styles.input} >
              <TextInput placeholder={localizationStrings.Email}
                value={email}
                onChangeText={(text) =>
                  setEmail(text.replace(/\s/g, ""))
                }
                placeholderTextColor={"rgba(45, 45, 45, 1)"}
                style={styles.textInupt}
              />
            </View>
            {errors.email && <Text style={styles.redText}>{errors.email}</Text>}

            <View style={styles.input} >
              <TextInput placeholder={localizationStrings.newpass}
                value={password}
                 onChangeText={(text) =>
                  setPassword(text.replace(/\s/g, ""))
                }
                // onChangeText={setPassword}
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
                {dob ? dob?.toDateString() : localizationStrings?.dob}
              </Text>
            </TouchableOpacity>
            {errors.dob && <Text style={styles.redText}>{errors.dob}</Text>}
            <View style={styles.input} >
              <TextInput placeholder={localizationStrings?.PlayerID}
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
                  }}>{selectedOption?.name || localizationStrings?.MyTeam || "Team"}
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
                    {selectedPosition?.position_name || localizationStrings?.Position || "Position"}
                  </Text>
                </View>
              </View>
              <Image source={imageIndex.arrowDown} style={{ height: 22, width: 22 }} resizeMode='contain' />
            </TouchableOpacity>
            {errors.selectedPosition && <Text style={styles.redText}>{errors.selectedPosition}</Text>}
            <Text style={styles.sectionTitle}>{localizationStrings?.TrainingPerformance}</Text>
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
            <Text style={styles.sectionTitle}>{localizationStrings?.InjuryHistory}</Text>
            <FlatList
              data={injuryOptions}
              keyExtractor={(item) => item?.id}
              renderItem={renderItem}
            />
            {errors.injuryHistory && <Text style={[styles.redText, {
              marginTop: 5
            }]}>{errors.injuryHistory}</Text>}
            <Text style={styles.sectionTitle}>{localizationStrings?.aAdditionala}</Text>
            <View style={styles.input} >
              <TextInput placeholder={localizationStrings?.PerformanceNotes}
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.butt}>
        <CustomButton
          title={localizationStrings.Save}
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
