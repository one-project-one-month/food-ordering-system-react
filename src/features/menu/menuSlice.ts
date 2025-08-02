 
 
 
 

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../config/axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type {
  DishSize,
  Extra,
  Menu,
  MenuState,
  UploadMenuImagePayload,
} from '../../types/menus.type';

const menuUrl = '/api/v1/menus';
const restaurantId = Cookies.get('restaurantId');

export const getMenusThunk = createAsyncThunk('menu/getMenus', async (payload: number) => {
  const restaurantId = Cookies.get('restaurantId');
  const result = await api.get(`${menuUrl}/restaurant/${String(restaurantId)}?page=${String(payload)}`);
   
  return result.data;
});

//Menu
export const createMenuThunk = createAsyncThunk(
  'menu/createMenu',
  async (payload: Menu, { rejectWithValue }) => {
    const restaurantId = Cookies.get('restaurantId');
    const menu = { ...payload, restaurantId };
    try {
      const result = await api.post(menuUrl, menu);
      console.log(result);
       
      return result.data.data['created Menu'];
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While this menu creating, an error occurred'
      );
    }
  }
);
export const updateMenuThunk = createAsyncThunk(
  'menu/updateMenu',
  async (payload: Menu, { rejectWithValue }) => {
    const menu = { ...payload, restaurantId };
    console.log(menu);
    try {
      if (menu.id === undefined) {
        return rejectWithValue('Menu Id is required.');
      }
      if (menu.id) {
        const result = await api.patch(`${menuUrl}/${String(menu.id)}`, menu);
         
        return result.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While this menu creating, an error occurred'
      );
    }
  }
);

export const deleteMenuThunk = createAsyncThunk(
  'menu/deleteMenu',
  async (payload: number, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (payload === undefined) {
        return rejectWithValue('Menu Id is required.');
      }
      if (payload) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const result = await api.delete(`${menuUrl}/${Number(payload)}`);
         
        return result.data.message;
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While this menu deleting, an error occurred'
      );
    }
  }
);

// Extra
const extraUrl = 'api/v1/extras';

export const createExtraThunk = createAsyncThunk(
  'extra/createExtra',
  async (payload: Extra, { rejectWithValue }) => {
    try {
      const result = await api.post(extraUrl, payload);
       
      return result.data.data['created Extra'];
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While extra creating, an error occurred'
      );
    }
  }
);

export const updateExtraThunk = createAsyncThunk(
  'extra/updateExtra',
  async (payload: Extra, { rejectWithValue }) => {
    try {
      const result = await api.patch(`${extraUrl}/${String(payload.id)}`, {
        name: payload.name,
        price: payload.price,
      });
       
      return result.data.data['created Extra'];
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While extra creating, an error occurred'
      );
    }
  }
);

export const deleteExtraThunk = createAsyncThunk(
  'extra/deleteExtra',
  async (payload: number, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (payload === undefined) {
        return rejectWithValue('Menu Id is required.');
      }
      if (payload) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const result = await api.delete(`${extraUrl}/${Number(payload)}`);
         
        return result.data.message;
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While this menu deleting, an error occurred'
      );
    }
  }
);

//DishSize
const dishSizeUrl = '/api/v1/dish-sizes';

export const createDishSizeThunk = createAsyncThunk(
  'dishsize/createDishSize',
  async (payload: DishSize, { rejectWithValue }) => {
    try {
      const result = await api.post(dishSizeUrl, payload);
       
      return result.data.data['created DishSize'];
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While extra creating, an error occurred'
      );
    }
  }
);

export const updateDishSizeThunk = createAsyncThunk(
  'dishsize/updateDishSize',
  async (payload: DishSize, { rejectWithValue }) => {
    try {
      const result = await api.patch(`${dishSizeUrl}/${String(payload.id)}`, {
        name: payload.name,
        price: payload.price,
      });
       
      return result.data.data['created DishSize'];
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While extra creating, an error occurred'
      );
    }
  }
);

export const deleteDishSizeThunk = createAsyncThunk(
  'dishsize/deleteDishSize',
  async (payload: number, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (payload === undefined) {
        return rejectWithValue('Menu Id is required.');
      }
      if (payload) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const result = await api.delete(`${dishSizeUrl}/${Number(payload)}`);
         
        return result.data.message;
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While this menu deleting, an error occurred'
      );
    }
  }
);

export const uploadMenuPhotoThunk = createAsyncThunk(
  'menu/uploadMenuPhoto',
  async (payload: UploadMenuImagePayload, { rejectWithValue }) => {
    try {
      console.log(payload);
      if (!payload.id) {
        return rejectWithValue('Menu Id is required.');
      }
      if (payload.id && payload.dishImg) {
        const formData = new FormData();

        formData.append('file', payload.dishImg);
        const result = await api.post(`${menuUrl}/${String(payload.id)}/menu-img`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
         
        return result.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.data ?? 'While this menu creating, an error occurred'
      );
    }
  }
);

const initialState: MenuState = {
  items: [],
  totalPage: 1,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getToMenus: (state, action: PayloadAction<Menu[]>) => {
      state.items = action.payload;
    },
    addToMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },

    updateToMenus: (state, action: PayloadAction<Menu>) => {
      const updatedMenus: Menu[] = state.items.map((item: Menu) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.items = [...updatedMenus];
    },
    deleteToMenu: (state, action: PayloadAction<number>) => {
      const filterMenus = state.items.filter((item: Menu) => item.id !== action.payload);
      state.items = [...filterMenus];
    },
  },
  extraReducers: (builder) => {
    //Get Menus
    builder.addCase(getMenusThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    });
    builder.addCase(getMenusThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.totalPage = action.payload.meta.totalPages;
      state.items = action.payload.data;
      state.error = null;
    });
    builder.addCase(getMenusThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.items = [];
    });
    //Create Menu

    builder.addCase(createMenuThunk.fulfilled, (state, action: PayloadAction<Menu>) => {
      state.loading = false;
      state.error = null;
      state.items = [...state.items, action.payload];
    });

    // Update Menu
    builder.addCase(updateMenuThunk.fulfilled, (state, action: PayloadAction<Menu>) => {
      state.loading = false;
      state.error = null;
      state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
    });

    builder.addCase(deleteMenuThunk.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = null;
      const filterMenus = state.items.filter((item) => item.id !== action.payload);
      state.items = filterMenus;
    });
    //Craete Extra
    builder.addCase(createExtraThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.items = state.items;
    });
    builder.addCase(updateExtraThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.items = state.items;
    });
    builder.addCase(deleteExtraThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.items = state.items;
    });
    builder.addCase(createDishSizeThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.items = state.items;
    });
  },
});

export const { getToMenus, addToMenu, updateToMenus, deleteToMenu } = menuSlice.actions;
export default menuSlice.reducer;
