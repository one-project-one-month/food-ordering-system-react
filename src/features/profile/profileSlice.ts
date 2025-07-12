import { createSlice } from "@reduxjs/toolkit";
import type { ProfileType } from "../../types/ProfileType";
import { addProfile } from "../../schemas/profileSchema";

interface ProfileState {
  profile: ProfileType | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  error: null,
  loading: false
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: builder => {
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
        state.error = action.error.message || "Failed to create profile";
      });
  }
});

export default profileSlice.reducer;
