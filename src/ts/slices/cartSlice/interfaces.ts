export interface ICartItem {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ICartState {
  items: ICartItem[];
}