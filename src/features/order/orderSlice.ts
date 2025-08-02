import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import type { OrderRequestProps, OrdersState } from "../../types/orders.type";
import Cookies from "js-cookie";

const orderUrl = 'api/v1/orders';

export const createOrder = createAsyncThunk<OrderRequestProps, any>(
  "order/create",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(orderUrl, {
        ...payload
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during create order"
      );
    }
  }
);

export const getAllOrders = createAsyncThunk<any>(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(`${orderUrl}/all-orders`);
      return result.data.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
    }
  }
);

export const getAllOrdersByRestaurant = createAsyncThunk<any>(
  "order/getAllOrdersByRestaurant",
  async (_, { rejectWithValue }) => {
    const restaurantId = Cookies.get('restaurantId')
    try {
      const result = await api.get(`${orderUrl}/all-orders/${String(restaurantId)}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
    }
  }
);

export const getAllOrdersByCustomer = createAsyncThunk<any,any>(
  "order/getAllOrdersByCustomer",
  async ({page,size,status}, { rejectWithValue }) => {
    const customerId = Cookies.get('userId')
    try {
      const result = await api.get(`${orderUrl}/${String(customerId)}`,{
        params: {
          page,
          size,
          status,
        }
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data ?? error.message ?? "Failed to fetch");
    }
  }
);

export const makePayment = createAsyncThunk<any, any>(
  "order/payment",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(`api/v1/payment`, {
        ...payload
      });
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during create payment"
      );
    }
  }
);

export const uploadPaymentImage = createAsyncThunk<any, any>(
  "order/paymentImage",
  async ({formData,paymentId}, { rejectWithValue }) => {
    try {
      const result = await api.post(`api/v1/payment/${String(paymentId)}/payment-picture`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during uploading payment screenshot"
      );
    }
  }
);

const initialState: OrdersState = {
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
  orderId: '',
  canAccessPayment: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderId: (state, action) => {
        state.orderId = action.payload;
    },
    allowPaymentAccess: (state, action) => {
        state.canAccessPayment = action.payload;
    }
    },
   extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state: any, action) => {
      state.new.data = action.payload;
      state.new.loading = false;
    });
    builder.addCase(createOrder.pending, (state) => {
      state.new.loading = true;
      state.new.error = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.new.loading = false;
      state.new.error = true;
    });
    builder.addCase(getAllOrdersByRestaurant.fulfilled, (state: any, action) => {
      state.searched.data = action.payload;
      state.searched.loading = false;
    });
    builder.addCase(getAllOrdersByRestaurant.pending, (state) => {
      state.searched.loading = true;
      state.searched.error = false;
    });
    builder.addCase(getAllOrdersByRestaurant.rejected, (state) => {
      state.searched.loading = false;
      state.searched.error = true;
    });
    }
});

export const { setOrderId, allowPaymentAccess } = orderSlice.actions;
export default orderSlice.reducer;
