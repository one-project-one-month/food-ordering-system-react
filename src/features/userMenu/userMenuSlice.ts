/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

const menuUrl = 'api/v1/menus';

export const getMenuDetail = createAsyncThunk<any,any>(
  "userMenu/detail",
  async ({id}, { rejectWithValue }) => {
    try {
      const result = await api.get(`${menuUrl}/${id}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
    }
  }
);

const initialState: any = {
  detailed: {
    data: {
    },
    loading: false,
    error: false,
  },
};

export const userMenuSlice = createSlice({
  name: "userMenu",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
    // builder.addCase(createRestaurant.fulfilled, (state: any, action) => {
    //   state.new.data = action.payload;
    //   state.new.loading = false;
    // });
    // builder.addCase(createRestaurant.pending, (state) => {
    //   state.new.loading = true;
    //   state.new.error = false;
    // });
    // builder.addCase(createRestaurant.rejected, (state) => {
    //   state.new.loading = false;
    //   state.new.error = true;
    // });
    builder.addCase(getMenuDetail.fulfilled, (state: any, action) => {
      state.detailed.data = action.payload.data;
      state.detailed.loading = false;
    });
    builder.addCase(getMenuDetail.pending, (state) => {
      state.detailed.loading = true;
      state.detailed.error = false;
    });
   }
});

export default userMenuSlice.reducer;
