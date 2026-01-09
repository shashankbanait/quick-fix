import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service
export const authService = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getCurrentUser: () => apiClient.get('/auth/me'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
};

// Services Service
export const servicesService = {
  getAll: (params) => apiClient.get('/services', { params }),
  getById: (id) => apiClient.get(`/services/${id}`),
  getByProvider: (providerId) =>
    apiClient.get(`/services/provider/${providerId}`),
  create: (data) => apiClient.post('/services', data),
  update: (id, data) => apiClient.put(`/services/${id}`, data),
  delete: (id) => apiClient.delete(`/services/${id}`),
};

// Bookings Service
export const bookingsService = {
  create: (data) => apiClient.post('/bookings', data),
  getMyBookings: () => apiClient.get('/bookings/my-bookings'),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  updateStatus: (id, status) =>
    apiClient.put(`/bookings/${id}/status`, { status }),
  cancel: (id) => apiClient.put(`/bookings/${id}/cancel`),
};

// Ratings Service
export const ratingsService = {
  getServiceRatings: (serviceId) =>
    apiClient.get(`/ratings/service/${serviceId}`),
  getProviderRatings: (providerId) =>
    apiClient.get(`/ratings/provider/${providerId}`),
  create: (data) => apiClient.post('/ratings', data),
  getMyRatings: () => apiClient.get('/ratings/my-ratings'),
  update: (id, data) => apiClient.put(`/ratings/${id}`, data),
  delete: (id) => apiClient.delete(`/ratings/${id}`),
};

export default apiClient;
