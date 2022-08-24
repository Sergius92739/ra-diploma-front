import React, { ReactNode } from 'react'
import { useAppSelector } from '../../../../hooks/hooks'
import { selectCatalogError } from '../../../../slices/catalogSlice/catalogSlice';
import { Error } from '../../../Error/Error'

type Props = { children: ReactNode }

export function CardList({ children }: Props): JSX.Element {
  const catalogItemsError = useAppSelector(selectCatalogError);

  return (
    <div className="row">
      {catalogItemsError && <Error text='Ошибка запроса элементов каталога' error={catalogItemsError} />}
      {children}
    </div>
  )
}
