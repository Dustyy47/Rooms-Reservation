import axios from 'axios';

//OLD
//const API_URL = process.env.REACT_APP_API_URL + '/api'
const API_URL = 'http://localhost:5000';

export const $host = axios.create({
  baseURL: API_URL
});

export const $authHost = axios.create({
  baseURL: API_URL
});
