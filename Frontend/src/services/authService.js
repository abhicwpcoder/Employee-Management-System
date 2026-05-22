import api from './api';

const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },
  
  changePassword: async (currentPassword, newPassword) => {
    return await api.post('/auth/change-password', { currentPassword, newPassword });
  },
  
  getMe: async () => {
    return await api.get('/auth/me');
  },
  
  setAuthToken: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  
  removeAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default authService;