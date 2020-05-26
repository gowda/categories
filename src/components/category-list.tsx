import * as React from 'react';

import Category from './category';

const CATEGORIES = [
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

export default (_props: any) => (
  <div className="d-flex flex-column category-list">
    <div className="mb-3">
      <h4>Categories</h4>
    </div>
    {CATEGORIES.map((category) => (<Category {...category}/>))}
  </div>
);
