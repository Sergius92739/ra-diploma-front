import { configureStore } from '@reduxjs/toolkit';
import { topSalesReducer } from '../slices/topSalesSlice/topSalesSlice';
import { catalogItemsReducer } from '../slices/catalogSlice/catalogSlice';
import { categoryReducer } from '../slices/categorySlice/categorySlice'

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalogItems: catalogItemsReducer,
    categories: categoryReducer,
  }
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
