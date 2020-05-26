import * as React from 'react';
import { connect } from 'react-redux';

import SearchForm from './components/search-form';
import Breadcrumbs from './components/breadcrumbs';
import CategoryList from './components/category-list';
import ProductList from './components/product-list';

import { RootState } from './reducers';
import { Category } from './reducers/categories';
import { Product } from './reducers/products';

interface Props {
  categories: Category[];
  products: Product[];
  selectedCategories: string[];
}

const App = ({ categories, products, selectedCategories }: Props) => (
  <div className="container">
    <div className="d-flex flex-column">
      <SearchForm />
      <Breadcrumbs labels={selectedCategories} />

      <div className="row">
        <div className="col-2">
          <CategoryList items={categories} />
        </div>
        <div className="col-10">
          <ProductList items={products} />
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: RootState): Props => {
  return {
    categories: state.categories,
    products: state.products,
    selectedCategories: state.selectedCategories,
  }
};

export default connect(mapStateToProps)(App)
