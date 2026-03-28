import { base_url, constant } from "../../config/constant";
import ScreenNameEnum from "../../routes/screenName.enum";
import { errorToast, successToast } from "../../utils/customToast";
import { loginSuccess } from "../feature/authSlice";
import { getSuccess, profileFetchFailed } from "../feature/authGetSlice";



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
        formdata.append("device_id", param?.token);
        formdata.append("type", param?.logintype);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };
        console.log("formdata",formdata)
        const respons = await fetch(`${base_url}${constant.Login}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                console.log("res",res)

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
        formData.append("type", param?.type);
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
                    if (param?.type == "Resend") {

                    }
                    else {
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
                    param.navigation.navigate(ScreenNameEnum.LoginScreen)
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
        setLoading(true)
         const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        if (param?.images) {
            formData.append("image", {
                uri: param?.images,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("user_id", param?.userId);
        formData.append("user_name", param?.name);
        formData.append("mobile", param?.mobile);
        formData.append("email", param?.email);
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
                    param.navigation.goBack()
                    // param.navigation.navigate(ScreenNameEnum.TabNavigator)
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

const DelliteApi = async (userId, setLoading) => {
    try {
      setLoading(true);
      const url = `${base_url}logout?user_id=${userId}`;
  
      const response = await fetch(url, {
        method: 'GET',  // ya POST agar API accept karti hai query params ke sath
        headers: {
          Accept: 'application/json',
        },
      });
  
      const resJson = await response.json();
  console.log("resJson",resJson)
      if (resJson.status === '1') {
        successToast(resJson.message);
        setLoading(false);
        // navigation or other logic
        return resJson;
      } else {
        errorToast(resJson.message || 'Something went wrong');
        setLoading(false);
        return resJson;
      }
    } catch (error) {
      setLoading(false);
      errorToast('Network error');
      console.error(error);
      return null;
    }
  };
  
// const DelliteApi = async (param, setLoading) => {
//     try {
//       setLoading(true);
//       const myHeaders = new Headers();
//       myHeaders.append('Accept', 'application/json');
  
//       const formData = new FormData();
//       formData.append('user_id', param?.userId);
  
//       const requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: formData,
//       };
  
//       const response = await fetch(`${base_url}${constant.updateProfile}`, requestOptions);
  
//       const resText = await response.text();
//       const resJson = JSON.parse(resText);
  
//       if (resJson.status === '1') {
//         successToast(resJson.message);
//         param.navigation.goBack();
//         setLoading(false);
//         return resJson;
//       } else {
//         errorToast(resJson.message || resJson.error || 'Something went wrong');
//         setLoading(false);
//         return resJson;
//       }
//     } catch (error) {
//       setLoading(false);
//       errorToast('Network error');
//       console.error('DeleteApi error:', error);
//       return null;
//     }
//   };
  const StartSection = async (param, setLoading) => {
  try {
    setLoading(true);

    const headers = new Headers();
    headers.append("Accept", "application/json");

    const formData = new FormData();

    const playerIds = Array.isArray(param?.players)
      ? param.players.join(",")
      : param?.players;

    formData.append("user_id", playerIds);
    formData.append("coach_id", param?.coach_id);
    formData.append("session_start_date", param?.date);
    formData.append("session_start_time", param?.time);
    formData.append("training_id", param?.training_id);
    formData.append("question_id", param?.question_id);
    formData.append("type", param?.session_type);

    console.log("📦 FormData sending...");

    const response = await fetch(
      `${base_url}${constant.add_coach_session}`,
      {
        method: "POST",
        headers: headers,
        body: formData,
      }
    );

    const result = await response.text();
    console.log("✅ API Response:", result);

    const data = JSON.parse(result);

    setLoading(false);

    if (data.status == "1") {
      successToast(data?.message);
      param?.navigation?.goBack();
      return data;
    } else {
      errorToast(data?.message || data?.error);
      return data;
    }

  } catch (error) {
    setLoading(false);
    console.log("❌ API Error:", error);
  }
};

// const StartSection = async (
//     param,
//     setLoading,
// ) => {
//     try {
//         setLoading(true)
//          const myHeaders = new Headers();
//         myHeaders.append("Accept", "application/json");
//         const formData = new FormData();
//         const playerIds = Array.isArray(param?.players) ? param.players.join(',') : param?.players;
//         formData.append("user_id", playerIds);
//         formData.append("coach_id", param?.coach_id);
//         formData.append("session_start_date", param?.date);
//         formData.append("type", param?.session_type);
//         formData.append("session_start_time", param?.time);
//         if (param?.session_type) {
//             formData.append("session_type", param?.session_type);
//         }
//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: formData,
//         };
//          const respons = await fetch(`${base_url}${constant.add_coach_session}`, requestOptions)
             

//         .then((response) => response.text())
//             .then((res) => {
//                 console.log("response",response)
//                 const response = JSON.parse(res);
//                 if (response.status == '1') {
//                     setLoading(false)
//                     successToast(
//                         response?.message
//                     );
//                     param.navigation.goBack()
//                     // param.navigation.navigate(ScreenNameEnum.TabNavigator)
//                     return response
//                 } else {
//                     setLoading(false)
//                     errorToast(
//                         response?.message || response?.error,
//                     );
//                     return response
//                 }
//             })
//             .catch((error) =>
//                 console.error(error));
//         return respons
//     } catch (error) {
//         setLoading(false)
      
//     }
// };
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
        console.log("responseData",responseData)
        if (responseData.status === '1') {
            dispatch(
                getSuccess({
                    userGetData: responseData.result,
                })
            );
            return { userGetData: responseData.result };
        } else {
            if (responseData.status === '0' || responseData.status === 0) {
                dispatch(profileFetchFailed());
            }
            errorToast(responseData.message || 'Unsuccessfully');
        }
    } catch (error) {
        errorToast('Network error');
    }
};

const GetaboutusePolicyApi = async (
    setLoading,
) => {
    try {
        setLoading(true)

        const requestOptions = {
            method: "GET",
        };
        const respons = await fetch(`${base_url}${constant.getAboutUs}`, requestOptions)
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
        formData.append("confirm_password", param?.confirm_password);
        formData.append("old_password", param?.currentPass);
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
                    param.navigation.goBack()
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




const PlayerPostApi = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        const formattedDate = param?.dob ? param?.dob?.toLocaleDateString() : '';

        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        if (param?.addImage) {
            formData.append("image", {
                uri: param?.addImage,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("coach_id", param?.userId);
        formData.append("email", param?.email);
        formData.append("password", param?.pass);
        formData.append("player_id", param?.playerId);
        formData.append("position_id", param?.posttion);
        formData.append("load_type_id", param?.traing);
        formData.append("team_id", param?.team);
        formData.append("user_name", param?.fullName ?? '');
        formData.append("player_details", param?.notes ?? '');
        formData.append("dob", formattedDate ?? '');
        formData.append("injury", param?.injury ?? '');
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.addPlayer}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                console.log("res add --- ", res);
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    // param.navigation.navigate(ScreenNameEnum.TabNavigator)
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



const PlayerPostEditApi = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        const formattedDate = param?.dob ? param?.dob?.toLocaleDateString() : param?.newDate;
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        if (param?.addImage) {
            formData.append("image", {
                uri: param?.addImage,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        }
        formData.append("user_id", param?.userId);
        formData.append("player_id", param?.player_id);
        formData.append("user_name", param?.fullName);
        if (param?.posttion) {
            formData.append("position_id", param?.posttion);
        }
        if (param?.traing) {
            formData.append("load_type_id", param?.traing);
        }
        if (param?.team) {
            formData.append("team_id", param?.team);
        }
        formData.append("dob", formattedDate ?? '');
        formData.append("player_details", param?.notes ?? '');
        formData.append("injury", param?.injury ?? '');
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.updatePlayer}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                 const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.navigate(ScreenNameEnum.TabNavigator)
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
        console.log("error", error)

        setLoading(false)
        errorToast(
            'Network error',
        );
    }
};


const Teamcategory = async (
    setisLoading
) => {
    try {
        setisLoading(true)
        const requestOptions = {
            method: "GET",
        };
        const respons = await fetch(`${base_url}${constant.GettTeam}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setisLoading(false)

                    return response
                } else {
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
        errorToast(
            'Network error',
        );
    }
};


