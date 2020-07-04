import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';

import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { getCategories } from './actions/categories';
import { getProducts } from './actions/products';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

(store.dispatch as ThunkDispatch<{}, {}, any>)(getCategories());
(store.dispatch as ThunkDispatch<{}, {}, any>)(getProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
