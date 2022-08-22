import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../catalogSlice/interfaces';
import { ICardItem } from '../topSalesSlice/interfaces'

export const fetchTopSales = createAsyncThunk(
  'api/top-sales',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/top-sales`);
    return (await response.json()) as ICardItem[];
  }
)

export const fetchCategories = createAsyncThunk(
  'api/categories',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/categories`);
    return (await response.json()) as ICategory[];
  }
)

export const fetchCatalogItems = createAsyncThunk(
  'api/items', 
  async (param: number = 0) => {
    const query = new URLSearchParams({categoryId: `${param}`});
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items?${query}`);
    const result = await response.json()
    return {
      result,
      id: param
    }
  }
)