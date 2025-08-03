import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем данные о всех заказах
export const ordersUser = createAsyncThunk('user/ordersUser', getOrdersApi);
