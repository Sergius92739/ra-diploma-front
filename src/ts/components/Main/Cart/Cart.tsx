import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectCartItems,
  updateCart,
  removeProductFromCart,
  selectOrederState,
  selectOrderLoading,
  selectOrderError, resetOrder
} from "../../../slices/cartSlice/cartSlice"
import { Link } from "react-router-dom";
import { Paths } from "../../../Paths";
import { nanoid } from "nanoid";
import { ICartItem } from "../../../slices/cartSlice/interfaces";
import { FormEvent, ChangeEvent } from 'react';
import { addressSelector, resetOrderForm, telephoneSelector } from "../../../slices/orderSlice/orderSlice";
import { changeFiels } from '../../../slices/orderSlice/orderSlice';
import { TTelephoneNum } from "../../../slices/orderSlice/interfaces";
import { fetchOrder } from '../../../slices/asyncThunkCreator';
import { Preloader } from "../Preloader/Preloader";

export function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const storageData = JSON.parse(localStorage.getItem('cart') as string) as { items: ICartItem[] };
  const stateItems = useAppSelector(selectCartItems);
  const orderState = useAppSelector(selectOrederState);
  const items = storageData ? storageData.items : stateItems;
  const orderLoading = useAppSelector(selectOrderLoading);
  const orderError = useAppSelector(selectOrderError);
  const total = items.reduce((prev, cur) => prev + cur.total, 0);
  const telephone = useAppSelector(telephoneSelector) as TTelephoneNum;
  const { num_1, num_2, num_3, num_4 } = telephone;
  const address = useAppSelector(addressSelector);

  const onRemoveBtnClick = (index: number) => {
    dispatch(removeProductFromCart(index));
    dispatch(updateCart());
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      owner: {
        phone: `+7${num_1}${num_2}${num_3}${num_4}`,
        address,
      },
      items: items.map(el => ({ id: el.id, price: el.price, count: el.quantity }))
    }
    dispatch(fetchOrder(body));
    dispatch(updateCart());
    dispatch(resetOrderForm());
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeFiels({ name, value }));
  }

  const showSuccess = () => {
    setTimeout(() => {
      dispatch(resetOrder())
    }, 3000);
    return <div style={{ textAlign: 'center', margin: '2em 0 2em 0' }}>
      ?????????? ?????????????? ????????????????
    </div>
  }

  return (
    <>
      {
        orderLoading
          ? <Preloader />
          : <>
            {
              orderState && showSuccess()
            }
            {
              (items.length !== 0 && !orderState) && <>
                <section className="cart">
                  <h2 className="text-center">??????????????</h2>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">????????????????</th>
                        <th scope="col">????????????</th>
                        <th scope="col">??????-????</th>
                        <th scope="col">??????????????????</th>
                        <th scope="col">??????????</th>
                        <th scope="col">????????????????</th>
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
                              <td>{el.price} ??????.</td>
                              <td>{el.total} ??????.</td>
                              <td>
                                <button
                                  onClick={() => onRemoveBtnClick(idx)}
                                  className="btn btn-outline-danger btn-sm">
                                  ??????????????
                                </button>
                              </td>
                            </tr>
                        ) : null
                      }
                      <tr>
                        <td colSpan={5} className="text-right">?????????? ??????????????????</td>
                        <td>{total} ??????.</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section className="order">
                  <h2 className="text-center">???????????????? ??????????</h2>
                  {
                    orderError &&
                    <div className="error">
                      <div className="error__wrap">
                        <div className="error__mes">
                          ???????????? ?????????????? ???????????????????? ????????????, ?????????????????? ???????????????? ????????????
                        </div>
                      </div>
                    </div>
                  }
                  <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit} className="card-body">
                      <div className="form-group">
                        <label
                          style={{ display: 'block' }}
                          htmlFor="phone">
                          ?????????????? ?? ??????????????: (123) - 456 - 78 - 90
                        </label>
                        <span> ( </span>
                        <input
                          onChange={handleChange}
                          title="?????????? ???? 0 ???? 9"
                          type="tel"
                          name="num_1"
                          className="form-control"
                          id="phone"
                          style={{ display: 'inline-block', width: '3.6em' }}
                          placeholder="###"
                          pattern="[0-9]{3}"
                          maxLength={3}
                          value={num_1}
                          required
                        />
                        <span> ) </span>
                        <span style={{ margin: '0 0.5em 0 0.5em' }}> - </span>
                        <input
                          onChange={handleChange}
                          title="?????????? ???? 0 ???? 9"
                          type="tel"
                          name="num_2"
                          className="form-control"
                          id="phone"
                          style={{ display: 'inline-block', width: '3.6em' }}
                          placeholder="###"
                          pattern="[0-9]{3}"
                          maxLength={3}
                          value={num_2}
                          required
                        />
                        <span style={{ margin: '0 0.5em 0 0.5em' }}> - </span>
                        <input
                          onChange={handleChange}
                          title="?????????? ???? 0 ???? 9"
                          type="tel"
                          name="num_3"
                          className="form-control"
                          id="phone"
                          style={{ display: 'inline-block', width: '3em' }}
                          placeholder="##"
                          pattern="[0-9]{2}"
                          maxLength={2}
                          value={num_3}
                          required
                        />
                        <span style={{ margin: '0 0.5em 0 0.5em' }}> - </span>
                        <input
                          onChange={handleChange}
                          title="?????????? ???? 0 ???? 9"
                          type="tel"
                          name="num_4"
                          className="form-control"
                          id="phone"
                          style={{ display: 'inline-block', width: '3em' }}
                          placeholder="##"
                          pattern="[0-9]{2}"
                          maxLength={2}
                          value={num_4}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="address">
                          ?????????? ????????????????
                        </label>
                        <input
                          onChange={handleChange}
                          name="address"
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="?????????? ????????????????"
                          value={address}
                          required
                        />
                      </div>
                      <div className="form-group form-check">
                        <input
                          onChange={handleChange}
                          name="agree"
                          type="checkbox"
                          className="form-check-input"
                          // checked={agree}
                          id="agreement"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agreement">
                          ???????????????? ?? ?????????????????? ????????????????
                        </label>
                      </div>
                      <button type="submit" className="btn btn-outline-secondary">????????????????</button>
                    </form>
                  </div>
                </section>
              </>
            }
            {
              (!items.length && !orderState) &&
              <div style={{ textAlign: 'center', margin: '2em 0 2em 0' }}>
                ?? ?????????????? ?????? ??????????????
              </div>
            }
          </>
      }
    </>
  )
}