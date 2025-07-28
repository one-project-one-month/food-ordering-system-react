import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../config/axios';
import Cookies from 'js-cookie';
import type { CategoriesState, categoryProps } from '../../types/category.types';

const categoriesUrl = 'api/v1/category';

export const createCategory = createAsyncThunk<any, categoryProps>(
  'categories/create',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(categoriesUrl, {
        ...payload,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.data ?? 'An error occurred during create category'
      );
    }
  }
);

export const updateCategory = createAsyncThunk<any, categoryProps>(
  'categories/update',
  async (payload, { rejectWithValue }) => {
    const categoryId = String(payload.id);
    try {
      const result = await api.patch(`${categoriesUrl}/${categoryId}`, {
        name: payload.name,
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response.data.data ?? 'An error occurred during update category'
      );
    }
  }
);

export const deleteCategory = createAsyncThunk<string, { id: string }>(
  'categories/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const result = await api.delete(`${categoriesUrl}/${id}`);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? error.message ?? 'Failed to delete');
    }
  }
);

export const getAllCategories = createAsyncThunk<any>(
  'categories/getAllCategories',
  async (_, { rejectWithValue }) => {
    const restaurantId = String(Cookies.get('restaurantId'));
    try {
      const result = await api.get(`${categoriesUrl}?restaurantId=${restaurantId}`);
      return result.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? error.message ?? 'Failed to fetch');
    }
  }
);

const initialState: CategoriesState = {
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
    data: {},
    loading: false,
    error: false,
  },
};

export const restaurantSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state: any, action) => {
      state.searched.data = action.payload.categories;
      state.searched.loading = false;
    });
    builder.addCase(getAllCategories.pending, (state) => {
      state.searched.loading = true;
      state.searched.error = false;
    });
    builder.addCase(createCategory.fulfilled, (state: any, action) => {
      state.new.data = action.payload;
      state.new.loading = false;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.new.loading = true;
      state.new.error = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.new.loading = false;
      state.new.error = true;
    });
    builder.addCase(updateCategory.fulfilled, (state: any, action) => {
      state.detailed.data = action.payload;
      state.detailed.loading = false;
    });
  },
});

export default restaurantSlice.reducer;
