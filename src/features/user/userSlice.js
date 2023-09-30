// Third Party Library Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Developer Imports
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

// Thunk API Functions Imports
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from './userThunk';

// Initial State
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => registerUserThunk('/auth/register', user, thunkAPI)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => loginUserThunk('/auth/login', user, thunkAPI)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => updateUserThunk('/auth/updateUser', user, thunkAPI)
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

// Create User Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User Action -> Pending State: The user submits the registration form and presses the button. So isLoading property changes to true to represent the loading state to the user.
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      // Register User Action -> Fulfilled State: The user successfully registered and the data is stored in userSlice and local storage of the browser.
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      // Register User Action -> Rejected State: Error condition, which the server responds back with an error. A typical one is when the user enters a duplicate email.
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Login User Action -> Pending State: The user submits the login form and presses the button. So isLoading property changes to true to represent the loading state to the user.
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      // Login User Action -> Fulfilled State: The user successfully logged in and the data is stored in userSlice and local storage of the browser.
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      // Login User Action -> Rejected State: Error condition, which the server responds back with an error. A typical one is when the user enters invalid credentials.
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Update User's Profile Action -> Pending State: The user submits the profile form and presses the button. So isLoading property changes to true to represent the loading state to the user.
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      // Update User's Profile Action -> Fulfilled State: The user successfully edited his/her profile and the data is stored in userSlice and local storage of the browser.
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`User Updated!`);
      })
      // Update User's Profile Action -> Rejected State: Error condition, which the server responds back with an error. A typical one is when the user enters an existing email for his/her new email.
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Clear Store States Action -> Rejected State: Error condition, If somehow the promise of the thunkAPI was rejected... (Success Case is handled by other slices)
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error...');
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
