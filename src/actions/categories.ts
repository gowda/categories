import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RECEIVE_CATEGORIES } from '../reducers/categories';
import { fetchCategories } from '../api/categories';

export const getCategories = (): ThunkAction<Promise<void>, {}, {}, Action> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return fetchCategories()
      .then((categories) => {
        dispatch({type: RECEIVE_CATEGORIES, value: categories});
      })
  }
}
