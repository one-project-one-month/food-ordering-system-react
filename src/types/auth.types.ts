export interface AuthLoginState {
    isLoggedIn: boolean;
    loading: boolean,
    error: boolean,
}

export interface AuthMailState {
    loading: boolean,
    error: boolean,
}

export interface AuthUser {
    roleName: string;
    email: string;
    roleId: number;
    userId: number;
    token?: string;
    refreshToken?: string;
}

export interface AuthState {
  loginState: AuthLoginState;
  verifyEMailState: AuthMailState;
  user: AuthUser;
  redirectPath?: string | null;
  emailSubmitted?: boolean;
  otpVerified?: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface MailProps {
  email: string;
}

export interface OtpProps {
  email: string;
  code: string;
}
export interface SignupProps {
  email: string;
  password: string;
  role: string;
}

