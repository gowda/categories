import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { fetchProducts, fetchProductsFor, doCreateProduct } from '../api/products';
import { RECEIVE_PRODUCTS } from '../reducers/products';

export const getProducts = (): ThunkAction<Promise<void>, {}, {}, Action> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return fetchProducts()
      .then((products) => {
        dispatch({type: RECEIVE_PRODUCTS, value: products});
      })
  }
}

export const getProductsFor = (categoryId: string): ThunkAction<Promise<void>, {}, {}, Action> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return fetchProductsFor(categoryId)
      .then((products) => {
        dispatch({type: RECEIVE_PRODUCTS, value: products});
      })
  }
}

export const createProduct = (title: string, description: string, price: number, categories: string[]): ThunkAction<Promise<void>, {}, {}, Action> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return doCreateProduct(title, description, price, categories)
      .then(() => {
        dispatch(getProducts());
      })
  }
}
