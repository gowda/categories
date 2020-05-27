import axios, { AxiosResponse } from 'axios';
import { Category } from '../reducers/categories';
import { BASE_API_ENDPOINT } from './config';

function httpGet(path: string, params: any = {}) {
  const url = `${BASE_API_ENDPOINT}/${path}`;

  return axios.get(
    url,
    {
      params,
      headers: {'Accept': 'application/json'
    }
  });
}

function httpPost(path: string, params: any = {}) {
  const url = `${BASE_API_ENDPOINT}/${path}`;

  return axios.post(url, params, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}});
}

export function fetchCategories(): Promise<Category[]> {
  return httpGet('api/categories')
    .then((response: AxiosResponse<any>) => (response.data as any as Category[]));
}

export function fetchCategoriesFor(id: string): Promise<Category[]> {
  return httpGet(`api/categories/${id}/children`)
    .then((response: AxiosResponse<any>) => (response.data as any as Category[]));
}

export function getCategory(id: string): Promise<Category> {
  return httpGet(`api/categories/${id}`)
    .then((response: AxiosResponse<any>) => (response as any as Category));
}

interface CreateCategoryParams {
  label: string;
}

export function createCategory(params: CreateCategoryParams): Promise<Category> {
  return httpPost('api/categories', params)
    .then((response: AxiosResponse<any>) => (response as any as Category));
}
