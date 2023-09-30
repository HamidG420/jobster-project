import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';

/* 
  thunkAPI refers to the argument object provided to a Redux thunk function. Redux Thunk is a middleware that allows you to write asynchronous logic in Redux.
*/

// Register User thunkAPI Function
export const registerUserThunk = async function (url, user, thunkAPI) {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// Login the User thunkAPI Function
export const loginUserThunk = async function (url, user, thunkAPI) {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// Update User Profile thunkAPI Function
export const updateUserThunk = async function (url, user, thunkAPI) {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// Clear/Resetting States After User Logout

export const clearStoreThunk = async function (message, thunkAPI) {
  try {
    // logout user
    thunkAPI.dispatch(logoutUser(message));
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState());
    // clear job input values
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
