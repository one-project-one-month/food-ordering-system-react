/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import type { RestaurantState } from "../../types/restaurant.types"
import Cookies from "js-cookie";

const deliveryUrl = 'api/v1/delivery-data';

export const getDeliveryByRestaurant = createAsyncThunk<any>(
  "delivery/deliveryDataByRestaurant",
  async (_, { rejectWithValue }) => {
    const restaurantId = Cookies.get('restaurantId')
    try {
      const result = await api.get(`${deliveryUrl}/${restaurantId}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
    }
  }
);

export const assignDeliveryByRestaurant = createAsyncThunk<any,any>(
  "delivery/assignDeliveryByRestaurant",
  async (payload, { rejectWithValue }) => {
    const restaurantId = Number(Cookies.get('restaurantId'))
    try {
      const result = await api.patch(`${deliveryUrl}/assignDelivery`,{
        ...payload,
        restaurantId
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
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

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
    builder.addCase(getDeliveryByRestaurant.fulfilled, (state: any, action) => {
      state.searched.data = action.payload.data;
      state.searched.loading = false;
    });
    builder.addCase(getDeliveryByRestaurant.pending, (state) => {
      state.searched.loading = true;
      state.searched.error = false;
    });
    builder.addCase(getDeliveryByRestaurant.rejected, (state) => {
        state.searched.loading = false;
        state.searched.error = true;
    });
   }
});

export default deliverySlice.reducer;
