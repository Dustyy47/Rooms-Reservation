import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderMeta } from './../../types/Order';

interface OrderState {
  formOrderMeta: OrderMeta | null;
}

const initialState: OrderState = {
  formOrderMeta: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setupOrderForm(state, action: PayloadAction<OrderMeta>) {
      state.formOrderMeta = action.payload;
    }
  }
});

export const ordersActions = {
  ...ordersSlice.actions
};

export const ordersReducer = ordersSlice.reducer;
