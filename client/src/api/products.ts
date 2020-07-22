import axios, { AxiosResponse } from "axios";
import { Product } from "../reducers/products";
import { BASE_API_ENDPOINT } from "./config";

function httpGet(path: string, params: any = {}) {
  const url = `${BASE_API_ENDPOINT}/${path}`;
  const config = {
    params,
    headers: { Accept: "application/json" },
  };

  return axios
    .get(url, config)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        return Promise.reject(response.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        return Promise.reject(new Error(error.response.data.message));
      } else if (error.request) {
        return Promise.reject(new Error(error.request));
      } else {
        return Promise.reject(error);
      }
    });
}

function httpPost(path: string, params: any = {}) {
  const url = `${BASE_API_ENDPOINT}/${path}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return axios
    .post(url, params, { headers })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response);
      } else if (error.request) {
        return Promise.reject(error.request);
      } else {
        return Promise.reject(error);
      }
    });
}

export function fetchProducts(): Promise<Product[]> {
  return httpGet("api/products").then(
    (response: AxiosResponse<any>) => (response as any) as Product[]
  );
}

export function fetchProductsFor(categoryId: string): Promise<Product[]> {
  return httpGet(`api/categories/${categoryId}/products`).then(
    (response: AxiosResponse<any>) => (response as any) as Product[]
  );
}

export function fetchProductsMatching(query: string): Promise<Product[]> {
  return httpGet("api/search", { q: query }).then(
    (response: AxiosResponse<any>) => (response as any) as Product[]
  );
}

export function doCreateProduct(
  title: string,
  description: string,
  price: number,
  categories: string[]
): Promise<Product> {
  return httpPost("api/products", {
    title,
    description,
    price,
    categories,
  }).then((response: AxiosResponse<any>) => (response as any) as Product);
}
