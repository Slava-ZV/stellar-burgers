import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

//получаем данные заказов
export const feedsAll = createAsyncThunk('feed/all', () => getFeedsApi());

//формируем номер заказа
export const orderByNumber = createAsyncThunk(
  'feed/number',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response; // если успешно - получаем номер заказа
  }
);
