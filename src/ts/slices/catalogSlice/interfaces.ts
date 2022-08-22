import { SerializedError } from "@reduxjs/toolkit";
import { ICardItem } from "../topSalesSlice/interfaces";

export interface ICategory {
  id: number;
  title: string;
}

export interface ICatalogState {
  isLoading: boolean;
  error: SerializedError | null;
  items: ICardItem[];
}