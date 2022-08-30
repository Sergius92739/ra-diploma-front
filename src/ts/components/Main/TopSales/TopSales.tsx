import './TopSales.scss';
import { Preloader } from '../Preloader/Preloader';
import { Card } from '../Card/Card';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  selectTopSalesError,
  selectTopSalesLoading,
  selectTopSales
} from '../../../slices/topSalesSlice/topSalesSlice';
import { fetchTopSales } from '../../../slices/asyncThunkCreator';
import { Error } from '../../Error/Error';
import { ICardItem } from '../../../slices/topSalesSlice/interfaces';

export function TopSales(): JSX.Element {
  const dispatch = useAppDispatch();
  const topSalesError = useAppSelector(selectTopSalesError);
  const loading = useAppSelector(selectTopSalesLoading);
  const topSales = useAppSelector(selectTopSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [])

  return (
    <>
      {
        loading && <section className='top-sales'>
          <h2 className="text-center">Хиты продаж!</h2>
          <Preloader />
        </section>
      }
      {
        topSalesError && <section className='top-sales'>
          <h2 className="text-center">Хиты продаж!</h2>
          <Error
            error={topSalesError}
            text={'Ошибка запроса хитов продаж'}
            clossest='.top-sales'
            callback={fetchTopSales}
          />
        </section>
      }
      {
        topSales.length
          ? <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {
              loading && <Preloader />
            }
            <div className="row">
              {
                topSales.map((el: ICardItem) => <Card key={el.id} {...el} classname='' />)
              }
            </div>
          </section>
          : null
      }
    </>
  )
}