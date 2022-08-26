import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../catalogSlice/interfaces';
import { IProduct } from '../productPageSlice/interfaces';
import { ICardItem } from '../topSalesSlice/interfaces';

type TFetchProps = {
  categoryId?: number,
  offset?: number,
  q?: string;
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
  const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/items?${query}`)
  const response = await fetch(url);
  return (await response.json()) as ICardItem[];
}

export const fetchTopSales = createAsyncThunk(
  'api/top-sales',
  async () => {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/top-sales`)
    const response = await fetch(url);
    return (await response.json()) as ICardItem[];
  }
)

export const fetchCategories = createAsyncThunk(
  'api/categories',
  async () => {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/categories`)
    const response = await fetch(url);
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
);

export const fetchProduct = createAsyncThunk(
  'api/items/:id',
  async (id: string) => {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/items/${id}`)
    const response = await fetch(url);
    const result = await response.json();
    return result as IProduct;
  }
)
