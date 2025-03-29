import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputField from '../../../utils/TextInputField';
import Loading from '../../../utils/Loader';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import { styles } from '../loginStyle';
import ResponsiveSize from '../../../utils/ResponsiveSize';
import { wp } from '../../../utils/Constant';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useSignup from './useSinup';
import LoadingModal from '../../../utils/Loader';

export default function SignUp() {
    const {
        credentials,
        errors,
        isLoading,
        handleChange,
        handleSignup,
        navigation,
    } = useSignup()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBarCompoent />
            {isLoading ? <LoadingModal /> : null}

            <ScrollView showsVerticalScrollIndicator={false} >
                <View
                    style={{
                        backgroundColor: '#FFF',
                        padding: 15,
                        flex: 1,
                        marginTop: hp(8)
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
                            lable={"Email"}
                            onChangeText={(value: string) => handleChange('email', value)} // Handles email input dynamically
                            placeholder="Email"
                            text={credentials.email}
                            firstLogo={true}
                            img={imageIndex.emai}
                        />
                        {errors.email ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.email}</Text> : null}
                        <View style={{ marginTop: 12 }}>
                            <TextInputField
                                lable={"Mobile No."}
                                onChangeText={(value: string) => handleChange('mobile', value)} // Handles email input dynamically
                                text={credentials.mobile}

                                placeholder={'Mobile No.'}
                                firstLogo={true}
                                showEye={true}
                                img={imageIndex.phone}
                                type="decimal-pad"
                            />
                        </View>
                        {errors.mobile ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.mobile}</Text> : null}

                        <View style={{ marginTop: 12 }}>
                            <TextInputField
                                lable={"Password"}
                                onChangeText={(value: string) => handleChange('password', value)} // Handles email input dynamically
                                placeholder="Password"
                                text={credentials.password}
                                firstLogo={true}
                                showEye={true}
                                img={imageIndex.lock}
                            />
                        </View>
                        {errors.password ? <Text style={{ color: 'red', fontSize: 12, marginTop: 10 }}>{errors.password}</Text> : null}

                    </View>
                    <CustomButton
                        title={'Sign up'}
                        onPress={() => handleSignup()}
                         buttonStyle={{ width: "100%", marginTop: 28 }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 40,
                        alignSelf: 'center',
                        justifyContent: 'flex-end', // Change this to flex-end
                    }}>
                    <Text style={{ fontSize: 16, lineHeight: 22, color: 'rgba(0, 0, 0, 1)' }}>
                        Don’t have an account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenNameEnum.LoginScreen);
                        }}>
                        <Text style={Styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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


