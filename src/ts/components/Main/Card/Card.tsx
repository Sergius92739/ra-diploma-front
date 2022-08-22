import { Link } from 'react-router-dom';
import { Paths } from '../../../Paths';
import './Card.scss';

type TProps = {
  classname: string,
  id: number,
  category: number,
  title: string,
  price: number,
  images: string[]
}

export function Card(props: TProps): JSX.Element {
  const {classname, id, category, title, price, images} = props;

  return (
    <div className={`col-4 ${classname}`}>
      <div className="card">
        <img src={images[0]} className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price}</p>
          <Link to={`${Paths.CATALOG}:${id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}