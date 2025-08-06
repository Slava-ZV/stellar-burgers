import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

//Получаем ингредиенты по асинхронной функции
export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);
