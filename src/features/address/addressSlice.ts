/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import api from '../../config/axios';
import type { Address, AddressesState } from '../../types/address.type';

const addressUrl = 'api/v1/auth/address';

export const createAddress = createAsyncThunk<any, Address>(
  'address/createAddress',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(addressUrl, {
        ...payload,
        lat: Number(payload.lat),
        longitude: Number(payload.longitude),
      });
      return result.data;
    } catch (error: any) {
      console.error('Error creating address:', error);
      return rejectWithValue(
        error?.response.data.data ?? 'An error occurred during create address'
      );
    }
  }
);

export const updateAddress = createAsyncThunk<any, Address>(
  'address/updateAddress',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await api.put(`${addressUrl}/${payload.id}`, {
        ...payload,
        lat: Number(payload.lat),
        longitude: Number(payload.longitude),
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.data ?? 'An error occurred during update address'
      );
    }
  }
);
export const deleteAddress = createAsyncThunk<any, Address>(
  'address/updateAddress',
  async (payload: any, { rejectWithValue }) => {
    try {
      await api.delete(`${addressUrl}/${payload.id}`);
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.data ?? 'An error occurred during update address'
      );
    }
  }
);

export const getAddressById = createAsyncThunk<any, { id: number }>(
  'address/getAddressById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const reuslt = await api.get(`${addressUrl}/${Number(id)}`);
      return reuslt.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.data ?? 'An error occurred during get address by id'
      );
    }
  }
);

export const getAddress = createAsyncThunk<any, { id: number }>(
  'address/getAddress',
  async (_, { rejectWithValue }) => {
    try {
      const userId = Cookies.get('userId');
      const result = await api.get(`${addressUrl}/getAll/${userId}`);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? error.message ?? 'Failed to fetch');
    }
  }
);

const initialState: AddressesState = {
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
    data: {} as Address,
    loading: false,
    error: false,
  },
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAddress.fulfilled, (state: any, action) => {
      state.new.data = action.payload;
      state.new.loading = false;
    });
    builder.addCase(createAddress.pending, (state) => {
      state.new.loading = true;
      state.new.error = false;
    });
    builder.addCase(createAddress.rejected, (state) => {
      state.new.loading = false;
      state.new.error = true;
    });
    builder.addCase(updateAddress.fulfilled, (state: any, action) => {
      state.detailed.data = action.payload.data.addressDetail;
      state.detailed.loading = false;
    });
    builder.addCase(updateAddress.pending, (state) => {
      state.detailed.loading = true;
      state.detailed.error = false;
    });
    builder.addCase(updateAddress.rejected, (state) => {
      state.detailed.loading = false;
      state.detailed.error = true;
    });
    builder.addCase(getAddress.fulfilled, (state: any, action) => {
      state.searched.data = action.payload;
      state.detailed.loading = false;
    });
    builder.addCase(getAddress.pending, (state) => {
      state.searched.loading = true;
      state.detailed.error = false;
    });
    builder.addCase(getAddress.rejected, (state) => {
      state.searched.loading = false;
      state.detailed.error = true;
    });
  },
});

export default restaurantSlice.reducer;
