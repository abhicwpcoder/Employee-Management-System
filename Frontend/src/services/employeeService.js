import api from './api';

const employeeService = {
  getEmployees: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return await api.get(`/employees${queryParams ? `?${queryParams}` : ''}`);
  },
  
  getEmployeeById: async (id) => {
    return await api.get(`/employees/${id}`);
  },
  
  createEmployee: async (employeeData) => {
    return await api.post('/employees', employeeData);
  },
  
  updateEmployee: async (id, employeeData) => {
    return await api.put(`/employees/${id}`, employeeData);
  },
  
  deleteEmployee: async (id) => {
    return await api.delete(`/employees/${id}`);
  },
  
  getEmployeesByDepartment: async (department) => {
    return await api.get(`/employees/department/${department}`);
  }
};

export default employeeService;