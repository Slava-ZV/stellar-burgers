import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { feedsAll, orderByNumber } from './actions';

//Пусто, изначальное состояние
export const initialState: TFeed = {
  orders: [],
  total: 0,
  error: null,
  loading: false,
  orderNumber: null,
  totalToday: 0
};

//Данные заказов в ленте
type TFeed = {
  orders: TOrder[];
  total: number;
  error: string | null | undefined;
  loading: boolean;
  orderNumber: TOrder | null;
  totalToday: number;
};

//Слайс заказов в ленте
export const getOrderNumberUserSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getOrderByNumber: (state) => state.orderNumber,
    getTotalOrders: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },

  extraReducers: (builder) => {
    builder
      .addCase(feedsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //ошибка
      })
      .addCase(feedsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; //если успешно - получаем данные заказов
        state.total = action.payload.total; //если успешно - получаем данные о количестве всех заказов
        state.totalToday = action.payload.totalToday; //если успешно - получаем данные заказов за сегодня
      })
      .addCase(orderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //если ошибка - выводим сообщение
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNumber = action.payload.orders[0];
      });
  }
});

export const {
  getOrdersFeed,
  getOrderByNumber,
  getTotalOrders,
  getTotalToday
} = getOrderNumberUserSlice.selectors;
