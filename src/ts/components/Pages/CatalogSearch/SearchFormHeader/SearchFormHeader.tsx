import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectCatalogLoading, selectCatalogSearch, changeFied, resetForm } from '../../../../slices/catalogSlice/catalogSlice';
import { selectCategoriesLoading, selectCategoriesSelected } from '../../../../slices/categorySlice/categorySlice';
import { fetchSearchCatalog } from '../../../../slices/asyncThunkCreator';

export function SearchFormHeader(): JSX.Element {
  const catalogLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const search = useAppSelector(selectCatalogSearch);
  const selected = useAppSelector(selectCategoriesSelected);
  const dispatch = useAppDispatch();

  /* useEffect(() => {
    console.log('search: ', search)
  }, [search]) */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    dispatch(fetchSearchCatalog({
      categoryId: selected.id,
      q: search
    }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    dispatch(changeFied(value));
  }

  return (
    <>
      {<form onSubmit={handleSubmit} className="catalog-search-form form-inline">
        <input onChange={handleChange} value={search} className="form-control" placeholder="Поиск" />
      </form>}
    </>
  )
}

