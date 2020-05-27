import * as React from 'react';

import { Category } from '../reducers/categories';

import CategoryContainer from '../containers/category';

interface Props {
  items: Category[];
}

export default ({items}: Props) => (
  <div className="d-flex flex-column category-list">
    <div className="mb-3">
      <h4>Categories</h4>
    </div>
    {items.map((category, index) => (
      <CategoryContainer key={`${category}-${index}`} {...category}/>
    ))}
  </div>
);
