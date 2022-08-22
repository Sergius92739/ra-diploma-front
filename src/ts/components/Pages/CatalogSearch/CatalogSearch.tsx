import { useAppSelector } from "../../../hooks/hooks";
import { selectCatalogLoading } from "../../../slices/catalogSlice/catalogSlice";
import { selectCategoriesLoading } from "../../../slices/categorySlice/categorySlice";
import { Catalog } from "../../Main/Catalog/Catalog";


export function CatalogSearch(): JSX.Element {
  const catalogLoading = useAppSelector(selectCatalogLoading);
  const categoriesLoading = useAppSelector(selectCategoriesLoading)

  return (
    <Catalog>
      {(!catalogLoading && !categoriesLoading) && <form className="catalog-search-form form-inline">
        <input className="form-control" placeholder="Поиск" />
      </form>}
    </Catalog>
  )
}