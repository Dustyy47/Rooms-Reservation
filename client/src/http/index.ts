import axios, { AxiosRequestConfig } from 'axios';

//OLD
//const API_URL = process.env.REACT_APP_API_URL + '/api'
const API_URL = 'http://localhost:5000/api';

export const $host = axios.create({
  baseURL: API_URL
});

export const $authHost = axios.create({
  baseURL: API_URL
});

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (config && config.headers) {
    config.headers.authorization = `Bearer ${
      localStorage.getItem('token') || ''
    }`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor as any);
