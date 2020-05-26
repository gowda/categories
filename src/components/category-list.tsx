import * as React from 'react';

import CategoryComponent from './category';
import { Category } from '../reducers/categories';

interface Props {
  items: Category[];
}

export default ({items}: Props) => (
  <div className="d-flex flex-column category-list">
    <div className="mb-3">
      <h4>Categories</h4>
    </div>
    {items.map((category, index) => (<CategoryComponent key={`${category}-${index}`} {...category}/>))}
  </div>
);
