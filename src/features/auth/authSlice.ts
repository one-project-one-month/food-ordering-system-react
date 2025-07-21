/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../config/axios";
import type { AuthState, LoginProps, MailProps } from "../../types/auth.types";

const userUrl = 'api/v1/auth/users';

export const verifyEmail = createAsyncThunk<any, MailProps>(
  "auth/checkmail",
  async ({email}, { rejectWithValue }) => {
    try {
      const result = await api.post(`${userUrl}/verifyEmail`, {
        email
      });
      console.log("after call api result ", result)
      return result;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during checking email"
      );
    }
  }
);

export const login = createAsyncThunk<any, LoginProps>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    console.log("Pyaload ", payload)
    try {
      const result = await api.post(`${userUrl}/login`, {
        email: payload.email,
        password: payload.password
      });
      console.log("after call api result ", result)
      return result;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during login"
      );
    }
  }
);

const initialState: AuthState = {
  loginState: {
    isLoggedIn: false,
    loading: false,
    error: false,
  },
  verifyEMailState: {
    loading: false,
    error: false,
  },
  user: {
    roleName: "",
    email: "",
    roleId: 0,
    userId: 0,
    token: "",
  },
  redirectPath: null,
  emailSubmitted: Cookies.get('emailSubmitted') === 'true',
  otpVerified: Cookies.get('otpVerified') === 'true',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginState.isLoggedIn = false;
      state.user = {
        roleName: "",
        email: "",
        roleId: 0,
        userId: 0,
        token: "",
      };

      // Clear cookies
      Cookies.remove("role");
      Cookies.remove("userId");
      Cookies.remove("token");
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
    clearRedirectPath: (state) => {
      state.redirectPath = null;
    },
    setEmailSubmitted: (state, action) => {
      state.emailSubmitted = true;
      Cookies.set('emailSubmitted', String(action.payload));
    },
    setOtpVerified: (state, action) => {
      state.otpVerified = true;
      Cookies.set('otpVerified', String(action.payload));
    },
    resetFlow: (state) => {
      state.emailSubmitted = false;
      state.otpVerified = false;
      Cookies.remove('emailSubmitted');
      Cookies.remove('otpVerified');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action:any) => {
      state.loginState.isLoggedIn = true;
      state.loginState.loading = false;
      state.loginState.error = false;

      state.user.roleName = action.payload.data.data.roleName;
      state.user.token = action.payload.data.data.token;
      state.user.userId = action.payload.data.data.userId;

      const role = action.payload.data.data.roleName==='RESTAURANT_OWNER'?'owner': action.payload.data.data.roleName==='DELIVERY_STUFF'?'delivery': action.payload.data.data.roleName==='CUSTOMER'?'customer': action.payload.data.data.roleName==='SUPER_ADMIN'?'admin':''

      Cookies.set("role", role, {
        expires: 1,
      });
      Cookies.set("token", action.payload.data.data.token, {
        expires: 1,
      });
      Cookies.set("userId", action.payload.data.data.userId, {
        expires: 1,
      });
    });
    builder.addCase(login.pending, (state) => {
      state.loginState.loading = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginState.loading = false;
      state.loginState.error = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.verifyEMailState.loading = false;
      state.verifyEMailState.error = false;
    });
    builder.addCase(verifyEmail.pending, (state) => {
      state.verifyEMailState.loading = true;
      state.verifyEMailState.error = false;
    });
    builder.addCase(verifyEmail.rejected, (state) => {
      state.verifyEMailState.loading = false;
      state.verifyEMailState.error = true;
    });
  },
});

export default authSlice.reducer;

// Export the action creators
export const { logout, setRedirectPath, clearRedirectPath, setEmailSubmitted, setOtpVerified, resetFlow} = authSlice.actions;