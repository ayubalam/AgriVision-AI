import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

// Intercept requests to attach Bearer JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/me'),
}

export const predictAPI = {
  scanLeaf: (formData) =>
    API.post('/predict/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getHistory: () => API.get('/predict/history'),
}

export default API