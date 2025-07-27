/* eslint-disable @typescript-eslint/restrict-template-expressions */
 
 
 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import type { restaurantPicSliceProps, restaurantProps, RestaurantState } from "../../types/restaurant.types"
import Cookies from "js-cookie";

const restaurantUrl = 'api/v1/restaurants';

export const createRestaurant = createAsyncThunk<any, restaurantProps>(
  "restaurant/create",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(restaurantUrl, {
        restaurantName: payload.restaurantName,
        contactNumber: payload.contactNumber,
        nrc: payload.nrc,
        kpayNumber:payload.kpayNumber,
        resOwnerId: payload.resOwnerId,
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during create restaurant"
      );
    }
  }
);

export const updateRestaurant = createAsyncThunk<any, restaurantProps>(
  "restaurant/update",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.patch(`${restaurantUrl}/${payload.id}`, {
        restaurantName: payload.restaurantName,
        contactNumber: payload.contactNumber,
        nrc: payload.nrc,
        kpayNumber:payload.kpayNumber,
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during update restaurant"
      );
    }
  }
);

export const uploadRestaurantImage = createAsyncThunk<any, restaurantPicSliceProps>(
  "restaurant/imageUpload",
  async ({formData,restaurantId}, { rejectWithValue }) => {
    try {
      const result = await api.post(`${restaurantUrl}/${restaurantId}/restaurant-img`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during create restaurant"
      );
    }
  }
);

export const getOwnerRestaurant = createAsyncThunk<any>(
  "restaurant/getOwnerRestaurant",
  async (_, { rejectWithValue }) => {
    const ownerId = Cookies.get('userId')
    try {
      const result = await api.get(`${restaurantUrl}/users/${ownerId}`);
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

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
    builder.addCase(createRestaurant.fulfilled, (state: any, action) => {
      state.new.data = action.payload;
      state.new.loading = false;
    });
    builder.addCase(createRestaurant.pending, (state) => {
      state.new.loading = true;
      state.new.error = false;
    });
    builder.addCase(createRestaurant.rejected, (state) => {
      state.new.loading = false;
      state.new.error = true;
    });
    builder.addCase(updateRestaurant.fulfilled, (state: any, action) => {
      state.detailed.data = action.payload;
      state.detailed.loading = false;
    });
    builder.addCase(updateRestaurant.pending, (state) => {
      state.detailed.loading = true;
      state.detailed.error = false;
    });
    builder.addCase(updateRestaurant.rejected, (state) => {
      state.detailed.loading = false;
      state.detailed.error = true;
    });
    builder.addCase(uploadRestaurantImage.fulfilled, (state: any, action) => {
      state.imageData.data = action.payload;
      state.imageData.loading = false;
    });
    builder.addCase(uploadRestaurantImage.pending, (state) => {
      state.imageData.loading = true;
      state.imageData.error = false;
    });
    builder.addCase(uploadRestaurantImage.rejected, (state) => {
      state.imageData.loading = false;
      state.imageData.error = true;
    });
   }
});

export default restaurantSlice.reducer;
