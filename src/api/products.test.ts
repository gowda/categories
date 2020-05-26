import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { fetchProducts } from './products';
import { Product } from '../reducers/products';

describe('products', () => {
  let mockAxiosAdapter: MockAdapter;
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

  describe('on network error', () => {
    beforeEach(() => {
      mockAxiosAdapter = new MockAdapter(axios);
      mockAxiosAdapter.onGet('http://example.org/api/products').networkErrorOnce();
    });

    afterEach(() => {
      mockAxiosAdapter.restore();
    })

    it('returns a rejection', () => {
      return expect(fetchProducts()).rejects.toThrow('Network Error');
    });
  });

  describe('on success', () => {
    beforeEach(() => {
      mockAxiosAdapter = new MockAdapter(axios);
      mockAxiosAdapter.onGet('http://example.org/api/products').reply(
        200,
        JSON.stringify(PRODUCTS),
        { 'Content-Type': 'application/json' }
      );
    });

    afterEach(() => {
      mockAxiosAdapter.restore();
    })

    it('returns data when getProducts is called', () => {
      return fetchProducts().then((response) => expect(response).toEqual(PRODUCTS));
    });
  });

  describe('on not success', () => {
    beforeEach(() => {
      mockAxiosAdapter = new MockAdapter(axios);
      mockAxiosAdapter.onGet('http://example.org/api/products').reply(
        500,
        { message: 'Something went wrong' },
        { 'Content-Type': 'application/json' }
      );
    });

    afterEach(() => {
      mockAxiosAdapter.restore();
    })

    it('returns a rejection', () => {
      return expect(fetchProducts()).rejects.toThrow();
    });
  });
});
