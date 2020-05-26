import * as React from 'react';

import SearchForm from './components/search-form';
import Breadcrumbs from './components/breadcrumbs';
import CategoryList from './components/category-list';
import ProductList from './components/product-list';

export default (_props: any) => (
  <div className="container">
    <div className="d-flex flex-column">
      <SearchForm />
      <Breadcrumbs labels={['Category 1', 'Category 2']} />

      <div className="row">
        <div className="col-2">
          <CategoryList />
        </div>
        <div className="col-10">
          <ProductList />
        </div>
      </div>
    </div>
  </div>
);
