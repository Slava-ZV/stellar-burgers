import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем данные о всех заказах
export const ordersUser = createAsyncThunk('user/ordersUser', async () => {
  const response = await getOrdersApi();
  return response; // если успешно - видим историю заказов
});