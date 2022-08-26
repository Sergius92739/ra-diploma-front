import { IProduct } from './interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductPageState } from './interfaces';
import { fetchProduct } from '../asyncThunkCreator';
import { TRootState } from '../../store';

const initialState: IProductPageState = {
  item: null,
  quantity: 1,
  avalible: false,
  selectedSize: '',
  isLoading: false,
  error: null,
};

const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    increment(state: IProductPageState) {
      state.quantity = state.quantity < 10 ? ++state.quantity : 10;
    },
    decrement(state: IProductPageState) {
      state.quantity = state.quantity > 1 ? --state.quantity : 1;
    },
    setTheSize(state: IProductPageState, action: PayloadAction<string>) {
      state.selectedSize = action.payload;
    },
    resetSize(state: IProductPageState) {
      state.selectedSize = '';
    }
  },
  extraReducers: {
    [fetchProduct.pending.type]: (
      state: IProductPageState
    ) => {
      state.isLoading = true;
      state.error = null;
      state.item = null;
    },
    [fetchProduct.fulfilled.type]: (
      state: IProductPageState,
      action: PayloadAction<IProduct>
    ) => {
      state.item = action.payload;
      state.avalible = action.payload.sizes.some((el) => el.avalible);
      state.isLoading = false;
      state.selectedSize = '';
    },
    [fetchProduct.rejected.type]: (
      state: IProductPageState,
      action
    ) => {
      state.error = action.error;
      state.item = null;
      state.isLoading = false;
      state.avalible = false;
    }
  }
});

export const selectProduct = (state: TRootState) => state.product.item;
export const selectQuantity = (state: TRootState) => state.product.quantity;
export const selectAvalible = (state: TRootState) => state.product.avalible;
export const selectSelectedSize = (state: TRootState) => state.product.selectedSize;
export const selectProductLoading = (state: TRootState) => state.product.isLoading;
export const selectProductError = (state: TRootState) => state.product.error;
export const { increment, decrement, setTheSize, resetSize } = productPageSlice.actions;
export const productPageReducer = productPageSlice.reducer;
