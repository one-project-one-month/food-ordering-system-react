/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../config/axios";
import type { AuthState, LoginProps, MailProps, SignupProps } from "../../types/auth.types";

const userUrl = 'api/v1/auth/users';

export const verifyEmail = createAsyncThunk<any, MailProps>(
  "auth/checkmail",
  async ({email}, { rejectWithValue }) => {
    try {
      const result = await api.post(`${userUrl}/verifyEmail`, {
        email
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during checking email"
      );
    }
  }
);

export const verifyAccount = createAsyncThunk<any, MailProps>(
  "auth/verifyAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(`${userUrl}/verifyAccount`, {
        ...payload
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during checking account"
      );
    }
  }
);

export const signup = createAsyncThunk<any, SignupProps>(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(userUrl, {
        ...payload
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during signup"
      );
    }
  }
);

export const login = createAsyncThunk<any, LoginProps>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(`${userUrl}/login`, {
        email: payload.email,
        password: payload.password
      });
      return result.data;

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
    refreshToken: "",
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
        refreshToken: "",
      };

      // Clear cookies
      Cookies.remove("role");
      Cookies.remove("userId");
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("restaurantId")
      Cookies.remove("logged_in")
      Cookies.remove("userName")
      Cookies.remove("userProfileImage")
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

      state.user.roleName = action.payload.data.roleName;
      state.user.token = action.payload.data.token;
      state.user.refreshToken = action.payload.data.RefreshToken;
      state.user.userId = action.payload.data.userId;

      const role = action.payload.data.roleName==='RESTAURANT_OWNER'?'owner': action.payload.data.roleName==='DELIVERY_STUFF'?'delivery': action.payload.data.roleName==='CUSTOMER'?'customer': action.payload.data.roleName==='SUPER_ADMIN'?'admin':''

      Cookies.set("role", role, {
        expires: 1,
      });
      Cookies.set("token", action.payload.data.token, {
        expires: 1,
      });
      Cookies.set("refreshToken", action.payload.data.RefreshToken, {
        expires: 1,
      });
      Cookies.set("userId", action.payload.data.userId, {
        expires: 1,
      });
      Cookies.set('userName',action.payload.data?.profile?.name)
      Cookies.set('userProfileImage',action.payload.data.profile?.profilePic as string)
    });
    builder.addCase(login.pending, (state) => {
      state.loginState.loading = true;
      state.loginState.error = false;
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
    builder.addCase(signup.fulfilled, (state) => {
      state.loginState.loading = false;
      state.loginState.error = false;
    });
    builder.addCase(signup.pending, (state) => {
      state.loginState.loading = true;
      state.loginState.error = false;
    });
    builder.addCase(signup.rejected, (state) => {
      state.loginState.loading = false;
      state.loginState.error = true;
    });
  },
});

export default authSlice.reducer;

// Export the action creators
export const { logout, setRedirectPath, clearRedirectPath, setEmailSubmitted, setOtpVerified, resetFlow} = authSlice.actions;