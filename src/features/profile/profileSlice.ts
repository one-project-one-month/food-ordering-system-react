 
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '../../types/ProfileType';
import {
  addProfile,
  deleteProfile,
  getProfile,
  updateProfile,
  updateProfilePic,
} from '../../schemas/profileSchema';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfile.fulfilled, (state, action: PayloadAction<{ success: number, data: Profile, message?: string }>) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (action.payload.success === 1 && action.payload.data) {
        state.profile = action.payload.data as any;
        state.loading = false;
      } else {
        state.profile = null;
        state.error = action.payload.message ?? 'Profile creation failed';
        state.loading = false;
      }
    })

      .addCase(addProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
      })
      .addCase(updateProfilePic.fulfilled, (state, action: PayloadAction<Profile>) => {
        if (state.profile) {
          state.profile.profilePic = action.payload.profilePic;
        }
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
