import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { ICatalogState } from './interfaces';
import { ICardItem } from '../topSalesSlice/interfaces';
import { fetchCatalogItems, fetchMoreItems } from '../asyncThunkCreator'
import { TRootState } from '../../store';

const initialState: ICatalogState = {
  itemsLoading: false,
  itemsError: null,
  items: [],
  moreLoading: false,
  moreVisible: true,
  moreError: null,
  search: ''
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    changeFied(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetForm(state) {
      state.search = '';
    }
  },
  extraReducers: {
    [fetchCatalogItems.pending.type]: (
      state: ICatalogState
    ) => {
      state.itemsLoading = true;
      state.itemsError = null;
      state.moreVisible = false;
      state.items = [];
    },
    [fetchCatalogItems.fulfilled.type]: (
      state: ICatalogState,
      action: PayloadAction<ICardItem[]>
    ) => {
      state.items = action.payload;
      state.itemsLoading = false;
      state.moreVisible = (state.items.length < 6 || !state.items.length) ? false : true;
    },
    [fetchCatalogItems.rejected.type]: (
      state: ICatalogState,
      action
    ) => {
      state.itemsError = action.error;
      state.items = [];
      state.itemsLoading = false;
      state.moreVisible = false;
    },
    [fetchMoreItems.pending.type]: (
      state: ICatalogState
    ) => {
      state.moreLoading = true;
      state.moreError = null;
      state.moreVisible = false;
    },
    [fetchMoreItems.fulfilled.type]: (
      state: ICatalogState,
      action: PayloadAction<ICardItem[]>
    ) => {
      state.items = [...state.items, ...action.payload];
      state.moreLoading = false;
      state.moreVisible = (!action.payload.length || action.payload.length < 6) ? false : true;
    },
    [fetchMoreItems.rejected.type]: (
      state: ICatalogState,
      action
    ) => {
      state.moreError = action.error;
      state.moreVisible = false;
    },
  }
});

export const selectCatalogError = (state: TRootState) => state.catalogItems.itemsError;
export const selectCatalogItems = (state: TRootState) => state.catalogItems.items;
export const selectCatalogLoading = (state: TRootState) => state.catalogItems.itemsLoading;
export const selectMoreVisible = (state: TRootState) => state.catalogItems.moreVisible;
export const selectMoreLoading = (state: TRootState) => state.catalogItems.moreLoading;
export const selectMoreError = (state: TRootState) => state.catalogItems.moreError;
export const selectCatalogSearch = (state: TRootState) => state.catalogItems.search;
export const { changeFied, resetForm } = catalogSlice.actions;
export const catalogItemsReducer = catalogSlice.reducer;
