import { configureStore } from '@reduxjs/toolkit';
import { topSalesReducer } from '../slices/topSalesSlice/topSalesSlice';
import { catalogItemsReducer } from '../slices/catalogSlice/catalogSlice';
import { categoryReducer } from '../slices/categorySlice/categorySlice'
import { iconSearchReducer } from '../slices/iconSearchSlice/iconSearchSlice';
import { productPageReducer } from '../slices/productPageSlice/productPageSlice';
import { cartReducer } from '../slices/cartSlice/cartSlice';

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalogItems: catalogItemsReducer,
    categories: categoryReducer,
    iconSearch: iconSearchReducer,
    product: productPageReducer,
    cart: cartReducer
  }
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
