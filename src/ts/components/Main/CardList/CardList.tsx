import React, { ReactNode } from 'react'
import { useAppSelector } from '../../../hooks/hooks'
import { selectCatalogError, selectCatalogLoading } from '../../../slices/catalogSlice/catalogSlice';
import { Error } from '../../Error/Error'
import { Preloader } from '../Preloader/Preloader';

type Props = { children: ReactNode }

export function CardList({ children }: Props): JSX.Element {
  const catalogItemsError = useAppSelector(selectCatalogError);
  const catalogItemsLoading = useAppSelector(selectCatalogLoading);

  return (
    <div className="row">
      {/* {catalogItemsLoading && <Preloader />} */}
      {catalogItemsError && <Error text='Ошибка запроса элементов каталога' error={catalogItemsError} />}
      {children}
    </div>
  )
}
