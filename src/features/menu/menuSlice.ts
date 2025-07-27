/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../config/axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  DishSize,
  Extra,
  Menu,
  MenuState,
  UploadMenuImagePayload,
} from '../../types/menus.type';

const menuUrl = 'api/v1/menus';

export const getMenusThunk = createAsyncThunk('menu/getMenus', async () => {
  const result = await api.get(`/${menuUrl}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.data.data;
});

//Menu
export const createMenuThunk = createAsyncThunk(
  'menu/createMenu',
  async (payload: Menu, { rejectWithValue }) => {
    const menu = { ...payload, restaurantId: 2 };
    console.log(menu);
    try {
      const result = await api.post(`/${menuUrl}`, menu);
      console.log(result);
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
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
    const menu = { ...payload, restaurantId: 2 };
    console.log(menu);
    try {
      if (menu.id === undefined) {
        return rejectWithValue('Menu Id is required.');
      }
      if (menu.id) {
        const result = await api.patch(`/${menuUrl}/${String(menu.id)}`, menu);
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
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
        const result = await api.delete(`/${menuUrl}/${Number(payload)}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
      const result = await api.post(`/${extraUrl}`, payload);
      console.log(result);
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
      return result.data['created Extra'];
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
      const result = await api.patch(`/${extraUrl}/${String(payload.id)}`, {
        name: payload.name,
        price: payload.price,
      });
      console.log(result);
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
      return result.data.data;
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
        const result = await api.delete(`/${extraUrl}/${Number(payload)}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
const dishSizeUrl = 'api/v1/dish-sizes';

export const createDishSizeThunk = createAsyncThunk(
  'dishsize/createDishSize',
  async (payload: DishSize, { rejectWithValue }) => {
    try {
      const result = await api.post(`/${dishSizeUrl}`, payload);
      console.log(result);
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
      return result.data.data;
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
      const result = await api.patch(`/${dishSizeUrl}/${String(payload.id)}`, {
        name: payload.name,
        price: payload.price,
      });
      console.log(result);
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
      return result.data.data;
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
        const result = await api.delete(`/${dishSizeUrl}/${Number(payload)}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
        const result = await api.post(`/${menuUrl}/${String(payload.id)}/menu-img`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(result);
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/
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
    addToExtra: (state, action: PayloadAction<Extra>) => {
      state.items.map((item) =>
        item.id === action.payload.menuId
          ? { ...item, extras: item.extras ? [...item.extras, action.payload] : [action.payload] }
          : item
      );
    },
    updateToExtra: (state, action: PayloadAction<Extra>) => {
      state.items.map((item) =>
        item.id === Number(action.payload.menuId)
          ? {
              ...item,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              extras: item.extras
                ? item.extras.map((e: Extra) => (e.id === action.payload.id ? action.payload : e))
                : [],
            }
          : item
      );
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
      console.log(action.payload);
      state.loading = false;
      state.items = action.payload;
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

    // Upload Photo

    builder.addCase(uploadMenuPhotoThunk.fulfilled, (state, action: PayloadAction<Menu>) => {
      state.loading = false;
      state.error = null;
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });

    //Craete Extra

    builder.addCase(createExtraThunk.fulfilled, (state, action: PayloadAction<Extra>) => {
      state.loading = false;
      state.error = null;
      state.items.map((item) =>
        item.id === Number(action.payload.menuId)
          ? { ...item, extras: item.extras?.push(action.payload) }
          : item
      );
    });
    builder.addCase(updateExtraThunk.fulfilled, (state, action: PayloadAction<Extra>) => {
      state.loading = false;
      state.error = null;
      const items = state.items.map((item) =>
        item.id === action.payload.menuId
          ? {
              ...item,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              extras: item.extras?.map((e) => (e.id === action.payload.id ? action.payload : e)),
            }
          : item
      );
      state.items = items;
    });
    builder.addCase(deleteExtraThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.items = state.items;
    });
    builder.addCase(updateDishSizeThunk.fulfilled, (state, action: PayloadAction<Extra>) => {
      state.loading = false;
      state.error = null;
      const items = state.items.map((item) =>
        item.id === action.payload.menuId
          ? {
              ...item,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              extras: item.dishSizes?.map((e) => (e.id === action.payload.id ? action.payload : e)),
            }
          : item
      );
      state.items = items;
    });

    builder.addCase(deleteDishSizeThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.items = state.items;
    });
    //Create Dish-size
    // builder.addCase(createDishSizeThunk.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.items = [];
    // });
    // builder.addCase(createDishSizeThunk.fulfilled, (state, action: PayloadAction<DishSize>) => {
    //   state.loading = false;
    //   state.error = null;
    //   const items = state.items.map((item) =>
    //     item.id === action.payload.menuId ? { ...item, extras: [{ ...action.payload }] } : item
    //   );
    //   state.items = items;
    // });
  },
});

export const { getToMenus, addToMenu, updateToMenus, deleteToMenu, addToExtra, updateToExtra } =
  menuSlice.actions;
export default menuSlice.reducer;
