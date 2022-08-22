import { Category } from "./Category/Category";
import { ICategory } from '../../../../slices/catalogSlice/interfaces';
import { useAppSelector } from "../../../../hooks/hooks";
import { selectCategoriesError } from "../../../../slices/categorySlice/categorySlice";
import { Error } from "../../../Error/Error";
import { selectCategoriesLoading } from "../../../../slices/categorySlice/categorySlice";
import { Preloader } from "../../Preloader/Preloader";

type TProps = { categories: ICategory[] }

export function Categories({ categories }: TProps): JSX.Element {
  const error = useAppSelector(selectCategoriesError);
  const loading = useAppSelector(selectCategoriesLoading);

  return (
    <ul className="catalog-categories nav justify-content-center">
      {/* {loading && <Preloader />} */}
      {error && <Error text="Ошибка запроса категорий" error={error} />}
      {
        categories && categories.map((el) => <Category key={el.id} category={el} />)
      }
    </ul>
  )
}