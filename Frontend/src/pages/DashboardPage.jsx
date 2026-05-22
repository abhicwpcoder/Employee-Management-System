import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiUserCheck, FiBriefcase, FiTrendingUp, FiCalendar, FiPlusCircle, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, departments: 0, recentHires: 0 });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${API_URL}/employees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const employees = data.data;
          setStats({
            total: employees.length,
            active: employees.filter(e => e.is_active).length,
            departments: [...new Set(employees.map(e => e.department).filter(Boolean))].length,
            recentHires: employees.filter(e => {
              const hire = new Date(e.hire_date);
              const monthAgo = new Date(); monthAgo.setDate(monthAgo.getDate() - 30);
              return hire >= monthAgo;
            }).length
          });
          const sorted = [...employees].sort((a, b) => new Date(b.hire_date) - new Date(a.hire_date));
          setRecentEmployees(sorted.slice(0, 5));
          const deptMap = new Map();
          employees.forEach(emp => {
            if (emp.department) deptMap.set(emp.department, (deptMap.get(emp.department) || 0) + 1);
          });
          setDepartmentCounts(Array.from(deptMap.entries()).map(([name, count]) => ({ name, count })));
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [token, API_URL]);

  const cardColors = [
    { title: 'Total Employees', value: stats.total, icon: FiUsers, iconColor: '#10b981', bg: '#ecfdf5' },
    { title: 'Active Members', value: stats.active, icon: FiUserCheck, iconColor: '#10b981', bg: '#ecfdf5' },
    { title: 'Departments', value: stats.departments, icon: FiBriefcase, iconColor: '#f97316', bg: '#fff7ed' },
    { title: 'Recent Hires', value: stats.recentHires, icon: FiTrendingUp, iconColor: '#f97316', bg: '#fff7ed' },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }}></div>
        <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ color: '#64748b' }}>Welcome back – here’s your workforce overview.</p>
      </div>

      {/* Stats Grid - responsive */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {cardColors.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              style={{
                background: card.bg,
                borderRadius: '1rem',
                padding: '1rem',
                border: '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>{card.title}</p>
                  <p style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: '700', color: '#1e293b' }}>{card.value}</p>
                </div>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '1rem', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon style={{ color: card.iconColor, fontSize: '1.5rem' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column section - fully responsive */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Recent Employees with background */}
        <div style={{ background: '#f1f5f9', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUserPlus style={{ color: '#10b981' }} /> Recent Hires
          </h2>
          {recentEmployees.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '1rem' }}>No employees yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentEmployees.map(emp => (
                <div key={emp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontWeight: '500', color: '#1e293b' }}>{emp.first_name} {emp.last_name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{emp.position || 'No position'} • {emp.department || 'No dept'}</p>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#f97316' }}>{emp.hire_date ? new Date(emp.hire_date).toLocaleDateString() : 'N/A'}</p>
                </div>
              ))}
              <Link to="/employees" style={{ textAlign: 'center', marginTop: '0.5rem', color: '#f97316', textDecoration: 'none', fontSize: '0.875rem' }}>View all →</Link>
            </div>
          )}
        </div>

        {/* Department Distribution with background */}
        <div style={{ background: '#f1f5f9', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiBriefcase style={{ color: '#f97316' }} /> Department Distribution
          </h2>
          {departmentCounts.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '1rem' }}>No departments data</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {departmentCounts.map((dept, idx) => {
                const percentage = (dept.count / stats.total) * 100;
                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#1e293b' }}>{dept.name}</span>
                      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{dept.count} employees</span>
                    </div>
                    <div style={{ background: '#e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, background: '#f97316', height: '0.5rem', borderRadius: '0.5rem' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions with background */}
      <div style={{
        background: '#fef3c7',
        borderRadius: '1rem',
        padding: '1.25rem',
        border: '1px solid #fde68a'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiCalendar style={{ color: '#f97316' }} /> Quick Actions
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link
            to="/employees"
            style={{
              background: '#f97316',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ea580c'}
            onMouseLeave={e => e.currentTarget.style.background = '#f97316'}
          >
            <FiUsers size={18} /> View All Employees
          </Link>
          <Link
            to="/employees/add"
            style={{
              background: 'white',
              border: '1px solid #f97316',
              color: '#f97316',
              padding: '0.6rem 1.2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff7ed'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <FiPlusCircle size={18} /> Add New Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;