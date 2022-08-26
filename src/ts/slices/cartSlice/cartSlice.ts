import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { ICartItem, ICartState } from './interfaces';

export interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

type TDataStorage = {
  items: ICartItem[],
  total: number
}

const mapDataToStorage = (storage: IStorage, key: string, value: TDataStorage, jsonify = true) => {
  const data = jsonify ? JSON.stringify(value) : value;
  storage.setItem(key, data as string);
}

const initialState: ICartState = {
  items: JSON.parse(localStorage.getItem('cart') as string).items || [],
  total: JSON.parse(localStorage.getItem('cart') as string).total || 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: ICartState, action: PayloadAction<ICartItem>) {
      const index = state.items.findIndex(
        (el) => el.id === action.payload.id && el.size === action.payload.size
      );
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
        state.items[index].total += action.payload.total;
      } else {
        state.items = [...state.items, action.payload];
      }
      state.total = state.items.reduce((prev, cur) => prev + cur.total, 0);
      mapDataToStorage(localStorage, 'cart', { items: state.items, total: state.total });
    },
    removeItem(state: ICartState, action: PayloadAction<number>) {
      state.items = state.items.filter((el) => el.id !== action.payload);
      state.total = state.items.reduce((prev, cur) => prev + cur.total, 0);
      mapDataToStorage(localStorage, 'cart', { items: state.items, total: state.total });
    }
  }
});

export const selectCartItems = (state: TRootState) => state.cart.items;
export const selectCartTotal = (state: TRootState) => state.cart.total;
export const { addItem, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
