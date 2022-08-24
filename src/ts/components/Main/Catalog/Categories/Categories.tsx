import { Category } from "./Category/Category";
import { ICategory } from '../../../../slices/catalogSlice/interfaces';
import { useAppSelector } from "../../../../hooks/hooks";
import { selectCategoriesError, selectCategoriesLoading } from "../../../../slices/categorySlice/categorySlice";
import { Error } from "../../../Error/Error";
import { Preloader } from "../../Preloader/Preloader";

type TProps = { categories: ICategory[] }

export function Categories({ categories }: TProps): JSX.Element {
  const loading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);

  return (
    <>
      {!loading && <ul className="catalog-categories nav justify-content-center">
        {error && <Error text="Ошибка запроса категорий" error={error} />}
        {/* {loading && <Preloader />} */}
        {
          categories && categories.map((el) => <Category key={el.id} category={el} />)
        }
      </ul>}
    </>
  )
}