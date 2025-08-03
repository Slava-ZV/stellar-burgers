import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../../utils/types';
import { getIngredients } from './actions';

//Данные ингредиентов
type TIngredientState = {
  ingredients: Array<TIngredient>;
  error: string | null | undefined;
  loading: boolean;
};

//Пусто, изначальное состояние
export const initialState: TIngredientState = {
  ingredients: [],
  error: null,
  loading: false
};

//Слайс ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelect: (state) => state.ingredients, 
    getIngredientsLoadingStatus: (state) => state.loading 
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //если ошибка - сообщение
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload; //получаем данные
      });
  }
});

export const { getIngredientsSelect, getIngredientsLoadingStatus } =
  ingredientsSlice.selectors;