const PositioncCategory = async (
) => {
    try {
        const requestOptions = {
            method: "GET",
        };
        const respons = await fetch(`${base_url}${constant.getPosition}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {

                    return response
                } else {
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
        errorToast(
            'Network error',
        );
    }
};

const TrainingCategory = async (
) => {
    try {
        const requestOptions = {
            method: "GET",
        };
        const respons = await fetch(`${base_url}${constant.getLoadType}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {

                    return response
                } else {
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
        errorToast(
            'Network error',
        );
    }
};


const Getplayer = async (userId, setLoading) => {
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const response = await fetch(`${base_url}${constant.getPlayer}?user_id=${userId}`, requestOptions);
        console.log("response.  dddd ----",response)
        // const response = await fetch(`${base_url}${constant.getPlayer}?coach_id=${userId}`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        if (responseData.status === '1') {
            // successToast(responseData.message);
            return { userGetData: responseData.result };
        } else {
            errorToast(responseData.message);
            return null;
        }
    } catch (error) {
        errorToast('Network error');
        return null;
    } finally {
        setLoading(false);
    }
};
const Getplayer2 = async (userId, setLoading) => {
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const response = await fetch(`${base_url}${constant.get_user_session}?user_id=${userId}`, requestOptions);
        console.log("response.  dddd ----",response)
        // const response = await fetch(`${base_url}${constant.getPlayer}?coach_id=${userId}`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        if (responseData.status === '1') {
            // successToast(responseData.message);
            return { userGetData: responseData.result };
        } else {
            errorToast(responseData.message);
            return null;
        }
    } catch (error) {
        errorToast('Network error');
        return null;
    } finally {
        setLoading(false);
    }
};

