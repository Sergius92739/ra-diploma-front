import { fetchCategories } from '../asyncThunkCreator'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ICategoryState } from './interfaces';
import { TRootState } from '../../store';

const initialState: ICategoryState = {
  categories: [],
  selected: { id: 0 },
  error: null,
  isLoading: false,
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelected(state: ICategoryState, action: PayloadAction<number>) {
      state.selected.id = action.payload;
    }
  },
  extraReducers: {
    [fetchCategories.pending.type]: (
      state: ICategoryState
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchCategories.fulfilled.type]: (
      state: ICategoryState,
      action: PayloadAction<ICategory[]>
    ) => {
      state.isLoading = false;
      state.error = null;
      state.categories = [{ id: 0, title: 'Все' }, ...action.payload];
    },
    [fetchCategories.rejected.type]: (
      state: ICategoryState,
      action
    ) => {
      state.categories = [];
      state.isLoading = false;
      state.error = action.error;
    },
  }
});

export const selectCategories = (state: TRootState) => state.categories.categories;
export const selectCategoriesError = (state: TRootState) => state.categories.error;
export const selectCategoriesLoading = (state: TRootState) => state.categories.isLoading;
export const selectCategoriesSelected = (state: TRootState) => state.categories.selected;
export const { setSelected } = categorySlice.actions
export const categoryReducer = categorySlice.reducer;
