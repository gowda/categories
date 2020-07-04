import * as React from 'react';
import ProductListItem from './product-list-item';
import { Product } from '../reducers/products';

const partition = (array: Product[], size: number) => {
  const partitions = ([[]] as Product[][]);
  for (const index of array.keys()) {
    if (index % size === 0) {
      partitions.push([array[index]]);
    } else {
      partitions[partitions.length - 1].push(array[index])
    }
  }

  return partitions;
}

interface Props {
  items: Product[];
}

export default ({items}: Props) => (
  <div className="d-flex flex-column">
    <div className="ml-2 mb-3">
      <h4>Products</h4>
    </div>

    {partition(items, 3).map((products, sliceIndex) => (
      <div className="d-flex flex-row mb-4 align-items-start" key={sliceIndex}>
        {products.map((product) => (
          <ProductListItem {...product} key={product.id}/>
        ))}
      </div>
    ))}
  </div>
);