const GetNotifications = async (userId, setLoading) => {
    console.log("userId",userId)
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
        };
        const response = await fetch(`${base_url}${constant.getNotifications}?user_id=${userId}`, requestOptions);
          const resText = await response.text();
        const responseData = JSON.parse(resText);
         if (responseData.status === '1') {
            successToast(responseData.message);
            return { userGetData: responseData.result };
        } else {
            errorToast(responseData.message);
            return null;
        }
    } catch (error) {
        errorToast('Network error');
        return null;
    } finally {
        setLoading(false);
    }
};

const SumitRpfFrom = async (
    param,
    setLoading,
) => {
     try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", param?.userId);
        formData.append("rpf_session", param?.session);
        formData.append("rpf_date", param?.date);
        formData.append("rate_efforts", param?.effort);
        formData.append("rpf_start_time", param?.Starttime);
        formData.append("comment", param?.comments);
        if (param?.training_id != null && param?.training_id !== undefined && param?.training_id !== '') {
            formData.append("training_id", param?.training_id);
        }
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.addubmitRPF}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                console.log("res", res)
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
                    // param.navigation.navigate(ScreenNameEnum.TabNavigator)
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

const GetTraining = async (type = 'before_training') => {
    try {
        const response = await fetch(`${base_url}${constant.get_training}?type=${type}`);
        const text = await response.text();
        if (!text || typeof text !== 'string') return [];
        const trimmed = text.trim();
        if (/file_get_contents|wrapper is disabled|allow_url_fopen|Fatal error|Parse error|server configuration/i.test(trimmed)) {
            console.warn('GetTraining: server returned an error response');
            return [];
        }
        try {
            const json = JSON.parse(trimmed);
            if (json && Array.isArray(json.result)) return json.result;
            if (json && json.result != null && !Array.isArray(json.result)) return [];
            return [];
        } catch (_) {
            return [];
        }
    } catch (error) {
        console.error('GetTraining error:', error);
        return [];
    }
};

const EndSection = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
         const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("id", param?.players);
        // formData.append("user_id", param?.players);
        formData.append("session_end_time", param?.time);
        formData.append("session_end_time", param?.time);
        formData.append("question_id", param?.question_id);
        formData.append("training_id", param?.question_id);
