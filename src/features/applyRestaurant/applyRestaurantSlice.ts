/* eslint-disable @typescript-eslint/restrict-template-expressions */
 
 
 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import type { restaurantProps, RestaurantState } from "../../types/restaurant.types"
import Cookies from "js-cookie";

const deliveryUrl = 'api/v1/delivery-data/applyDelivery';
const appliedRestaurantUrl = 'api/v1/restaurants/delivery';

export const applyRestaurant = createAsyncThunk<any, any>(
  "applyRestaurant/apply",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(deliveryUrl, {
        ...payload
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during apply restaurant"
      );
    }
  }
);

export const getAppliedRestaurant = createAsyncThunk<restaurantProps>(
  "applyRestaurant/getAll",
  async (_, { rejectWithValue }) => {
    try {
        const deliveryId = Cookies.get("userId")
      const result = await api.get(`${appliedRestaurantUrl}/${deliveryId}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during apply restaurant"
      );
    }
  }
);

const initialState: RestaurantState = {
  new: {
    data: [],
    loading: false,
    error: false,
  },
  searched: {
    data: [],
    loading: false,
    error: false,
  },
  detailed: {
    data: {
    },
    loading: false,
    error: false,
  },
  imageData: {
    data: {
    },
    loading: false,
    error: false,
  },
};

export const applyRestaurantSlice = createSlice({
  name: "applyRestaurant",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
    builder.addCase(applyRestaurant.fulfilled, (state: any, action) => {
      state.new.data = action.payload;
      state.new.loading = false;
    });
    builder.addCase(applyRestaurant.pending, (state) => {
      state.new.loading = true;
      state.new.error = false;
    });
    builder.addCase(applyRestaurant.rejected, (state) => {
      state.new.loading = false;
      state.new.error = true;
    });
    builder.addCase(getAppliedRestaurant.fulfilled, (state: any, action) => {
        console.log("Action ", action.payload)
      state.searched.data = action.payload;
      state.searched.loading = false;
    });
   }
});

export default applyRestaurantSlice.reducer;
