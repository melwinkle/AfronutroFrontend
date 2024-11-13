// slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  password_reset,
  password_confirmation,
  verify_email,
  resend_verification,
  reset_confirmation,
  get_profile,
  update_profile,
  updateactive
} from "../../services/api.js"; // Import your API functions
import { REHYDRATE } from 'redux-persist';
import { persistor } from '../store'; // Import persistor



export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await login(email, password);
      
      // After successful login, immediately get the user profile
      const profileResponse = await get_profile();
      
      // Return both the auth info and user profile
      return profileResponse.data;
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "ECONNABORTED") {
        return rejectWithValue("Request timed out. Please try again.");
      }
      return rejectWithValue(
        error.response?.data || "An error occurred during login."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      await persistor.purge();
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




// send request

export const resetPassword = createAsyncThunk(
  "auth/password-reset",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await password_reset(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update the resetConfirmation thunk
export const resetConfirmation = createAsyncThunk(
  "auth/password-reset-confirm",
  async ({ uid, token }, { rejectWithValue }) => {
    try {
      const response = await reset_confirmation(uid, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Invalid or expired password reset link');
    }
  }
);

// Update the passwordConfirmation thunk
export const passwordConfirmation = createAsyncThunk(
  "auth/password-confirmation",
  async ({ uid, token, newpassword }, { rejectWithValue }) => {
    try {
      const response = await password_confirmation(uid, token, newpassword);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to change password'
      );
    }
  }
);

// resend-verification-email
export const resendVerificationEmail = createAsyncThunk(
  "auth/resend-verification-email",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await resend_verification(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// verify-email/
export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async ({ uid,token }, { rejectWithValue }) => {
    try {
      const response = await verify_email(uid,token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get profile/
export const getProfile = createAsyncThunk(
  "auth/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_profile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// update profile
export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async ({username,gender,height,weight}, { rejectWithValue }) => {
    try {
      const response = await update_profile(username,gender,height,weight);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add this to your authSlice.js
export const activateUser = createAsyncThunk(
  'auth/activateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateactive(data);
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  }
);










const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:  null,
    isAuthenticated: false,
    loading: false,
    error: null,
    resetStatus: null,
    resetError: null,
    passwordChangeStatus: null,
    passwordChangeError: null,
    verificationStatus: null,
  verificationError: null,
  resendVerificationStatus: null,
  resendVerificationError: null,
  pendingVerificationEmail: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResetStatus: (state) => {
      state.resetStatus = null;
      state.resetError = null;
    },
    clearPasswordChangeStatus: (state) => {
      state.passwordChangeStatus = null;
      state.passwordChangeError = null;
    },
    clearVerificationStatus: (state) => {
      state.verificationStatus = null;
      state.verificationError = null;
    },
    clearResendVerificationStatus: (state) => {
      state.resendVerificationStatus = null;
      state.resendVerificationError = null;
    },
    handleRegistrationSuccess: (state) => {
      state.isAuthenticated = false;
    },
    setPendingVerificationEmail: (state, action) => {
      state.pendingVerificationEmail = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Set authenticated when user is set
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(REHYDRATE, (state, action) => {
        // If there's persisted auth data, use it
        if (action.payload?.auth) {
          return {
            ...state,
            ...action.payload.auth,
            loading: false,
          };
        }
        return state;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Assuming the response structure returns user data
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      
      .addCase(resetConfirmation.pending, (state) => {
        state.resetStatus = 'pending';
        state.resetError = null;
      })
      .addCase(resetConfirmation.fulfilled, (state) => {
        state.resetStatus = 'success';
        state.resetError = null;
      })
      .addCase(resetConfirmation.rejected, (state, action) => {
        state.resetStatus = 'failed';
        state.resetError = action.payload;
      })

      // Add these new cases for password confirmation
      .addCase(passwordConfirmation.pending, (state) => {
        state.passwordChangeStatus = 'pending';
        state.passwordChangeError = null;
      })
      .addCase(passwordConfirmation.fulfilled, (state) => {
        state.passwordChangeStatus = 'success';
        state.passwordChangeError = null;
      })
      .addCase(passwordConfirmation.rejected, (state, action) => {
        state.passwordChangeStatus = 'failed';
        state.passwordChangeError = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.verificationStatus = 'pending';
        state.verificationError = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.verificationStatus = 'success';
        state.verificationError = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.verificationError = action.payload;
      })
      
      // Resend verification email reducers
      .addCase(resendVerificationEmail.pending, (state) => {
        state.resendVerificationStatus = 'pending';
        state.resendVerificationError = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.resendVerificationStatus = 'success';
        state.resendVerificationError = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.resendVerificationStatus = 'failed';
        state.resendVerificationError = action.payload;
      });

      
  },
});

export const { clearError, clearResetStatus, clearPasswordChangeStatus,clearVerificationStatus,clearResendVerificationStatus,handleRegistrationSuccess,setPendingVerificationEmail,setAuthenticated,setUser,clearAuth } = authSlice.actions;
export default authSlice.reducer;
