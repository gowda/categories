import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RECEIVE_PRODUCTS } from '../reducers/products';
import { UPDATE_SEARCH_QUERY } from '../reducers/search-query';

export const updateSearchQuery = (q: string): ThunkAction<Promise<void>, {}, {}, Action> => {
  if (q.trim().length === 0) {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      return new Promise<void>((resolve) => {
        dispatch({
          type: UPDATE_SEARCH_QUERY,
          value: q,
        });
        dispatch({
          type: RECEIVE_PRODUCTS,
          value: [],
        });
        resolve();
      });
    }
  } else {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      return new Promise<void>((resolve) => {
        dispatch({
          type: UPDATE_SEARCH_QUERY,
          value: q,
        });
        resolve();
      });
    }
  }
}

export const search = (_q: string): ThunkAction<Promise<void>, {}, {}, Action> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      dispatch({
        type: RECEIVE_PRODUCTS,
        value: [],
      });
      resolve();
    })
  }
}
