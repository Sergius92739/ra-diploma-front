import { useAppSelector } from "../../../hooks/hooks";
import { selectCatalogLoading } from "../../../slices/catalogSlice/catalogSlice";
import { selectCategoriesLoading } from "../../../slices/categorySlice/categorySlice";
import { Catalog } from "../../Main/Catalog/Catalog";
import { SearchFormHeader } from './SearchFormHeader/SearchFormHeader';


export function CatalogSearch(): JSX.Element {
  const catalogLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading)

  return (
    <Catalog>
      <SearchFormHeader />
    </Catalog>
  )
}