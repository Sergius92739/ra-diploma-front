import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { selectCartItems, updateCart, removeProductFromCart } from "../../../slices/cartSlice/cartSlice"
import { Link } from "react-router-dom";
import { Paths } from "../../../Paths";
import { nanoid } from "nanoid";
import { ICartItem, ICartState } from "../../../slices/cartSlice/interfaces";

export function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const storageData = JSON.parse(localStorage.getItem('cart') as string) as ICartState;
  const stateItems = useAppSelector(selectCartItems);
  const items = storageData.items || stateItems;
  const total = items.reduce((prev, cur) => prev + cur.total, 0);

  const onRemoveBtnClick = (index: number) => {
    dispatch(removeProductFromCart(index));
    dispatch(updateCart());
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {
          items.length ? <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {
                items.length ? items.map(
                  (el: ICartItem, idx: number) =>
                    <tr key={nanoid()}>
                      <td>{idx + 1}</td>
                      <td><Link to={`${Paths.CATALOG}${el.id}`}>{el.title}</Link></td>
                      <td>{el.size}</td>
                      <td>{el.quantity}</td>
                      <td>{el.price} руб.</td>
                      <td>{el.total} руб.</td>
                      <td>
                        <button
                          onClick={() => onRemoveBtnClick(idx)}
                          className="btn btn-outline-danger btn-sm">
                          Удалить
                        </button>
                      </td>
                    </tr>
                ) : null
              }
              <tr>
                <td colSpan={5} className="text-right">Общая стоимость</td>
                <td>{total} руб.</td>
              </tr>
            </tbody>
          </table> : <div style={{ textAlign: 'center' }}>В корзине нет товаров</div>
        }
      </section>
      {
        items.length ? <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input className="form-control" id="phone" placeholder="Ваш телефон" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input className="form-control" id="address" placeholder="Адрес доставки" />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">Оформить</button>
            </form>
          </div>
        </section> : null
      }
    </>
  )
}