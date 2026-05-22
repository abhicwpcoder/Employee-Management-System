import api from './api';

const dashboardService = {
  getStats: async () => {
    return await api.get('/dashboard/stats');
  },
  
  getDepartmentDistribution: async () => {
    return await api.get('/dashboard/department-distribution');
  }
};

export default dashboardService;