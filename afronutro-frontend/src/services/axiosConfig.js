// api/axiosConfig.js
import axios from 'axios';
import store from '../redux/store'; // Import your Redux store

const api = axios.create({
    baseURL: 'http://localhost:8000', // Note: Using http instead of https
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000 // 10 seconds timeout
  });


// Request interceptor
// Remove token handling from request interceptor since we're using cookies
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional, but can be useful for handling token expiration)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      if (error.response) {
          if (error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              store.dispatch(logoutUser());
          } else if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
              console.log('Request timed out');
          }
      } else {
          console.error('Network or server error:', error.message);
      }
      return Promise.reject(error);
  }
);

export default api;