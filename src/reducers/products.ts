export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
}

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

interface ReceiveProductsAction {
  type: typeof RECEIVE_PRODUCTS;
  value: Product[];
}

export default (products: Product[] = [], action: ReceiveProductsAction): Product[] => {
  switch(action.type) {
    case RECEIVE_PRODUCTS:
      return action.value;
    default:
      return products;
  }
}
