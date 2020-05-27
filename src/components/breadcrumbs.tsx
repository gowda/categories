import * as React from 'react';
import { Category } from '../reducers/categories';

interface Props {
  categories: Category[];
  handleClick: (id: string, index: number) => void;
}

export default ({ categories, handleClick }: Props) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      {categories.map(({id, label}, index) => (
        <li
          key={`${label}-${index}`}
          className={`breadcrumb-item ${index === categories.length - 1 ? 'active' : ''}`}
          >
          <a href='#' onClick={(e) => { e.preventDefault(); handleClick(id, index) }}>
            {label}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);
