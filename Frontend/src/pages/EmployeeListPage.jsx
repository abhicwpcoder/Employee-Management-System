import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiX, FiUsers, FiUserCheck, FiUserX, FiGrid, FiList } from 'react-icons/fi';
import toast from 'react-hot-toast';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [departments, setDepartments] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  // Debounce: wait 500ms after user stops typing before updating debouncedSearchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (filterDepartment) params.append('department', filterDepartment);
      if (filterStatus) params.append('status', filterStatus);

      const response = await fetch(`${API_URL}/employees?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
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
  }, [debouncedSearchTerm, filterDepartment, filterStatus, token, API_URL]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const response = await fetch(`${API_URL}/employees/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          toast.success('Employee deleted successfully');
          fetchEmployees();
        } else {
          toast.error('Delete failed');
        }
      } catch (error) {
        toast.error('Server error');
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setFilterStatus('');
  };

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.is_active).length,
    inactive: employees.filter(e => !e.is_active).length
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>Team Members</h1>
        <p style={{ color: '#64748b' }}>Manage and organize your workforce</p>
      </div>

      {/* Stats Cards – responsive grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ background: '#ecfdf5', borderRadius: '1rem', padding: '1rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Employees</p><p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</p></div>
            <FiUsers style={{ color: '#10b981', fontSize: '1.5rem' }} />
          </div>
        </div>
        <div style={{ background: '#ecfdf5', borderRadius: '1rem', padding: '1rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontSize: '0.75rem', color: '#64748b' }}>Active Members</p><p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.active}</p></div>
            <FiUserCheck style={{ color: '#10b981', fontSize: '1.5rem' }} />
          </div>
        </div>
        <div style={{ background: '#fef3c7', borderRadius: '1rem', padding: '1rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontSize: '0.75rem', color: '#64748b' }}>Inactive Members</p><p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.inactive}</p></div>
            <FiUserX style={{ color: '#f97316', fontSize: '1.5rem' }} />
          </div>
        </div>
      </div>

      {/* Search & Filters – responsive wrap */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1rem',
        marginBottom: '1.5rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent any accidental form submission / page reload
                }
              }}
              style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}
            />
          </div>
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', background: 'white' }}
        >
          <option value="">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', background: 'white' }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={clearFilters} style={{ padding: '0.5rem 1rem', border: 'none', background: '#f1f5f9', borderRadius: '0.75rem', cursor: 'pointer' }}>
          <FiX /> Clear
        </button>
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
          <button onClick={() => setViewMode('table')} style={{ padding: '0.5rem', background: viewMode === 'table' ? '#f97316' : 'white', color: viewMode === 'table' ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '0.5rem', cursor: 'pointer' }}><FiList /></button>
          <button onClick={() => setViewMode('grid')} style={{ padding: '0.5rem', background: viewMode === 'grid' ? '#f97316' : 'white', color: viewMode === 'grid' ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '0.5rem', cursor: 'pointer' }}><FiGrid /></button>
        </div>
        {(user.role === 'admin' || user.role === 'manager') && (
          <Link to="/employees/add" style={{ background: '#f97316', color: 'white', padding: '0.5rem 1rem', borderRadius: '2rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add Employee
          </Link>
        )}
      </div>

      {/* Employee List – responsive table with horizontal scroll */}
      {viewMode === 'table' ? (
        <div style={{ overflowX: 'auto', borderRadius: '1rem', background: 'white', border: '1px solid #e2e8f0' }}>
          <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Employee</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        {emp.first_name?.charAt(0)}{emp.last_name?.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500' }}>{emp.first_name} {emp.last_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{emp.employee_id || 'N/A'}</td>
                  <td style={{ padding: '0.75rem' }}>{emp.department || 'N/A'}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ background: emp.role === 'admin' ? '#f97316' : emp.role === 'manager' ? '#10b981' : '#3b82f6', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem' }}>
                      {emp.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ background: emp.is_active ? '#dcfce7' : '#fee2e2', color: emp.is_active ? '#166534' : '#991b1b', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem' }}>
                      {emp.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/employees/${emp.id}`} style={{ color: '#64748b', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#f97316'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}><FiEye /></Link>
                      {(user.role === 'admin' || user.role === 'manager' || user.id === emp.id) && (
                        <Link to={`/employees/edit/${emp.id}`} style={{ color: '#64748b', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#10b981'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}><FiEdit2 /></Link>
                      )}
                      {user.role === 'admin' && user.id !== emp.id && (
                        <button onClick={() => handleDelete(emp.id, `${emp.first_name} ${emp.last_name}`)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}><FiTrash2 /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View – responsive grid
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {employees.map(emp => (
            <div key={emp.id} style={{ background: 'white', borderRadius: '1rem', padding: '1rem', border: '1px solid #e2e8f0', transition: '0.2s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {emp.first_name?.charAt(0)}{emp.last_name?.charAt(0)}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/employees/${emp.id}`} style={{ color: '#64748b' }}><FiEye /></Link>
                  {(user.role === 'admin' || user.role === 'manager' || user.id === emp.id) && (
                    <Link to={`/employees/edit/${emp.id}`} style={{ color: '#64748b' }}><FiEdit2 /></Link>
                  )}
                  {user.role === 'admin' && user.id !== emp.id && (
                    <button onClick={() => handleDelete(emp.id, `${emp.first_name} ${emp.last_name}`)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><FiTrash2 /></button>
                  )}
                </div>
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{emp.first_name} {emp.last_name}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>{emp.email}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: emp.role === 'admin' ? '#f97316' : emp.role === 'manager' ? '#10b981' : '#3b82f6', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '2rem', fontSize: '0.7rem' }}>{emp.role}</span>
                <span style={{ background: emp.is_active ? '#dcfce7' : '#fee2e2', color: emp.is_active ? '#166534' : '#991b1b', padding: '0.2rem 0.5rem', borderRadius: '2rem', fontSize: '0.7rem' }}>{emp.is_active ? 'Active' : 'Inactive'}</span>
              </div>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem', fontSize: '0.7rem', color: '#64748b' }}>
                Dept: {emp.department || 'N/A'} • Pos: {emp.position || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeListPage;
