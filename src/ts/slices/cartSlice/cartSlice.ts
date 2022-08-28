import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import { ICartItem, ICartState } from './interfaces';

const initCartStateData = (): ICartState => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : { items: [] }
}

const initialState: ICartState = {
  items: initCartStateData().items,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state: ICartState, action: PayloadAction<ICartItem>) {
      const index = state.items.findIndex(
        (el) => el.id === action.payload.id && el.size === action.payload.size
      )
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
        state.items[index].total += action.payload.total;
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeProductFromCart(state: ICartState, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    updateCart(state: ICartState) {
      return state;
    }
  }
});

export const { addProductToCart, removeProductFromCart, updateCart } = cartSlice.actions;
export const selectCartItems = (state: TRootState) => state.cart.items;
export const cartReducer = cartSlice.reducer;
