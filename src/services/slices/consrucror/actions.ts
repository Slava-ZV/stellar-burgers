import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//формируем заказ на отправку
export const orderCreate = createAsyncThunk(
  'order/create',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response; // если успешно - отправяем заказ
  }
);

