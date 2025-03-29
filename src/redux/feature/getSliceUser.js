import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base_url } from '../../Api';
   
export const GetUserApi = createAsyncThunk('getUserProfile', async (params, thunkApi) => {
   try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const formdata = new FormData();
    formdata.append("user_id", params);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
     const response = await fetch(`${base_url}/get-profile`, requestOptions);
    const resText = await response.text();
    const responseData = JSON.parse(resText);
     if (responseData.status === '1') {
        thunkApi.dispatch(
        getSuccess({
          userGetData: responseData.result,   
         })
      );

      return { userGetData: responseData.result,  };
     } else {
       errorToast(responseData.message);
      return thunkApi.rejectWithValue(responseData);
    }
  } catch (error) {
     errorToast('Network error');
    return thunkApi.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userGetData: null,
     loading: false,
    error: null,
  },
    reducers: {
    getSuccess(state, action) {
       state.isSuccess = true;
      state.isError = false;
       state.userGetData = action.payload.userGetData;
     },
    
  },
});

export const { getSuccess } = userSlice.actions;
export default userSlice.reducer;
