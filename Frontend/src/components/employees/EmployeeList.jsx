import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiX, 
  FiUsers, FiUserCheck, FiUserX, FiGrid, FiList, FiFilter
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [departments, setDepartments] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [showFilters, setShowFilters] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterDepartment) params.append('department', filterDepartment);
      if (filterStatus) params.append('status', filterStatus);
      
      const response = await fetch(`${API_URL}/employees?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setEmployees(data.data);
        const uniqueDepts = [...new Set(data.data.map(e => e.department).filter(Boolean))];
        setDepartments(uniqueDepts);
      }
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterDepartment, filterStatus, token, API_URL]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        const response = await fetch(`${API_URL}/employees/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          toast.success('Employee deleted');
          fetchEmployees();
        }
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.is_active).length,
    inactive: employees.filter(e => !e.is_active).length
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-slate-400">Manage and organize your workforce</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-400 text-sm">Total Employees</p><p className="text-3xl font-bold text-white mt-1">{stats.total}</p></div>
              <FiUsers className="h-10 w-10 text-blue-400 opacity-50 group-hover:opacity-100 transition" />
            </div>
          </div>
          <div className="glass rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-400 text-sm">Active Members</p><p className="text-3xl font-bold text-white mt-1">{stats.active}</p></div>
              <FiUserCheck className="h-10 w-10 text-green-400 opacity-50 group-hover:opacity-100 transition" />
            </div>
          </div>
          <div className="glass rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-400 text-sm">Inactive Members</p><p className="text-3xl font-bold text-white mt-1">{stats.inactive}</p></div>
              <FiUserX className="h-10 w-10 text-red-400 opacity-50 group-hover:opacity-100 transition" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-blue-500 transition flex items-center gap-2">
              <FiFilter /> Filters
            </button>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('table')} className={`p-3 rounded-xl transition ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}><FiList /></button>
              <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`}><FiGrid /></button>
            </div>
            {(user.role === 'admin' || user.role === 'manager') && (
              <Link to="/employees/add" className="btn-primary flex items-center gap-2"><FiPlus /> Add Employee</Link>
            )}
          </div>

          {showFilters && (
            <div className="flex gap-4 mt-4 pt-4 border-t border-slate-700/50 animate-fadeInUp">
              <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none">
                <option value="">All Departments</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button onClick={() => { setFilterDepartment(''); setFilterStatus(''); }} className="px-4 py-2 text-slate-400 hover:text-white transition"><FiX /> Clear</button>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>
        ) : employees.length === 0 ? (
          <div className="glass rounded-2xl text-center py-12"><FiUsers className="h-16 w-16 text-slate-600 mx-auto mb-4" /><p className="text-slate-400">No employees found</p></div>
        ) : viewMode === 'table' ? (
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-slate-700/50">
                <tr><th className="px-6 py-4 text-left text-slate-400 font-semibold text-sm">Employee</th><th className="px-6 py-4 text-left text-slate-400 font-semibold text-sm">ID</th><th className="px-6 py-4 text-left text-slate-400 font-semibold text-sm">Department</th><th className="px-6 py-4 text-left text-slate-400 font-semibold text-sm">Role</th><th className="px-6 py-4 text-left text-slate-400 font-semibold text-sm">Status</th><th className="px-6 py-4 text-left text-slate-400 font-semibold text-sm">Actions</th></tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">{emp.first_name?.charAt(0)}{emp.last_name?.charAt(0)}</div><div><p className="font-medium text-white">{emp.first_name} {emp.last_name}</p><p className="text-sm text-slate-400">{emp.email}</p></div></div></td>
                    <td className="px-6 py-4 text-slate-300">{emp.employee_id || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-300">{emp.department || 'N/A'}</td>
                    <td className="px-6 py-4"><span className={`badge ${emp.role === 'admin' ? 'badge-admin' : emp.role === 'manager' ? 'badge-manager' : 'badge-employee'}`}>{emp.role}</span></td>
                    <td className="px-6 py-4"><span className={`badge ${emp.is_active ? 'badge-active' : 'badge-inactive'}`}>{emp.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td className="px-6 py-4"><div className="flex gap-2"><Link to={`/employees/${emp.id}`} className="p-2 text-slate-400 hover:text-blue-400 transition"><FiEye /></Link>{(user.role === 'admin' || user.role === 'manager' || user.id === emp.id) && (<Link to={`/employees/edit/${emp.id}`} className="p-2 text-slate-400 hover:text-green-400 transition"><FiEdit2 /></Link>)}{user.role === 'admin' && user.id !== emp.id && (<button onClick={() => handleDelete(emp.id, `${emp.first_name} ${emp.last_name}`)} className="p-2 text-slate-400 hover:text-red-400 transition"><FiTrash2 /></button>)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map(emp => (
              <div key={emp.id} className="glass rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4"><div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">{emp.first_name?.charAt(0)}{emp.last_name?.charAt(0)}</div><div className="flex gap-1"><Link to={`/employees/${emp.id}`} className="p-2 text-slate-400 hover:text-blue-400 transition"><FiEye /></Link>{(user.role === 'admin' || user.role === 'manager' || user.id === emp.id) && (<Link to={`/employees/edit/${emp.id}`} className="p-2 text-slate-400 hover:text-green-400 transition"><FiEdit2 /></Link>)}{user.role === 'admin' && user.id !== emp.id && (<button onClick={() => handleDelete(emp.id, `${emp.first_name} ${emp.last_name}`)} className="p-2 text-slate-400 hover:text-red-400 transition"><FiTrash2 /></button>)}</div></div>
                <h3 className="font-semibold text-lg text-white mb-1">{emp.first_name} {emp.last_name}</h3>
                <p className="text-sm text-slate-400 mb-3">{emp.email}</p>
                <div className="flex flex-wrap gap-2 mb-3"><span className={`badge ${emp.role === 'admin' ? 'badge-admin' : emp.role === 'manager' ? 'badge-manager' : 'badge-employee'}`}>{emp.role}</span><span className={`badge ${emp.is_active ? 'badge-active' : 'badge-inactive'}`}>{emp.is_active ? 'Active' : 'Inactive'}</span></div>
                <div className="pt-3 border-t border-slate-700/50"><p className="text-xs text-slate-500">Department: {emp.department || 'N/A'}</p><p className="text-xs text-slate-500 mt-1">Position: {emp.position || 'N/A'}</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeListPage;