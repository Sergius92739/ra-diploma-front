import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ICatalogState, ICategory } from './interfaces';
import { ICardItem } from '../topSalesSlice/interfaces';
import { fetchCatalogItems } from '../asyncThunkCreator'
import { TRootState } from '../../store';

const initialState: ICatalogState = {
  isLoading: false,
  error: null,
  items: []
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: {
    
    [fetchCatalogItems.pending.type]: (
      state: ICatalogState
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchCatalogItems.fulfilled.type]: (
      state: ICatalogState,
      action: PayloadAction<{result: ICardItem[], id: number}>
    ) => {
      state.items = action.payload.result;
      state.isLoading = false;
      state.error = null;
    },
    [fetchCatalogItems.rejected.type]: (
      state: ICatalogState,
      action
    ) => {
      state.items = [];
      state.isLoading = false;
      state.error = action.error;
    }
  }
});

export const selectCatalogError = (state: TRootState) => state.catalogItems.error;
export const selectCatalogItems = (state: TRootState) => state.catalogItems.items;
export const selectCatalogLoading = (state: TRootState) => state.catalogItems.isLoading;

export const catalogItemsReducer = catalogSlice.reducer;
