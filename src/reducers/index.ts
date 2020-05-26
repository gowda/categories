import { combineReducers } from 'redux';

import categoriesReducer from './categories';
import productsReducer from './products';
import selectedCategoriesReducer from './selected-categories';
import searchQueryReducer from './search-query'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  selectedCategories: selectedCategoriesReducer,
  query: searchQueryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
