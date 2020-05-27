import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RECEIVE_PRODUCTS } from '../reducers/products';
import { UPDATE_SEARCH_QUERY } from '../reducers/search-query';
import { fetchProductsMatching, fetchProducts } from '../api/products';
import { RESET_SELECTED_CATEGORIES } from '../reducers/selected-categories';
import { fetchCategories } from '../api/categories';
import { RECEIVE_CATEGORIES } from '../reducers/categories';

export const updateSearchQuery = (q: string): ThunkAction<Promise<void>, {}, {}, Action> => {
  if (q.trim().length === 0) {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const productsPromise = fetchProducts().then((products) => {
        dispatch({type: RECEIVE_PRODUCTS, value: products});
      });
      const categoriesPromise = fetchCategories().then((categories) => {
        dispatch({type: RECEIVE_CATEGORIES, value: categories})
        dispatch({type: UPDATE_SEARCH_QUERY, value: q});
        dispatch({type: RESET_SELECTED_CATEGORIES })
      });

      return (Promise.all([productsPromise, categoriesPromise]) as any as Promise<void>);
    }
  } else {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      return new Promise<void>((resolve) => {
        dispatch({type: UPDATE_SEARCH_QUERY, value: q});
        resolve();
      });
    }
  }
}

export const search = (q: string): ThunkAction<Promise<void>, {}, {}, Action> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return fetchCategories().then((categories) => {
      dispatch({type: RECEIVE_CATEGORIES, value: categories})
      dispatch({type: UPDATE_SEARCH_QUERY, value: q});
      dispatch({type: RESET_SELECTED_CATEGORIES })
    }).then(() => fetchProductsMatching(q))
      .then((products) => {
        dispatch({
          type: RECEIVE_PRODUCTS,
          value: products,
        });
    })
  }
}
