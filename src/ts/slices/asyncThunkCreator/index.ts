import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../productPageSlice/interfaces';
import { ICardItem } from '../topSalesSlice/interfaces';

type TFetchProps = {
  categoryId?: number,
  offset?: number,
  q?: string;
}

const createRequestItems = async (options: TFetchProps) => {
  const callback = async (retryCount = 3): Promise<ICardItem[]> => {
    const categoryId = options.categoryId ? options.categoryId : 0;
    const offset = options.offset ? options.offset : 0;
    const q = options.q ? options.q : '';
    const query = new URLSearchParams({
      categoryId: `${categoryId}`,
      offset: `${offset}`,
      q: `${q}`
    });
    if (retryCount) {
      try {
        const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/items?${query}`)
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return (await response.json()) as ICardItem[];
      } catch {
        await callback(retryCount - 1)
      }
    }
    throw new Error('Превышен лимит запросов')
  }
  return callback();
}

const retryRequest = async (createRequest: Function, retryCount = 3) => {
  if (retryCount) {
    try {
      const response: Response = await createRequest();
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      return data;
    } catch {
      retryRequest(createRequest, retryCount - 1);
    }
  } else {
    throw new Error('Превышен лимит запросов')
  }
}


const fetchTopSalesCallback = async () => {
  const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/top-sales`)
  const response = await fetch(url);
  return response;
}

export const fetchTopSales = createAsyncThunk(
  'api/top-sales',
  async () => retryRequest(fetchTopSalesCallback)
)

const fetchCategoriesCallback = async () => {
  const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/categories`)
  const response = await fetch(url);
  return response;
}

export const fetchCategories = createAsyncThunk(
  'api/categories',
  async () => retryRequest(fetchCategoriesCallback)
)

export const fetchCatalogItems = createAsyncThunk(
  'api/items',
  createRequestItems
)

export const fetchMoreItems = createAsyncThunk(
  'api/items/more',
  createRequestItems
);

const fetchProductCallback = async (id: string) => {
  const callback = async (retryCount = 3) => {
    if (retryCount) {
      try {
        const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/items/${id}`)
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const result = await response.json();
        return result as IProduct;
      } catch {
        await callback(retryCount - 1)
      }
    }
    throw new Error('Превышен лимит запросов')
  }
  return callback();
}

export const fetchProduct = createAsyncThunk(
  'api/items/:id',
  fetchProductCallback
)

export type TBody = {
  owner: {
    phone: string,
    address: string
  },
  items: { id: number, price: number, count: number }[]
}

const fetchOrderCallback = async (body: TBody) => {
  const callback = async (retryCount = 3) => {
    if (retryCount) {
      try {
        const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/order`);
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        localStorage.clear();
        return response.status;
      } catch (error) {
        await callback(retryCount - 1)
      }
    } else {
      throw new Error('Превышен лимит запросов')
    }
  }
  return callback()
}

export const fetchOrder = createAsyncThunk(
  'api/order',
  fetchOrderCallback
)
