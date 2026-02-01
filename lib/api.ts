import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  signup: async (email: string, password: string) => {
    const response = await api.post('/api/v1/auth/signup', { email, password });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/api/v1/auth/login', { email, password });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getMe: async () => {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
  },
};

// Analysis endpoints
export const analysis = {
  analyze: async (script: string, scriptType: string = 'general', title?: string) => {
    const response = await api.post('/api/v1/analyze/analyze', {
      script,
      script_type: scriptType,
      title,
    });
    return response.data;
  },

  compare: async (scriptA: string, scriptB: string) => {
    const response = await api.post('/api/v1/analyze/compare', {
      script_a: scriptA,
      script_b: scriptB,
    });
    return response.data;
  },

  improve: async (script: string, focusArea: string = 'all') => {
    const response = await api.post('/api/v1/analyze/improve', {
      script,
      focus_area: focusArea,
    });
    return response.data;
  },

  getHistory: async (limit: number = 20, offset: number = 0) => {
    const response = await api.get('/api/v1/analyze/history', {
      params: { limit, offset },
    });
    return response.data;
  },

  getAnalysis: async (id: string) => {
    const response = await api.get(`/api/v1/analyze/analysis/${id}`);
    return response.data;
  },

  deleteAnalysis: async (id: string) => {
    const response = await api.delete(`/api/v1/analyze/analysis/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/v1/analyze/stats');
    return response.data;
  },
};

export default api;
