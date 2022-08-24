import './Error.scss';
import { SerializedError } from '@reduxjs/toolkit';
import { selectCatalogError, selectCatalogItems, selectCatalogSearch, selectMoreError } from '../../slices/catalogSlice/catalogSlice';
import { selectTopSalesError } from '../../slices/topSalesSlice/topSalesSlice';
import { selectCategoriesError, selectCategoriesSelected } from '../../slices/categorySlice/categorySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCatalogItems, fetchCategories, fetchMoreItems, fetchTopSales } from '../../slices/asyncThunkCreator';

type TPropsError = {
  error: SerializedError,
  text: string
}

export function Error({ error, text }: TPropsError): JSX.Element {
  const dispatch = useAppDispatch();
  const categoriesError = useAppSelector(selectCategoriesError);
  const catalogError = useAppSelector(selectCatalogError);
  const topSalesError = useAppSelector(selectTopSalesError);
  const selectedCategory = useAppSelector(selectCategoriesSelected);
  const moreError = useAppSelector(selectMoreError);
  const items = useAppSelector(selectCatalogItems);
  const search = useAppSelector(selectCatalogSearch);

  const handleClick = (e: React.MouseEvent) => {
    if (topSalesError && e.currentTarget.closest('.top-sales')) {
      return dispatch(fetchTopSales())
    }
    if (categoriesError && e.currentTarget.closest('.catalog-categories')) {
      return dispatch(fetchCategories())
    }
    if (catalogError && e.currentTarget.closest('.row')) {
      return dispatch(fetchCatalogItems({
        categoryId: selectedCategory.id,
        q: search
      }))
    }
    if (moreError && e.currentTarget.closest('.text-center')) {
      return dispatch(fetchMoreItems({
        categoryId: selectedCategory.id,
        offset: items.length,
        q: search
      }))
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