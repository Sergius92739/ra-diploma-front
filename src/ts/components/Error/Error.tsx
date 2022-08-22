import './Error.scss';
import { SerializedError } from '@reduxjs/toolkit';
import { selectCatalogError } from '../../slices/catalogSlice/catalogSlice';
import { selectTopSalesError } from '../../slices/topSalesSlice/topSalesSlice';
import { selectCategoriesError, selectCategoriesSelected } from '../../slices/categorySlice/categorySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCatalogItems, fetchCategories, fetchTopSales } from '../../slices/asyncThunkCreator';
import React, { useEffect } from 'react';

type TPropsError = {
  error: SerializedError,
  text: string
}

export function Error({ error, text }: TPropsError): JSX.Element {
  const dispatch = useAppDispatch();
  const categoriesError = useAppSelector(selectCategoriesError);
  const catalogError = useAppSelector(selectCatalogError);
  const topSalesError = useAppSelector(selectTopSalesError);
  const selectedCategory = useAppSelector(selectCategoriesSelected)

  const handleClick = (e: React.MouseEvent) => {
    if (topSalesError && e.currentTarget.closest('.top-sales')) {
      return dispatch(fetchTopSales())
    }
    if (categoriesError && e.currentTarget.closest('.catalog-categories')) {
      return dispatch(fetchCategories())
    }
    if (catalogError && e.currentTarget.closest('.row')) {
      return dispatch(fetchCatalogItems(selectedCategory.id))
    }
  }

  return (
    <div className="error">
      <div className="error__wrap">
        <div className="error__mes">{`${text}: ${error.message}`}</div>
        <button onClick={handleClick} className="error__btn">Повторить запрос</button>
      </div>
    </div>
  )
}