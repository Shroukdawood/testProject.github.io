// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://dummyjson.com",
//   headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) (config.headers as any) = { ...(config.headers as any), Authorization: `Bearer ${token}` };
//   return config;
// });

// export const login = (username: string, password: string) =>
//   api.post("/auth/login", { username, password }).then((r) => r.data);

// export const me = (token: string) =>
//   api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);

// export const fetchProducts = (limit = 100) =>
//   api.get(`/products?limit=${limit}`).then((r) => r.data);

// export const fetchCategories = () => api.get("/products/categories").then((r) => r.data);

// export const fetchByCategory = (category: string) =>
//   api.get(`/products/category/${encodeURIComponent(category)}`).then((r) => r.data);

// export const deleteProduct = (id: number, token?: string) =>
//   api
//     .delete(`/products/${id}`, {
//       headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//     })
//     .then((r) => r.data);

// export default api;

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' },
});

export const login = (username: string, password: string) =>
  API.post('/auth/login', { username, password }).then(r => r.data);

export const me = (token: string) =>
  API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const fetchProducts = (limit = 100) =>
  API.get(`/products?limit=${limit}`).then(r => r.data);

export const fetchCategories = () =>
  API.get('/products/categories').then(r => r.data);

export const fetchByCategory = (category: string) =>
  API.get(`/products/category/${encodeURIComponent(category)}`).then(r => r.data);

export const deleteProduct = (id: number, token?: string) =>
  API.delete(`/products/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : undefined }).then(r => r.data);

export default API;
