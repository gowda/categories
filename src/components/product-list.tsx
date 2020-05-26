import * as React from 'react';
import Product from './product';

interface Product {
  title: string;
  description: string;
  price: string;
}

const PRODUCTS: Product[] = [
  {
    title: 'Product title 1',
    description: 'Production description 1',
    price: 'INR 1200'
  },
  {
    title: 'Product title 2',
    description: 'Production description 2',
    price: 'INR 1200'
  },
  {
    title: 'Product title 3',
    description: 'Production description 3',
    price: 'INR 1200'
  },
  {
    title: 'Product title 4',
    description: 'Production description 4',
    price: 'INR 1200'
  },
  {
    title: 'Product title 5',
    description: 'Production description 5',
    price: 'INR 1200'
  },
  {
    title: 'Product title 6',
    description: 'Production description 6',
    price: 'INR 1200'
  },
  {
    title: 'Product title 7',
    description: 'Production description 7',
    price: 'INR 1200'
  },
  {
    title: 'Product title 8',
    description: 'Production description 8',
    price: 'INR 1200'
  },
  {
    title: 'Product title 9',
    description: 'Production description 9',
    price: 'INR 1200'
  },
  {
    title: 'Product title 10',
    description: 'Production description 10',
    price: 'INR 1200'
  },
  {
    title: 'Product title 11',
    description: 'Production description 11',
    price: 'INR 1200'
  },
];

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

export default (_props: any) => (
  <div className="d-flex flex-column">
    <div className="ml-2 mb-3">
      <h4>Products</h4>
    </div>

    {partition(PRODUCTS, 3).map((products, sliceIndex) => (
      <div className="d-flex flex-row mb-4 align-items-start" key={sliceIndex}>
        {products.map((product, index) => (
          <Product {...product} key={sliceIndex + index}/>
        ))}
      </div>
    ))}
  </div>
);
