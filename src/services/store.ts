import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './slices/user/slice';
import { ingridientsSlice } from './slices/ingridients/slice';
import { constructorBurgerSlice } from './slices/consrucror/slice';
import { getOrdersUserSlice } from './slices/order/slice';
import { getOrderNumberUserSlice } from './slices/feed/slice';

const rootReducer = combineSlices(
  userSlice,
  ingridientsSlice,
  constructorBurgerSlice,
  getOrdersUserSlice,
  getOrderNumberUserSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
