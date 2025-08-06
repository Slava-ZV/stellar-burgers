import { getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем данные о всех заказах
export const ordersUser = createAsyncThunk('user/ordersUser', getOrdersApi);
