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
import { selectCatalogError, selectCatalogItems, selectCatalogLoading, selectCatalogSearch } from '../../../slices/catalogSlice/catalogSlice';

export function Catalog({ children }: { children: ReactNode }): JSX.Element {
  const items = useAppSelector(selectCatalogItems);
  const categories = useAppSelector(selectCategories);
  const catalogItemsLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const catalogItemsError = useAppSelector(selectCatalogError);
  const categoriesError = useAppSelector(selectCategoriesError);
  const selectedCategory = useAppSelector(selectCategoriesSelected);
  const search = useAppSelector(selectCatalogSearch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCatalogItems({ 
      categoryId: selectedCategory.id,
      q: search,
    }));
  }, [])

  const catalogHeader = () =>
    <>
      {children}
      <Categories categories={categories} />
      {(catalogItemsLoading || categoriesLoading) && <Preloader />}
    </>

  const homePageCatalogHeader = () =>
    <>
      {catalogItemsLoading || categoriesLoading ? <Preloader /> : <Categories categories={categories} />}
    </>

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children ? catalogHeader() : homePageCatalogHeader()}
      {<CardList>
        {
          items && items.map((el) => <Card key={el.id} {...el} classname='catalog-item-card' />)
        }
      </CardList>}
      {<More />}
    </section>
  )
}