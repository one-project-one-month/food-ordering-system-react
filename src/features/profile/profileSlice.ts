import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProfile as fetchProfile,
  addProfile as createProfile,
  updateProfilePic as uploadProfilePic,
  deleteProfile as removeProfile
} from '../../schemas/profileSchema';

interface ProfileState {
  profile: any | null;
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,
};

// Async Thunks
export const getProfile = createAsyncThunk('profile/get', async (id: number) => {
  return await fetchProfile(id);
});

export const addProfile = createAsyncThunk(
  'profile/add',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    return await createProfile(id, formData);
  }
);

export const updateProfilePic = createAsyncThunk(
  'profile/updatePic',
  async ({ id, profilePic }: { id: number; profilePic: File }) => {
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    return await uploadProfilePic(id, formData);
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/delete',
  async ({ id }: { id: number }) => {
    return await removeProfile(id);
  }
);

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = 'Profile not found';
        state.profile = null;
        state.loading = false;
      })

      // addProfile
      .addCase(addProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.error = 'Failed to add profile';
        state.loading = false;
      })

      // updateProfilePic
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.profile = {
          ...state.profile,
          profilePic: action.payload.profilePic,
        };
      })

      // deleteProfile
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
        state.loading = false;
      });
  },
});

export const { clearUpdateSuccess, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