//          formData.append("coach_id", param?.coach_id);

        formData.append("session_end_date", param?.date);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };

        console.log("dddddd---- ",formData)
         const respons = await fetch(`${base_url}${constant.update_coach_session}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                console.log("response.status",response.status)

                 if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message || ""
                    );
                    param.navigation.goBack()
                    // param.navigation.navigate(ScreenNameEnum.TabNavigator)
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

// const EndRpfFrom = async (
//     param,
//     setLoading,
// ) => {
//     try {
//         setLoading(true)
//         const myHeaders = new Headers();
//         myHeaders.append("Accept", "application/json");
//         const formData = new FormData();
//         formData.append("submit_RPF_id", param?.userId);
//         formData.append("rpf_end_time",param.time);
//         formData.append("rpf_end_date",param.data);
//         constant.log("formData",formData)
//          const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: formData,
//         };
//         const respons = await fetch(`${base_url}${constant.submit_RPF_id}`, requestOptions)
//             .then((response) => response.text())
//             .then((res) => {
//                 console.log("res", res)
//                 const response = JSON.parse(res);
//                 if (response.status == '1') {
//                     setLoading(false)
//                     successToast(
//                         response?.message
//                     );
//                     param.navigation.goBack()
//                      return response
//                 } else {
//                     setLoading(false)
//                     errorToast(
//                         response?.message || response?.error,
//                     );
//                     return response
//                 }
//             })
//             .catch((error) =>
//                 console.error(error));
//         return respons
//     } catch (error) {
//         console.log("res", error)

//         setLoading(false)
//         errorToast(
//             'Network error',
//         );
//     }
// };

const EndRpfFrom = async (param, setLoading) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("submit_RPF_id", param?.userId);
        formData.append("rpf_end_time", param?.date);
        formData.append("rpf_end_date", param?.time);
         console.log("Form Data: ", formData);

        const response = await fetch("https://server-php-8-3.technorizen.com/Football/api/update_submit_RPF", {
            method: "POST",
            body: formData,
        });

        // Log status and headers of the response
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Raw Response Text:", text);

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(text);
        } catch (parseError) {
            throw new Error("Failed to parse JSON: " + parseError.message);
        }
         if (jsonResponse.status === '1') {
            successToast(jsonResponse.message);
            param.navgation.goBack();
        } else {
            errorToast(jsonResponse.message || jsonResponse.error || "Something went wrong");
        }

        return jsonResponse;

    } catch (error) {
        console.error("Error:", error);
        errorToast('Network error');
        return null;
    } finally {
        setLoading(false);
    }
};



const GetSubmitRPF = async (userId, setLoading) => {
    try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const response = await fetch(`${base_url}${constant.getSubmit_RPF}?user_id=${userId}`, requestOptions);
        const resText = await response.text();
        const responseData = JSON.parse(resText);
        if (responseData.status === '1') {
            successToast(responseData.message);
            return { userGetData: responseData.result };
        } else {
            // errorToast(responseData.message);
            return null;
        }
    } catch (error) {
        errorToast('Network error');
        return null;
    } finally {
        setLoading(false);
    }
};


// const GetAllChatMessage = async (setLoading, userId) => {
//     try {
//         setLoading(true);

//         const myHeaders = new Headers();
//         myHeaders.append("Accept", "application/json");

//         const formData = new FormData();
//         formData.append("receiver_id", "2");

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders, // No need to set `Content-Type` for FormData
//             body: formData
//         };

//         const response = await fetch(`${base_url}${constant.getConversation}`, requestOptions);
//         const resText = await response.text();
//         const responseData = JSON.parse(resText);
//         console.log("ddddd",responseData)
//         if (responseData.status === '1') {
//             successToast(responseData.message);
//             return { userGetData: responseData.result };
//         } else {
//              return null;
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         errorToast('Network error');
//         return null;
//     } finally {
//         setLoading(false);
//     }
// };

const GetAllChatMessage = async (setLoading, userId) => {
    try {
        setLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        const formData = new FormData();
        formData.append("receiver_id", userId); // Pass dynamic userId instead of static "2"

        const requestOptions = {
            method: "POST",
            headers: myHeaders, // No need to set `Content-Type` for FormData
            body: formData
        };

        const response = await fetch(`${base_url}${constant.getConversation}`, requestOptions);
        const resText = await response.text();

        try {
            const responseData = JSON.parse(resText);
 
            // ✅ FIXED: Check for both number 1 and string "1"
            if (responseData.status == 1) {
                return { userGetData: responseData.result };
            } else {
                console.error("API returned error status:", responseData);
                return null;
            }
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError, resText);
            return null;
        }
    } catch (error) {
        console.error("Network Error:", error);
        return null;
    } finally {
        setLoading(false);
    }
};
const GetCoachSession = async (setLoading, userId) => {
    try {
      setLoading(true);
  
      const response = await fetch(
        `${base_url}${constant.get_coach_session}?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("response. GetCoachSession ",response)
  
      const resText = await response.text();
       try {
        const responseData = JSON.parse(resText);
   
        if (responseData?.status == 1) {
          return { userGetData: responseData?.result };
        } else {
          console.error("API returned error status:", responseData);
          return null;
        }
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError, resText);
        return null;
      }
    } catch (error) {
      console.error("Network Error:", error);
      return null;
    } finally {
      setLoading(false);
}
  };
