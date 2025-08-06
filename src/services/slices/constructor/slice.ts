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
          //если это булка, то добавляем в булочку
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload); //если не булка, то в массив ингредиентов
        }
      },
      prepare: (ingredient: TIngredient) => {
        //добавляем уникaльный ID ингредентам, чтобы потом использовать в компоненте action
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
      //очищаем конструктор от всех constructorItems
      (state.constructorItems.bun = null),
        (state.constructorItems.ingredients = []);
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      //поднимаем ингредиент наверх
      const index = action.payload;
      if (index > 0) {
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
    setOrderRequest: (state) => state.orderRequest, //состояние запроса на создание заказа, его выполнение
    setOrderModalData: (state) => state.orderModalData, //данные модального окна заказа
    getConstructorItems: (state) => state.constructorItems, //данные состава
    setOrderStatus: (state) => state.loading //инфо о статусе
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
