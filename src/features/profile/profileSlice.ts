import { createSlice } from '@reduxjs/toolkit';
import { addProfile, getProfile, updateProfilePic } from '../../schemas/profileSchema';
import type { Profile } from '../../types/ProfileType';

interface ProfileState {
  profile: Profile | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  error: null,
  loading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(addProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create profile';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.profile && action.payload?.profilePic) {
          state.profile.profilePic = action.payload.profilePic;
        }
      });
  },
});

export default profileSlice.reducer;
