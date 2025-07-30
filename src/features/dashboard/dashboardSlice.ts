/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import type { restaurantProps} from "../../types/restaurant.types"
import Cookies from "js-cookie";
import type { DashboardState } from "../../types/dashboard.types";

const ownerDashboardUrl = 'api/v1/summary/owners';
const deliveryDashboardUrl = 'api/v1/summary/delivery';
const userId = Cookies.get('userId')

export const getSummaryByOwner = createAsyncThunk<restaurantProps>(
  "restaurant/getAllbyOwner",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(`${ownerDashboardUrl}/${userId}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during getting summary by owner"
      );
    }
  }
);

export const getSummaryByDelivery = createAsyncThunk<restaurantProps>(
  "restaurant/getAllbyDelivery",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(`${deliveryDashboardUrl}/${userId}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during getting summary by delivery"
      );
    }
  }
);

const initialState: DashboardState = {
    ownerSummaryData: {
        data: {},
        loading: false,
        error: false,
    },
    deliverySummaryData: {
        data: {},
        loading: false,
        error: false,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
    builder.addCase(getSummaryByOwner.fulfilled, (state: any, action) => {
      state.ownerSummaryData.data = action.payload;
      state.ownerSummaryData.loading = false;
    });
    builder.addCase(getSummaryByOwner.pending, (state) => {
      state.ownerSummaryData.loading = true;
      state.ownerSummaryData.error = false;
    });
    builder.addCase(getSummaryByDelivery.fulfilled, (state: any, action) => {
      state.deliverySummaryData.data = action.payload;
      state.deliverySummaryData.loading = false;
    });
    builder.addCase(getSummaryByDelivery.pending, (state) => {
      state.deliverySummaryData.loading = true;
      state.deliverySummaryData.error = false;
    });
   }
});

export default dashboardSlice.reducer;
