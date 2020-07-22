import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { fetchProducts } from "./products";
import { Product } from "../reducers/products";

describe("products", () => {
  const url = "http://example.org/api/products";
  const headers = {
    "Content-Type": "application/json",
  };
  let mockAxiosAdapter: MockAdapter;
  const PRODUCTS: Product[] = [
    {
      id: "1",
      title: "Product title 1",
      description: "Production description 1",
      price: "INR 1200",
    },
    {
      id: "2",
      title: "Product title 2",
      description: "Production description 2",
      price: "INR 1200",
    },
    {
      id: "3",
      title: "Product title 3",
      description: "Production description 3",
      price: "INR 1200",
    },
    {
      id: "4",
      title: "Product title 4",
      description: "Production description 4",
      price: "INR 1200",
    },
    {
      id: "5",
      title: "Product title 5",
      description: "Production description 5",
      price: "INR 1200",
    },
    {
      id: "6",
      title: "Product title 6",
      description: "Production description 6",
      price: "INR 1200",
    },
    {
      id: "7",
      title: "Product title 7",
      description: "Production description 7",
      price: "INR 1200",
    },
    {
      id: "8",
      title: "Product title 8",
      description: "Production description 8",
      price: "INR 1200",
    },
    {
      id: "9",
      title: "Product title 9",
      description: "Production description 9",
      price: "INR 1200",
    },
    {
      id: "10",
      title: "Product title 10",
      description: "Production description 10",
      price: "INR 1200",
    },
    {
      id: "11",
      title: "Product title 11",
      description: "Production description 11",
      price: "INR 1200",
    },
  ];

  describe("on network error", () => {
    beforeEach(() => {
      mockAxiosAdapter = new MockAdapter(axios);
      mockAxiosAdapter.onGet(url).networkErrorOnce();
    });

    afterEach(() => {
      mockAxiosAdapter.restore();
    });

    it("returns a rejection", () => {
      return expect(fetchProducts()).rejects.toThrow("Network Error");
    });
  });

  describe("on success", () => {
    beforeEach(() => {
      mockAxiosAdapter = new MockAdapter(axios);
      mockAxiosAdapter.onGet(url).reply(200, JSON.stringify(PRODUCTS), headers);
    });

    afterEach(() => {
      mockAxiosAdapter.restore();
    });

    it("returns data when getProducts is called", () => {
      return fetchProducts().then((response) =>
        expect(response).toEqual(PRODUCTS)
      );
    });
  });

  describe("on not success", () => {
    beforeEach(() => {
      mockAxiosAdapter = new MockAdapter(axios);
      mockAxiosAdapter
        .onGet(url)
        .reply(500, { message: "Something went wrong" }, headers);
    });

    afterEach(() => {
      mockAxiosAdapter.restore();
    });

    it("returns a rejection", () => {
      return Promise.all([
        expect(fetchProducts()).rejects.toThrow("Something went wrong"),
        expect(fetchProducts()).rejects.toThrow("Something went wrong"),
      ]);
    });
  });
});
