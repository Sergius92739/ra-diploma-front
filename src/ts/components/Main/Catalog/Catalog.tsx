import './Catalog.scss';
import { Card } from "../Card/Card";
import { CardList } from "../CardList/CardList";
import { Categories } from "./Categories/Categories";
import { More } from './More/More';
import { Preloader } from '../Preloader/Preloader';
import { ReactNode, useEffect } from 'react';
import { selectCategoriesSelected, selectCategories, selectCategoriesError, selectCategoriesLoading } from '../../../slices/categorySlice/categorySlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Error } from '../../Error/Error';
import { fetchCatalogItems, fetchCategories } from '../../../slices/asyncThunkCreator'
import { selectCatalogError, selectCatalogItems, selectCatalogLoading } from '../../../slices/catalogSlice/catalogSlice';

export function Catalog({ children }: { children: ReactNode }): JSX.Element {
  const items = useAppSelector(selectCatalogItems);
  const categories = useAppSelector(selectCategories);
  const catalogItemsLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading)
  const catalogItemsError = useAppSelector(selectCatalogError)
  const selected = useAppSelector(selectCategoriesSelected)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCatalogItems(selected.id))
  }, [])

  return (
    <>

      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {(catalogItemsLoading || categoriesLoading) && <Preloader />}
        {children}
        {(!catalogItemsLoading && !categoriesLoading) && <Categories categories={categories} />}
        {!catalogItemsLoading && !categoriesLoading && <CardList>
          {
            (items) && items.map((el) => <Card key={el.id} {...el} classname='catalog-item-card' />)
          }
        </CardList>}
        {(!catalogItemsError && !catalogItemsLoading && !categoriesLoading) && <More />}
      </section>
    </>
  )
}