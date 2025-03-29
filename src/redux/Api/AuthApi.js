  import { base_url, constant } from "../../config/constant";
import ScreenNameEnum from "../../routes/screenName.enum";
import { errorToast, successToast } from "../../utils/customToast";
import { loginSuccess } from "../feature/authSlice";
  
 
    
const LoginUserApi = async (
    param,
    setLoading,
    dispatch) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("email", param?.email);
        formdata.append("password", param?.password);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = await fetch(`${base_url}${constant.Login}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response?.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    dispatch(loginSuccess({ userData: response?.result, token: response?.result?.access_token, }));
                    param.navigation.reset({
                        index: 0,
                        routes: [{ name: ScreenNameEnum.TabNavigator }],
                    });
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};
const SinupUserApi = async (param, setLoading) => {
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("mobile", param?.mobile);
        formData.append("email", param?.email);
        formData.append("password", param?.password);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const response = await fetch(`${base_url}${constant.SignUp}`, requestOptions);
         const res = await response.text();
        const jsonResponse = JSON.parse(res);
        setLoading(false);
        if (jsonResponse?.status === "1") {
            successToast(jsonResponse?.message);
            param?.navigation.navigate(ScreenNameEnum.LoginScreen);
            return jsonResponse;
        } else {
            errorToast(jsonResponse?.message);
            return jsonResponse;
        }
    } catch (error) {
        setLoading(false);
         errorToast("Network error");
    }
};

const ForgotPassUserApi = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("email", param?.email);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = await fetch(`${base_url}${constant.ForgetPassword}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                 if (response?.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    ); 
                    if(param?.type =="Resend") {
                        
                    }
                    else{
                        param?.navigation.navigate(ScreenNameEnum.OtpScreen, {
                            email: param?.email
                        });
                    }
                  
                    return response
                } else {
                    setLoading(false)
                     errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const OtpUserApi = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("email", param?.email);
        formdata.append("otp", param?.otp);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = await fetch(`${base_url}${constant.OtpVerify}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response?.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.CreatePassword, {
                        userId: response?.result?.id
                    })
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const UpdatePassUserApi = async (
    param,
    setLoading,
) => {

    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", param?.userId);
        formdata.append("password", param?.confirm_password);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const respons = await fetch(`${base_url}${constant.UpdatePassword}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res)
                if (response?.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.loginSuccess)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.message,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

const UpdateProfile_Api = async (
    param,
    setLoading,
) => {
     try {
        console.log("param?.countrycode",param?.countrycode)
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        if (param?.images) {
            formData.append("image", {
                uri: param?.images?.path,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("user_name", param?.name ?? '');
        formData.append("user_id", param?.userId);
        formData.append("gender", param?.gender);
        formData.append("mobile", param?.mobile);
        formData.append("country_code", param?.countrycode);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.updateProfile}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );

                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message || response?.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetProfile = async (userId, dispatch) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formdata = new FormData();
        formdata.append("user_id", userId);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        const response = await fetch(`${base_url}${constant.getrofile}`, requestOptions)
        const resText = await response.text(); // Ensure text is received before parsing
        const responseData = JSON.parse(resText);
        if (responseData.status === '1') {
            dispatch(
                getSuccess({
                    userGetData: responseData.result,
                })
            );
            return { userGetData: responseData.result };
        } else {
            errorToast(responseData.message);
        }
    } catch (error) {
        errorToast('Network error');
    }
};

const PrivacyPolicyApi = async (
    setLoading,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = await fetch(`${base_url}${constant.getPrivacy}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};



const AddContactUs = async (
    data,
    setLoading,
    id,
) => {

    try {
        setLoading(true)
        const formData = new FormData();
        const myHeaders = new Headers();
        formData.append("user_id", id);
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("mobile", data?.mobile);
        formData.append("message", data?.message);
        console.log("formData", formData)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.AddContact_us}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false);
                    successToast(
                        response?.message
                    );
                    data.navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message || response?.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const GetfaqApi = async (setisLoading) => {
    setisLoading(true);
    try {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const url = `${base_url}${constant.Getfaq}`;
        const response = await fetch(url, requestOptions);
        const responseData = await response.json(); // Directly parse JSON
        setisLoading(false);
        if (responseData?.status === '1') {
            return { userGetData: responseData?.result };
        } else {
            errorToast(responseData?.message);
            return null;
        }
    } catch (error) {
        errorToast('Network error');
        setisLoading(false);
        return null;
    }
};

const ChangePasswordApi = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", param?.userId);
        formData.append("password", param?.password);
         const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.changePassword}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
                    return response
                } else {
                    setLoading(false)
                    errorToast(
                        response?.message || response?.error,
                    );
                    return response
                }
            })
            .catch((error) =>
                console.error(error));
        return respons
    } catch (error) {
        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};

export { PrivacyPolicyApi, GetfaqApi, AddContactUs, ChangePasswordApi, LoginUserApi, UpdateProfile_Api, GetProfile, SinupUserApi, ForgotPassUserApi, OtpUserApi, UpdatePassUserApi }  