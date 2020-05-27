import * as React from 'react';

import SearchForm from './components/search-form';

import SelectedCategories from './containers/selected-category';
import Categories from './containers/categories';
import Products from './containers/products'

export default (_: any) => (
  <div className="container">
    <div className="d-flex flex-column">
      <SearchForm />

      <SelectedCategories />

      <div className="row">
        <div className="col-2">
          <Categories />
        </div>
        <div className="col-10">
          <Products />
        </div>
      </div>
    </div>
  </div>
);
