import * as React from 'react';

import SearchForm from './components/search-form';

import SelectedCategories from './containers/selected-category';
import Categories from './containers/categories';
import Products from './containers/products';
import ActionButtons from './containers/action-buttons';

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

      <div className="row">
        <div className="col-12">
          <ActionButtons />
        </div>
      </div>
    </div>
  </div>
);
