import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '../../../utils/types';
import { orderCreate } from './actions';

type TConstructorBurgerState = {
  constructorItems: {
    ingredients: Array<TConstructorIngredient>;
    bun: TIngredient | null;
  };
  orderRequest: boolean;
  orderModalData: null | TOrder;
  error: string | null | undefined;
  loading: boolean;
};

export const initialState: TConstructorBurgerState = {
  constructorItems: {
    ingredients: [],
    bun: null
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false
};

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBunAndIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          //если это булка, то добавляем признак булка
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload); //если нет признака - булка, то это массив ингредиентов
        }
      },
      prepare: (ingredient: TIngredient) => {
        //добавляем уникальный ID ингридиентам
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id //удаление ингредиента по ID
        );
    },
    clearOrder: (state) => {
      //очищаем конструктор бургеров
      (state.constructorItems.bun = null),
        (state.constructorItems.ingredients = []);
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      //поднимаем ингредиент наверх
      const index = action.payload;
      if (index > 0) {
        //если нашли, не на первом месте (те >0), то наверх

        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ]; 
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      //поднимаем ингредиент наверх
      const index = action.payload;
      if (index > 0 && state.constructorItems.ingredients.length - 1) {
        //если нашли, не на первом месте (те >0) и не на последнем, то опускаем

        const ingredients = state.constructorItems.ingredients;
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ]; 
      }
    },
    resetConstructor: (state) => initialState
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.constructorItems.ingredients = [];
        state.constructorItems.bun = null;
      });
  },

  selectors: {
    setOrderRequest: (state) => state.orderRequest,
    setOrderModalData: (state) => state.orderModalData, //Модалка заказа
    getConstructorItems: (state) => state.constructorItems//Данные о булках и ингридиентах
    setOrderStatus: (state) => state.loading //статус
  }
});

export const {   
  setOrderRequest,
  setOrderModalData,
  getConstructorItems,
  setOrderStatus
} = constructorBurgerSlice.selectors;
export const {
  addBunAndIngredient,
  deleteIngredient,
  clearOrder,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorBurgerSlice.actions;

