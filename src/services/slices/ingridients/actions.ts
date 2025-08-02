import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

//Получаем ингредиенты по асинхронной функции
export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const response = await getIngredientsApi();
    return response; // если успешно -увидим в action.payload в экстраредьюсере. Если завершится с ошибкой - ошибка будет в action.error.
  }
);