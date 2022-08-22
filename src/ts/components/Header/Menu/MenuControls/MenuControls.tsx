import { Cart } from './Cart/Cart';
import { SearchForm } from './SearchForm/SearchForm';

export function MenuControls(): JSX.Element {
  return (
    <div>
      <Cart />
      <SearchForm />
    </div>
  )
}