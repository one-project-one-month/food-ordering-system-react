 
 
 
 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import type { UserMenuState } from "../../types/userMenu.types";

const menuUrl = 'api/v1/menus';

export const getAllMenus = createAsyncThunk<string,any>(
  "userMenu/getAllMenus",
  async ({id}, { rejectWithValue }) => {
    try {
      const result = await api.get(`${menuUrl}/restaurant/${String(id)}`);
      return result.data.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
    }
  }
);

const initialState: UserMenuState = {
  searched: {
    data: [],
    loading: false,
    error: false,
  },
};

export const userMenuSlice = createSlice({
  name: "userMenu",
  initialState,
  reducers: {}
});

export default userMenuSlice.reducer;