const Get_user_by_id = async (setLoading, userId) => {
  try {
    setLoading(true);

    const response = await fetch(
      `https://kmmps.store/api/get_coach_session?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const resText = await response.text();

    try {
      const responseData = JSON?.parse(resText);
 
      if (responseData?.status == 1) {
        return { userGetData: responseData?.result };
      } else {
         return null;
      }
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError, resText);
      return null;
    }
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  } finally {
    setLoading(false);
  }
};
const Get_user_by_id2 = async (setLoading, userId) => {
  try {
    setLoading(true);

    const response = await fetch(
      `https://kmmps.store/api/get_user_session?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const resText = await response.text();

    try {
      const responseData = JSON.parse(resText);
 
      if (responseData.status == 1) {
        return { userGetData: responseData.result };
      } else {
        console.error("API returned error status:", responseData);
        return null;
      }
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError, resText);
      return null;
    }
  } catch (error) {
    console.error("Network Error:", error);
    return null;
  } finally {
    setLoading(false);
  }
};
  
  



const SendMessage = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("sender_id", param?.senderId);
        formData.append("receiver_id", param?.receiverId);
        formData.append("chat_message", param?.chatMessage);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.sendChat}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                 const response = JSON.parse(res);
                if (response.result.chat_message) {
                    setLoading(false)
                   
                    
                    // param.navigation.navigate(ScreenNameEnum.TabNavigator)
                    return response
                } else {
                    setLoading(false)

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

const FeedbackApicall = async (
    param,
    setLoading,
) => {
    try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", param?.userID);
        formData.append("feedback", param?.feedbackText);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        console.log("-------", formData)
        const respons = await fetch(`${base_url}${constant.addFeedback}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                console.log("-ol", res)
                const response = JSON.parse(res);
                if (response.status == '1') {
                    setLoading(false)
                    successToast(
                        response?.message
                    );
                    param.navigation.goBack()
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




const GetChat = async (
    params,
) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("sender_id", params?.senderId);
        formData.append("receiver_id", params?.receiverId);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.getChat}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                const response = JSON.parse(res);
                if (response.status == '1') {
                    return response
                } else {
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




const AttendanceApi = async (
    param,
    setLoading,
) => {
     
     try {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("user_id", param?.userId);
        formData.append("attendance", param?.type);
       
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const respons = await fetch(`${base_url}${constant.add_attendance}`, requestOptions)
            .then((response) => response.text())
            .then((res) => {
                console.log("res", res)
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

/**
 * Create checkout session for subscription (e.g. Stripe/payment).
 * POST FormData: email, price, user_id, access_token (backend recognises logged-in user).
 */
const createCheckoutSession = async (param, setLoading) => {
    try {
        setLoading?.(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const formData = new FormData();
        formData.append("email", param?.email ?? "");
        formData.append("price", String(param?.price ?? ""));
        formData.append("user_id", String(param?.user_id ?? ""));
        const authToken = param?.token || param?.access_token;
        if (authToken) {
            formData.append("access_token", authToken);
            formData.append("token", authToken);
        }
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
        };
        const response = await fetch(`${base_url}${constant.createCheckoutSession}`, requestOptions);
        const resText = await response.text();
        const data = resText ? JSON.parse(resText) : {};
        setLoading?.(false);
        // Stripe response: { data: { url, id, ... } } or { url, status: '1', ... }
        const session = data?.data || data;
        const checkoutUrl = session?.url || data?.url;
        const isSuccess = response.ok && (checkoutUrl || data?.status === '1' || data?.sessionId);
        if (isSuccess) {
            successToast(data?.message || 'Redirecting to payment...');
            return { ...data, url: checkoutUrl, sessionId: session?.id || data?.sessionId };
        }
        if (response.status === 401) {
            errorToast(data?.message || 'Please login again to continue');
            return undefined;
        }
        errorToast(data?.message || data?.error || 'Checkout failed');
        return undefined;
    } catch (error) {
        setLoading?.(false);
        errorToast('Network error');
    }
};

export {DelliteApi,Getplayer2, Get_user_by_id2,GetCoachSession,Get_user_by_id, SendMessage,EndSection,StartSection,AttendanceApi,GetNotifications,EndRpfFrom, GetChat, FeedbackApicall, PrivacyPolicyApi, GetAllChatMessage, GetSubmitRPF, SumitRpfFrom, GetTraining, PlayerPostEditApi, Getplayer, TrainingCategory, PositioncCategory, Teamcategory, PlayerPostApi, GetaboutusePolicyApi, AddContactUs, ChangePasswordApi, LoginUserApi, UpdateProfile_Api, GetProfile, SinupUserApi, ForgotPassUserApi, OtpUserApi, UpdatePassUserApi, createCheckoutSession }  