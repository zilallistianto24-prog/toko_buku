import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Books
export const getBooks = () => apiClient.get('/books');
export const getBook = (id) => apiClient.get(`/books/${id}`);
export const createBook = (data) => apiClient.post('/books', data);
export const updateBook = (id, data) => apiClient.put(`/books/${id}`, data);
export const deleteBook = (id) => apiClient.delete(`/books/${id}`);

// Auth
export const register = (email, password, name) =>
  apiClient.post('/auth/register', { email, password, name });

export const login = (email, password) =>
  apiClient.post('/auth/login', { email, password });

export const logout = () => apiClient.post('/auth/logout');

export const verifyToken = () => apiClient.get('/auth/verify');

export default apiClient;
