import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../catalogSlice/interfaces';
import { ICardItem } from '../topSalesSlice/interfaces';

type TFetchProps = {
  categoryId: number,
  offset?: number,
  q?: string
}

const createRequestItems = async (options: TFetchProps) => {
  const categoryId = options.categoryId ? options.categoryId : 0;
  const offset = options.offset ? options.offset : 0;
  const q = options.q ? options.q : '';
  const query = new URLSearchParams({
    categoryId: `${categoryId}`,
    offset: `${offset}`,
    q: `${q}`
  });
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items?${query}`);
  return (await response.json()) as ICardItem[];
}

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
  createRequestItems
)

export const fetchMoreItems = createAsyncThunk(
  'api/items/more',
  createRequestItems
)

export const fetchSearchCatalog = createAsyncThunk(
  'api/search',
  createRequestItems,
)