import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputField from '../../../utils/TextInputField';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { styles } from '../loginStyle';
import ResponsiveSize from '../../../utils/ResponsiveSize';
import { wp } from '../../../utils/Constant';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useSignup from './useSinup';
import LoadingModal from '../../../utils/Loader';
import DropdownModal from '../../../compoent/DropdownModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../compoent/Localization/Localization';

export default function SignUp() {
    const {
        credentials,
        errors,
        isLoading,
        handleChange,
        handleSignup,
        navigation,
        selectedOption, setSelectedOption,
        dropOpen, setDropOpen
    } = useSignup()
    interface Option {
        team_name: string;
        id: string;
      }
      
    const options: Option[] = [
        { team_name: "Coach", id: "1" },
        { team_name: "Player", id: "2" },
      ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBarCompoent />
            <LoadingModal visible={isLoading} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardDismissMode="on-drag"
                    >
                <View
                    style={{
                        backgroundColor: '#FFF',
                        padding: 15,
                        flex: 1,
                        marginTop: hp(2)
                    }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                        <Image
                            source={imageIndex.app}
                            style={{ height: 125, width: 125 }} resizeMode='contain'
                        />
                    </View>
                    <View style={{ marginTop: 7 }}>
                        <Text style={styles.txtHeading}>Sign Up</Text>
                        <Text style={styles.txtsubHeading}>
                            Enter your email and password
                        </Text>
                    </View>
                    <View style={{ marginTop: ResponsiveSize.marginTop(30), paddingVertical: hp(2), }}>
                        <TextInputField
                            lable={localizationStrings.Email}
                            onChangeText={(value: string) => handleChange('email', value)} // Handles email input dynamically
                            placeholder={localizationStrings.Email}
                            text={credentials.email}
                            firstLogo={true}
                            img={imageIndex.emai}
                        />
                        {errors.email ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.email}</Text> : null}
                        <View style={{ marginTop: 12 }}>
                            <TextInputField
                                lable={localizationStrings.MobileNo}
                                onChangeText={(value: string) => handleChange('mobile', value)} // Handles email input dynamically
                                text={credentials.mobile}
                                placeholder={localizationStrings.MobileNo}
                                firstLogo={true}
                                showEye={false}
                                img={imageIndex.phone}
                                type="decimal-pad"
                            />
                        </View>
                        {errors.mobile ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.mobile}</Text> : null}
                        <View style={{ marginTop: 12 }}>
                            <TextInputField
                                lable={localizationStrings.Password}
                                onChangeText={(value: string) => handleChange('password', value)} // Handles email input dynamically
                                placeholder={localizationStrings.Password}
                                text={credentials.password}
                                firstLogo={true}
                                showEye={true}
                                img={imageIndex.lock}
                            />
                        </View>
                        {errors.password ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.password}</Text> : null}
                    </View>
                    <TouchableOpacity
                        onPress={() => setDropOpen(true)}
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderColor: "#EBEBEB",
                            height: 60,
                            borderRadius: 15,
                            paddingHorizontal: 5,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth: 1.8,
                            marginTop: 5
                        }}>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 9 }}>

                            <Image source={imageIndex.addUser}


                                tintColor={"#EBEBEB"}
                                style={{ height: 24, width: 24 }} resizeMode='contain' />
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#EBEBEB",
                                height: 31,
                                width: 2,
                                borderRadius: 10,
                                marginLeft: 15
                            }} />
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 14,
                                    marginLeft: 18
                                }}>{selectedOption?.team_name ?? "Account Type"}
                                </Text>
                            </View>


                        </View>
                        <Image source={imageIndex.arrowDown}
                            tintColor={"#EBEBEB"}
                            style={{ height: 24, width: 24, right: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                    {errors.selectedOption ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.selectedOption}</Text> : null}
                    <CustomButton
                        title={localizationStrings.SignUp}
                        onPress={() => handleSignup()}
                        buttonStyle={{ width: "100%", marginTop: 28 }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 40,
                        marginBottom: 24,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 16, lineHeight: 22, color: 'rgba(0, 0, 0, 1)' }}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenNameEnum.LoginScreen);
                        }}>
                        <Text style={Styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
            <DropdownModal
                visible={dropOpen}
                options={options}
                onClose={() => setDropOpen(false)}
                onSelect={(option) => setSelectedOption(option)}
            />
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        color: 'rgba(255, 77, 76, 1)',
        bottom: 2
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: '#E8442E',
        height: 55,

        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: wp(90),
    },
});


