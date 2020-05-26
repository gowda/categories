import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';

import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { Category } from './reducers/categories';
import { Product } from './reducers/products';
import { getCategories } from './actions/categories';
import { getProducts } from './actions/products';

const CATEGORIES: Category[] = [
  {
    label: 'Category label 1'
  },
  {
    label: 'Category label 2'
  },
  {
    label: 'Category label 3'
  },
  {
    label: 'Category label 4'
  },
  {
    label: 'Category label 5'
  },
  {
    label: 'Category label 6'
  },
  {
    label: 'Category label 7'
  },
  {
    label: 'Category label 8'
  },
  {
    label: 'Category label 9'
  }
];

const PRODUCTS: Product[] = [
  {
    title: 'Product title 1',
    description: 'Production description 1',
    price: 'INR 1200'
  },
  {
    title: 'Product title 2',
    description: 'Production description 2',
    price: 'INR 1200'
  },
  {
    title: 'Product title 3',
    description: 'Production description 3',
    price: 'INR 1200'
  },
  {
    title: 'Product title 4',
    description: 'Production description 4',
    price: 'INR 1200'
  },
  {
    title: 'Product title 5',
    description: 'Production description 5',
    price: 'INR 1200'
  },
  {
    title: 'Product title 6',
    description: 'Production description 6',
    price: 'INR 1200'
  },
  {
    title: 'Product title 7',
    description: 'Production description 7',
    price: 'INR 1200'
  },
  {
    title: 'Product title 8',
    description: 'Production description 8',
    price: 'INR 1200'
  },
  {
    title: 'Product title 9',
    description: 'Production description 9',
    price: 'INR 1200'
  },
  {
    title: 'Product title 10',
    description: 'Production description 10',
    price: 'INR 1200'
  },
  {
    title: 'Product title 11',
    description: 'Production description 11',
    price: 'INR 1200'
  },
];

const store = createStore(
  rootReducer,
  {
    categories: CATEGORIES,
    products: PRODUCTS
  },
  composeWithDevTools(applyMiddleware(thunk))
);

(store.dispatch as ThunkDispatch<{}, {}, any>)(getCategories());
(store.dispatch as ThunkDispatch<{}, {}, any>)(getProducts());

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
