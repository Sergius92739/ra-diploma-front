import './Catalog.scss';
import { Card } from "../Card/Card";
import { CardList } from "./CardList/CardList";
import { Categories } from "./Categories/Categories";
import { More } from './More/More';
import { Preloader } from '../Preloader/Preloader';
import { ReactNode, useEffect } from 'react';
import { selectCategoriesSelected, selectCategories, selectCategoriesError, selectCategoriesLoading } from '../../../slices/categorySlice/categorySlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchCatalogItems, fetchCategories } from '../../../slices/asyncThunkCreator'
import { selectCatalogError, selectCatalogItems, selectCatalogLoading } from '../../../slices/catalogSlice/catalogSlice';

export function Catalog({ children }: { children: ReactNode }): JSX.Element {
  const items = useAppSelector(selectCatalogItems);
  const categories = useAppSelector(selectCategories);
  const catalogItemsLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading)
  const catalogItemsError = useAppSelector(selectCatalogError)
  const selectedCategory = useAppSelector(selectCategoriesSelected)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCatalogItems({ categoryId: selectedCategory.id }));
  }, [])

  const catalogHeader = () =>
    <>
      {children}
      <Categories categories={categories} />
      {(catalogItemsLoading || categoriesLoading) && <Preloader />}
    </>

  const homePageCatalogHeader = () =>
    <>
      {catalogItemsLoading ? <Preloader /> : <Categories categories={categories} />}
    </>

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children ? catalogHeader() : homePageCatalogHeader()}
      {!catalogItemsLoading && <CardList>
        {
          items && items.map((el) => <Card key={el.id} {...el} classname='catalog-item-card' />)
        }
      </CardList>}
      {!categoriesLoading && <More />}
    </section>
  )
}